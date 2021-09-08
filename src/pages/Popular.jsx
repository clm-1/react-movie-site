import React from 'react';
import { useQuery } from 'react-query';
import MovieCard from '../components/MovieCard';
import { getPopular } from '../services/MovieAPI';
import styles from '../css/Popular.module.css';

const Popular = () => {
  const { data, error, isError, isLoading } = useQuery('popular', () => {
    return getPopular();
  });

  data && console.log(data);

  return (
    <div className="page-container">
      <h1>Popular</h1>
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

export default Popular
