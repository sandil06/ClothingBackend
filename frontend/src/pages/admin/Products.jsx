import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";
import { exportElementToPdf } from "../../utils/exportPdf";

export default function AdminProducts() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });

  const endpoints = {
    menswear: {
      list: `${API_BASE}/api/menswear`,
      del: (id) => `${API_BASE}/api/menswear/${id}`,
      key: 'menswear',
    },
    womenswear: {
      list: `${API_BASE}/api/womenswear`,
      del: (id) => `${API_BASE}/api/womenswear/${id}`,
      key: 'womenswear',
    },
    kidswear: {
      list: `${API_BASE}/api/kidswear`,
      del: (id) => `${API_BASE}/api/kidswear/${id}`,
      key: 'kidswear',
    },
  };

  const loadAll = async () => {
    try {
      setLoading(true);
      const [mw, ww, kw] = await Promise.all([
        fetch(endpoints.menswear.list, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(endpoints.womenswear.list, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(endpoints.kidswear.list, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
      ]);
      const norm = (arr, cat) => (arr?.data || []).map(d => ({
        _id: d._id,
        category: cat,
        name: d.name,
        price: d.price,
        discount: d.discount || 0,
        inStock: d.inStock !== false,
        images: d.images || [],
      }));
      setItems([ ...norm(mw,'menswear'), ...norm(ww,'womenswear'), ...norm(kw,'kidswear') ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{ loadAll(); }, []);

  const onDelete = async (it) => {
    if (!confirm(`Delete ${it.name}?`)) return;
    try {
      const ep = endpoints[it.category];
      const res = await fetch(ep.del(it._id), { method: 'DELETE', headers: { ...authHeaders() } });
      if (!res.ok) throw new Error('Delete failed');
      await loadAll();
    } catch (e) {
      alert(e.message || 'Failed to delete');
    }
  };

  const filtered = useMemo(()=> items.filter(it => {
    const okCat = cat === 'all' || it.category === cat;
    const okQ = !q || it.name.toLowerCase().includes(q.toLowerCase());
    return okCat && okQ;
  }), [items, q, cat]);

  const rows = useMemo(()=> filtered.map((it, idx) => ({
    id: it._id,
    name: it.name,
    price: `$ ${Number(it.price).toFixed(2)}`,
    stock: it.inStock ? 'In stock' : 'Out',
    status: it.inStock ? 'Active' : 'Inactive',
    category: it.category,
  })), [filtered]);

  const printTable = async () => {
    const el = document.getElementById('products-table');
    if (!el) return;
    await exportElementToPdf(el, { filename: 'products.pdf' });
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-[#111418] text-2xl font-bold">Products</h1>
              <div className="flex gap-2">
                <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={printTable}>Download PDF</button>
                <button className="h-9 px-4 rounded-lg bg-black text-white text-sm font-medium" onClick={()=>navigate('/admin/additems')}>Add Product</button>
              </div>
            </div>

            {/* Filters */}
            <div className="px-4 pb-1 flex items-center gap-2">
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search by name" className="h-9 px-3 rounded-lg border border-[#dbe0e6] w-64"/>
              <select value={cat} onChange={e=>setCat(e.target.value)} className="h-9 px-3 rounded-lg border border-[#dbe0e6]">
                <option value="all">All categories</option>
                <option value="menswear">Menswear</option>
                <option value="womenswear">Womenswear</option>
                <option value="kidswear">Kidswear</option>
              </select>
            </div>

            <div className="px-4 py-3">
              <div className="overflow-auto rounded-lg border border-[#dbe0e6]">
                <table id="products-table" className="w-full text-sm min-w-[900px]">
                  <thead className="bg-[#f7f8f9]">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Category</th>
                      <th className="px-4 py-2 text-left">Price</th>
                      <th className="px-4 py-2 text-left">Stock</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row)=> (
                      <tr key={row.id} className="border-t border-[#dbe0e6]">
                        <td className="px-4 py-2">{row.id}</td>
                        <td className="px-4 py-2">{row.name}</td>
                        <td className="px-4 py-2 capitalize">{row.category}</td>
                        <td className="px-4 py-2">{row.price}</td>
                        <td className="px-4 py-2">{row.stock}</td>
                        <td className="px-4 py-2">
                          <span className="inline-flex h-6 items-center px-3 rounded bg-[#f0f2f4] text-[#111418]">{row.status}</span>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button className="h-8 px-3 rounded border border-[#dbe0e6]" disabled>Edit</button>
                            <button className="h-8 px-3 rounded border border-[#dbe0e6]" onClick={()=>onDelete(items.find(i=>i._id===row.id))}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {loading && <p className="text-sm text-[#617589] mt-2">Loading...</p>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
