export const fileToBlob = async (url, type = "image") => {
  try {
    const options = type === "video" ? { mode: "no-cors" } : {};

    const response = await fetch(url, {
      method: "GET",
      ...options,
    });
    const arrayBuffer = await response.arrayBuffer();

    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    console.log(response, arrayBuffer, contentType);

    const blob = new Blob([arrayBuffer], {
      type: type === "image" ? contentType : "video/mp4",
    });

    return blob;
  } catch (error) {
    console.log(error);
  }
};
