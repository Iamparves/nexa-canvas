export default async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const response = await fetch(req.query.url + "&download=1");

    console.log("Response from video.js:", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch video: ${response.statusText}`);
    }

    const body = await response.text();

    console.log("Body from video.js:", body);

    res.status(200).end(JSON.stringify(body));
  } catch (error) {
    console.log(error);
    res.status(500).end("Internal Server Error");
  }
};
