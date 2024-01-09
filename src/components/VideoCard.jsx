import React from "react";
import { MdDeleteForever, MdPlayCircleFilled } from "react-icons/md";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Link } from "react-router-dom";
import { blobToUrl } from "../utils/blobToUrl";

const VideoCard = ({ video, scrollPosition, offline, onDelete }) => {
  const thumbPreview = `https://i.vimeocdn.com/video/${video.picture_id}_100x75.jpg`;

  const thumbnail = offline
    ? blobToUrl(video.thumbImageBlob)
    : `https://i.vimeocdn.com/video/${video.picture_id}_640x360.jpg`;

  return (
    <Link to={`/videos/${video.id}`} className="group relative bg-gray-50">
      <LazyLoadImage
        alt=""
        effect="opacity"
        src={thumbnail}
        placeholderSrc={offline ? thumbnail : thumbPreview}
        scrollPosition={scrollPosition}
        className="h-full w-full object-cover"
        wrapperClassName="w-full aspect-[16/9] !block opacity-10 [&.lazy-load-image-loaded]:opacity-100 transition-opacity duration-500 ease-in-out"
      />
      {offline && (
        <div className="absolute right-2 top-2 z-10">
          <button
            onClick={(e) => onDelete(e, video.id)}
            className="flex aspect-square w-8 items-center justify-center rounded-sm bg-black/60 text-2xl text-red-500 duration-300 hover:bg-black/80"
          >
            <MdDeleteForever />
          </button>
        </div>
      )}
      <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-end bg-[linear-gradient(#0000_30%,#000000aa)] duration-300 group-hover:visible group-hover:opacity-100 md:invisible md:opacity-0">
        <div className="flex flex-wrap items-center justify-between gap-x-5 p-3 text-white sm:p-5">
          <p>
            <span className="text-gray-200">by</span> {video.user}
          </p>
          <p className="text-sm">{video.views} views</p>
        </div>
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white group-hover:text-indigo-400">
        <MdPlayCircleFilled className="rounded-full bg-black/20 text-5xl" />
      </div>
    </Link>
  );
};

export default VideoCard;
