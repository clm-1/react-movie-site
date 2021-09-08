import React from 'react'
import { useQuery } from 'react-query';
import MovieCard from '../components/MovieCard';
import { getMovies } from '../services/MovieAPI';
import styles from '../css/MovieList.module.css';

const MovieList = ({ type }) => {
  // React Query gets data based on what type is sent into the component from the parent page (Popular, NowPlaying, TopRated)
  const { data, error, isError, isLoading } = useQuery(type, () => {
    return getMovies(type);
  });

  return (
    <div>
      { isLoading && <p>Loading...</p> }
      { isError && <p>Something went wrong...</p>}
      <div className={styles.listWrapper}>
        { data && data.results.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        )) }
      </div>
    </div>
  )
}

export default MovieList
