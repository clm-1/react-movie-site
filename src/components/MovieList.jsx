import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-query';
import { useUrlSearchParams } from 'use-url-search-params';
import MovieCard from '../components/MovieCard';
import { getMovies, getMoviesByGenre } from '../services/MovieAPI';
import styles from '../css/MovieList.module.css';

const MovieList = ({ type = null, genre = null }) => {
  const [params, setParams] = useUrlSearchParams({ page: 1 });
  // const [page, setPage] = useState(1);
  // React Query gets data based on what type is sent into the component from the parent page (Popular, NowPlaying, TopRated)
  const { data, error, isError, isLoading } = useQuery([type, genre, params.page], () => {
    if (genre) return getMoviesByGenre(genre, params.page);
    return getMovies(type);
  });

  data && console.log(data);

  const renderButtons = () => {
    return (
      <div className={styles.pageNumberWrapper}>
        <button onClick={() => {
          if (params.page !== 1) {
            setParams({ page: +params.page - 1 });
          }
        }}>{'<'}</button>
        <h2>Page: {params.page} / {data.total_pages && data.total_pages}</h2>
        <button onClick={() => setParams({ page: +params.page + 1 })}>{'>'}</button>
      </div>
    )
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {data &&
        <>
          {genre && renderButtons()}
          <div className={styles.listWrapper}>
            {data.results.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
          {genre && renderButtons()}
        </>}
    </div>
  )
}

export default MovieList
