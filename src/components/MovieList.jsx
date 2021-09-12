import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useUrlSearchParams } from 'use-url-search-params';
import { getMovies, getMoviesByGenre } from '../services/MovieAPI';
import MovieCard from '../components/MovieCard';
import PageNotFound from './PageNotFound';
import styles from '../css/MovieList.module.css';
import NextPrevBtns from './NextPrevBtns';
import Loading from './Loading';

const MovieList = ({ type = null, genre = null }) => {
  // Using url search params to keep track of current page
  const [params, setParams] = useUrlSearchParams({ page: 1 });
  // React Query gets data based on what type is sent into the component from the parent page (Popular, NowPlaying, TopRated)
  const { data, error, isError, isLoading } = useQuery([type, genre, params.page], () => {
    if (genre) return getMoviesByGenre(genre, params.page);
    console.log('page in list:', params.page)
    return getMovies(type, params.page);
  });

  const history = useHistory();

  useEffect(() => {
    // Check page in params
    // If page is NaN or below 1, set page to 1
    if (isNaN(+params.page) || params.page <= 0) setParams({ page: 1 });
  }, [params.page])

  data && console.log(data);

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <PageNotFound />}

      {/* Check if we have results and that num of results are above 0 */}
      {/* Render the buttons at top and bottom of list */}
      {data && data.results.length > 0 &&
        <>
          <NextPrevBtns page={params.page} setParams={setParams} totalPages={data.total_pages}/>
          <div className={styles.listWrapper}>
            {data.results.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
          <NextPrevBtns page={params.page} setParams={setParams} totalPages={data.total_pages}/>
        </>}

      {/* If page does not exists the array with results will be empty */}
      {/* Page not found component added */}
      {data && data.results.length < 1 &&
        <PageNotFound />
      }
    </div>
  )
}

export default MovieList
