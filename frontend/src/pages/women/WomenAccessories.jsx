import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const WomenAccessories = () => {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/womenswear?type=accessories`);
        const data = await res.json();
        const list = data?.data || [];
        setItems(list);
      } catch (e) {
        console.error('Failed to load women accessories', e);
      } finally { setLoading(false); }
    };
    load();
  }, []);

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <a className="text-gray-300 text-base font-medium leading-normal" href="#">Shop All</a>
              <span className="text-gray-300 text-base font-medium leading-normal">/</span>
              <span className="text-white text-base font-medium leading-normal">Women's Accessories</span>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Women's Accessories
            </h2>

            <div className="flex gap-3 p-3 overflow-x-hidden">
              {["Sort", "Size", "Color", "Price"].map((item) => (
                <button key={item} className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#111] border border-gray-700 pl-4 pr-2">
                  <p className="text-white text-sm font-medium leading-normal">{item}</p>
                  <div className="text-white" data-icon="CaretDown" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {items.map((product, idx) => (
                <div key={idx} className="flex flex-col gap-3 pb-3">
                  <div className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg" style={{ backgroundImage: `url("${(product.images && product.images[0]) || '/placeholder.png'}")` }}></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">{product.name}</p>
                    {product.price !== undefined && (
                      <p className="text-gray-300 text-sm font-normal leading-normal">$ {Number(product.price).toFixed(2)}</p>
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
            {toast && (<div className="fixed bottom-4 right-4 bg-white text-black px-3 py-2 rounded shadow">{toast}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WomenAccessories;
