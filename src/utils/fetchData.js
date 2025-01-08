export const recipeOptions = {
  method: "GET",
  params: {
    from: "0",
    size: "20",
    tags: "under_30_minutes",
  },
  headers: {
    "x-rapidapi-host": "tasty.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
