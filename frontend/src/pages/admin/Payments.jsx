import React, { useEffect, useMemo, useState } from "react";
import AdminHeader from "./AdminHeader.jsx";
import { exportElementToPdf } from "../../utils/exportPdf";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_BASE = import.meta.env.VITE_API_URL || "";

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const loadPayments = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/payments/all`, { headers: { ...authHeaders() } });
      const data = await res.json();
      setPayments(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load payments', e);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ loadPayments(); }, []);

  const printTable = async () => {
    const el = document.getElementById('payments-table');
    if (!el) return;
    await exportElementToPdf(el, { filename: 'payments.pdf' });
  };

  const rows = useMemo(()=>payments.map(p=>({
    id: p._id,
    paymentId: p.paymentId || p._id,
    user: p.user?.name || '-',
    email: p.user?.email || '-',
    orderId: p.order?.orderId || p.order?._id || '-',
    amount: `$${Number(p.amount || 0).toFixed(2)}`,
    method: p.paymentMethod || '-',
    status: p.status,
    date: (p.createdAt || '').substring(0,10),
  })), [payments]);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-[#111418] text-2xl font-bold">Payments</h1>
              <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={printTable}>Download PDF</button>
            </div>

            {/* Loyalty points placeholder */}
            <div className="px-4">
              <div className="rounded-lg border border-[#dbe0e6] p-3 mb-4">
                <h2 className="text-base font-semibold mb-2">Loyalty Points</h2>
                <p className="text-sm text-[#617589]">Display and update loyalty points here (hook to your API if available).</p>
              </div>
            </div>

            <div className="px-4 py-3">
              <div className="overflow-auto rounded-lg border border-[#dbe0e6]">
                <table id="payments-table" className="w-full text-sm min-w-[800px]">
                  <thead className="bg-[#f7f8f9]">
                    <tr>
                      <th className="px-4 py-2 text-left">Payment ID</th>
                      <th className="px-4 py-2 text-left">User</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Order</th>
                      <th className="px-4 py-2 text-left">Amount</th>
                      <th className="px-4 py-2 text-left">Method</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map(r => (
                      <tr key={r.id} className="border-t border-[#dbe0e6]">
                        <td className="px-4 py-2">{r.paymentId}</td>
                        <td className="px-4 py-2">{r.user}</td>
                        <td className="px-4 py-2">{r.email}</td>
                        <td className="px-4 py-2">{r.orderId}</td>
                        <td className="px-4 py-2">{r.amount}</td>
                        <td className="px-4 py-2">{r.method}</td>
                        <td className="px-4 py-2">{r.status}</td>
                        <td className="px-4 py-2">{r.date}</td>
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
