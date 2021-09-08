import React from 'react';
import styles from '../css/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.movieCardWrapper}>
      <h2>{ movie.title }</h2>
    </div>
  )
}

export default MovieCard;
