import { useMutation, useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import toast from "react-hot-toast";
import { MdOutlineSaveAlt } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { fetchImages } from "../utils/apiRequest";
import { photos } from "../utils/db";
import { addPhoto } from "../utils/localDbRequests";

const PhotoDetails = () => {
  const { photoId } = useParams();
  const existsOffline = useLiveQuery(
    async () => await photos.get({ id: +photoId }),
  );

  const query = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => fetchImages(`&id=${photoId}`),
  });

  const photo = query.data?.[0];

  const mutation = useMutation({
    mutationFn: addPhoto,
  });

  const handleSave = async () => {
    if (!photo) return;

    const photoData = {
      id: photo.id,
      user: photo.user,
      views: photo.views,
      userImageURL: photo.userImageURL,
      user_id: photo.user_id,
      largeImageURL: photo.largeImageURL,
      tags: photo.tags,
      downloads: photo.downloads,
    };

    mutation.mutate(photoData, {
      onSuccess: () => {
        toast.success("Photo saved successfully");
      },
      onError: (error) => {
        toast.error("Error saving photo");
      },
    });
  };

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
                  <div className="flex items-center gap-2 text-gray-700">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={photo.userImageURL}
                    />
                    <p className="text-sm font-medium">{photo.user}</p>
                  </div>
                  <button
                    onClick={handleSave}
                    disabled={
                      existsOffline || query.isLoading || mutation.isPending
                    }
                    className="flex items-center gap-2 rounded-full border-2 border-indigo-500 bg-indigo-500 px-4 py-2 text-sm font-medium uppercase text-white duration-300 hover:bg-white hover:text-indigo-500 disabled:pointer-events-none disabled:opacity-60"
                  >
                    <MdOutlineSaveAlt className="text-lg" />
                    {existsOffline
                      ? "Saved"
                      : mutation.isPending
                        ? "Saving..."
                        : "Save"}
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
                      <Link
                        key={tag}
                        to={`/photos?s=${tag.trim().split(" ").join("+")}`}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-500 duration-300 hover:bg-indigo-500 hover:text-white"
                      >
                        {tag}
                      </Link>
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
