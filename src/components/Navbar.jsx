import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-indigo-500 py-4 text-white sm:py-5">
      <div className="container flex items-center justify-between gap-5">
        <Link to="/" className="shrink-0 text-xl font-bold sm:text-2xl">
          Nexa Canvas
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-gray-200 sm:flex [&>.active]:text-white">
          <NavLink className="duration-300" to="/">
            Home
          </NavLink>
          <NavLink className="duration-300" to="/photos">
            Photos
          </NavLink>
          <NavLink className="duration-300" to="/videos">
            Videos
          </NavLink>
          <NavLink className="duration-300" to="/downloads">
            Downloads
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
