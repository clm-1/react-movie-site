import React from 'react';
import { useQuery } from 'react-query';
import MovieCard from '../components/MovieCard';
import { getPopular } from '../services/MovieAPI';

const Popular = () => {
  const { data, error, isError, isLoading } = useQuery('popular', () => {
    return getPopular();
  });

  data && console.log(data);

  return (
    <div className="page-container">
      { isLoading && <p>Loading...</p> }
      { isError && <p>Something went wrong...</p>}
      { data && data.results.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      )) }
    </div>
  )
}

export default Popular
