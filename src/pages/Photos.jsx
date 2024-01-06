import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useSearchParams } from "react-router-dom";
import PhotoCard from "../components/PhotoCard";
import { fetchImages } from "../utils/apiRequest";

const Photos = () => {
  const [order, setOrder] = useState("latest");
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("s")?.trim() || "";

  let queryString = `&per_page=24&order=${order}&safesearch=true`;
  if (search) queryString += `&q=${search}`;

  const query = useQuery({
    queryKey: ["photos", search, order],
    queryFn: () => fetchImages(queryString),
  });

  return (
    <main className="py-10 md:py-16">
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
              {query.data?.map((photo) => (
                <PhotoCard photo={photo} key={photo.id} />
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
    </main>
  );
};

export default Photos;
