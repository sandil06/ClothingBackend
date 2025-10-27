import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [cart, setCart] = useState({ items: [] });
  const [address, setAddress] = useState({ street: "", city: "", zip: "", country: "" });
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const loadCart = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/cart`, { headers: { ...authHeaders() } });
      const data = await res.json();
      setCart(data || { items: [] });
    } catch (e) { console.error('Failed to load cart', e); }
  };

  useEffect(()=>{ loadCart(); }, []);

  const total = useMemo(()=> (cart.items||[]).reduce((sum, it)=>{
    const price = it.item?.price ?? it.price ?? 0;
    return sum + price * (it.quantity || 1);
  }, 0), [cart]);

  const placeOrder = async () => {
    try {
      setPlacing(true);
      if (paymentMethod === 'card') {
        // Go to Payment page with address; payment page will create order then handle payment
        navigate('/payment', { state: { address } });
        return;
      }
      const payload = {
        items: (cart.items||[]).map(ci => ({ item: ci.item?._id || ci.item, quantity: ci.quantity })),
        shippingAddress: address,
      };
      const res = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { ...authHeaders() },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const err = await res.json().catch(()=>({message:'Order failed'}));
        throw new Error(err.message || 'Order failed');
      }
      const order = await res.json();
      navigate('/account/orders');
    } catch (e) {
      alert(e.message || 'Failed to place order');
    } finally { setPlacing(false); }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-8 border-x border-gray-800">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Shipping Address</h2>
            <div className="space-y-3">
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="Street" value={address.street} onChange={(e)=>setAddress({...address, street: e.target.value})}/>
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="City" value={address.city} onChange={(e)=>setAddress({...address, city: e.target.value})}/>
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="ZIP" value={address.zip} onChange={(e)=>setAddress({...address, zip: e.target.value})}/>
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="Country" value={address.country} onChange={(e)=>setAddress({...address, country: e.target.value})}/>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
            <div className="space-y-3">
              {(cart.items||[]).map((ci, idx)=>{
                const name = ci.item?.name || 'Item';
                const price = ci.item?.price ?? ci.price ?? 0;
                return (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm">{ci.quantity} x {name}</span>
                    <span className="text-sm">$ {(price * ci.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
              <div className="flex items-center justify-between border-t border-gray-800 pt-3">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">$ {total.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
              <label className="flex items-center gap-2 mb-2">
                <input type="radio" name="pay" value="card" checked={paymentMethod==='card'} onChange={()=>setPaymentMethod('card')} />
                <span>Card Payment</span>
              </label>
              <label className="flex items-center gap-2 mb-2">
                <input type="radio" name="pay" value="cod" checked={paymentMethod==='cod'} onChange={()=>setPaymentMethod('cod')} />
                <span>Cash on Delivery</span>
              </label>
            </div>
            <button disabled={placing || !cart.items || cart.items.length===0} onClick={placeOrder} className="mt-4 h-10 w-full rounded bg-white text-black disabled:opacity-50">Place Order</button>
          </div>
        </div>
      </main>
    </div>
  );
}
