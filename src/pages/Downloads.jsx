import React, { useState } from "react";
import { TbPhoto, TbVideo } from "react-icons/tb";

const Button = ({ children, active, onClick }) => {
  return (
    <button
      className={`flex items-center gap-2 rounded-full px-3 py-2 font-medium text-[#1d1d1d] hover:bg-gray-100 [&.active]:bg-[#1d1d1d] [&.active]:text-gray-100 ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Downloads = () => {
  const [type, setType] = useState("photos");

  return (
    <main>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="flex items-center justify-center gap-2">
            <Button
              onClick={() => setType("photos")}
              active={type === "photos"}
            >
              <TbPhoto className="text-lg" /> Photos
            </Button>
            <Button
              onClick={() => setType("videos")}
              active={type === "videos"}
            >
              <TbVideo className="text-lg" /> Videos
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Downloads;
