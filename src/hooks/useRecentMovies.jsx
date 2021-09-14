import React, { useState } from 'react'

const useRecentMovies = (key) => {
  const [storedMovies, setStoredMovies] = useState(null);

  // Return if key is not string
  if (typeof key !== 'string') return 'Not a valid key'

  const getRecentMovies = () => {
    // Try to get data from local storage
    let movies = JSON.parse(localStorage.getItem(key));
    // Set data if data is found
    if (movies) {
      setStoredMovies(movies);
    }
  }

  const setRecentMovies = (movieToAdd) => {
    // Try to get previous movies
    let movies = JSON.parse(localStorage.getItem(key))

    // Filter out the current movie if it already exists in local storage (to move it to the front by re-adding it)
    if (movies) movies = movies.filter(movie => movie.id !== movieToAdd.id);

    // Create new array with movie if no previous data exists in local storage
    movies ? movies.unshift(movieToAdd) : movies = [movieToAdd];

    // Remove last movie if movies is longer than 10 items
    movies.length > 10 && movies.pop();

    // Set new array
    localStorage.setItem(key, JSON.stringify(movies));
  }

  return {
    setRecentMovies,
    getRecentMovies,
    storedMovies,
  }
}

export default useRecentMovies;
