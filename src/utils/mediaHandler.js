export const imageToBlob = async (url) => {
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

export const videoToBlob = async (url) => {
  try {
    const response = await fetch(`${url}&download=1`, {
      method: "GET",
      mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const blob = new Blob([arrayBuffer], {
      type: contentType,
    });

    console.log(response, arrayBuffer, blob);

    return blob;
  } catch (error) {
    console.log(error);
  }
};
