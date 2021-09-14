import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import MovieList from '../components/MovieList';

import styles from '../css/MoviesByGenre.module.css';

// Render movie list based on selected genre
const MoviesByGenre = () => {
  const { genreId } = useParams();
  const [ genreName, setGenreName ] = useState(null);
  const { genres } = useMovieContext();
  const history = useHistory();

  // Getting genre-names from context to be able to display name here
  useEffect(() => {
    if (genres) {
      setGenreName(genres.find(genre => genre.id === +genreId)?.name)
    }
  }, [genres])

  // Go back to list of genres
  const handleBackClick = () => {
    history.push('/genres');
  }

  return (
    <div className="page-container">
      <div className={`page-header genre-header ${styles.genreHeader}`}>
        <button onClick={handleBackClick}>{<i className="fas fa-angle-left"></i>}</button>
        <h1 className="genreh1">{ genreName ? genreName : 'Unknown' }</h1>
      </div>
      <MovieList genre={genreId} />
    </div>
  )
}

export default MoviesByGenre
