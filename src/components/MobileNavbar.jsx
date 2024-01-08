import React from "react";
import {
  TbCloudDownload,
  TbPhotoCircle,
  TbSmartHome,
  TbVideo,
} from "react-icons/tb";
import { NavLink } from "react-router-dom";

const items = [
  {
    name: "Home",
    path: "/",
    icon: <TbSmartHome />,
  },
  {
    name: "Photos",
    path: "/photos",
    icon: <TbPhotoCircle />,
  },
  {
    name: "Videos",
    path: "/videos",
    icon: <TbVideo />,
  },
  {
    name: "Downloads",
    path: "/downloads",
    icon: <TbCloudDownload />,
  },
];

const MobileNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 z-[9999] flex h-[65px] w-full flex-col justify-center bg-white px-2 shadow-[0_-2px_2px_rgba(0,0,0,0.05)] sm:hidden">
      <nav className="relative grid grid-cols-4">
        <span className="mobileNavBg absolute left-0 top-0 block h-full w-1/4 rounded-md bg-indigo-100 duration-500"></span>
        {items.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="z-10 flex flex-col items-center gap-0.5 rounded-lg pb-1 pt-1.5 text-gray-500 duration-500 [&.active]:text-indigo-500"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[13px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MobileNavbar;
