export const fileToBlob = async (url, type = "image") => {
  try {
    const options =
      type === "video"
        ? {
            headers: {
              "Access-Control-Allow-Origin": "https://nexa-test.netlify.app/",
            },
          }
        : {};

    const response = await fetch(url, {
      method: "GET",
      ...options,
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
