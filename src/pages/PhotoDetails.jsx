import { useQuery } from "@tanstack/react-query";
import React from "react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { useParams } from "react-router-dom";
import { fetchImages } from "../utils/apiRequest";

const PhotoDetails = () => {
  const { photoId } = useParams();

  const query = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => fetchImages(`&id=${photoId}`),
  });

  const photo = query.data?.[0];

  return (
    <main>
      <section className="py-10 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl">
            {query.isLoading && <div>Loading...</div>}
            {query.isError && <div>Error</div>}
            {!query.isLoading && !query.isError && query.data && (
              <div className="bg-white p-3 shadow-[0_1px_5px_rgba(0,0,0,0.08)] sm:p-5">
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={photo.userImageURL}
                    />
                    <p className="text-sm font-medium text-gray-700">
                      {photo.user}
                    </p>
                  </div>
                  <button className="flex items-center gap-2 rounded-full border-2 border-indigo-500 bg-indigo-500 px-4 py-2 text-sm font-medium uppercase text-white duration-300 hover:bg-white hover:text-indigo-500">
                    <MdOutlineSaveAlt className="text-lg" /> Save
                  </button>
                </div>
                <div className="bg-gray-50">
                  <img
                    className="max-h-[800px] w-full object-contain"
                    src={photo.largeImageURL}
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row">
                  <div className="flex flex-wrap gap-2">
                    {photo.tags.split(",").map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    {photo.views} views &bull; {photo.downloads} downloads
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PhotoDetails;
