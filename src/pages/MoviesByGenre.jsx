import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import MovieList from '../components/MovieList';
import styles from '../css/MoviesByGenre.module.css';

const MoviesByGenre = () => {
  const { genreId, genreName } = useParams();
  const [page, setPage] = useState(1);
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
      <MovieList genre={genreId} />
    </div>
  )
}

export default MoviesByGenre
