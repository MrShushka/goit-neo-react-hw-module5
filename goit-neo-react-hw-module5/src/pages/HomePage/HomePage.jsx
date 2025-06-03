import React, { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import { MovieList } from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (err) {
        setError('Failed to fetch trending movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      {loading && <p>Loading trending movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && movies.length === 0 && <p>No trending movies available.</p>}
    </div>
  );
};

export default HomePage;
