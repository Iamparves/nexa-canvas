import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { videos } from "../utils/db";
import VideoCard from "./VideoCard";

const OfflineVideos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const allVideos =
    useLiveQuery(async () => {
      setIsLoading(true);
      const _allVideos = await videos.toArray();
      setIsLoading(false);
      return _allVideos;
    }) || [];

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting video...");
    await videos.delete(id);
    toast.success("Video deleted successfully", { id: toastId });
  };

  return (
    <div>
      {!isLoading && allVideos.length === 0 && (
        <div className="py-10 text-center sm:py-16">
          <h1 className="text-xl text-gray-600">No videos found</h1>
        </div>
      )}
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 580: 2, 768: 3, 1280: 4 }}
      >
        <Masonry gutter="20px">
          {allVideos.map((video) => (
            <VideoCard
              onDelete={handleDelete}
              offline={true}
              video={video}
              key={video.id}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default OfflineVideos;
