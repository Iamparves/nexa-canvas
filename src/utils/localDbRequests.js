// import { photos, videos } from "./db";
// import { imageToBlob, videoToBlob } from "./mediaHandler";

// export const addPhoto = async (photoData) => {
//   try {
//     const { userImageURL, largeImageURL, ...photo } = photoData;
//     const userImageBlob = await imageToBlob(userImageURL);
//     const largeImageBlob = await imageToBlob(largeImageURL);

//     await photos.add({
//       ...photo,
//       userImageBlob,
//       largeImageBlob,
//     });

//     return {
//       status: "success",
//       message: "Photo saved to offline storage",
//     };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong");
//   }
// };

// export const addVideo = async (videoData) => {
//   try {
//     const { userImageURL, thumbImageURL, videoURL, ...video } = videoData;
//     const userImageBlob = await imageToBlob(userImageURL);
//     const thumbImageBlob = await imageToBlob(thumbImageURL);
//     const videoBlob = await videoToBlob(videoURL, "video");

//     return null;

//     await videos.add({
//       ...video,
//       userImageBlob,
//       thumbImageBlob,
//       videoBlob,
//     });

//     return {
//       status: "success",
//       message: "Video saved to offline storage",
//     };
//   } catch (error) {
//     console.log(error);
//     throw new Error("Something went wrong");
//   }
// };

import { photos, videos } from "./db";
import { fileToBlob } from "./mediaHandler";

export const addPhoto = async (photoData) => {
  try {
    const { userImageURL, largeImageURL, ...photo } = photoData;
    const userImageBlob = await fileToBlob(userImageURL);
    const largeImageBlob = await fileToBlob(largeImageURL);

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
    console.log(videoData);

    const { userImageURL, thumbImageURL, videoURL, ...video } = videoData;
    const userImageBlob = await fileToBlob(userImageURL);
    const thumbImageBlob = await fileToBlob(thumbImageURL);
    const videoBlob = await fileToBlob(videoURL);

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
