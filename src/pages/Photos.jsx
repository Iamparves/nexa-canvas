import { useQuery } from "@tanstack/react-query";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, useSearchParams } from "react-router-dom";
import { fetchImages } from "../utils/apiRequest";

const Photos = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("s") || "";

  const queryString = "&per_page=24&min_width=300&order=latest";
  if (!!search) q.concat(`&q=${search}`);

  const query = useQuery({
    queryKey: ["photos", search],
    queryFn: () => fetchImages(queryString),
  });

  return (
    <main className="py-10">
      <div className="container">
        <div className="mb-5">
          <h2 className="text-3xl font-black text-indigo-500">Photos</h2>
        </div>
        {query.isLoading && <div>Loading...</div>}
        {query.isError && <div>Error</div>}
        {!query.isLoading && !query.isError && query.data && (
          <ResponsiveMasonry
            columnsCountBreakPoints={{ 300: 1, 500: 2, 768: 3 }}
          >
            <Masonry gutter="20px">
              {query.data?.map((row) => (
                <Link
                  to={`/photos/${row.id}`}
                  className="group relative bg-white"
                  key={row.id}
                >
                  <img
                    className="block w-full object-cover"
                    src={row.webformatURL}
                    alt=""
                  />
                  <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end bg-[linear-gradient(#0000_30%,#000000aa)] duration-300 group-hover:visible group-hover:opacity-100 md:invisible md:opacity-0">
                    <div className="flex flex-wrap items-center justify-between gap-x-5 p-3 text-white sm:p-5">
                      <p>
                        <span className="text-gray-200">by</span> {row.user}
                      </p>
                      <p className="text-sm">{row.views} views</p>
                    </div>
                  </div>
                </Link>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </main>
  );
};

export default Photos;
