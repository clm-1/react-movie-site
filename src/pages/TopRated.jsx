import React from 'react';
import MovieList from '../components/MovieList';

const TopRated = () => {
  return (
    <div className="page-container">
      <h1>Top Rated</h1>
        <MovieList type="top_rated" />
    </div>
  )
}

export default TopRated
