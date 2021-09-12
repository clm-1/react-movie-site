import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import styles from '../css/Navbar.module.css'

const Navbar = () => {
  return (
    <nav className={styles.navbarWrapper}>
      <div className={styles.linkWrapper}>
        <Link to="/" className={styles.logo}>goodfilms</Link>
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
      </div>
    </nav>
  )
}

export default Navbar
