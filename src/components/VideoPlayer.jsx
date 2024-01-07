import React from "react";

const VideoPlayer = ({ videoUrl, posterUrl }) => {
  return (
    <div className="flex aspect-video justify-center">
      <video className="w-full" controls poster={posterUrl}>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default VideoPlayer;
