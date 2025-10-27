import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import { exportElementToPdf } from "../../utils/exportPdf";

const categories = [
  { key: 'mens', label: "Menswear" },
  { key: 'womens', label: "Womenswear" },
  { key: 'kids', label: "Kidswear" },
  { key: 'style', label: "StyleCombo" },
];

const sizeOptions = ["S","M","L","XL","XXL"];

export default function AdminAddItems() {
  const [activeTab, setActiveTab] = useState('mens');
  const [form, setForm] = useState({
    images: [null, null, null, null],
    name: "",
    description: "",
    sizes: [],
    type: "",
    price: "",
    salesPrice: "",
    discountPct: "",
    bestSeller: false,
    kidsStage: "",
    styleFilter: "",
  });
  const [items, setItems] = useState([]);
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`
  });

  const endpoints = {
    mens: {
      list: `${API_BASE}/api/menswear`,
      create: `${API_BASE}/api/menswear`
    },
    womens: {
      list: `${API_BASE}/api/womenswear`,
      create: `${API_BASE}/api/womenswear`
    },
    kids: {
      list: `${API_BASE}/api/kidswear`,
      create: `${API_BASE}/api/kidswear`
    },
    // style combos need different payload (items[] required). We'll wire later.
  };

  const typeOptions = useMemo(() => {
    if (activeTab === 'mens' || activeTab === 'womens') {
      return ['tops','jeans','accessories','footwear'];
    }
    if (activeTab === 'kids') {
      return ['tops','jeans','footwear'];
    }
    return [];
  }, [activeTab]);

  const loadItems = async (tab) => {
    try {
      if (tab === 'style') { setItems([]); return; }
      const res = await fetch(endpoints[tab].list, { headers: { ...authHeaders() } });
      const data = await res.json();
      const list = data?.data || [];
      setItems(list.map(d => ({
        id: d._id,
        category: tab,
        images: (d.images || []).slice(0,4),
        name: d.name,
        description: d.description,
        sizes: d.size ? String(d.size).split(',') : [],
        price: d.price,
        salesPrice: d.discount ? Number((d.price - (d.price * d.discount/100)).toFixed(2)) : null,
        kidsStage: d.ageGroup,
      })));
      if (list.length === 0) {
        await seedOne(tab);
        await loadItems(tab);
      }
    } catch (e) {
      console.error('Load items failed', e);
    }
  };

  useEffect(()=>{ loadItems(activeTab); }, [activeTab]);

  const seedOne = async (tab) => {
    try {
      if (tab === 'style') return;
      const fd = new FormData();
      fd.append('name', `Sample ${categories.find(c=>c.key===tab)?.label} Item`);
      fd.append('description', 'Auto-seeded item');
      fd.append('price', '50');
      fd.append('discount', '0');
      fd.append('type', 'tops');
      // store sizes into single schema field
      fd.append('size', 'M,L');
      if (tab === 'kids') {
        fd.append('ageGroup', 'kids');
      }
      await fetch(endpoints[tab].create, { method: 'POST', headers: { ...authHeaders() }, body: fd });
    } catch (e) { console.warn('Seeding failed', e); }
  };

  const resetForm = () => setForm({
    images: [null, null, null, null],
    name: "",
    description: "",
    sizes: [],
    type: "",
    price: "",
    salesPrice: "",
    discountPct: "",
    bestSeller: false,
    kidsStage: "",
    styleFilter: "",
  });

  const computedSales = useMemo(() => {
    const price = parseFloat(form.price || 0);
    const pct = parseFloat(form.discountPct || 0);
    if (pct > 0) {
      const sales = price * (1 - pct/100);
      return sales.toFixed(2);
    }
    if (form.salesPrice) return parseFloat(form.salesPrice).toFixed(2);
    return "";
  }, [form.price, form.discountPct, form.salesPrice]);

  const onImageChange = (idx, file) => {
    const images = [...form.images];
    images[idx] = file ? URL.createObjectURL(file) : null;
    setForm({ ...form, images });
  };

  const toggleSize = (s) => {
    const sizes = new Set(form.sizes);
    if (sizes.has(s)) sizes.delete(s); else sizes.add(s);
    setForm({ ...form, sizes: Array.from(sizes) });
  };

  const addItem = async () => {
    try {
      if (activeTab === 'style') {
        // Style combos need separate flow (items[]). Skipping for now.
        alert('StyleCombo creation will be wired next. Please use other tabs.');
        return;
      }
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('description', form.description);
      if (form.type) fd.append('type', form.type);
      fd.append('price', String(form.price || '0'));
      // Prefer discount% if provided, else derive from salesPrice
      let discount = form.discountPct;
      if (!discount && computedSales) {
        const base = parseFloat(form.price || 0);
        const sale = parseFloat(computedSales);
        discount = base > 0 ? (((base - sale)/base)*100).toFixed(2) : '0';
      }
      fd.append('discount', String(discount || '0'));
      fd.append('type', 'tops');
      // backend has single size string
      if (form.sizes.length) fd.append('size', form.sizes.join(','));
      if (activeTab === 'kids' && form.kidsStage) {
        const map = { 'Baby 0-36mts': 'baby', 'Kids 2-12yrs': 'kids', 'Teens 13-16yrs': 'teens' };
        fd.append('ageGroup', map[form.kidsStage] || 'kids');
      }
      // images
      form.images.forEach((urlOrNull, i) => {
        // We stored preview URLs, but not File; rely on file inputs by querying DOM for files
      });
      // Collect actual files from DOM inputs by name
      const inputs = document.querySelectorAll('input[type="file"]');
      let count = 0;
      inputs.forEach(inp => { if (inp.files && inp.files[0] && count < 4) { fd.append('images', inp.files[0]); count++; } });

      const res = await fetch(endpoints[activeTab].create, { method: 'POST', headers: { ...authHeaders() }, body: fd });
      if (!res.ok) {
        const err = await res.json().catch(()=>({message:'Failed'}));
        throw new Error(err.message || 'Create failed');
      }
      resetForm();
      await loadItems(activeTab);
    } catch (e) {
      alert(e.message || 'Add failed');
    }
  };

  const printSection = async (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    await exportElementToPdf(el, { filename: 'additems-form.pdf' });
  };

  const tabItems = useMemo(() => items.filter(i => i.category === activeTab), [items, activeTab]);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />

        <div className="px-6 py-5 flex-1">
          <div className="max-w-[1200px] mx-auto">
            <h1 className="text-2xl font-bold text-[#111418] mb-3">Add Items</h1>

            {/* Tabs */}
            <div className="flex gap-2 mb-4">
              {categories.map(c => (
                <button key={c.key} onClick={()=>setActiveTab(c.key)} className={`px-4 h-9 rounded-lg border ${activeTab===c.key? 'bg-black text-white border-black':'bg-white text-[#111418] border-[#dbe0e6]'}`}>{c.label}</button>
              ))}
            </div>

            {/* Form */}
            <div id="additems-form" className="grid grid-cols-1 lg:grid-cols-2 gap-6 border border-[#dbe0e6] rounded-lg p-4">
              <div>
                <p className="font-medium mb-2">Product Images (4)</p>
                <div className="grid grid-cols-2 gap-3">
                  {[0,1,2,3].map(i => (
                    <div key={i} className="border border-[#dbe0e6] rounded-lg p-2 flex flex-col items-center justify-center h-36">
                      {form.images[i] ? (
                        <img src={form.images[i]} alt="preview" className="h-full w-full object-cover rounded"/>
                      ):(
                        <label className="text-sm text-[#617589] cursor-pointer">
                          <input type="file" accept="image/*" className="hidden" onChange={(e)=>onImageChange(i, e.target.files[0])}/>
                          Upload image
                        </label>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex flex-col">
                  <span className="text-sm font-medium">Product Name</span>
                  <input className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
                </label>

                <label className="flex flex-col">
                  <span className="text-sm font-medium">Product Description</span>
                  <textarea className="min-h-24 px-3 py-2 rounded-lg border border-[#dbe0e6]" value={form.description} onChange={e=>setForm({...form, description: e.target.value})}/>
                </label>

                <div>
                  <span className="text-sm font-medium">Sizes</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {sizeOptions.map(s=> (
                      <button key={s} type="button" onClick={()=>toggleSize(s)} className={`h-9 min-w-12 rounded-lg border ${form.sizes.includes(s)? 'bg-black text-white border-black':'bg-white text-[#111418] border-[#dbe0e6]'}`}>{s}</button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Product Price</span>
                    <input type="number" className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.price} onChange={e=>setForm({...form, price: e.target.value})}/>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Sales Price</span>
                    <input type="number" className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.salesPrice} onChange={e=>setForm({...form, salesPrice: e.target.value, discountPct: ''})}/>
                  </label>
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Discount %</span>
                    <input type="number" className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.discountPct} onChange={e=>setForm({...form, discountPct: e.target.value, salesPrice: ''})}/>
                  </label>
                </div>
                {!!computedSales && (
                  <p className="text-sm text-[#617589]">Calculated sales price: <span className="font-semibold text-[#111418]">${computedSales}</span></p>
                )}

                <label className="inline-flex items-center gap-2 mt-1">
                  <input type="checkbox" checked={!!form.bestSeller} onChange={e=>setForm({...form, bestSeller: e.target.checked})}/>
                  <span className="text-sm">Best Seller</span>
                </label>

                {activeTab === 'kids' && (
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Growth Stage</span>
                    <select className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.kidsStage} onChange={e=>setForm({...form, kidsStage: e.target.value})}>
                      <option value="">Select...</option>
                      <option>Baby 0-36mts</option>
                      <option>Kids 2-12yrs</option>
                      <option>Teens 13-16yrs</option>
                    </select>
                  </label>
                )}

                {activeTab === 'style' && (
                  <label className="flex flex-col">
                    <span className="text-sm font-medium">Style Filter</span>
                    <select className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.styleFilter} onChange={e=>setForm({...form, styleFilter: e.target.value})}>
                      <option value="">Select...</option>
                      <option>Wedding fits</option>
                      <option>Smart Casuals</option>
                      <option>Summer kits</option>
                    </select>
                  </label>
                )}

                <div className="flex gap-2 mt-2">
                  <button className="h-10 px-4 rounded-lg bg-black text-white" onClick={addItem}>Add Item</button>
                  <button className="h-10 px-4 rounded-lg border border-[#dbe0e6]" onClick={resetForm}>Reset</button>
                  <button className="h-10 px-4 rounded-lg border border-[#dbe0e6]" onClick={()=>printSection('additems-form')}>Download PDF</button>
                </div>
              </div>
            </div>

            {/* View list items */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold">{categories.find(c=>c.key===activeTab)?.label} Items</h2>
                <div className="flex gap-2">
                  <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={()=>printSection('print-category')}>Print this category</button>
                  <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={()=>printSection('print-all')}>Print all items</button>
                </div>
              </div>

              <div id="print-category" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {tabItems.map(it => (
                  <div key={it.id} className="border border-[#dbe0e6] rounded-lg p-3">
                    <div className="grid grid-cols-4 gap-1 mb-2">
                      {[0,1,2,3].map(i => it.images[i] ? (
                        <img key={i} src={it.images[i]} alt="p" className="h-16 w-full object-cover rounded"/>
                      ) : <div key={i} className="h-16 bg-[#f7f8f9] rounded"/>)}
                    </div>
                    <p className="font-medium">{it.name}</p>
                    <p className="text-sm text-[#617589] line-clamp-2">{it.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {it.salesPrice ? (
                        <>
                          <span className="text-sm text-[#617589] line-through">${it.price.toFixed(2)}</span>
                          <span className="text-sm font-semibold">${it.salesPrice.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="text-sm font-semibold">${it.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className="text-xs text-[#617589] mt-1">Sizes: {it.sizes.join(', ') || '-'}</div>
                    {it.kidsStage && <div className="text-xs text-[#617589]">Stage: {it.kidsStage}</div>}
                    {it.styleFilter && <div className="text-xs text-[#617589]">Style: {it.styleFilter}</div>}
                    {it.bestSeller && <div className="text-xs text-emerald-600 font-medium">Best Seller</div>}
                  </div>
                ))}
              </div>

              <div id="print-all" className="hidden">
                {items.map(it => (
                  <div key={it.id}>
                    <h3>{it.category} - {it.name}</h3>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
