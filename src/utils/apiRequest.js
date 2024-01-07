const API_KEY = "14571957-84fd93db3fabca9fc66d4bee1";

const baseUrl = `https://pixabay.com/api/?key=${API_KEY}`;

export const fetchImages = async (query) => {
  try {
    const res = await fetch(`${baseUrl}${query}`);
    const data = await res.json();

    const photos = data?.hits;
    const total = data?.totalHits;
    const totalPages = Math.ceil(total / 24);

    return {
      photos,
      total,
      totalPages,
    };
  } catch (error) {}
};
