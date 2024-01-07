import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="py-16 text-center sm:py-20">
      <p className="text-lg text-red-400">Something Went Wrong!</p>
      <Link
        className="mt-3 inline-block rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white duration-300 hover:bg-indigo-600 hover:text-white"
        to="/"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Error;
