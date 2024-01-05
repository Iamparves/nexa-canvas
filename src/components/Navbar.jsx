import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-indigo-500 py-4 text-white sm:py-5">
      <div className="container flex items-center justify-between gap-5">
        <Link to="/" className="shrink-0 text-lg font-bold sm:text-2xl">
          Nexa Canvas
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm sm:text-base">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/photos">Photos</NavLink>
          <NavLink to="/videos">Videos</NavLink>
          <NavLink to="/downloads">Downloads</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
