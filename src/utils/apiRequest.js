const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

const photoBaseUrl = `https://pixabay.com/api/?key=${API_KEY}`;
const videoBaseUrl = `https://pixabay.com/api/videos/?key=${API_KEY}`;

export const fetchImages = async (query) => {
  try {
    const res = await fetch(`${photoBaseUrl}${query}`, {
      cache: "no-cache",
    });
    const data = await res.json();

    const photos = data?.hits;
    const total = data?.totalHits;
    const totalPages = Math.ceil(total / 24);

    return {
      photos,
      total,
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

export const fetchVideos = async (query) => {
  try {
    const res = await fetch(`${videoBaseUrl}${query}`, {
      cache: "no-cache",
    });
    const data = await res.json();

    const videos = data?.hits;
    const total = data?.totalHits;
    const totalPages = Math.ceil(total / 24);

    return {
      videos,
      total,
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};
