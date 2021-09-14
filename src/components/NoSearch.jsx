import React from 'react'
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from './MovieCard';

import styles from '../css/NoSearch.module.css';

const NoSearch = ({ msg }) => {
  const { todaysRecommendations } = useMovieContext();

  todaysRecommendations && console.log(todaysRecommendations);

  return (
    <div className={styles.noSearchWrapper}>
      <div className={styles.noSearchMsg}>
        <p>{ msg }</p>
      </div>
      <h2>Our Recommendations</h2>
      <div className={styles.recommended}>
        { todaysRecommendations.length && todaysRecommendations.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))} 
      </div>
    </div>
  )
}

export default NoSearch
