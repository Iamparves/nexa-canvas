export const photoToBlob = async (url) => {
  try {
    const response = await fetch(url);

    const arrayBuffer = await response.arrayBuffer();

    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const blob = new Blob([arrayBuffer], {
      type: contentType,
    });

    return blob;
  } catch (error) {
    console.log(error);
  }
};

// mediaHandler.js
export const videoToBlob = async (serverlessUrl) => {
  try {
    const response = await fetch(serverlessUrl);
    const { status, message, video } = await response.json();

    console.log(message, video);

    if (status !== "success" || !video) {
      throw new Error("Failed to fetch video");
    }

    const videoBlob = new Blob([new Uint8Array(video)], { type: "video/mp4" });

    console.log(videoBlob);

    return videoBlob;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch video");
  }
};

// export const videoToBlob = async (url) => {
//   try {
//     const response = await fetch(url + "&download=1");

//     if (!response.ok) {
//       throw new Error(`Failed to fetch video: ${response.statusText}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();

//     const contentType =
//       response.headers.get("Content-Type") || "application/octet-stream";

//     const blob = new Blob([arrayBuffer], {
//       type: contentType,
//     });

//     return blob;
//   } catch (error) {
//     console.log(error);
//   }
// };
