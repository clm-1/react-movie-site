import React, { useState } from 'react'

const useRecentMovies = (key) => {

  if (typeof key !== 'string') return 'Not a valid key'

  const setRecentMovies = (movieToAdd) => {
    // Try to get previous movies
    let storedMovies = JSON.parse(localStorage.getItem(key))

    // Filter out the current movie if it already exists in local storage (to move it to the front by re-adding it)
    if (storedMovies) storedMovies = storedMovies.filter(movie => movie.id !== movieToAdd.id);

    // Create new array with movie if no previous data exists in local storage
    storedMovies ? storedMovies.unshift(movieToAdd) : storedMovies = [movieToAdd];

    // Remove last movie if storedMovies is longer than 10 items
    storedMovies.length > 10 && storedMovies.pop();

    // Set new array
    console.log('stored:', storedMovies);
    localStorage.setItem(key, JSON.stringify(storedMovies));
  }

  return {
    setRecentMovies,
  }
}

export default useRecentMovies;
