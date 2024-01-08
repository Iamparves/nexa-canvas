import fetch from "node-fetch";

const handler = async (event, context) => {
  const url = "https://cdn.pixabay.com" + event.path;

  try {
    const response = await fetch(url);

    return {
      statusCode: response.status,
      body: JSON.stringify(await response.text()),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://nexa-test.netlify.app",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

export default handler;
