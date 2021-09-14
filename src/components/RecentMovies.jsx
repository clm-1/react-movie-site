import React, { useEffect } from 'react';
import useRecentMovies from '../hooks/useRecentMovies';
import MovieCard from './MovieCard';

import styles from '../css/RecentMovies.module.css';

const RecentMovies = () => {
  // Use recent movies-hook to get recently viewed movies
  const { getRecentMovies, storedMovies } = useRecentMovies('recent-movies');

  // Get recent movies from local storage on load
  useEffect(() => {
    getRecentMovies('recent-movies');
  }, [])

  // Display recently viewed movies if storedMovies has value
  return (
    <div className={styles.recentMoviesWrapper}>
      { storedMovies && storedMovies.length &&
      <>
      <h2>Recently Viewed Movies</h2>
      <div className={styles.recentMovies}>
        { storedMovies.map((movie, i) => (
          <MovieCard key={i} movie={movie} small={true} />
        ))}
      </div>
      </>
      }
    </div>
  )
}

export default RecentMovies
