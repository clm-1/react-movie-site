import axios from 'axios';

// API key for The Movie DB
const apiKey = '79485f0954ebd0b080a22759a5722fcb';

// Region code to get lists for Sweden
const reg = 'SE'

// Axios default URL that will prefix each endpoint
axios.defaults.baseURL = 'https://api.themoviedb.org/3'

// General get-function that will be used by other functions to get more specific data
const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
}

// Get movie-lists based on type (popular, now_playing or top_rated)
export const getMovies = async (type) => {
  return await get(`/movie/${type}?api_key=${apiKey}&region=${reg}`);
};

export const getGenres = async () => {
  return await get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`)
}

export const getMoviesByGenre = async (genre) => {
  return await get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genre}`);
};

