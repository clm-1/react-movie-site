import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie } from '../services/MovieAPI';
import Loading from '../components/Loading';
import PageNotFound from '../components/PageNotFound';
import useRecentMovies from '../hooks/useRecentMovies';
import DetailsHeader from '../components/DetailsHeader';
import RelatedMovies from '../components/RelatedMovies';
import ActorsList from '../components/ActorsList';

import styles from '../css/MovieDetails.module.css';

const MovieDetails = () => {
  const { id } = useParams();

  // Use recent movies-hook
  const { setRecentMovies } = useRecentMovies('recent-movies');

  // Get movie based on id from params
  const { data, isError, isLoading } = useQuery(['details', id], () => {
    return getMovie(id);
  });

  // Add this movie to local storage
  useEffect(() => {
    if (data) setRecentMovies(data);
  }, [data])

  return (
    <div className={`${styles.detailsPageWrapper}`}>
      {isLoading && <Loading />}
      {isError && <PageNotFound />}
      {data && <DetailsHeader data={data} />}
      <div className={`page-container not-top`}>
        {data &&
          <>
            <ActorsList data={data} />
            <RelatedMovies id={data.id}/> 
          </>
        }
      </div>
    </div>
  )
}

export default MovieDetails
