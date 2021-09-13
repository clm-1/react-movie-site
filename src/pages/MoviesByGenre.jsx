import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { MovieContext } from '../contexts/MovieContextProvider';
import MovieList from '../components/MovieList';
import styles from '../css/MoviesByGenre.module.css';

const MoviesByGenre = () => {
  const { genreId } = useParams();
  const [ genreName, setGenreName ] = useState(null);
  const { genres } = useContext(MovieContext); 
  const history = useHistory();

  useEffect(() => {
    if (genres) {
      setGenreName(genres.find(genre => genre.id === +genreId)?.name)
    }
  }, [genres])

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
