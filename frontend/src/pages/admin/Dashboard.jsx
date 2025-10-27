import React, { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import AdminHeader from "./AdminHeader.jsx";

export default function Dashboard() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [counts, setCounts] = useState({ mens: 0, womens: 0, kids: 0, orders: 0 });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [mw, ww, kw, ord] = await Promise.all([
        fetch(`${API_BASE}/api/menswear`, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/womenswear`, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/kidswear`, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/orders`, { headers: { ...authHeaders() } }).then(r=>r.json()).catch(()=>({data:[]})),
      ]);
      setCounts({
        mens: mw?.count ?? (mw?.data?.length || 0),
        womens: ww?.count ?? (ww?.data?.length || 0),
        kids: kw?.count ?? (kw?.data?.length || 0),
        orders: ord?.count ?? (ord?.data?.length || 0),
      });
      setOrders(ord?.data || ord || []);
    } finally { setLoading(false); }
  };

  useEffect(()=>{ loadData(); }, []);

  const activeUsers = useMemo(()=>{
    const set = new Set((orders||[]).map(o=>o.buyer?._id || o.buyer));
    if (set.has(undefined)) set.delete(undefined);
    return set.size;
  }, [orders]);

  const recentOrders = useMemo(()=> (orders||[]).slice(0,5), [orders]);

  const stocks = useMemo(()=>[
    { label: 'Menswear', value: counts.mens, color: '#111418' },
    { label: 'Womenswear', value: counts.womens, color: '#3b82f6' },
    { label: 'Kidswear', value: counts.kids, color: '#10b981' },
  ], [counts]);

  const maxStock = Math.max(1, ...stocks.map(s=>s.value));

  const printSection = () => {
    const el = document.getElementById('dashboard-print');
    const w = window.open('', 'PRINT', 'height=700,width=900');
    w.document.write('<html><head><title>Dashboard</title></head><body>');
    w.document.write(el.outerHTML);
    w.document.write('</body></html>');
    w.document.close(); w.focus(); w.print(); w.close();
  };
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />

        {/* Sidebar + Main content wrapper */}
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          {/* Sidebar */}
          <div className="layout-content-container flex flex-col w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-white p-4 border border-[#dbe0e6] rounded-lg">
              <div className="flex flex-col gap-4">
                <h1 className="text-[#111418] text-base font-medium leading-normal">SEHERA Admin</h1>
                <div className="flex flex-col gap-2">
                  {/* Dashboard */}
                  <NavLink to="/admin" end className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-[#f0f2f4]' : ''}`}>
                    <div className="text-[#111418]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
                      </svg>
                    </div>
                    <p className="text-[#111418] text-sm font-medium leading-normal">Dashboard</p>
                  </NavLink>

                  {/* Products */}
                  <NavLink to="/admin/products" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-[#f0f2f4]' : ''}`}>
                    <div className="text-[#111418]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z" />
                      </svg>
                    </div>
                    <p className="text-[#111418] text-sm font-medium leading-normal">Products</p>
                  </NavLink>

                  {/* Orders */}
                  <NavLink to="/admin/orders" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-[#f0f2f4]' : ''}`}>
                    <div className="text-[#111418]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M72,104a8,8,0,0,1,8-8h96a8,8,0,0,1,0,16H80A8,8,0,0,1,72,104Zm8,40h96a8,8,0,0,0,0-16H80a8,8,0,0,0,0,16ZM232,56V208a8,8,0,0,1-11.58,7.15L192,200.94l-28.42,14.21a8,8,0,0,1-7.16,0L128,200.94,99.58,215.15a8,8,0,0,1-7.16,0L64,200.94,35.58,215.15A8,8,0,0,1,24,208V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Zm-16,0H40V195.06l20.42-10.22a8,8,0,0,1,7.16,0L96,199.06l28.42-14.22a8,8,0,0,1,7.16,0L160,199.06l28.42-14.22a8,8,0,0,1,7.16,0L216,195.06Z" />
                      </svg>
                    </div>
                    <p className="text-[#111418] text-sm font-medium leading-normal">Orders</p>
                  </NavLink>

                  {/* Customers */}
                  <NavLink to="/admin/customers" className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg ${isActive ? 'bg-[#f0f2f4]' : ''}`}>
                    <div className="text-[#111418]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z" />
                      </svg>
                    </div>
                    <p className="text-[#111418] text-sm font-medium leading-normal">Customers</p>
                  </NavLink>

                  {/* Settings */}
                  <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                    <div className="text-[#111418]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06A107.74,107.74,0,0,0,40.53,182a8,8,0,0,0,6,3.93l23.72,2.64q1.48,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16,0,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48A107.21,107.21,0,0,0,182,241.47a8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Z" />
                      </svg>
                    </div>
                    <p className="text-[#111418] text-sm font-medium leading-normal">Settings</p>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2 cursor-pointer">
                  <div className="text-[#111418]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
                    </svg>
                  </div>
                  <p className="text-[#111418] text-sm font-medium leading-normal">Logout</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1" id="dashboard-print">
            <div className="flex flex-wrap items-center justify-between gap-3 p-4">
              <p className="text-[#111418] tracking-light text-[32px] font-bold leading-tight min-w-72">Dashboard</p>
              <button className="h-9 px-4 rounded-lg border border-[#dbe0e6]" onClick={printSection}>Print</button>
            </div>

            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Overview</h3>

            <div className="flex flex-wrap gap-4 p-4">
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]"><p className="text-[#111418] text-base font-medium leading-normal">Total Orders</p><p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{counts.orders}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]"><p className="text-[#111418] text-base font-medium leading-normal">Active Users</p><p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{activeUsers}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]"><p className="text-[#111418] text-base font-medium leading-normal">Menswear</p><p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{counts.mens}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]"><p className="text-[#111418] text-base font-medium leading-normal">Womenswear</p><p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{counts.womens}</p></div>
              <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg p-6 border border-[#dbe0e6]"><p className="text-[#111418] text-base font-medium leading-normal">Kidswear</p><p className="text-[#111418] tracking-light text-2xl font-bold leading-tight">{counts.kids}</p></div>
            </div>

            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Stocks</h3>
            <div className="px-4 pb-2">
              <div className="flex flex-col gap-2 w-full max-w-[720px]">
                {stocks.map((s)=> (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-32 text-sm text-[#111418]">{s.label}</div>
                    <div className="h-3 bg-[#f0f2f4] rounded w-full">
                      <div className="h-3 rounded" style={{ width: `${(s.value/maxStock)*100}%`, background:s.color }}></div>
                    </div>
                    <div className="w-10 text-right text-sm">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Recent Activity</h3>
            <div className="px-4 py-3 @container">
              <div className="flex overflow-hidden rounded-lg border border-[#dbe0e6] bg-white">
                <table className="flex-1">
                  <thead>
                    <tr className="bg-white">
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Order ID</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Customer</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Date</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-60 text-sm font-medium leading-normal">Status</th>
                      <th className="px-4 py-3 text-left text-[#111418] w-[400px] text-sm font-medium leading-normal">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(ro => (
                      <tr key={ro._id} className="border-t border-t-[#dbe0e6]">
                        <td className="px-4 py-2 w-[400px] text-[#111418] text-sm font-normal leading-normal">{ro.orderId || ro._id}</td>
                        <td className="px-4 py-2 w/[400px] text-[#617589] text-sm font-normal leading-normal">{ro.buyer?.name || '-'}</td>
                        <td className="px-4 py-2 w/[400px] text-[#617589] text-sm font-normal leading-normal">{(ro.createdAt||'').substring(0,10)}</td>
                        <td className="px-4 py-2 w-60 text-sm font-normal leading-normal">
                          <span className="inline-flex h-8 items-center px-3 rounded bg-[#f0f2f4] text-[#111418]">{ro.status}</span>
                        </td>
                        <td className="px-4 py-2 w/[400px] text-[#617589] text-sm font-normal leading-normal">${Number(ro.totalPrice||0).toFixed(2)}</td>
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
