import React from 'react';
import MovieList from '../components/MovieList';
import RecentMovies from '../components/RecentMovies';

const TopRated = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Top Rated</h1>
      </div>
      <MovieList type="top_rated" />
      <RecentMovies />
    </div>
  )
}

export default TopRated
