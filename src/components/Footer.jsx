import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';
import { scrollToTopBtn } from './ScrollToTop';

import styles from '../css/Footer.module.css';

const Footer = () => {
  const history = useHistory();

  return (
    <div className={styles.footerWrapper}>
      <button className="fas fa-chevron-up" onClick={scrollToTopBtn}></button>
      <h3 className={styles.footerLogo} onClick={() => history.replace('/')}>goodfilms</h3>
      <p className={styles.info}>This site uses The Movie DB API</p>
      <a href="https://developers.themoviedb.org/3" target="_blank">https://developers.themoviedb.org/3</a>
      <div className={styles.footerLinks}>
        <NavLink to="/?page=1">Popular</NavLink>
        <NavLink to={"/trending?page=1&timeframe=day"}>Trending</NavLink>
        <NavLink to="/now-playing?page=1">Now Playing</NavLink>
        <NavLink to="/top-rated?page=1">Top Rated</NavLink>
        <NavLink to="/genres">Genres</NavLink>
        <NavLink to={"/search?page=1&q="}>Search</NavLink>
      </div>
    </div>
  )
}

export default Footer
