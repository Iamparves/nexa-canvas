import React from "react";
import { Link } from "react-router-dom";

const Offline = () => {
  // if (navigator.onLine) return <Navigate to="/" />;
  return (
    <main>
      <div className="container py-10 md:py-16">
        <div className="mx-auto max-w-lg rounded-lg border border-gray-100 bg-gray-50 p-10 text-center">
          <h1 className="mb-5 text-5xl font-black text-indigo-500">Opps!</h1>
          <p className="mb-4 text-lg text-gray-500">
            Looks like you're currently offline
          </p>
          <Link
            to="/downloads"
            className="inline-block rounded-full border-2 border-indigo-500 bg-indigo-500 px-5 py-3.5 font-medium text-white duration-300 hover:bg-transparent hover:text-indigo-500"
          >
            View downloads
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Offline;
