import React, { useEffect, useState } from "react";

export default function StitchDesign() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/style-combos`);
        const data = await res.json();
        setCombos(Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load style combos', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        {/* Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">Special Combos</p>
            </div>

            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Shop All</h3>

            <div className="flex overflow-y-auto [-ms-scrollbar-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex items-stretch p-4 gap-3">
                {combos.map((item, i) => (
                  <div key={i} className="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-40">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg flex flex-col"
                      style={{ backgroundImage: `url("${(item.images && item.images[0]) || '/placeholder.png'}")` }}
                    />
                    <div>
                      <p className="text-white text-base font-medium leading-normal">{item.name}</p>
                      {item.price !== undefined && (
                        <p className="text-gray-400 text-sm font-normal leading-normal">$ {Number(item.price).toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                ))}
                {(!loading && combos.length === 0) && (
                  <p className="text-gray-400">No combos found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
