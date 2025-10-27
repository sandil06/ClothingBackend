import React, { useRef } from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  const carouselRef = useRef(null);

  const products = [
    {
      id: 1,
      title: "Ivory Dream Dress",
      price: "$129",
      image: "/images/ivory-dream-dress.svg",
    },
    {
      id: 2,
      title: "Urban Denim Jacket",
      price: "$89",
      image: "/images/urban-denim-jacket.svg",
    },
    {
      id: 3,
      title: "Playful Sweatshirt",
      price: "$59",
      image: "/images/playful-sweatshirt.svg",
    },
    {
      id: 4,
      title: "Classic Oxford Shirt",
      price: "$79",
      image: "/images/ivory-dream-dress.svg",
    },
    {
      id: 5,
      title: "Cozy Knit Cardigan",
      price: "$99",
      image: "/images/playful-sweatshirt.svg",
    },
  ];

  const scrollByAmount = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };
  return (
    <div className="bg-black text-white font-sans antialiased min-h-screen">
      

      {/* HERO SECTION */}
      <main className="pt-20">
        <section className="relative h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVHg3LWHVCvB3j4In-bEGuWFzZVTZZ-Z9vcOoUxcPpsoEU3SYAak9p-a6BObWpNFY7zI04WTDkKDqkDl79Dy1U6XlWwEPYOU5r_Va7RBbs1UleT3kLRnAUo8t4w7cZdw-ZUn8G2Rhx7C5ReQThnhBHYACdowIJdB9IX3-B1ddtBsFHJpBhHO9AuPDDMIJdeBhO8Mr5MTBDM15CXkC7yBVE_Q6Gxlr2DFaDvVCabwgsR7JTivRxqK4ak_nWipG6xly4q_bY78Tq6Xk"
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative z-10 text-center text-white fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display mb-4">
              SEHERA COLLECTIONS
            </h1>
            <p className="text-lg md:text-xl mb-8 font-light">
              Elegance Redefined. Style Perfected.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/login"
                className="bg-primary text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Shop Now
              </Link>
              <Link
                to="/login"
                className="bg-[#111] border border-gray-700 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-gray-900 hover:text-white transition-all duration-300"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FEATURED PRODUCTS */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-display text-primary dark:text-white">Featured Products</h2>
          <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-2">
            Curated styles, just for you.
          </p>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollByAmount(-1)}
            className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#111] text-white border border-gray-700 hover:bg-gray-900"
          >
            <span className="material-icons">chevron_left</span>
          </button>

          <div
            ref={carouselRef}
            className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
          >
            <div className="flex gap-6 min-w-max">
              {products.map((p) => (
                <article
                  key={p.id}
                  className="snap-center shrink-0 w-72 rounded-xl overflow-hidden shadow-lg bg-[#111] border border-gray-700"
                >
                  <div className="relative h-80">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/720x960?text=SEHERA";
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute left-4 bottom-3 text-white drop-shadow">
                      <h3 className="text-lg font-semibold">{p.title}</h3>
                      {p.price && (
                        <p className="text-sm text-white/90">{p.price}</p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollByAmount(1)}
            className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-[#111] text-white border border-gray-700 hover:bg-gray-900"
          >
            <span className="material-icons">chevron_right</span>
          </button>
        </div>
      </section>

     
   
    </div>
  );
}

export default App;
