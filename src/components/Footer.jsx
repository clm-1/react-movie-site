import React from 'react'
import { NavLink } from 'react-router-dom';
import { scrollToTopBtn } from './ScrollToTop';

import styles from '../css/Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footerWrapper}>
      <button className="fas fa-chevron-up" onClick={scrollToTopBtn}></button>
      <h3>goodfilms</h3>
      <p className={styles.info}>This site uses The Movie DB API</p>
      <a href="https://developers.themoviedb.org/3" target="_blank">https://developers.themoviedb.org/3</a>
      <div className={styles.footerLinks}>
        <NavLink to="/">Popular</NavLink>
        <NavLink to="/">Trending</NavLink>
        <NavLink to="/now-playing">Now Playing</NavLink>
        <NavLink to="/top-rated">Top Rated</NavLink>
        <NavLink to="/genres">Genres</NavLink>
        <NavLink to="/genres">Search</NavLink>
      </div>
    </div>
  )
}

export default Footer
