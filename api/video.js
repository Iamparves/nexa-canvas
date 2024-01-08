import { Readable } from "stream";

export default async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const response = await fetch(req.query.url + "&download=1");

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    const contentType =
      response.headers.get("Content-Type") || "application/octet-stream";

    const blob = new Blob([arrayBuffer], {
      type: contentType,
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);

    res.status(200);
    res.setHeader("Content-Type", contentType);
    readable.pipe(res);
  } catch (error) {
    console.log(error);
    res.status(500).end("Internal Server Error");
  }
};
