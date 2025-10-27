import React from "react";
 
 

const Kids8to12 = () => {
  const products = [
    {
      name: "Kids' Graphic Tee",
      price: "$15.99",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBuGaiojR72J1Y_PwBax_y1peKCOE00QHonzetR9ixWQFyi3qPUK9TGzrTiW2vYEKJREhShQ6wtgjSOIAX63XPNC9yLu6xARJoEU7B_WTVGy0-t6CQJu78C56VQd7_oRFCU6UkSYe5SH9TxSd3jU5kMIun5wJq3SguJmQjKtfufF6cbffmPNBODO_pe56jlHmeSM35zYyxf2AY-o_a3wX4cO-Wcwpfu5zW4oLEQ-nmfMqyXu4QIiZztSP1yv1VhScxwW26XL2uAJm0",
    },
    {
      name: "Kids' Denim Jacket",
      price: "$39.99",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuALwMvZdRMKNsZjWubaGT6tusdhXUYbFR5oa-Qfwokx7pBJ0XpeWrs2PMzbMjx5SpeTPesPiPa6yGS0OQt2MKOvwUJIqRpa8_XBBENzlh7cg96IFwpclP4QuAEDq2n71BMYpNTBDZDbNrBFPQXk_3tqCz8NfY2RYpAbg2JMD_nUrk-GuJ46dOKiaNANFBAqgTh6Ay4GdamfQiafDzCGd3URITvPQy_GdYuPz08E-0BGWaOtcDy3-U8zZJDnJGpCb0DPcjpxr6aOWl8",
    },
  ];

  const filters = ["Sort by", "Size", "Color", "Price"];

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap gap-2 p-4">
              <a className="text-gray-300 text-base font-medium leading-normal" href="#">
                Kids
              </a>
              <span className="text-gray-300 text-base font-medium leading-normal">/</span>
              <span className="text-white text-base font-medium leading-normal">
                8–12 Years
              </span>
            </div>

            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                8–12 Years
              </p>
            </div>

            {/* Age Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-gray-800 px-4 gap-8">
                {[
                  { label: "0–3", href: "/kids/0-3", active: false },
                  { label: "4–7", href: "/kids/4-7", active: false },
                  { label: "8–12", href: "/kids/8-12", active: true },
                ].map((tab) => (
                  <a
                    key={tab.label}
                    className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                      tab.active
                        ? "border-b-white text-white"
                        : "border-b-transparent text-gray-400"
                    }`}
                    href={tab.href}
                  >
                    <p className="text-sm font-bold tracking-[0.015em]">{tab.label}</p>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex gap-3 p-3 flex-wrap pr-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#111] border border-gray-700 pl-4 pr-2"
                >
                  <p className="text-white text-sm font-medium leading-normal">{filter}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {products.map((product) => (
                <div key={product.name} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${product.img}")` }}
                  ></div>
                  <div>
                    <p className="text-white text-base font-medium leading-normal">
                      {product.name}
                    </p>
                    <p className="text-gray-300 text-sm font-normal leading-normal">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Kids8to12;
