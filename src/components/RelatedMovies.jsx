import React from 'react'
import { useQuery } from 'react-query';
import { getRelatedMovies } from '../services/MovieAPI';
import MovieCard from '../components/MovieCard';

import styles from '../css/MovieDetails.module.css';

const RelatedMovies = ({ id }) => {
  // Get recommended movies based on movie id
  const {data, isError, isLoading} = useQuery(['related', id], () => {
    return getRelatedMovies(id);
  })

  return (
    <>
      {isLoading && <p>Loading related movies...</p>}
      {isError && <p>Could not get related movies...</p>}
      {data && data.results.length > 0 &&
        <div>
          <h2>Related Movies:</h2>
          <div className={styles.relatedMoviesWrapper}>
            {data.results.slice(0, 8).map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default RelatedMovies
