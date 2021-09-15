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
export const getMovies = async (type, page) => {
  return await get(`/movie/${type}?api_key=${apiKey}&page=${page}&region=${reg}`);
};

// Get trending movies for the day or the week
export const getTrending = async (timeWindow, page) => {
  if (!page) page = 1;
  // Check if timeWindow is valid
  timeWindow === 'day' || timeWindow === 'week' ? timeWindow === timeWindow : timeWindow = 'day'
  
  return await get(`https://api.themoviedb.org/3/trending/movie/${timeWindow}?api_key=${apiKey}&page=${page}`)
}

// Related movies
// Get recommended movies based on a movie id (displayed on movie details-page)
// Using "recommendations" instead of "similar" because the responses felt more relevant to the current movie 
export const getRelatedMovies = async (id) => {
  return await get(`/movie/${id}/recommendations?api_key=${apiKey}`);
}

// Get search result based on query
export const getSearch = async (searchQuery, page) => {
  return await get(`/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`)
}

// Get all genre names
export const getGenres = async () => {
  return await get(`/genre/movie/list?api_key=${apiKey}`)
}

// Get movies that has the genre id sent in here
export const getMoviesByGenre = async (genre, page) => {
  return await get(`/discover/movie?api_key=${apiKey}&with_genres=${genre}&page=${page}`);
};

// Get specific movie details
export const getMovie = async (id) => {
  return await get(`/movie/${id}?api_key=${apiKey}&append_to_response=credits`);
}

// Get person details with credits appended to response
// Getting credits here because the response includes character name for credit
export const getPerson = async (id) => {
  return await get(`/person/${id}?api_key=${apiKey}&append_to_response=credits`);
}

export const getMoviesByPerson = async (id) => {
  return await get(`/discover/movie?api_key=${apiKey}&with_cast=${id}&sort_by=primary_release_date.desc`);
}

