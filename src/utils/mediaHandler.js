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

export const videoToBlob = async (serverlessFunctionUrl) => {
  try {
    const response = await fetch(serverlessFunctionUrl, {
      headers: {
        "Accept-Encoding": "gzip", // Request gzip-encoded response
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const contentType = response.headers.get("Content-Type") || "video/mp4";

    // Handle gzip-encoded response
    const contentEncoding = response.headers.get("Content-Encoding");
    let arrayBuffer;

    if (contentEncoding === "gzip") {
      const compressedBuffer = await response.arrayBuffer();
      arrayBuffer = await new Promise((resolve, reject) => {
        zlib.gunzip(compressedBuffer, (err, buffer) => {
          if (err) {
            reject(err);
          } else {
            resolve(buffer);
          }
        });
      });
    } else {
      arrayBuffer = await response.arrayBuffer();
    }

    // Convert ArrayBuffer to Blob
    const blob = new Blob([arrayBuffer], { type: contentType });

    return blob;
  } catch (error) {
    console.log(error);
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
