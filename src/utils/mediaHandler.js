export const fileToBlob = async (url) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
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
