import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminHeader() {
  const { pathname } = useLocation();
  const linkCls = (to) =>
    `hover:text-black ${pathname === to ? 'font-semibold' : 'font-normal'}`;

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-[#dbe0e6] rounded-t-lg">
      <div className="h-1 w-full bg-blue-500 rounded-t-lg" />
      <div className="h-12 flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-3.5 w-3.5 rounded-sm bg-black" aria-hidden="true"></span>
          <span className="text-[#111418] text-sm font-medium leading-normal">SEHERA Admin</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-[#111418]">
          <Link className={linkCls('/admin')} to="/admin">Dashboard</Link>
          <Link className={linkCls('/admin/additems')} to="/admin/additems">Additems</Link>
          <Link className={linkCls('/admin/orders')} to="/admin/orders">View Orders</Link>
          <Link className={linkCls('/admin/payments')} to="/admin/payments">Payments</Link>
        </nav>
        <div className="flex items-center">
          <img
            src="/images/avatar-admin.jpg"
            onError={(e)=>{e.currentTarget.src='https://i.pravatar.cc/32?img=1'}}
            alt="Admin avatar"
            className="h-8 w-8 rounded-full object-cover border border-[#dbe0e6]"
          />
        </div>
      </div>
    </header>
  );
}
