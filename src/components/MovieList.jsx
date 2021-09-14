import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import { useUrlSearchParams } from 'use-url-search-params';
import { getMovies, getMoviesByGenre, getSearch, getTrending } from '../services/MovieAPI';
import MovieCard from '../components/MovieCard';
import PageNotFound from './PageNotFound';
import NextPrevBtns from './NextPrevBtns';
import Loading from './Loading';
import NoSearch from './NoSearch';

import styles from '../css/MovieList.module.css';

const MovieList = ({ type = null, genre = null, searchQuery = null, window = null }) => {
  // Using url search params to keep track of current page
  const [params, setParams] = useUrlSearchParams({ page: 1 });

  // React Query gets data based on what type is sent into the component from the parent page (will be popular, now-playing or top-rated)
  // If genre is sent in, it will use that function instead
  const { data, isError, isLoading, isPreviousData } = useQuery([type, genre, params.page, searchQuery, window], () => {
    // If request comes from Search Page
    if (searchQuery) return getSearch(searchQuery, params.page);

    // If request comes from Genre Page
    if (genre) return getMoviesByGenre(genre, params.page);

    // If trending + timewindow
    if (window) return getTrending(window, params.page);

    // If request comes from Popular, Now Playing or Top Rated
    return getMovies(type, params.page);

     // Keep previous data to see old data while loading new data
  }, { keepPreviousData: true });

  useEffect(() => {
    // Check page in params
    // If page is NaN or below 1, set page to 1
    if (isNaN(+params.page) || params.page <= 0) setParams({ page: 1 });
  }, [params.page])

  // Reset page to 1 if searchQuery changes
  useEffect(() => {
    setParams({ page: 1 });
  }, [searchQuery])

  return (
    <div>
      {isLoading && <Loading />}
      {isError && <PageNotFound />}

      {/* Check if we have results and that num of results are above 0 */}
      {/* Render the buttons at top and bottom of list */}
      {data && data.results.length > 0 &&
        <>
          <NextPrevBtns page={params.page} setParams={setParams} totalPages={data.total_pages} isPreviousData={isPreviousData}/>
          {/* List out all movies found for this page / genre */}
          <div className={styles.listWrapper}>
            {data.results.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
          <NextPrevBtns page={params.page} setParams={setParams} totalPages={data.total_pages} isPreviousData={isPreviousData}/>
        </>}

      {/* If page does not exists the array with results will be empty */}
      {/* Page not found component added */}
      {data && searchQuery && data.results.length < 1 &&
        <NoSearch msg={'Found no movies matching your search...'} />
      }

      {data && !searchQuery && data.results.length < 1 &&
        <PageNotFound />
      }
    </div>
  )
}

export default MovieList
