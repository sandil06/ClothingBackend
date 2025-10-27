import React from "react";
 
 

const Kids0to3 = () => {
  const products = [
    {
      name: "Soft Cotton Onesie",
      price: "$12.99",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1zZ5U7f4T1dpn3z0h9nq8qE6yqA2rYbXq1E5e6tVwWJm0d9wXb5oFZJm7QXzFQ0lF7p6WvNQmJr8iH7aV9x3w",
    },
    {
      name: "Baby Knit Hat",
      price: "$8.49",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw5Yqv9d1t8Q3c8fqkUq9rWJm7QXzFQ0lF7p6WvNQmJr8iH7aV9x3w",
    },
    {
      name: "Cozy Footed Pajamas",
      price: "$19.99",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk2Jm9tYq3c8fqkUq9rWJm7QXzFQ0lF7p6WvNQmJr8iH7aV9x3w",
    },
  ];

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <div className="flex flex-wrap gap-2 p-4 text-gray-300">
              <a href="#" className="text-gray-300">Kids</a>
              <span className="text-gray-300">/</span>
              <span className="text-white">0–3 Years</span>
            </div>

            {/* Heading */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <div className="flex min-w-72 flex-col gap-3">
                <p className="text-white text-[32px] font-bold">0–3 Years</p>
                <p className="text-gray-300 text-sm">
                  Soft, comfy essentials designed for newborns and toddlers.
                </p>
              </div>
            </div>

            {/* Age Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-gray-800 px-4 gap-8">
                {[
                  { label: "0–3", href: "/kids/0-3", active: true },
                  { label: "4–7", href: "/kids/4-7", active: false },
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

            {/* Products Grid */}
            <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
              {products.map((product) => (
                <div key={product.name} className="flex flex-col gap-3 pb-3">
                  <div
                    className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                    style={{ backgroundImage: `url(${product.img})` }}
                  />
                  <div>
                    <p className="text-white text-base font-medium">{product.name}</p>
                    <p className="text-gray-300 text-sm">{product.price}</p>
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

export default Kids0to3;
