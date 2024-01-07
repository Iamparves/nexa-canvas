import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { photos } from "../utils/db";
import PhotoCard from "./PhotoCard";

const OfflinePhotos = () => {
  const allPhotos = useLiveQuery(async () => await photos.toArray()) || [];

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const toastId = toast.loading("Deleting photo...");
    await photos.delete(id);
    toast.success("Photo deleted successfully", { id: toastId });
  };

  return (
    <div>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 300: 1, 500: 2, 768: 3, 1280: 4 }}
      >
        <Masonry gutter="20px">
          {allPhotos?.map((photo) => (
            <PhotoCard
              onDelete={handleDelete}
              offline={true}
              photo={photo}
              key={photo.id}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default OfflinePhotos;
