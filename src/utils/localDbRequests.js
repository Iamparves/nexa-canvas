import { photos, videos } from "./db";
import { fileToBLob } from "./mediaHandler";

export const addPhoto = async (photoData) => {
  try {
    const { userImageURL, largeImageURL, ...photo } = photoData;
    const userImageBlob = await fileToBLob(userImageURL);
    const largeImageBlob = await fileToBLob(largeImageURL);

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
    const { userImageURL, thumbImageURL, ...video } = videoData;
    const userImageBlob = await fileToBLob(userImageURL);
    const thumbImageBlob = await fileToBLob(thumbImageURL);

    await videos.add({
      ...video,
      userImageBlob,
      thumbImageBlob,
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
