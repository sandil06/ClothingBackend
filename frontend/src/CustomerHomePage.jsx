import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

const CustomerHomePage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
     

      {/* Hero Section */}
      <div className="px-40 flex flex-1 justify-center py-5 bg-black">
        <div className="flex flex-col max-w-[960px] flex-1">
          <div className="p-4 bg-black">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center rounded-lg items-center justify-center p-4"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0,0,0,0.15),rgba(0,0,0,0.5)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBaEUvLAhJHRJHy7rt-r-jVvc_NdJQ91seInz0q_Imn-JS3PLpBKbiQt9hBDedUZBovoNH5YDPBqMllgRYnbLTZV98fkEX6PgBEdloNdrDBJh33GAhktZ0_7fHZz_-eteJtvVfajB8nbXWPCR-opx82HMyMF8gtVcYDXDAhVoWRRJUrtOsM45SyeYQx6wFGLDDeY597Q_1lwaSjanbiuTihpFfDJB5nsevEfZIIAIcBaGhBebyg6YXVwVW-GrHWcDgPIWNcou4ti8')",
              }}
            >
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-white text-4xl font-black leading-tight">
                  Elevate Your Style
                </h1>
                <h2 className="text-white text-sm font-normal">
                  Discover the latest trends and timeless classics in fashion.
                  Shop now and redefine your wardrobe with our curated
                  collection.
                </h2>
              </div>
              <button className="bg-black text-white rounded-lg h-12 px-5 font-bold hover:bg-gray-900 transition">
                Shop Now
              </button>
            </div>
          </div>

          {/* Featured Section */}
          <h2 className="text-[22px] font-bold px-4 pb-3 pt-5 text-white">
            Featured Products
          </h2>
          <div className="flex overflow-x-auto p-4 gap-3 bg-black">
            {[
              {
                title: "Elegant Evening Dress",
                subtitle: "Perfect for special occasions",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBacZ7g-A-oOFW0fk0OOwrmwyo6XicDAEbuyKMH-ycEgeGDUFyzqGSVOdgv00lbHdgeWJf5PnLAUfBYmuFnMRrj-z78CR3Q96rwIbDbuQ4uY_lLcV_2v2RlWcovX2LrYBPDZ5BYCFGhjVK0rgppZrZDlmV5Cm0kOhhlqUsQAYD9oIyhMC7ViOtxV6Tv7fmsKeo1En-ex7r83s66Mbgv_j36lRZmS4Fq4vFdVbw0r2h9fd8JPonpBv_lvbrNpoWFf4iRbmNA-JzaG-g",
              },
              {
                title: "Casual Summer Outfit",
                subtitle: "Stay cool and comfortable",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCe1F10nfWWx4bSrJ3nV6J4snmamoiHAu0iiI5fVageK20BCkDfoLHprZJT7l09iy1OUdDgBZxtcpBQkQXE4ANE1W0qkdgO9rtWjkSwwxbQTm2zCP5tPTz-JJ1sBdhWeQgmKhLtfuqp3oZ2IC36OQlxPbtPoovuUurg4VpamfRqANkmsIbPTwRsreh6TS_zrpb8zU1cVBtoBo55s_yLI62aeUb8c6cAyeP747t3SQJTtBmWNoYbYRx6DYZOcDGF0fymv-D4fV-kpM",
              },
              {
                title: "Classic Business Attire",
                subtitle: "Look sharp and professional",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQJIMrFO-M8CllBVqbJXXKkr7PcnnSI8IHtUyP_rJicPXSvSgbu1qMQbZWB5r6Kz79jTeV7YaeN3V6oHSwaPWrMbK7-NMLBUiiRLKSN_6HuhV_yP5i8bKgfzIkPPeakLCy-Oc_lYK-Z2wTJY5669H7IslBMlejE9XRBxCsfPS3RhmO97bpfAZl8Hf6tacN295laeZubVqDfhaGTvqnsHD03F2NRnodoV2ntQsljyBnNy6KTXw5c_OtgJT6qSj8lL70MFDN9b7RuXQ",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 rounded-lg min-w-60"
              >
                <div
                  className="w-full bg-center bg-cover aspect-[3/4] rounded-lg"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <div>
                  <p className="text-base font-medium text-white">{item.title}</p>
                  <p className="text-sm text-gray-300">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Shop by Category */}
          <h2 className="text-[22px] font-bold px-4 pb-3 pt-5 text-white">
            Shop by Category
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4 bg-black">
            {[
              { title: "Men", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDPYE0KH1iBcVp_uGGrGZU2O7w_-Wi-HhJ0UC8ZmZHEft2Q52hvt5t2vjjkpzOtNp0TkXrT1_D9kjmV_10-qU_UsfXYVkrrjvaNLssU6E8gJV-Z8KPsxLAwReFPYw7xb2zDWd8OkXASEUG1ghYnrR_NshSDEq7JFsqmsfgGBIkJkbPyZWdEQzxejIxkdBTz3F1mWDHlK-hh47FnAVPlUuT6qonNj0k9TCVkqIrXp5j3b-J3yQY7LKfOfrk-IAWym_fGQBaHaDUsC54" },
              { title: "Women", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvLInDzk19QzsVW6Z-8wjjc1om8oY3aX-pTlXJaTt-esS7pIctK7MsjEoykb9a6Je5SfvSZcU20Zx4cGt5CvGZBUrE-dhh5XJ7tF1Izf4YyLOLtzL-TXPunWcP7leAc7dmWcPAJhB0aDMwlrilSQUa66XQITfj5wlLaOh-Mc4c7g1DWxUXlU-LvxbrqK_xGTJP-qkOJmr8_I6C2vXkcjLVS1bIDeQNcyWwr10ZjMyRJOmwB1pASTjwjSnq6wKjz4zdzB_lnJ1SoEQ" },
              { title: "Kids", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMrONr6OZnOy-OgZTZPLHoOeEPCHb8Aa9iMlSbUdCMqxW2w9XQkJJuJdhQ6_6gmqS8GN-3UZOINE2b3yhcAvC20ae5_rnMv-lPYQZ1g-5d0yHODPMJ3ZicpN-HKA_JGOZ1Uf19TorFswzzs3jvAF3higVqcKXLu0lbISiPmtfnsIIskc0Aa1CjTV1bUiSZ_PiAY3oju9b4dJSnAcqfshZvnjXGUl6zqbj-Ly8PwZO8bIqEDsE8aA6rhKgsSMKE52TpuRz2seMAkZQ" },
              { title: "Combos", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA61_1UfdhfjIw3pBrgjdgd4W6ne2jk40VepJharnOjNutO1xDkdVVju4-aGqOSDv2wUuraRMtECwG01W-xJtdeleTk5ZrvM8n4DAlvBgTrg_6ng33R0TNlvow1U-utHylVE3UQGp8XNvgeq-lqLmCUxfD9yqPHmdpr8fB_8he8rQv5BJPv4-zjerr6G1_vScrQzCvT7sSomRhu1nKlylpvtD7nsvzS1SkvWT2Z8nHjqM2NWDRe4f4xhIQo8hFKfJPXNSPtvkcrhVo" },
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 pb-3 cursor-pointer hover:scale-105 transition"
                onClick={() => {
                  if (item.title === 'Men') navigate('/mens');
                }}
                role="button"
                aria-label={`Open ${item.title}`}
              >
                <div
                  className="w-full bg-center bg-cover aspect-square rounded-lg"
                  style={{ backgroundImage: `url(${item.img})` }}
                ></div>
                <p className="text-base font-medium text-center text-white">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    
    </div>
  );
};

export default CustomerHomePage;
