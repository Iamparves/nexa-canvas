import React from "react";
import { GrSearch } from "react-icons/gr";
import { useSearchParams } from "react-router-dom";

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

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

  return (
    <div className="flex gap-3">
      <form
        onSubmit={handleSearch}
        className="flex border border-gray-100 outline-none"
      >
        <input
          className="px-3 py-2.5 text-base outline-none"
          type="text"
          name="search"
          placeholder="Search for photos"
        />
        <button
          type="submit"
          className="bg-gray-50 px-3 duration-300 hover:bg-indigo-500 hover:text-white"
        >
          <GrSearch />
        </button>
      </form>
      <select
        onChange={handleOrder}
        className="cursor-pointer border border-gray-100 px-2 outline-none"
      >
        <option value="latest">Latest</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
};

export default Filters;
