import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WomenFootwear = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/womenswear`);
        const data = await res.json();
        const list = data?.data || [];
        const filtered = list.filter(i => {
          const t = (i.type || '').toLowerCase();
          return t.includes('foot') || t.includes('shoe') || t.includes('sneaker') || t.includes('boot') || t.includes('heel') || t.includes('sandal');
        });
        setItems(filtered);
      } catch (e) { console.error('Failed to load womens footwear', e); }
      finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-x border-gray-800">
        <h1 className="text-3xl font-bold mb-6">Women — Footwear</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div key={i} className="flex flex-col gap-2">
              <img src={(it.images && it.images[0]) || '/placeholder.png'} alt={it.name} className="w-full h-64 object-cover rounded-lg" onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/400x256?text=Footwear'}} />
              <p className="font-medium text-white">{it.name}</p>
              {it.price !== undefined && (
                <p className="text-gray-300 text-sm">$ {Number(it.price).toFixed(2)}</p>
              )}
              <div className="flex items-center gap-2">
                <button className="h-9 px-3 rounded border border-gray-700" onClick={async ()=>{
                  try {
                    await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: it._id, quantity: 1 }) });
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
        {toast && (<div className="fixed bottom-4 right-4 bg-white text-black px-3 py-2 rounded shadow">{toast}</div>)}
      </main>
    </div>
  );
};

export default WomenFootwear;
