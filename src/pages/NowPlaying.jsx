import React from 'react';
import MovieList from '../components/MovieList';
import RecentMovies from '../components/RecentMovies';

const NowPlaying = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Now Playing</h1>
      </div>
      <MovieList type="now_playing" />
      <RecentMovies />
    </div>
  )
}

export default NowPlaying
