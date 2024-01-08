import React from "react";
import { Outlet } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="pb-[65px] sm:pb-0">
      <Navbar />
      <Outlet />
      <MobileNavbar />
    </div>
  );
};

export default Layout;
