import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import { exportElementToPdf } from "../../utils/exportPdf";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/orders`, { headers: { ...authHeaders() } });
      const data = await res.json();
      const list = data?.data || data || [];
      setOrders(list);
    } catch (e) {
      console.error('Failed to load orders', e);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ loadOrders(); }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_BASE}/api/orders/${id}`, {
        method: 'PUT',
        headers: { ...authHeaders() },
        body: JSON.stringify({ status })
      });
      if (!res.ok) throw new Error('Update failed');
      await loadOrders();
    } catch (e) {
      alert(e.message || 'Failed to update');
    }
  };

  const printTable = async () => {
    const el = document.getElementById('orders-table');
    if (!el) return;
    await exportElementToPdf(el, { filename: 'orders.pdf' });
  };

  const rows = useMemo(()=>orders.map(o=>({
    id: o._id,
    orderId: o.orderId || o._id,
    customer: o.buyer?.name || '-',
    date: (o.createdAt || o.orderDate || '').substring(0,10),
    status: o.status,
    total: `$${Number(o.totalPrice || 0).toFixed(2)}`,
    address: o.shippingAddress ? `${o.shippingAddress.street||''} ${o.shippingAddress.city||''}`.trim() : '-',
  })), [orders]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-[#111418] text-2xl font-bold">Orders</h1>
              <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={printTable}>Download PDF</button>
            </div>

            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-lg border border-[#dbe0e6]">
                <table id="orders-table" className="w-full text-sm">
                  <thead className="bg-[#f7f8f9]">
                    <tr>
                      <th className="px-4 py-2 text-left">Order ID</th>
                      <th className="px-4 py-2 text-left">Customer</th>
                      <th className="px-4 py-2 text-left">Address</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(row => (
                      <tr key={row.id} className="border-t border-[#dbe0e6]">
                        <td className="px-4 py-2">{row.orderId}</td>
                        <td className="px-4 py-2">{row.customer}</td>
                        <td className="px-4 py-2">{row.address}</td>
                        <td className="px-4 py-2">{row.date}</td>
                        <td className="px-4 py-2">
                          <select
                            className="h-8 px-2 rounded border border-[#dbe0e6]"
                            value={row.status}
                            onChange={(e)=>updateStatus(row.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Shipping</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-4 py-2">{row.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {loading && <p className="text-sm text-[#617589] mt-2">Loading...</p>}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
