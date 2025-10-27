import React from "react";

const Footer = ({ theme = "dark" }) => {
  const isDark = theme === "dark";
  const wrapper = isDark
    ? "flex justify-center bg-black border-t border-gray-800"
    : "flex justify-center bg-white border-t border-[#dbe0e6]";
  const linkClass = isDark
    ? "text-gray-300 hover:text-white transition text-base"
    : "text-[#617589] hover:text-[#111418] transition text-base";
  const copyrightClass = isDark ? "text-gray-400 text-base" : "text-[#617589] text-base";

  return (
    <footer className={wrapper}>
      <div className="flex max-w-[960px] flex-1 flex-col">
        <div className="flex flex-col gap-6 px-5 py-10 text-center">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a className={linkClass} href="/about">About</a>
            <a className={linkClass} href="/contact">Contact</a>
            <a className={linkClass} href="#">Privacy Policy</a>
            <a className={linkClass} href="#">Terms of Service</a>
          </div>
          <p className={copyrightClass}>©2024 SEHERA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
