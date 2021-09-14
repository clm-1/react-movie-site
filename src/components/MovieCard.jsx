import React from 'react';
import { useHistory } from 'react-router-dom';
import noPoster from '../assets/images/no_poster.png';
import styles from '../css/MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const history = useHistory();
  const imgPrefix = 'https://image.tmdb.org/t/p/w500'

  const handleCardClick = () => {
    history.push(`/movie/${movie.id}`);
  }

  return (
    <div onClick={handleCardClick} className={styles.movieCardWrapper}>
      <div className={styles.imgWrapper}>
        <img src={movie.poster_path ? `${imgPrefix}${movie.poster_path}` : noPoster} alt="poster" />
      </div>
      <p className={styles.cardTitle}>{ movie.title.length < 23 ? movie.title : `${movie.title.slice(0, 18)}...` }</p>
    </div>
  )
}

export default MovieCard;
