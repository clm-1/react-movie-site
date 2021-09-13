import React, { createContext, useState, useContext, useEffect } from 'react';
import { getGenres, getMovie } from '../services/MovieAPI';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
}

const MovieContextProvider = (props) => {
  const [genres, setGenres] = useState(null);
  const [todaysRecommendations, setTodaysRecommendations] = useState([]);
  const recommended = [578, 329, 78, 2567];

  const getGenresInContext = async () => {
    let response = await getGenres();
    setGenres(response.genres);
  }

  const getRecommendedMovies = async () => {
    let results = await Promise.all(
      recommended.map(async (id) => {
        let response = await getMovie(id);
        return response;
      })
    )
    setTodaysRecommendations(results);
  }

  useEffect(() => {
    getGenresInContext();
    getRecommendedMovies();
  }, [])

  const values = {
    genres,
    todaysRecommendations,
  }

  return (
    <MovieContext.Provider value={ values }>
      {props.children}
    </MovieContext.Provider>
  )
}

export default MovieContextProvider

