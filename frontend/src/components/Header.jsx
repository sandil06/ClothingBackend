import React from "react";
import { Link } from "react-router-dom";

const Header = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const textColor = isDark ? "text-white" : "text-[#111418]";
  const borderColor = isDark ? "border-gray-800" : "border-b-[#f0f2f4]";
  const headerBg = isDark ? "bg-black" : "bg-white";
  const navLink = isDark
    ? "text-gray-300 hover:text-white transition-colors"
    : "text-[#111418] hover:text-black transition-colors";
  const iconBtn = isDark
    ? "bg-black/60 border border-gray-600 text-white hover:bg-black/80"
    : "bg-[#f0f2f4] text-[#111418]";

  // Auth gate: if no token, route all header links to /login
  const isAuthed = typeof window !== 'undefined' && !!localStorage.getItem('token');

  const navItems = [
    { label: "New Arrivals", href: "/" },
    { label: "Featured", href: "/" },
    { label: "Combos", href: "/style-combos" },
    { label: "Men", href: "/mens" },
    { label: "Women", href: "/womens" },
    { label: "Kids", href: "/kids" },
    { label: "Accessories", href: "/womens/accessories" },
  ];

  return (
    <header className={`flex items-center justify-between whitespace-nowrap border-b border-solid px-6 py-2 ${borderColor} ${headerBg}`}>
      {/* Left: Logo (click to go to Customer Home) */}
      <Link to={isAuthed ? "/customer" : "/login"} className={`flex items-center gap-3 ${textColor}`} aria-label="Go to customer home">
        <div className="size-4">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={textColor}>
            <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor" />
          </svg>
        </div>
        <h2 className={`${textColor} text-base font-bold leading-tight tracking-[-0.015em]`}>SEHERA</h2>
      </Link>

      {/* Center: Nav */}
      <nav className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <Link key={item.label} className={`${navLink} text-sm font-medium`} to={isAuthed ? item.href : "/login"}>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Right: Icons */}
      <div className="flex items-center gap-2">
          {[
            {
              icon: (
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
              ),
              label: "Search",
              href: "/search",
            },
            {
              icon: (
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
              ),
              label: "User",
              href: "/account",
            },
            {
              icon: (
                <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0Z" />
              ),
              label: "Cart",
              href: "/cart",
            },
          ].map((btn) => (
            btn.href ? (
              <Link
                key={btn.label}
                to={isAuthed ? btn.href : "/login"}
                className={`flex items-center justify-center rounded-md h-8 w-8 ${iconBtn}`}
                aria-label={btn.label}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className={textColor}>
                  {btn.icon}
                </svg>
              </Link>
            ) : (
              <button
                key={btn.label}
                className={`flex items-center justify-center rounded-md h-8 w-8 ${iconBtn}`}
                aria-label={btn.label}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256" className={textColor}>
                  {btn.icon}
                </svg>
              </button>
            )
          ))}
        </div>
    </header>
  );
};

export default Header;
