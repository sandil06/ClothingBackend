import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const KidsWearPage = () => {
  const { pathname } = useLocation();
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const tabs = [
    { label: "Shop All", href: "/kids" },
    { label: "Jeans", href: "/kids/jeans" },
    { label: "Accessories", href: "/kids/accessories" },
    { label: "Footwear", href: "/kids/footwear" },
  ];

  const ages = [
    { label: "0-3", href: "/kids/0-3" },
    { label: "4-7", href: "/kids/4-7" },
    { label: "8-12", href: "/kids/8-12" },
  ];

  const isActive = (href) => {
    // exact match for /kids, prefix match for others
    if (href === "/kids") return pathname === "/kids";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/kidswear`);
        const data = await res.json();
        setItems(data?.data || []);
      } catch (e) {
        console.error('Failed to load kidswear', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  const activeAgeGroup = useMemo(() => {
    if (pathname.startsWith('/kids/0-3')) return 'baby';
    if (pathname.startsWith('/kids/4-7')) return 'kids';
    if (pathname.startsWith('/kids/8-12')) return 'kids';
    return null; // show all
  }, [pathname]);

  const filtered = useMemo(() => {
    if (!activeAgeGroup) return items;
    return items.filter(i => (i.ageGroup || '').toLowerCase() === activeAgeGroup);
  }, [items, activeAgeGroup]);

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">
              </p>
            </div>

            <div className="pb-3">
              <div className="flex border-b border-gray-800 px-4 gap-8">
                {tabs.map((tab) => (
                  <Link
                    key={tab.label}
                    to={tab.href}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      isActive(tab.href) ? "border-b-white text-white" : "border-b-transparent text-gray-300"
                    }`}
                  >
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                      {tab.label}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
              Age Group
            </h3>
            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {ages.map((age) => (
                <Link
                  key={age.href}
                  to={age.href}
                  className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-4 pr-4 border ${
                    isActive(age.href) ? "bg-white text-black border-white" : "bg-[#111] text-white border-gray-700"
                  }`}
                >
                  <p className="text-sm font-medium leading-normal">{age.label}</p>
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {filtered.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${(item.images && item.images[0]) || '/placeholder.png'}")`  }}
                  ></div>
                  <p className="text-white text-base font-medium leading-normal">
                    {item.name}
                  </p>
                  <button className="h-9 px-3 rounded border border-gray-700" onClick={async ()=>{
                    try {
                      const id = item._id || item.id;
                      await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: id, quantity: 1 }) });
                      alert('Added to cart');
                    } catch (e) { alert('Failed to add'); }
                  }}>Add to Cart</button>
                </div>
              ))}
              {(!loading && filtered.length === 0) && (
                <p className="text-gray-400">No items found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsWearPage;
