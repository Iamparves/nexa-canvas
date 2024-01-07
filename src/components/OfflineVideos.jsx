import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { videos } from "../utils/db";
import VideoCard from "./VideoCard";

const OfflineVideos = () => {
  const allVideos = useLiveQuery(async () => await videos.toArray()) || [];

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const toastId = toast.loading("Deleting video...");
    await videos.delete(id);
    toast.success("Video deleted successfully", { id: toastId });
  };

  return (
    <div>
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
