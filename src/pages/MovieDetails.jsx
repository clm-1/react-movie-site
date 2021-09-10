import React from 'react'
import styles from '../css/MovieDetails.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie } from '../services/MovieAPI';

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, isError, error, isLoading } = useQuery(['details', id], () => {
    return getMovie(id);
  });
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';
  const coverImgPrefix = 'https://image.tmdb.org/t/p/original';

  data && console.log(data.credits.crew.find(person => person.job === 'Director'))
  data && console.log(data);

  const renderHeader = () => {
    const genreString = data.genres.map(genre => (
      genre.name
    )).join(' / ');

    return (
      <div className={styles.movieDetailsHeader}>
        <div className={styles.headerOverlay}></div>
        <img className={styles.coverImg} src={`${coverImgPrefix}${data.backdrop_path}`} alt="" />
        <img src={`${imgPrefix}${data.poster_path}`} alt={`${data.title} poster`} />
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>
            <h1>{data.title} <span className={styles.releaseYear}>({data.release_date.slice(0, 4)})</span></h1>
          </div>
          <div className={styles.headerInfo}>
            <p>{genreString}</p>
            <p>-</p>
            <p>{data.runtime} min</p>
          </div>
          <div className={styles.score}>
            <span>{data.vote_average}</span>
          </div>
          <div className={styles.headerOverview}>
            <h2>Overview:</h2>
            <p>{data.overview}</p>
          </div>
          <div className={styles.headerDirector}>
            <h2>Director:</h2>
            <p>{data.credits.crew.find(person => person.job === 'Director').name}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page-container">
      {isLoading && <p>Loading...</p>}
      {data && renderHeader()}
      <h2>Cast:</h2>
      <div className={styles.actorsWrapper}>
        {data && data.credits.cast.slice(0, 10).map(actor => {
          if (actor.profile_path !== null) {
            return (
              <div 
                key={actor.id} 
                className={styles.actorCard}
                onClick={() => history.push(`/person/${actor.id}`)}>
                  <img src={`${imgPrefix}${actor.profile_path}`}></img>
                  <p>{actor.name}</p>
              </div>
            )
          }
        })}
      </div>
      {data && data.credits.cast.length > 10 &&
        <>
          <h2>Full Cast:</h2>
          <div className={styles.fullCast}>
            {data && data.credits.cast.slice(10).map(actor => 
              <p key={actor.id} onClick={() => history.push(`/person/${actor.id}`)}>{actor.name}</p>)}
          </div>
        </>}
    </div>
  )
}

export default MovieDetails
