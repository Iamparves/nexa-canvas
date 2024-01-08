import { useMutation, useQuery } from "@tanstack/react-query";
import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import toast from "react-hot-toast";
import { MdDeleteForever, MdOutlineSaveAlt } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { fetchVideos } from "../utils/apiRequest";
import { videos } from "../utils/db";
import { addVideo } from "../utils/localDbRequests";
import Error from "./Error";
import Loader from "./Loader";
import VideoPlayer from "./VideoPlayer";

const VideoDetails = () => {
  const { videoId } = useParams();
  const isOnline = navigator.onLine;
  const existsOffline = useLiveQuery(
    async () => await videos.get({ id: +videoId }),
  );

  const query = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => fetchVideos(`&id=${videoId}`),
    enabled: isOnline,
  });

  const video = (isOnline ? query.data?.videos?.[0] : existsOffline) || {};

  const mutation = useMutation({
    mutationFn: addVideo,
  });

  const handleSave = async () => {
    if (!video) return;

    const thumbnail = `https://i.vimeocdn.com/video/${video.picture_id}_640x360.jpg`;

    const videoData = {
      id: video.id,
      user: video.user,
      views: video.views,
      userImageURL: video.userImageURL,
      user_id: video.user_id,
      thumbImageURL: thumbnail,
      tags: video.tags,
      downloads: video.downloads,
      videoURL: video.videos?.small?.url,
    };

    mutation.mutate(videoData, {
      onSuccess: () => {
        toast.success("Video saved successfully");
      },
      onError: (error) => {
        toast.error("Error saving video");
      },
    });
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting video...");
    await videos.delete(+videoId);
    toast.success("Video deleted successfully", { id: toastId });
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
                  Video Loading...
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
                          ? video.userImageURL
                          : URL.createObjectURL(video.userImageBlob)
                      }
                    />
                    <p className="text-sm font-medium">{video.user}</p>
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
                  <VideoPlayer
                    videoUrl={
                      isOnline
                        ? video?.videos?.small?.url
                        : video?.videoBlob
                          ? URL.createObjectURL(video.videoBlob)
                          : null
                    }
                    posterUrl={
                      isOnline
                        ? `https://i.vimeocdn.com/video/${video.picture_id}_960x540.jpg`
                        : URL.createObjectURL(video.thumbImageBlob)
                    }
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-3 pt-4 sm:flex-row">
                  <div className="flex flex-wrap gap-2">
                    {video.tags?.split(",").map((tag) => (
                      <Link
                        key={tag}
                        to={`/videos?s=${tag.trim().split(" ").join("+")}`}
                        className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-500 duration-300 hover:bg-indigo-500 hover:text-white aria-disabled:pointer-events-none aria-disabled:opacity-70"
                        aria-disabled={!isOnline}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                  <p className="text-sm text-gray-400">
                    {video.views} views &bull; {video.downloads} downloads
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

export default VideoDetails;
