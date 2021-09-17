import React from 'react';
import noPoster from '../assets/images/no_poster.png';

import styles from '../css/MovieDetails.module.css';

const DetailsHeader = ({ data }) => {
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';
  const coverImgPrefix = 'https://image.tmdb.org/t/p/original';

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
        <img className={styles.poster} src={data.poster_path ? `${imgPrefix}${data.poster_path}` : noPoster} alt={`${data.title} poster`} />
        <div className={styles.headerText}>
          <div className={styles.headerTitle}>
            <h1>{data.title} <span className={styles.releaseYear}>{data.release_date && `(${data.release_date.slice(0, 4)})`}</span></h1>
          </div>
          <div className={styles.headerInfo}>
            <p className={styles.genres}>{genreString}</p>
            {data.runtime > 0 &&
              <div className={styles.runtime}>
                <p className={styles.hide}>-</p>
                <p>{data.runtime} min</p>
              </div>}
          </div>
          <div className={styles.score}>
            <span>{data.vote_average > 0 ? data.vote_average : 'N/A'}</span>
          </div>
          <div className={styles.headerOverview}>
            <h2>Overview:</h2>
            <p>{data.overview ? data.overview : 'N/A'}</p>
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

export default DetailsHeader;
