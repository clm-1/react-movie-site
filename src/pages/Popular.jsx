import React, { useContext } from 'react';
import MovieList from '../components/MovieList';
import RecentMovies from '../components/RecentMovies';

const Popular = () => {
  return (
    <>
    <div className="page-container">
      <div className="page-header">
        <h1>Popular</h1>
      </div>
      <MovieList type="popular" />
      <RecentMovies />
    </div>
    </>
  )
}

export default Popular
