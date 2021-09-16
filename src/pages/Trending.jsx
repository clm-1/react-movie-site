import React from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlSearchParams } from 'use-url-search-params';
import MovieList from '../components/MovieList';
import RecentMovies from '../components/RecentMovies';

import styles from '../css/Trending.module.css';

// Render movie list based on what's trending
// Can be for the day or the week
const Trending = () => {
  const [params, setParams] = useUrlSearchParams({ timeframe: 'day' });
  const history = useHistory();

  // Change time frame to day or week
  const handleBtnClick = (timeFrame) => {
    setParams({ ...params, timeframe: timeFrame });
  }

  return (
    <>
    <div className="page-container">
      <div className={`page-header ${styles.trendingHeader}`}>
        <h1>Trending</h1>
        <div className={styles.timeButtons}>
          <button className={params.timeframe !== 'week' || params.timeframe === 'day' ? styles.activeBtn : ''} onClick={() => handleBtnClick('day')}>Day</button>
          <button className={params.timeframe === 'week' ? styles.activeBtn : ''} onClick={() => handleBtnClick('week')}>Week</button>
        </div>
      </div>
      <MovieList timeFrame={!params.timeframe ? 'day' : params.timeframe} />
      <RecentMovies />
    </div>
    </>
  )
}

export default Trending
