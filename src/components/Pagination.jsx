import React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";
import { useSearchParams } from "react-router-dom";

const Button = ({ page, icon, disabled, handlePageChange }) => {
  return (
    <button
      className="bg-indigo-500 p-3 text-lg text-white transition-all duration-200 first:rounded-l-md last:rounded-r-md disabled:pointer-events-none disabled:opacity-50 sm:text-[19px] lg:hover:bg-indigo-600"
      disabled={disabled}
      onClick={() => handlePageChange(page)}
    >
      {icon}
    </button>
  );
};

const Pagination = ({ totalPage, isFetching }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPage;

  const handlePageChange = (page) => {
    setSearchParams((prev) => {
      prev.set("page", page);
      return prev;
    });
  };

  return (
    <div className="flex justify-center gap-[1px]">
      <Button
        page={1}
        icon={<FiChevronsLeft />}
        disabled={!hasPrevPage || isFetching}
        handlePageChange={handlePageChange}
      />
      <Button
        page={currentPage - 1}
        icon={<FiChevronLeft />}
        disabled={!hasPrevPage || isFetching}
        handlePageChange={handlePageChange}
      />
      <p className="flex items-center justify-center gap-1 bg-indigo-500 px-3 font-medium text-white sm:min-w-[80px]">
        {currentPage}
        <span className="opacity-80">/</span>
        {totalPage}
      </p>
      <Button
        page={currentPage + 1}
        icon={<FiChevronRight />}
        disabled={!hasNextPage || isFetching}
        handlePageChange={handlePageChange}
      />
      <Button
        page={totalPage}
        icon={<FiChevronsRight />}
        disabled={!hasNextPage || isFetching}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Pagination;
