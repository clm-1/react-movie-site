import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useUrlSearchParams } from 'use-url-search-params';
import MovieCard from '../components/MovieCard';
import { getMovies, getMoviesByGenre } from '../services/MovieAPI';
import styles from '../css/MovieList.module.css';
import PageNotFound from './PageNotFound';

const MovieList = ({ type = null, genre = null }) => {
  const [params, setParams] = useUrlSearchParams({ page: 1 });
  const history = useHistory();
  // React Query gets data based on what type is sent into the component from the parent page (Popular, NowPlaying, TopRated)
  const { data, error, isError, isLoading } = useQuery([type, genre, params.page], () => {
    if (genre) return getMoviesByGenre(genre, params.page);
    console.log('page in list:', params.page)
    return getMovies(type, params.page);
  });

  useEffect(() => {
    if (isNaN(+params.page) || params.page <= 0) setParams({ page: 1 });
  }, [params.page])

  data && console.log(data);

  const renderButtons = () => {
    return (
      <div className={styles.pageNumberWrapper}>
        <button disabled={params.page === '1'} onClick={() => {
          if (params.page !== 1) {
            setParams({ page: +params.page - 1 });
          }
        }}>{'<'}</button>
        <h2>Page: {params.page} / {data.total_pages && data.total_pages}</h2>
        <button disabled={params.page >= data.total_pages} onClick={() => {
          if (params.page >= data.total_pages) {
            return;
          } else {
            setParams({ page: +params.page + 1 })
          }
        }}>{'>'}</button>
      </div>
    )
  }

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Something went wrong...</p>}
      {data && data.results.length > 0 &&
        <>
          {renderButtons()}
          <div className={styles.listWrapper}>
            {data.results.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
          {renderButtons()}
        </>}
      {data && data.results.length < 1 &&
        <PageNotFound />
      }
    </div>
  )
}

export default MovieList
