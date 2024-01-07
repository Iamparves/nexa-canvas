import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSearchParams } from "react-router-dom";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import PhotoCard from "../components/PhotoCard";
import { fetchImages } from "../utils/apiRequest";

const Photos = ({ scrollPosition }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("s")?.trim() || "";
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "latest";

  let queryString = `&q=${search}&per_page=24&order=${order}&page=${page}&safesearch=true`;

  const query = useQuery({
    queryKey: ["photos", queryString],
    queryFn: () => fetchImages(queryString),
    placeholderData: keepPreviousData,
  });

  const photos = query.data?.photos || [];
  const skipped = (page - 1) * 24;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [queryString]);

  return (
    <main className="py-10 md:py-16">
      <div className="container">
        <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <div className="flex items-center justify-between md:flex-col md:items-start">
            <h2 className="text-2xl font-black text-indigo-500 sm:text-3xl">
              Photos
            </h2>
            <p className="text-[15px] text-gray-400">
              Showing {skipped + 1} - {skipped + photos.length} of{" "}
              {query.data?.total || 0} results
            </p>
          </div>
          <Filters />
        </div>
        <div className="mb-7 sm:mb-10">
          {query.isLoading && <div>Loading...</div>}
          {query.isError && <div>Error</div>}
          {!query.isLoading && !query.isError && query.data && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 1, 500: 2, 768: 3, 1280: 4 }}
            >
              <Masonry gutter="20px">
                {photos.map((photo) => (
                  <PhotoCard
                    scrollPosition={scrollPosition}
                    photo={photo}
                    key={photo.id}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {!query.isLoading && !query.isError && query.data?.length === 0 && (
            <div className="rounded-md border py-20 text-center text-lg text-gray-500">
              No photos found
            </div>
          )}
        </div>
        <Pagination
          totalPage={query.data?.totalPages || 1}
          isFetching={query.isFetching}
        />
      </div>
    </main>
  );
};

export default trackWindowScroll(Photos);
