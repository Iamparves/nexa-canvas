export const photoToBlob = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch image");

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

// Tried to slay the CORS dragon 🐉, but it's the ultimate maze runner! 🤷‍♂️💻 #EpicFail
export const videoToBlob = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error("Failed to fetch video");

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
