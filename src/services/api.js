import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzNlZmMyODMxNWFkNTMyOTgwMjNkODY1N2EyOTA0ZiIsIm5iZiI6MTc0ODg4NDk2Ni41Nzc5OTk4LCJzdWIiOiI2ODNkZGRlNmUzMDA1MTE3YmEyODkwZDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.WJgqfmBT9wEm7N9aZ4H9cZOGAeCGOjVA2bPOYh0-vlE'; 
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const options = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day?language=en-US`, options);
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
    options
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}?language=en-US`, options);
  return response.data;
};

export const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits?language=en-US`, options);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews?language=en-US&page=1`, options);
  return response.data.results;
};

export const getImageUrl = (path) => {
  return path ? `${IMAGE_BASE_URL}${path}` : null;
};
