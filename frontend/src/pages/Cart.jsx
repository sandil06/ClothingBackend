import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const loadCart = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/cart`, { headers: { ...authHeaders() } });
      const data = await res.json();
      setCart(data || { items: [] });
    } catch (e) {
      console.error('Failed to load cart', e);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ loadCart(); }, []);

  const total = useMemo(()=> (cart.items||[]).reduce((sum, it)=>{
    const price = it.item?.price ?? it.price ?? 0;
    return sum + price * (it.quantity || 1);
  }, 0), [cart]);

  const updateQty = async (itemId, quantity) => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { ...authHeaders() },
        body: JSON.stringify({ quantity })
      });
      if (!res.ok) throw new Error('Update failed');
      await loadCart();
    } catch (e) { alert(e.message || 'Failed to update'); }
  };

  const removeItem = async (itemId) => {
    try {
      const res = await fetch(`${API_BASE}/api/cart/${itemId}`, {
        method: 'DELETE',
        headers: { ...authHeaders() }
      });
      if (!res.ok) throw new Error('Remove failed');
      await loadCart();
    } catch (e) { alert(e.message || 'Failed to remove'); }
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-8 border-x border-gray-800">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="space-y-4">
          {(cart.items||[]).map((ci) => {
            const id = ci.item?._id || ci.item; // support id or populated object
            const name = ci.item?.name || 'Item';
            const img = (ci.item?.images && ci.item.images[0]) || '/placeholder.png';
            const price = ci.item?.price ?? ci.price ?? 0;
            return (
              <div key={id} className="flex items-center gap-4 p-3 rounded-lg border border-gray-800">
                <img src={img} alt="p" className="w-20 h-24 object-cover rounded" onError={(e)=>{e.currentTarget.src='/placeholder.png'}}/>
                <div className="flex-1">
                  <p className="font-medium">{name}</p>
                  <p className="text-gray-300 text-sm">$ {price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <input type="number" min="1" className="w-20 h-9 px-2 rounded bg-[#111] border border-gray-700" value={ci.quantity} onChange={(e)=>updateQty(id, Number(e.target.value)||1)} />
                  <button className="h-9 px-3 rounded border border-gray-700" onClick={()=>removeItem(id)}>Remove</button>
                </div>
              </div>
            );
          })}
          {(!loading && (!cart.items || cart.items.length===0)) && (
            <p className="text-gray-400">Your cart is empty.</p>
          )}
        </div>
        <div className="flex items-center justify-between mt-6">
          <p className="text-lg">Total: <span className="font-semibold">$ {total.toFixed(2)}</span></p>
          <button disabled={!cart.items || cart.items.length===0} className="h-10 px-5 rounded-lg bg-white text-black disabled:opacity-50" onClick={proceedToCheckout}>Proceed to Checkout</button>
        </div>
      </main>
    </div>
  );
}
