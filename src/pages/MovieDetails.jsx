import React from 'react'
import styles from '../css/MovieDetails.module.css';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie } from '../services/MovieAPI';

const MovieDetails = () => {
  const { id } = useParams();
  const {data, isError, error, isLoading} = useQuery(['details', id], () => {
    return getMovie(id);
  });
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';

  data && console.log(data);

  const renderDetails = () => {
    return (
      <div className={styles.movieDetailsHeader}>
        <img src={`${imgPrefix}${data.poster_path}`} alt={`${data.title} poster`} />
        <div className={styles.headerTitle}>
          <h1>{ data.title }</h1>
          <span className={styles.releaseYear}>({ data.release_date.slice(0, 4)})</span>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      { data && renderDetails() }
    </div>
  )
}

export default MovieDetails
