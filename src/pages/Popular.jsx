import React from 'react';
import MovieList from '../components/MovieList';

const Popular = () => {
  return (
    <div className="page-container">
      <h1>Popular</h1>
        <MovieList type="popular" />
    </div>
  )
}

export default Popular
