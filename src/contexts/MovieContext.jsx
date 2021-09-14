import React, { createContext, useState, useContext, useEffect } from 'react';
import { getGenres, getMovie } from '../services/MovieAPI';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
}

const MovieContextProvider = (props) => {
  const [genres, setGenres] = useState(null);
  const [todaysRecommendations, setTodaysRecommendations] = useState([]);

  // Hard coded id:s for recommended movies (decided by developer)
  // Is displayed on search-page if there is no search yet (or no search results)
  const recommended = [578, 329, 78, 2567];

  // Get a list of genres to display correct name on MoviesByGenre-page
  const getGenresInContext = async () => {
    let response = await getGenres();
    setGenres(response.genres);
  }

  // Fetching recommended movies based on recommended-array above
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

