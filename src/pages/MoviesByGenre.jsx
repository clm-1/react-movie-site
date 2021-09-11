import React, { useEffect, useContext, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import MovieList from '../components/MovieList';
import { MovieContext } from '../contexts/MovieContextProvider';

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
      <div className="page-header">
        <span onClick={handleBackClick}>{'<'}</span>
        <h1>{ genreName ? genreName : 'Unknown' }</h1>
      </div>
      <MovieList genre={genreId} />
    </div>
  )
}

export default MoviesByGenre
