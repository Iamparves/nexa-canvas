import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";

const PhotoCard = ({ photo, scrollPosition }) => {
  return (
    <Link
      to={`/photos/${photo.id}`}
      className="group relative bg-white"
      key={photo.id}
    >
      <LazyLoadImage
        alt=""
        effect="blur"
        src={photo.webformatURL}
        placeholderSrc={photo.previewURL}
        scrollPosition={scrollPosition}
        className="h-full w-full object-cover"
        wrapperClassName="w-full h-full"
      />
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
