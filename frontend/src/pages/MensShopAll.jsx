import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MensShopAll = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/menswear`);
        const data = await res.json();
        setItems(data?.data || []);
      } catch (e) {
        console.error("Failed to load menswear", e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <Navbar />
      <main className="flex-1 px-40 py-5 flex justify-center">
        <div className="flex flex-col max-w-[960px] w-full">
          <h1 className="text-[32px] font-bold text-white mb-6">Men's Wear</h1>

          <nav className="flex border-b border-[#3a3a3a] px-4 gap-8 mb-6">
            {[
              { label: "Shop All", to: "/mens" },
              { label: "Tops", to: "/mens/tops" },
              { label: "Jeans", to: "/mens/jeans" },
              { label: "Accessories", to: "/mens/accessories" },
              { label: "Footwear", to: "/mens/footwear" },
            ].map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                className={({ isActive }) =>
                  `flex flex-col items-center pb-[13px] pt-4 font-bold text-sm border-b-3 ${
                    isActive
                      ? "border-b-[3px] border-b-white text-white"
                      : "text-gray-400 border-b-transparent"
                  }`
                }
                end
              >
                {tab.label}
              </NavLink>
            ))}
          </nav>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
            {items.map((p) => (
              <div key={p._id} className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                  style={{ backgroundImage: `url(${(p.images && p.images[0]) || '/placeholder.png'})`  }}
                />
                <p className="text-white text-base font-medium">{p.name}</p>
                {p.price !== undefined && (
                  <p className="text-gray-300 text-sm">$ {Number(p.price).toFixed(2)}</p>
                )}
                <button className="h-9 px-3 rounded border border-gray-700" onClick={async ()=>{
                  try {
                    await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: p._id, quantity: 1 }) });
                    alert('Added to cart');
                  } catch (e) { alert('Failed to add'); }
                }}>Add to Cart</button>
              </div>
            ))}
            {(!loading && items.length === 0) && (
              <p className="text-gray-400">No items found.</p>
            )}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default MensShopAll;
 
