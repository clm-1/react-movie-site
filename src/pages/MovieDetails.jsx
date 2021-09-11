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

  // Prefixes for poster and cover img
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';
  const coverImgPrefix = 'https://image.tmdb.org/t/p/original';

  data && console.log(data.credits.crew.find(person => person.job === 'Director'))
  data && console.log(data);

  const renderHeader = () => {
    // Create string of all genres 
    const genreString = data.genres.map(genre => (
      genre.name
    )).join(' / ');

    // Render the movie page header
    return (
      <div className={styles.movieDetailsHeader}>
        <div className={styles.headerOverlay}></div>
        <img className={styles.coverImg} src={data.backdrop_path && `${coverImgPrefix}${data.backdrop_path}`} alt="" />
        <div className={`${styles.headerInfoWrapper} page-container`}>
          <img src={`${imgPrefix}${data.poster_path}`} alt={`${data.title} poster`} />
          <div className={styles.headerText}>
            <div className={styles.headerTitle}>
              <h1>{data.title} <span className={styles.releaseYear}>{ data.release_date && `(${data.release_date.slice(0, 4)})` }</span></h1>
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
              <p>{data.credits.crew.find(person => person.job === 'Director') ? data.credits.crew.find(person => person.job === 'Director').name : 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.detailsPageWrapper}`}>
      {isLoading && <p>Loading...</p>}
      {data && renderHeader()}
      <div className="page-container">
        <h2>Cast:</h2>
        <div className={styles.actorsWrapper}>
          {data && data.credits.cast.slice(0, 10).map((actor, i) => {
            if (actor.profile_path !== null) {
              return (
                <div
                  key={i}
                  className={styles.actorCard}
                  onClick={() => history.push(`/people/${actor.id}`)}>
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
              {data && data.credits.cast.slice(10).map((actor, i) =>
                <p key={i} onClick={() => history.push(`/people/${actor.id}`)}>{actor.name}</p>)}
            </div>
          </>}
      </div>
    </div>
  )
}

export default MovieDetails