import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Outlet } from "react-router-dom";

export default function Layout({ children, theme = "light" }) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header theme={theme} />
      <main className="flex-1">
        {children ? children : <Outlet />}
      </main>
      <Footer theme={theme} />
    </div>
  );
}
