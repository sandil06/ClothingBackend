import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./WomenShopAll.css"; // if you have an external stylesheet

const WomenShopAll = () => {
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
        const res = await fetch(`${API_BASE}/api/womenswear`);
        const data = await res.json();
        setItems(data?.data || []);
      } catch (e) {
        console.error('Failed to load womenswear', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Main Section */}
      <main className="main-content">
        <section className="hero">
          <h1>Women's Collection</h1>
          <p>Discover your style with SEHERA’s latest women's fashion</p>
        </section>

        {/* Category Tabs */}
        <nav className="flex border-b border-gray-800 px-4 gap-8 mb-6" style={{marginTop: '16px'}}>
          {[
            { label: "Shop All", to: "/womens" },
            { label: "Tops", to: "/womens/tops" },
            { label: "Jeans", to: "/womens/jeans" },
            { label: "Accessories", to: "/womens/accessories" },
            { label: "Footwear", to: "/womens/footwear" },
          ].map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center pb-[13px] pt-4 font-bold text-sm ${
                  isActive
                    ? "border-b-[3px] border-b-white text-white"
                    : "text-gray-300 border-b-transparent"
                }`
              }
              end
            >
              {tab.label}
            </NavLink>
          ))}
        </nav>

        {/* Shop All Section */}
        <section className="shop-all">
          <h2>Shop All</h2>
          <div className="product-grid">
            {items.map((p) => (
              <div key={p._id} className="product-card">
                <img src={(p.images && p.images[0]) || '/placeholder.png'} alt={p.name} />
                <h3>{p.name}</h3>
                {p.price !== undefined && (
                  <p className="text-gray-300">$ {Number(p.price).toFixed(2)}</p>
                )}
                <button onClick={async ()=>{
                  try {
                    await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: p._id, quantity: 1 }) });
                  } catch (e) { alert('Failed to add'); }
                }}>Add to Cart</button>
              </div>
            ))}
            {(!loading && items.length === 0) && (
              <p className="text-gray-400">No items found.</p>
            )}
          </div>
        </section>
      </main>
      
    </div>
  );
};

export default WomenShopAll;
