import React from 'react';
import styles from '../css/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const imgPrefix = 'https://image.tmdb.org/t/p/w500'

  return (
    <div className={styles.movieCardWrapper}>
      <img src={`${imgPrefix}${movie.poster_path}`} alt="poster" />
      <h2>{ movie.title.length < 23 ? movie.title : `${movie.title.slice(0, 23)}...` }</h2>
    </div>
  )
}

export default MovieCard;
