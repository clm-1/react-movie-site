import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';

import styles from '../css/Navbar.module.css'

const Navbar = () => {
  // Hide and show links on mobile
  const [showLinks, setShowLinks] = useState(false);

  // Hide links when clicked
  const handleLinkClick = (e) => {
    setShowLinks(false);
  }

  return (
    <nav className={styles.navbarWrapper}>
      {/* Overlay that closes links of clicking outside */}
      { showLinks && <div onClick={handleLinkClick} className={styles.overlay}></div>}
      <div className={styles.linkWrapper}>
        <Link to="/" className={styles.logo}>goodfilms</Link>
        {/* Show and hide links in navbar on mobile */}
          <div className={styles.hamburgerClickBox} onClick={() => setShowLinks(!showLinks)}>
            {/* Hamburger menu on mobile */}
            <div className={styles.hamburgerWrapper} >
              <div className={`${styles.hamburgerLine} ${showLinks && styles.openLinks}`}></div>
            </div>
          </div>
          {/* Clicking links will hide them again (mobile) */}
          <div onClick={handleLinkClick} className={`${styles.navLinks} ${!showLinks && styles.hideLinks}`}>
            <NavLink exact to="/" activeClassName={styles.activeLink}>
              Popular
            </NavLink>
            <NavLink to="/trending" activeClassName={styles.activeLink}>
              Trending
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
            <NavLink to="/search" activeClassName={styles.activeLink}>
              Search
            </NavLink>
          </div>
      </div>
    </nav>
  )
}

export default Navbar
