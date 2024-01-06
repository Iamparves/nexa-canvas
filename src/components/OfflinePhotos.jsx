import { useLiveQuery } from "dexie-react-hooks";
import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { photos } from "../utils/db";
import PhotoCard from "./PhotoCard";

const OfflinePhotos = () => {
  const allPhotos = useLiveQuery(async () => await photos.toArray()) || [];

  return (
    <div>
      <ResponsiveMasonry columnsCountBreakPoints={{ 300: 1, 500: 2, 768: 3 }}>
        <Masonry gutter="20px">
          {allPhotos?.map((photo) => (
            <PhotoCard offline={true} photo={photo} key={photo.id} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
};

export default OfflinePhotos;
