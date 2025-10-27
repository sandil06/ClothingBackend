import React from "react";
 
 

const products = [
  {
    id: 1,
    name: "Kids' Running Shoes",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAn_dkRPJa3SZcyQ1aHlqWF9m9j7--w_h5s3hZdfgMlVpc2fyh8Fs246Ml_HQGkHbJ0ij22f8mUHTwo9srmSEvo-4kUoDku5-bCoVaK7yrDcZapS1DuKSM0ns1Z1kZefpjs5lCF17cphRx0v4mDK-Dk9bBcWpXJJ9rRPbXrjPjDiOHNWOIbeu6Q6kzfLM2ARfYRxV3btsP9dHs4vsp_HN7BkJn6jW5NP-kp59-Wn07TfWSCH6PGnBexMDwfTbc_mc4CH48Kpkg8MO0",
  },
  {
    id: 2,
    name: "Kids' Sandals",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBDcpYNBxiyY9Qv2OZhbsR7_r-0rHQ-Km2tBTnbzMbs6qDpU0IL2aycwP1BtMDWPiLg8QAOVI5YzYS7CQndZmfszfu5CKwiNRkQzbChBeVst2u_cygqig9mfFp7IrCK8YGRW3kshRvswBPS3zqZn3LsTBheQWw8kwxDfDxfJXsVJecIcW8MTIufF4q1v6FTXGuWIxs9rhbg71uffi0YV_hiSxZZRosUythRvDI-ok30WB7QLXQMWB6gdjeDpzeQsZ42WvZ1MA1yKQA",
  },
  // Add the rest of the products...
];

const KidsFootwear = () => {
  const filters = ["Sort", "Size", "Color"];
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-black text-white" style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}>
      <div className="layout-container flex h-full grow flex-col">
        

        <main className="px-4 md:px-10 lg:px-40 py-5 flex-1">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-300 mb-2">
            <a href="#" className="hover:underline">Kids</a> <span className="mx-1">/</span> <span className="text-white">Footwear</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Kids' Footwear</h1>

          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            {filters.map((f) => (
              <button key={f} className="px-3 py-1.5 rounded-md border border-gray-700 bg-[#111] text-sm text-white">
                {f}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3">
            {products.map((p) => (
              <div key={p.id} className="flex flex-col gap-3 pb-3">
                <div
                  className="w-full bg-center bg-no-repeat aspect-[3/4] bg-cover rounded-lg"
                  style={{ backgroundImage: `url(${p.image})` }}
                />
                <p className="text-white text-base font-medium leading-normal">{p.name}</p>
              </div>
            ))}
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default KidsFootwear;
