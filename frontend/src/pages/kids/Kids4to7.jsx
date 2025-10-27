import React from "react";
 
 

const Kids4to7 = () => {
  const products = [
    {
      name: "Cozy Knit Sweater",
      price: "$29.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBdLLBKXycu7zrJOGkzOo5ssJj-8m1QPxlTVTaOi679ZI8PHZsbTfNtyFebcWXGfJ3sBOOCJaWp72iMmUshe_YTguCNjzXlB5dwG5aQH5AA_he8LAWTtRPgC4kom8NSt8evEMyAAOSaXl29ITL0UtLK_bE7qwBJ97-wSodgwqsqB6aEeRM4TZZKCmMn3FTVuYS3XMcb8wch22uQr8-H6_CZnTzJhyRto2suLTVXCwS85SCM0E4dJFYE65YFPCfE_ibbrjx9AOdMGn8",
    },
    {
      name: "Playful Print T-Shirt",
      price: "$14.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAS9pVDw5RMJnHVb4pczZLrgLMRa0JFa2zkV3thGusmDa57NFFJpUORAy0FA0iZNp5SV8t_s3GJxu20DuM_2XueA35NhUx6uBUA-1RhZ8C4Xp9cLpe3_upTsnINxW7ut5PvxlBDGVVBpdNBTnv57NN7Ibg3SFZJo5GN5iGgg1RdtIg8W9uZOix-PwWdz7FrfTDWXY9kEjPDkU9w86rCmLb8D4GuORfpdqBvtUHUqRW7ZJEdZUS0jMMaVIaUwHhqAJ952paN_sRhX_U",
    },
    // add all other products similarly...
  ];

  const filters = ["Sort", "Filter", "Size"];

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        

        {/* Main Content */}
        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4">
              <a href="#" className="text-base font-medium text-gray-300">
                Kids
              </a>
              <span className="text-base font-medium text-gray-300">/</span>
              <span className="text-base font-medium text-white">
                4–7 Years
              </span>
            </div>

            <p className="text-[32px] font-bold text-white tracking-light p-4">
              4–7 Years
            </p>

            {/* Age Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-gray-800 px-4 gap-8">
                {[
                  { label: "0–3", href: "/kids/0-3", active: false },
                  { label: "4–7", href: "/kids/4-7", active: true },
                  { label: "8–12", href: "/kids/8-12", active: false },
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

            {/* Filter Buttons */}
            <div className="flex gap-3 p-3 flex-wrap">
              {filters.map((btn) => (
                <button
                  key={btn}
                  className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#111] border border-gray-700 pl-4 pr-2"
                >
                  <p className="text-sm font-medium text-white">{btn}</p>
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {products.map((product, index) => (
                <div key={index} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url("${product.image}")` }}
                  ></div>
                  <div>
                    <p className="text-base font-medium text-white">
                      {product.name}
                    </p>
                    <p className="text-sm font-normal text-gray-300">
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

export default Kids4to7;
