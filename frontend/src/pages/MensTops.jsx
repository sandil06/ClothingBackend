// src/pages/MensTops.jsx
import React from "react";
 
import Navbar from "../components/Navbar";  
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";    

const MensTops = () => {
  const tops = [
    { name: "Classic Crewneck Tee", price: 25, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgIghNhr8KGWU8OqahcfSyO_HuYaq10-FrIQ_hn45tJREBXQjZhG8onQJgSY7ZGQ1bO7-GfPQGuW0B3OVks43cd4rHIETYxHwZRD1J9pB-I2MTXmOOTbPN7Ee-QQJRVHnL9k0K3n16sllIlx4o9aqbIc7FV4uWfvlcCSefP-V40MO6A5N-3IFe-tylQELCBGEmL5BdtNsHORhk8seQiuEYZ2qcOBr559qrfmFKmX57Xqtk0ODVBpXFTL714uifw47K3piwa51s308" },
    { name: "Performance Polo", price: 45, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADtw-LNKIC76dO5eXqHLOicgDkAqAYZ1j0s3O_8F3YpQZGUsb6Urse_C1BMk92aV5cybj-JgpCmil9LwyY2fx_VXfrSoImwI8XvxveFZYeIX-as8A_mWssCWvXwf-sYVOlFeSCqdfWjqcF9hAT-pgOkDZT32rFvErjnblIRiGqc7xSAELhdG1zRUN9b_Sgcr1NjynwCy0waU_43VS1ng5MqkbtgL0_XhPhmEDHcT_enqJfnODaFPFTze6I68p7aIccdi4zHgxWqRE" },
    { name: "Long Sleeve Henley", price: 35, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB1cx6GZ25e3i3ul7NWeaUDuq2yhHB-vmSuXi5FP-JvYe-nh4kUhwAW4sEuCUcUcImUYewX8LTBSz1SRZTTBOFwo8JtLjY191Il6s7cYb92wQDHdrCB2f-qGbZ5YuCKXxB0IfdQfDkF8vO9wmO_vrdD35-sK19HCrB3-c872PNS71ixdJu8xUyloxkA9IW_EKvt2OdyoxDKv_bCvQF3fJu4sru-Hc8lIKtdBpJTqMKWoz2s7UxfAILP8r9qT7Rt8mCoGyAlj4hdNr0" },
    { name: "Graphic Print Tee", price: 30, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCeLZPQjLkeKTMGueV2D0cdG7XTRofTS0WO2zjAJXS-4xrYIwgCNoWesBNPMpUo3P7aCLeiu23IT-G-8-u1naIkJrDCY9PjCTzL7bYb6Y8MchM4iwnA12K_ICbGjEmIddok1bJ5IxpdnCrDcLxgG7dTYkaY1p3K_P6jPNS0w2y5fMkWxUzrlHhQfYmPBMdEw5Y34Ov3jzLBn4chty2AKHtCbLzVog1uvDu0vpkQdgQPqEQ_IAajOUg7MtZ_XVNt7esFi7dN2uPRb1Y" },
    { name: "Slim Fit Oxford Shirt", price: 55, img: "https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=800&auto=format&fit=crop" },
    { name: "Relaxed Fit Tank Top", price: 20, img: "https://images.unsplash.com/photo-1520975430658-a4f5d1b0b5c7?q=80&w=800&auto=format&fit=crop" },
    { name: "Striped Rugby Shirt", price: 60, img: "https://images.unsplash.com/photo-1503342394121-4803e3b0396e?q=80&w=800&auto=format&fit=crop" },
    { name: "Button-Down Linen Shirt", price: 50, img: "https://images.unsplash.com/photo-1520973765439-5b5a1b1e54eb?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-[Manrope,_'Noto_Sans',_sans-serif]">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-800 px-10 py-3">
        <div className="flex items-center gap-4 text-white">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold">SEHERA</h2>
        </div>
        <div className="flex flex-1 justify-end gap-8">
          <nav className="flex items-center gap-9 text-sm font-medium">
            <a href="#" className="text-gray-300 hover:text-white">New Arrivals</a>
            <a href="#" className="text-gray-300 hover:text-white">Featured</a>
            <a href="#" className="font-bold text-white">
              Men
            </a>
            <a href="#" className="text-gray-300 hover:text-white">Women</a>
            <a href="#" className="text-gray-300 hover:text-white">Accessories</a>
          </nav>
          <div className="flex gap-2">
            <button className="h-10 px-4 bg-[#111] border border-gray-700 rounded-lg font-bold text-sm text-white hover:bg-[#141414]">
              Sign in
            </button>
            <button className="h-10 px-2.5 bg-[#111] border border-gray-700 rounded-lg text-white">
              🔍
            </button>
            <button className="h-10 px-2.5 bg-[#111] border border-gray-700 rounded-lg text-white">
              🛍️
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex flex-col items-center px-0 py-6">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-10 border-x border-gray-800">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-400 mb-2">
            <a href="/mens" className="hover:underline">Men</a> <span className="mx-1">/</span> <span className="text-white">Tops</span>
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Tops</h1>

          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-6">
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Sort</button>
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Size</button>
            <button className="px-3 py-1.5 rounded-md border border-gray-700 text-sm text-white bg-[#111] hover:bg-[#141414]">Color</button>
          </div>

          <div
            className="flex flex-wrap gap-6"
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}
          >
            {tops.map((item, i) => (
              <div
                key={i}
                className="flex flex-col gap-2"
                style={{ width: '200px' }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{
                    width: '200px',
                    height: '256px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    backgroundColor: '#111'
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/400x512?text=Top';
                  }}
                />
                <p className="text-base font-medium text-white">{item.name}</p>
                {item.price !== undefined && (
                  <p className="text-sm text-gray-300">${item.price}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default MensTops;
