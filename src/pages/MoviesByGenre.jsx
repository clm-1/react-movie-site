import React from 'react'
import { useParams, useHistory } from 'react-router-dom';
import MovieList from '../components/MovieList';
import styles from '../css/MoviesByGenre.module.css';

const MoviesByGenre = () => {
  const { genreId, genreName } = useParams();
  const history = useHistory();

  const handleBackClick = () => {
    history.push('/genres');
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <span onClick={handleBackClick}>{'<'}</span>
        <h1>{ genreName }</h1>
      </div>
      <div className={styles.pageNumberWrapper}>
        {/* <span>{'<'}</span>
        <h2>Page</h2>
        <span>{'>'}</span> */}
      </div>
      <MovieList genre={genreId} />
    </div>
  )
}

export default MoviesByGenre
