import React from 'react';
import MovieList from '../components/MovieList';

const NowPlaying = () => {
  return (
    <div className="page-container">
      <h1>Now Playing</h1>
        <MovieList type="now_playing" />
    </div>
  )
}

export default NowPlaying
