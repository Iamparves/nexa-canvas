export const fileToBLob = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();

    const blob = new Blob([arrayBuffer], {
      type: response.headers.get("Content-Type"),
    });

    return blob;
  } catch (error) {
    console.log(error);
  }
};
