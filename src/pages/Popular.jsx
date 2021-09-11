import React from 'react';
import MovieList from '../components/MovieList';

const Popular = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Popular</h1>
      </div>
        <MovieList type="popular" />
    </div>
  )
}

export default Popular
