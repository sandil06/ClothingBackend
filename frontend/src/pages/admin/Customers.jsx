import React from "react";
import AdminHeader from "./AdminHeader.jsx";

export default function AdminCustomers() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        <AdminHeader />
        <div className="gap-1 px-6 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[1200px] flex-1">
            <div className="flex items-center justify-between p-4">
              <h1 className="text-[#111418] text-2xl font-bold">Customers</h1>
              <div />
            </div>

            <div className="px-4 py-3">
              <div className="overflow-hidden rounded-lg border border-[#dbe0e6]">
                <table className="w-full text-sm">
                  <thead className="bg-[#f7f8f9]">
                    <tr>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Joined</th>
                      <th className="px-4 py-2 text-left">Orders</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[{name:'Sophia Clark',email:'sophia@example.com',joined:'2023-06-12',orders:5},
                      {name:'Ethan Carter',email:'ethan@example.com',joined:'2023-07-20',orders:3}].map((c)=> (
                      <tr key={c.email} className="border-t border-[#dbe0e6]">
                        <td className="px-4 py-2">{c.name}</td>
                        <td className="px-4 py-2">{c.email}</td>
                        <td className="px-4 py-2">{c.joined}</td>
                        <td className="px-4 py-2">{c.orders}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
