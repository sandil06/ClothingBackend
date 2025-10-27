import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KidsAccessories = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const filters = ["Sort by", "Size", "Color", "Price"];

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/kidswear?type=accessories`);
        const data = await res.json();
        const list = data?.data || [];
        setItems(list);
      } catch (e) { console.error('Failed to load kids accessories', e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Breadcrumb & Title */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4 text-gray-300">
              <a href="#" className="hover:underline">Shop All</a>
              <span>/</span>
              <span className="text-white">Kids' Accessories</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white text-[32px] font-bold">Kids' Accessories</p>
                <p className="text-gray-300 text-sm font-normal">
                  Explore our curated collection of kids' accessories, designed to add a touch of fun and style to any outfit.
                </p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {filters.map((filter) => (
                <button key={filter} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#111] border border-gray-700 pl-4 pr-2">
                  <p className="text-white text-sm font-medium">{filter}</p>
                  <span className="text-white">▼</span>
                </button>
              ))}
            </div>

            {/* Products */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {items.map((product) => (
                <div key={product._id} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url(${(product.images && product.images[0]) || '/placeholder.png'})`  }}
                  />
                  <div>
                    <p className="text-white text-base font-medium">{product.name}</p>
                    {product.price !== undefined && (
                      <p className="text-gray-300 text-sm font-normal">$ {Number(product.price).toFixed(2)}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-9 px-3 rounded border border-gray-700" onClick={async ()=>{
                      try {
                        await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: product._id, quantity: 1 }) });
                        setToast('Added to cart'); setTimeout(()=>setToast(""), 1500);
                      } catch (e) { setToast('Failed to add'); setTimeout(()=>setToast(""), 1500); }
                    }}>Add to Cart</button>
                    <button className="h-9 px-3 rounded border border-gray-700" onClick={()=>navigate('/cart')}>Go to Cart</button>
                  </div>
                </div>
              ))}
              {(!loading && items.length === 0) && (
                <p className="text-gray-400">No items found.</p>
              )}
            </div>
          </div>
        </div>

        
      </div>
      {toast && (<div className="fixed bottom-4 right-4 bg-white text-black px-3 py-2 rounded shadow">{toast}</div>)}
    </div>
  );
}

export default KidsAccessories;
