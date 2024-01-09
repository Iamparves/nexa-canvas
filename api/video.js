export default async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const response = await fetch(req.query.url);
    const arrayBuffer = await response.arrayBuffer();
    // const videoUint8Array = new Uint8Array(arrayBuffer);

    res.status(200).send({
      status: "success",
      video: arrayBuffer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      error,
      message: "Internal Server Error",
    });
  }
};
