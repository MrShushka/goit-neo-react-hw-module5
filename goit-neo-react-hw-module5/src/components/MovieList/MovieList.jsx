import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getImageUrl } from '../../services/api'; 
import styles from './MovieList.module.css'; 

export const MovieList = ({ movies }) => {
  const location = useLocation();

  if (!movies || movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.movieItem}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <p className={styles.movieTitle}>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

