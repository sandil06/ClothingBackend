import React, { useEffect, useState } from "react";

const MenFootwear = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/menswear`);
        const data = await res.json();
        const list = data?.data || [];
        const filtered = list.filter(i => {
          const t = (i.type || '').toLowerCase();
          return t.includes('foot') || t.includes('shoe') || t.includes('sneaker') || t.includes('boot');
        });
        setItems(filtered);
      } catch (e) {
        console.error('Failed to load mens footwear', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black text-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <a className="text-gray-300 text-base font-medium" href="/mens">Men</a>
              <span className="text-gray-300 text-base font-medium">/</span>
              <span className="text-white text-base font-medium">Footwear</span>
            </div>
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white text-[32px] font-bold leading-tight min-w-72">Footwear</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {items.map((p, i) => (
                <div key={i} className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg" style={{ backgroundImage: `url("${(p.images && p.images[0]) || '/placeholder.png'}")` }}></div>
                  <div>
                    <p className="text-white text-base font-medium">{p.name}</p>
                    {p.price !== undefined && (
                      <p className="text-gray-300 text-sm font-normal">$ {Number(p.price).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
              {(!loading && items.length === 0) && <p className="text-gray-400">No items found.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenFootwear;
