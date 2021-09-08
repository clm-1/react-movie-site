import React from 'react';
import MovieList from '../components/MovieList';

const NowPlaying = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Now Playing</h1>
      </div>
        <MovieList type="now_playing" />
    </div>
  )
}

export default NowPlaying
