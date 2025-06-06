import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, Outlet, useLocation, NavLink } from 'react-router-dom';
import { fetchMovieDetails, getImageUrl } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const goBackLocationRef = useRef(location.state?.from || '/movies'); 

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (err) {
        setError('Failed to fetch movie details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) {
    return <p>Loading movie details...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (!movie) {
    return <p>Movie not found.</p>;
  }

  const userScore = movie.vote_average ? (movie.vote_average * 10).toFixed(0) : 'N/A';
  const genres = movie.genres ? movie.genres.map((genre) => genre.name).join(', ') : 'N/A';

  return (
    <div className={styles.detailsContainer}>
      <Link to={goBackLocationRef.current} className={styles.goBackLink}>
        Go back
      </Link>
      <div className={styles.movieInfo}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={styles.poster}
        />
        <div className={styles.textInfo}>
          <h2>{movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{movie.overview || 'No overview available.'}</p>
          <h3>Genres</h3>
          <p>{genres}</p>
        </div>
      </div>

      <hr />

      <div className={styles.additionalInfo}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <NavLink to="cast" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <hr />

      {/* <Suspense fallback={<div>Loading additional info...</div>}> */}
        <Outlet /> 
      {/* </Suspense> */}
    </div>
  );
};

export default MovieDetailsPage;

