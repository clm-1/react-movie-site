import React from 'react';
import { useQuery } from 'react-query';
import { getGenres } from '../services/MovieAPI';
import GenreCard from '../components/GenreCard';
import Loading from '../components/Loading';
import PageNotFound from '../components/PageNotFound';
import RecentMovies from '../components/RecentMovies';

import styles from '../css/Genres.module.css';

// Render list of all genres
const Genres = () => {
  const { data, isError, error, isLoading } = useQuery('genres', () => {
    return getGenres();
  })

  return (
    <div className="page-container">
      { isLoading && <Loading /> }
      { isError && <PageNotFound /> }
      <div className="page-header">
        <h1>Genres</h1>
      </div>
      {/* Render out one card for each genre */}
      <div className={styles.genreList}>
        { data && data.genres.map((genre, i) => (
          <GenreCard key={i} genre={genre} />
        )) }
      </div>
      <RecentMovies />
    </div>
  )
}

export default Genres
