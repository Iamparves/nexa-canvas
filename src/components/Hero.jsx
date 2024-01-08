import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrSearch } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [type, setType] = useState("photos");
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!navigator.onLine) {
      return toast.error(
        "You are offline. Please check your internet connection",
      );
    }

    if (search.trim() === "") return;

    navigate(`/${type}?s=${search}`);
  };

  return (
    <section className="bg-[url(/roofs.jpg)] bg-cover bg-center bg-no-repeat">
      <div className="bg-black/70 py-16 sm:py-20 lg:py-24 xl:py-36">
        <div className="container">
          <div className="mx-auto max-w-[600px]">
            <h1 className="mb-5 text-2xl font-bold leading-8 text-white sm:text-[32px] sm:leading-10 xl:mb-8">
              The best free stock photos, royalty free images & videos shared by
              creators.
            </h1>
            <form
              onSubmit={handleSearch}
              className="grid grid-cols-[auto_1fr_auto]  gap-2 overflow-hidden rounded-md bg-white"
            >
              <select
                className="cursor-pointer bg-gray-100 px-2 outline-none"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="photos">Photos</option>
                <option value="videos">Videos</option>
              </select>
              <input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                className="w-full border-none px-1.5 py-3 outline-none sm:px-3 md:text-lg"
                placeholder={`Search for ${type}`}
              />
              <button
                type="submit"
                className="bg-gray-100 px-3 text-xl text-[#7f7f7f] hover:text-indigo-500 sm:text-2xl"
              >
                <GrSearch />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
