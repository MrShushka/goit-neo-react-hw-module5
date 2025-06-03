import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import { MovieList } from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [inputValue, setInputValue] = useState(query); // Стан для значення в полі вводу

  useEffect(() => {
    if (!query) {
      setMovies([]); // Очистити список фільмів, якщо запит порожній
      return;
    }

    const getMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const foundMovies = await searchMovies(query);
        setMovies(foundMovies);
      } catch (err) {
        setError('Failed to search movies. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      setSearchParams({}); // Очистити параметри, якщо запит порожній
      return;
    }
    setSearchParams({ query: inputValue.trim() });
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Searching movies...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && query && movies.length === 0 && <p>No movies found for "{query}".</p>}
    </div>
  );
};

export default MoviesPage;