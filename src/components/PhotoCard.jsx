import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo, scrollPosition, offline, onDelete }) => {
  const webFormatImage = offline
    ? URL.createObjectURL(photo.largeImageBlob)
    : null;

  return (
    <Link to={`/photos/${photo.id}`} className="group relative bg-gray-50">
      <LazyLoadImage
        alt=""
        effect="opacity"
        src={photo.webformatURL || webFormatImage}
        placeholderSrc={photo.previewURL || webFormatImage}
        scrollPosition={scrollPosition}
        className="h-full w-full object-cover"
        wrapperClassName="w-full h-full !block opacity-10 [&.lazy-load-image-loaded]:opacity-100 transition-opacity duration-500 ease-in-out"
        style={{
          aspectRatio: !offline
            ? `${photo.webformatWidth}/${photo.webformatHeight}`
            : null,
        }}
      />
      {offline && (
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={(e) => onDelete(e, photo.id)}
            className="flex aspect-square w-8 items-center justify-center rounded-sm bg-black/60 text-2xl text-red-500 duration-300 hover:bg-black/80"
          >
            <MdDeleteForever />
          </button>
        </div>
      )}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end bg-[linear-gradient(#0000_30%,#000000aa)] duration-300 group-hover:visible group-hover:opacity-100 md:invisible md:opacity-0">
        <div className="flex flex-wrap items-center justify-between gap-x-5 p-3 text-white sm:p-5">
          <p>
            <span className="text-gray-200">by</span> {photo.user}
          </p>
          <p className="text-sm">{photo.views} views</p>
        </div>
      </div>
    </Link>
  );
};

export default PhotoCard;
