import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, getImageUrl } from '../../services/api';
import styles from './MovieCast.module.css'; // Додайте стилі, якщо потрібно

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieCast = await fetchMovieCredits(movieId);
        setCast(movieCast);
      } catch (err) {
        setError('Failed to fetch movie cast. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieCast();
  }, [movieId]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <div>
      <h3>Cast</h3>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              className={styles.actorPhoto}
            />
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.characterName}>Character: {actor.character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;

