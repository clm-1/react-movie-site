import React, { createContext, useEffect, useState } from 'react';
import { getGenres } from '../services/MovieAPI';

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  const [genres, setGenres] = useState(null);

  const getGenresInContext = async () => {
    let response = await getGenres();
    setGenres(response.genres);
  }

  useEffect(() => {
    getGenresInContext();
  }, [])

  const values = {
    genres,
  }

  return (
    <MovieContext.Provider value={ values }>
      { children }
    </MovieContext.Provider>
  )
}

export default MovieContextProvider;
