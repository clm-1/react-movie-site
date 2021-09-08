import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbarWrapper}>
      <Link to="/" className={styles.logo}>MOVIE DB</Link>
      <div className={styles.navLinks}>
        <NavLink exact to="/" activeClassName={styles.activeLink}>
          Popular
        </NavLink>
        <NavLink to="/now-playing" activeClassName={styles.activeLink}>
          Now Playing
        </NavLink>
        <NavLink to="/top-rated" activeClassName={styles.activeLink}>
          Top Rated
        </NavLink>
        <NavLink to="/genres" activeClassName={styles.activeLink}>
          Genres
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar
