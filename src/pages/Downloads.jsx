import React from "react";
import { TbPhoto, TbVideo } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom";

const Button = ({ children, path, active }) => {
  return (
    <Link
      to={path}
      className={`flex items-center gap-2 rounded-full px-3 py-2 font-medium text-[#1d1d1d] hover:bg-gray-100 [&.active]:bg-[#1d1d1d] [&.active]:text-gray-100 ${
        active ? "active" : ""
      }`}
    >
      {children}
    </Link>
  );
};

const Downloads = () => {
  const { pathname } = useLocation();
  const route = pathname.split("/")[2];

  return (
    <main>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <Button path="photos" active={route === "photos"}>
              <TbPhoto className="text-lg" /> Photos
            </Button>
            <Button path="videos" active={route === "videos"}>
              <TbVideo className="text-lg" /> Videos
            </Button>
          </div>
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Downloads;
