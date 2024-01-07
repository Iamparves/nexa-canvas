import React from "react";
import { GrSearch } from "react-icons/gr";
import { VscDebugRestart } from "react-icons/vsc";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("s")?.trim() || "";
  const order = searchParams.get("order") || "latest";

  const handleSearch = (e) => {
    e.preventDefault();

    const search = e.target.search.value.trim();

    setSearchParams((prev) => {
      prev.set("s", search);
      prev.set("page", 1);

      return prev;
    });
  };

  const handleOrder = (e) => {
    const order = e.target.value;

    setSearchParams((prev) => {
      prev.set("order", order);
      prev.set("page", 1);

      return prev;
    });
  };

  const handleResest = () => {
    setSearchParams((prev) => {
      prev.delete("s");
      prev.delete("order");
      prev.delete("page");

      return prev;
    });
  };

  return (
    <div className="flex gap-2 sm:gap-3">
      <form
        onSubmit={handleSearch}
        className="flex border border-gray-100 outline-none"
      >
        <input
          className="w-full px-3 py-2.5 text-sm outline-none sm:text-base"
          type="text"
          name="search"
          placeholder="Search for photos"
          defaultValue={search}
        />
        <button
          type="submit"
          className="bg-gray-50 px-2.5 text-sm duration-300 hover:bg-gray-100 sm:px-3 sm:text-base"
        >
          <GrSearch />
        </button>
      </form>
      <select
        onChange={handleOrder}
        className="cursor-pointer border border-gray-100 px-2 text-sm outline-none sm:text-base"
        value={order}
      >
        <option value="latest">Latest</option>
        <option value="popular">Popular</option>
      </select>
      <button
        onClick={handleResest}
        className="ml-auto flex items-center gap-2 self-center rounded-md bg-gray-100 p-2 text-lg text-[#1d1d1d] duration-300 hover:bg-red-400 hover:text-white"
      >
        <VscDebugRestart />
      </button>
    </div>
  );
};

export default Filters;
