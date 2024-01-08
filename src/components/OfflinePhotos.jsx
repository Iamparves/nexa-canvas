import { useLiveQuery } from "dexie-react-hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { photos } from "../utils/db";
import PhotoCard from "./PhotoCard";

const OfflinePhotos = () => {
  const [isLoading, setIsLoading] = useState(true);

  const allPhotos =
    useLiveQuery(async () => {
      setIsLoading(true);
      const _allPhotos = await photos.toArray();
      setIsLoading(false);
      return _allPhotos;
    }) || [];

  const handleDelete = async (e, id) => {
    e.preventDefault();

    const confirm = window.confirm(
      "Are you sure you want to delete this photo?",
    );
    if (!confirm) return;

    const toastId = toast.loading("Deleting photo...");
    await photos.delete(id);
    toast.success("Photo deleted successfully", { id: toastId });
  };

  return (
    <div>
      {!isLoading && allPhotos.length === 0 && (
        <div className="py-10 text-center sm:py-16">
          <h1 className="text-xl text-gray-600">No photos found</h1>
        </div>
      )}
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
