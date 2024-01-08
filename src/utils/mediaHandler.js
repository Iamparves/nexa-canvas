export const photoToBlob = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch photo: ${response.statusText}`);
    }

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

    console.log("Response from videoToBlob:", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch video data: ${response.statusText}`);
    }

    const videoData = await response.text();

    const videoBlob = new Blob([videoData], { type: "video/mp4" });
    console.log("videoBlob:", videoBlob);

    return videoBlob;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to convert video to blob");
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
