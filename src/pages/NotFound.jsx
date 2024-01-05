import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="py-10 md:py-16 xl:py-20">
      <div className="container">
        <div className="mx-auto max-w-md rounded-lg border pb-7 pt-3  text-center">
          <h1 className="mb-1 text-7xl font-black text-indigo-500 sm:text-9xl">
            404
          </h1>
          <p className="mb-4 text-xl text-indigo-400 sm:mb-5 sm:text-3xl">
            Page not found
          </p>
          <Link
            className="inline-block rounded-full border-2 border-indigo-500 bg-indigo-500 px-5 py-2 text-white duration-300 hover:bg-white hover:text-indigo-500 sm:px-7 sm:py-3 sm:text-lg"
            to="/"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
