import { photos, videos } from "./db";
import { photoToBlob, videoToBlob } from "./mediaHandler";

export const addPhoto = async (photoData) => {
  try {
    const { userImageURL, largeImageURL, ...photo } = photoData;
    const userImageBlob = await photoToBlob(userImageURL);
    const largeImageBlob = await photoToBlob(largeImageURL);

    await photos.add({
      ...photo,
      userImageBlob,
      largeImageBlob,
    });

    return {
      status: "success",
      message: "Photo saved to offline storage",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const addVideo = async (videoData) => {
  try {
    const { userImageURL, thumbImageURL, videoURL, ...video } = videoData;
    const userImageBlob = await photoToBlob(userImageURL);
    const thumbImageBlob = await photoToBlob(thumbImageURL);
    const videoBlob = await videoToBlob(videoURL);

    await videos.add({
      ...video,
      userImageBlob,
      thumbImageBlob,
      videoBlob,
    });

    return {
      status: "success",
      message: "Video saved to offline storage",
    };
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
