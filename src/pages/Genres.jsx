import React from 'react';
import { useQuery } from 'react-query';
import { getGenres } from '../services/MovieAPI';
import GenreCard from '../components/GenreCard';
import styles from '../css/Genres.module.css';
import Loading from '../components/Loading';
import PageNotFound from '../components/PageNotFound';

const Genres = () => {
  const { data, isError, error, isLoading } = useQuery('genres', () => {
    return getGenres();
  })

  data && console.log(data);

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
    </div>
  )
}

export default Genres
