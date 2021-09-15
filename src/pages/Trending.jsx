import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlSearchParams } from 'use-url-search-params';
import MovieList from '../components/MovieList';
import RecentMovies from '../components/RecentMovies';

import styles from '../css/Trending.module.css';

// Render movie list based on what's trending
// Can be for the day or the week
const Trending = () => {
  const [params, setParams] = useUrlSearchParams();
  const history = useHistory();

  // useEffect(() => {
  //   console.log('params.window:', params.window)
  //   // Check if window is valid and reset if not
  //   if (params.window === 'day' || params.window === 'week') return;
  //   history.push('/trending');
  // }, [params.window])

  // Change time window to day or week
  const handleBtnClick = (window) => {
    // Pushing to trending with just window (not page) to get clean url
    history.push(`/trending?window=${window}`);
  }

  return (
    <>
    <div className="page-container">
      <div className={`page-header ${styles.trendingHeader}`}>
        <h1>Trending</h1>
        <div className={styles.timeButtons}>
          <button className={!params.window || params.window === 'day' ? styles.activeBtn : ''} onClick={() => handleBtnClick('day')}>Day</button>
          <button className={params.window === 'week' ? styles.activeBtn : ''} onClick={() => handleBtnClick('week')}>Week</button>
        </div>
      </div>
      <MovieList window={!params.window ? 'day' : params.window} />
      <RecentMovies />
    </div>
    </>
  )
}

export default Trending
