// export const imageToBlob = async (url) => {
//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch photo: ${response.statusText}`);
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

// export const videoToBlob = async (url) => {
//   try {
//     const response = await fetch(`${url}&download=1`, {
//       method: "GET",
//       headers: {
//         "Allow-Access-Control-Origin": "*",
//         "Content-Type": "video/mp4",
//       },
//     });

//     console.log(response);

//     if (!response.ok) {
//       throw new Error(`Failed to fetch video: ${response.statusText}`);
//     }

//     const arrayBuffer = await response.arrayBuffer();

//     const contentType =
//       response.headers.get("Content-Type") || "application/octet-stream";

//     const blob = new Blob([arrayBuffer], {
//       type: contentType,
//     });

//     console.log(arrayBuffer, blob);

//     return blob;
//   } catch (error) {
//     console.log(error);
//   }
// };

export const fileToBlob = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
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
