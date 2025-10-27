import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const { state } = useLocation();
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

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
    } catch (e) { console.error('Failed to load cart', e); }
    finally { setLoading(false); }
  };

  const total = useMemo(()=> (cart.items||[]).reduce((sum, it)=>{
    const price = it.item?.price ?? it.price ?? 0;
    return sum + price * (it.quantity || 1);
  }, 0), [cart]);

  const createIntent = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/payments/create-intent`, {
        method: 'POST',
        headers: { ...authHeaders() },
        body: JSON.stringify({ amount: total, orderId: 'pending' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Create intent failed');
      setClientSecret(data.clientSecret);
    } catch (e) { alert(e.message || 'Failed to initialize payment'); }
  };

  const payNow = async () => {
    try {
      // In a real integration, confirm card with Stripe. Here we call confirm endpoint to record payment.
      const res = await fetch(`${API_BASE}/api/payments/confirm`, {
        method: 'POST',
        headers: { ...authHeaders() },
        body: JSON.stringify({ paymentIntentId: clientSecret || 'simulated_intent', paymentMethod: 'card', orderId: 'pending' })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Payment failed');
      // After payment, create order
      const orderRes = await fetch(`${API_BASE}/api/orders`, {
        method: 'POST',
        headers: { ...authHeaders() },
        body: JSON.stringify({
          items: (cart.items||[]).map(ci => ({ item: ci.item?._id || ci.item, quantity: ci.quantity })),
          shippingAddress: state?.address || {}
        })
      });
      const orderData = await orderRes.json();
      if (!orderRes.ok) throw new Error(orderData.message || 'Order failed');
      navigate('/account/orders');
    } catch (e) { alert(e.message || 'Payment failed'); }
  };

  useEffect(()=>{ loadCart(); }, []);
  useEffect(()=>{ if (cart.items && cart.items.length) createIntent(); }, [cart.items?.length]);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-5xl mx-auto px-6 md:px-10 py-8 border-x border-gray-800">
        <h1 className="text-3xl font-bold mb-6">Card Payment</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Card Details</h2>
            <div className="space-y-3">
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="Name on card" value={nameOnCard} onChange={e=>setNameOnCard(e.target.value)} />
              <input className="w-full h-10 px-3 rounded bg-[#111] border border-gray-700" placeholder="Card number (demo)" value={cardNumber} onChange={e=>setCardNumber(e.target.value)} />
              <p className="text-sm text-gray-400">Amount: $ {total.toFixed(2)}</p>
            </div>
            <button disabled={loading || !cart.items || cart.items.length===0} className="mt-4 h-10 px-5 rounded bg-white text-black disabled:opacity-50" onClick={payNow}>Pay Now</button>
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
          </div>
        </div>
      </main>
    </div>
  );
}
