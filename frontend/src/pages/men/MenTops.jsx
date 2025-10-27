// src/pages/men/MenTops.jsx
import React, { useEffect, useState } from "react";

const MenTops = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [tops, setTops] = useState([]);
  const [loading, setLoading] = useState(false);
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/menswear?type=tops`);
        const data = await res.json();
        const list = data?.data || [];
        setTops(list);
      } catch (e) {
        console.error('Failed to load mens tops', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-[Manrope,_'Noto_Sans',_sans-serif]">
      

      {/* Content */}
      <main className="flex flex-col items-center px-0 py-6">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 border-x border-gray-800">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-2">
            <a href="/mens" className="hover:underline">Men</a> <span className="mx-1">/</span> <span className="text-white">Tops</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Tops</h1>

          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Sort</button>
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Size</button>
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Color</button>
          </div>

          <div className="flex flex-wrap gap-6" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {tops.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2"
                style={{ width: '200px' }}
              >
                <img
                  src={(item.images && item.images[0]) || 'https://via.placeholder.com/400x512?text=Top'}
                  alt={item.name}
                  style={{
                    width: '200px',
                    height: '256px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    backgroundColor: '#111'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x512?text=Top';
                  }}
                />
                <p className="text-base font-medium text-white">{item.name}</p>
                {item.price !== undefined && (
                  <p className="text-sm text-gray-300">$ {Number(item.price).toFixed(2)}</p>
                )}
                <button className="h-9 px-3 rounded border border-gray-700" onClick={async ()=>{
                  try {
                    const id = item._id || item.id;
                    await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: id, quantity: 1 }) });
                    alert('Added to cart');
                  } catch (e) { alert('Failed to add'); }
                }}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default MenTops;
