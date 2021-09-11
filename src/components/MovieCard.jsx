import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from '../css/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const history = useHistory();
  const imgPrefix = 'https://image.tmdb.org/t/p/w500'

  const handleCardClick = () => {
    history.push(`/movie/${movie.id}`);
  }

  return (
    <div onClick={handleCardClick} className={styles.movieCardWrapper}>
      <img src={`${imgPrefix}${movie.poster_path}`} alt="poster" />
      <h2>{ movie.title.length < 23 ? movie.title : `${movie.title.slice(0, 23)}...` }</h2>
    </div>
  )
}

export default MovieCard;
