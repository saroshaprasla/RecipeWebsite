
export const baseOptions = {
  method: "GET",
  headers: {
    'x-rapidapi-host': 'tasty.p.rapidapi.com', // Added quotes here
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
  },
};


export const recipeListOptions = {
  ...baseOptions,
  params: {
    from: "0",
    size: "20",
  },
};

export const searchOptions = {
  ...baseOptions,
  params: {
    from: "0",
    size: "20",
    q: "", // Will be dynamically set
  },
};

export const fetchData = async (url, options) => {
  try {
    // Convert params object to URL parameters
    const queryParams = options.params
      ? '?' + new URLSearchParams(options.params).toString()
      : '';

    const response = await fetch(`${url}${queryParams}`, {
      method: options.method,
      headers: options.headers,
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

