import { useMutation, useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import toast from "react-hot-toast";
import { MdDeleteForever, MdOutlineSaveAlt } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchImages } from "../utils/apiRequest";
import { blobToUrl } from "../utils/blobToUrl";
import { photos } from "../utils/db";
import { addPhoto } from "../utils/localDbRequests";
import Error from "./Error";
import Loader from "./Loader";

const PhotoDetails = () => {
  const { photoId } = useParams();
  const isOnline = navigator.onLine;
  const navigate = useNavigate();

  const existsOffline = useLiveQuery(
    async () => await photos.get({ id: +photoId }),
  );

  const query = useQuery({
    queryKey: ["photo", photoId],
    queryFn: () => fetchImages(`&id=${photoId}`),
    enabled: isOnline,
  });

  const photo = (isOnline ? query.data?.photos?.[0] : existsOffline) || {};

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

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting photo...");
    await photos.delete(+photoId);
    toast.success("Photo deleted successfully", { id: toastId });

    if (!isOnline) {
      return navigate("/downloads/photos");
    }
  };

  return (
    <main>
      <section className="pb-10 pt-8 md:py-16">
        <div className="container">
          <div className="mx-auto max-w-5xl bg-white p-3 shadow-[0_1px_5px_rgba(0,0,0,0.08)] sm:p-5">
            {query.isLoading && (
              <div className="py-16 sm:py-20">
                <Loader />
                <p className="mt-3 text-center text-lg text-gray-400">
                  Photo Loading...
                </p>
              </div>
            )}
            {query.isError && <Error />}
            {((!isOnline && !!existsOffline) ||
              (!query.isLoading && !query.isError && !!query.data)) && (
              <div>
                <div className="flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2 text-gray-700">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        isOnline
                          ? photo.userImageURL
                          : blobToUrl(photo.userImageBlob)
                      }
                    />
                    <p className="text-sm font-medium">{photo.user}</p>
                  </div>
                  <button
                    onClick={existsOffline ? handleDelete : handleSave}
                    disabled={query.isLoading || mutation.isPending}
                    className={`flex items-center gap-1.5 rounded-full border-2 border-indigo-500 bg-indigo-500 px-3 py-2 text-sm font-medium uppercase text-white duration-300 hover:bg-white hover:text-indigo-500 disabled:pointer-events-none disabled:opacity-60 [&.offline]:border-red-500 [&.offline]:bg-red-500 [&.offline]:hover:bg-white [&.offline]:hover:text-red-500 ${
                      existsOffline ? "offline" : ""
                    }`}
                  >
                    {existsOffline && (
                      <>
                        <MdDeleteForever className="text-lg" />
                        Delete
                      </>
                    )}
                    {!existsOffline && (
                      <>
                        <MdOutlineSaveAlt className="text-lg" />
                        {mutation.isPending ? "Saving..." : "Save"}
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-gray-50">
                  <LazyLoadImage
                    alt=""
                    effect="blur"
                    src={
                      isOnline
                        ? photo.largeImageURL
                        : blobToUrl(photo.largeImageBlob)
                    }
                    placeholderSrc={
                      isOnline
                        ? photo.previewURL
                        : blobToUrl(photo.largeImageBlob)
                    }
                    className="max-h-[800px] w-full object-contain"
                    wrapperClassName="mx-auto !blur-0 !block opacity-0 [&.lazy-load-image-loaded]:opacity-100 transition-opacity duration-300 ease-in-out"
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row">
                  <div className="flex flex-wrap gap-2">
                    {photo.tags?.split(",").map((tag) => (
                      <Link
                        key={tag}
                        to={`/photos?s=${tag.trim().split(" ").join("+")}`}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-500 duration-300 hover:bg-indigo-500 hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-70"
                        aria-disabled={!isOnline}
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
