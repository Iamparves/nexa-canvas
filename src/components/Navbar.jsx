import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-indigo-500 py-4 text-white sm:py-5">
      <div className="container flex items-center justify-between gap-5">
        <Link to="/" className="shrink-0 text-lg font-bold sm:text-2xl">
          Nexa Canvas
        </Link>
        <nav className="dura flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm text-gray-200 sm:text-base [&>.active]:text-white">
          <NavLink className="" to="/">
            Home
          </NavLink>
          <NavLink className="" to="/photos">
            Photos
          </NavLink>
          <NavLink className="" to="/videos">
            Videos
          </NavLink>
          <NavLink className="" to="/downloads">
            Downloads
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
