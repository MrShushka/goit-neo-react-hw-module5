import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import styles from './MovieReviews.module.css'; 

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovieReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const movieReviews = await fetchMovieReviews(movieId);
        setReviews(movieReviews);
      } catch (err) {
        setError('Failed to fetch movie reviews. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getMovieReviews();
  }, [movieId]);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <p className={styles.author}>Author: {review.author}</p>
            <p className={styles.content}>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;

