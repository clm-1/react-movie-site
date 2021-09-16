import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie, getRelatedMovies } from '../services/MovieAPI';
import noProfileImg from '../assets/images/no_profileimg.png';
import Loading from '../components/Loading';
import PageNotFound from '../components/PageNotFound';
import MovieCard from '../components/MovieCard';
import useRecentMovies from '../hooks/useRecentMovies';

import styles from '../css/MovieDetails.module.css';
import DetailsHeader from '../components/DetailsHeader';

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();

  // Use recent movies-hook
  const { setRecentMovies } = useRecentMovies('recent-movies');

  // Get movie based on id from params
  const { data, isError, isLoading } = useQuery(['details', id], () => {
    return getMovie(id);
  });

  // Get recommended movies based on this movie
  const related = useQuery(['related', id], () => {
    return getRelatedMovies(id);
  })

  // Add this movie to local storage
  useEffect(() => {
    if (data) {
      setRecentMovies(data);
    }
  }, [data])

  // Prefixes for poster and cover img
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';

  return (
    <div className={`${styles.detailsPageWrapper}`}>
      {isLoading && <Loading />}
      {isError && <PageNotFound />}
      {data && <DetailsHeader data={data} />}
      <div className={`page-container not-top`}>
        {data &&
          <>
            <h2>Top Cast:</h2>
            <div className={styles.actorsWrapper}>
              {data && data.credits.cast.slice(0, 10).map((actor, i) => (
                <div
                  key={i}
                  className={styles.actorCard}
                  onClick={() => history.push(`/people/${actor.id}`)}>
                  <img src={actor.profile_path ? `${imgPrefix}${actor.profile_path}` : noProfileImg}></img>
                  <p>{actor.name}</p>
                </div>
              ))}
            </div>
            {data && data.credits.cast.length > 10 &&
              <>
                <h2>Additional Cast:</h2>
                <div className={styles.fullCast}>
                  {data.credits.cast.slice(10).map((actor, i) => (
                    <div key={i} className={styles.castCardSmall}>
                      <img src={actor.profile_path ? `${imgPrefix}${actor.profile_path}` : noProfileImg} alt="" />
                      <p key={i} onClick={() => history.push(`/people/${actor.id}`)}>{actor.name}</p>
                    </div>
                  ))}
                </div>
              </>
            }
          </>}
          { related.data && related.data.results.length > 0 && 
            <>
            <h2>Related Movies:</h2>
            <div className={styles.relatedMoviesWrapper}>
              {related.data.results.slice(0, 8).map((movie, i) => (
                <MovieCard key={i} movie={movie} />
              ))}
            </div>
            </>
          }
      </div>
    </div>
  )
}

export default MovieDetails
