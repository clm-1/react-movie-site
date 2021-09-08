import axios from 'axios';

const apiKey = '79485f0954ebd0b080a22759a5722fcb';
const reg = 'SE'
axios.defaults.baseURL = 'https://api.themoviedb.org/3'

const get = async (endpoint) => {
  const response = await axios.get(endpoint);
  return response.data;
}

export const getPopular = async () => {
  console.log(`/movie/popular?api_key=${apiKey}&region=${reg}`);
  return await get(`/movie/popular?api_key=${apiKey}&region=${reg}`)
}