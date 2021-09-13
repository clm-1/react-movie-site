import React from 'react'
import styles from '../css/MovieDetails.module.css';
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovie, getRecommendedMovies } from '../services/MovieAPI';
import noPoster from '../assets/images/no_poster.png';
import noProfileImg from '../assets/images/no_profileimg.png';
import Loading from '../components/Loading';
import PageNotFound from '../components/PageNotFound';
import MovieCard from '../components/MovieCard';

const MovieDetails = () => {
  const { id } = useParams();
  const history = useHistory();
  const { data, isError, error, isLoading } = useQuery(['details', id], () => {
    return getMovie(id);
  });
  const recommended = useQuery(['recommended', id], () => {
    return getRecommendedMovies(id);
  })

  recommended.data && console.log(recommended.data);

  // Prefixes for poster and cover img
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';
  const coverImgPrefix = 'https://image.tmdb.org/t/p/original';

  const renderHeader = () => {
    // Create string of all genres 
    const genreString = data.genres.map(genre => (
      genre.name
    )).join(' / ');

    // Render the movie page header
    return (
      <div className={styles.movieDetailsHeader}>
        <div className={styles.headerOverlay}></div>
        <img className={styles.coverImg} src={data.backdrop_path && `${coverImgPrefix}${data.backdrop_path}`} alt="" />
        <div className={`${styles.headerInfoWrapper} page-container`}>
          <img className={styles.poster} src={data.poster_path ? `${imgPrefix}${data.poster_path}` : noPoster} alt={`${data.title} poster`} />
          <div className={styles.headerText}>
            <div className={styles.headerTitle}>
              <h1>{data.title} <span className={styles.releaseYear}>{data.release_date && `(${data.release_date.slice(0, 4)})`}</span></h1>
            </div>
            <div className={styles.headerInfo}>
              <p className={styles.genres}>{genreString}</p>
              {data.runtime > 0 &&
                <div className={styles.runtime}>
                  <p className={styles.hide}>-</p>
                  <p>{data.runtime} min</p>
                </div>}
            </div>
            <div className={styles.score}>
              <span>{data.vote_average > 0 ? data.vote_average : 'N/A'}</span>
            </div>
            <div className={styles.headerOverview}>
              <h2>Overview:</h2>
              <p>{data.overview ? data.overview : 'N/A'}</p>
            </div>
            <div className={styles.headerDirector}>
              <h2>Director:</h2>
              <p>{data.credits.crew.find(person => person.job === 'Director') ? data.credits.crew.find(person => person.job === 'Director').name : 'Unknown'}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles.detailsPageWrapper}`}>
      {isLoading && <Loading />}
      {isError && <PageNotFound />}
      {data && renderHeader()}
      <div className="page-container">
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
                <h2>Full Cast:</h2>
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
          <h2>Related Movies:</h2>
          <div className={styles.recommendedMoviesWrapper}>
            {recommended.data && recommended.data.results.slice(0, 8).map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))}
          </div>
      </div>
    </div>
  )
}

export default MovieDetails
