import React from "react";

export default function WalletPage() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                Payment Methods / Wallet
              </p>
            </div>

            <div className="px-4 py-3 text-gray-300">
              <p className="text-sm">No payment methods added yet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
