import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSearchParams } from "react-router-dom";
import Error from "../components/Error";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import VideoCard from "../components/VideoCard";
import { fetchVideos } from "../utils/apiRequest";

const Videos = ({ scrollPosition }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("s")?.trim() || "";
  const page = searchParams.get("page") || 1;
  const order = searchParams.get("order") || "latest";

  let queryString = `&q=${search}&per_page=24&order=${order}&page=${page}&safesearch=true`;

  const query = useQuery({
    queryKey: ["videos", queryString],
    queryFn: () => fetchVideos(queryString),
    placeholderData: keepPreviousData,
  });

  const videos = query.data?.videos || [];
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
              Videos
            </h2>
            <p className="text-[15px] text-gray-400">
              Showing {skipped + 1} - {skipped + videos.length} of{" "}
              {query.data?.total || 0} results
            </p>
          </div>
          <Filters type="videos" />
        </div>
        <div className="mb-7 sm:mb-10">
          {query.isLoading && (
            <div className="py-16 sm:py-20">
              <Loader />
              <p className="mt-3 text-center text-lg text-gray-400">
                Videos Loading...
              </p>
            </div>
          )}
          {query.isError && <Error />}
          {!query.isLoading && !query.isError && query.data && (
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 300: 1, 500: 2, 768: 3, 1280: 4 }}
            >
              <Masonry gutter="20px">
                {videos.map((video) => (
                  <VideoCard
                    scrollPosition={scrollPosition}
                    video={video}
                    key={video.id}
                  />
                ))}
              </Masonry>
            </ResponsiveMasonry>
          )}
          {!query.isLoading && !query.isError && query.data?.length === 0 && (
            <div className="rounded-md border py-16 text-center text-lg text-gray-500 sm:py-20">
              No videos found
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

export default trackWindowScroll(Videos);
