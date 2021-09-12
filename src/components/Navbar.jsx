import React, { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import styles from '../css/Navbar.module.css'

const Navbar = () => {
  // Hide and show links on mobile
  const [showLinks, setShowLinks] = useState(false);
  const [currentPage, setCurrentPage] = useState('Popular');

  const location = useLocation();
  const history = useHistory();

  const handleLinkClick = (e) => {
    setShowLinks(false);
  }

  useEffect(() => {
    console.log(location.pathname)
    // Check pathname to set title of page in menu
    // If pathname is other than below, push to start page
    if (location.pathname === '/') return setCurrentPage('Popular');
    if (location.pathname.includes('now-playing')) return setCurrentPage('Now Playing');
    if (location.pathname.includes('top-rated')) return setCurrentPage('Top Rated');
    if (location.pathname.includes('genres')) return setCurrentPage('Genres');
  }, [location.pathname])

  return (
    <nav className={styles.navbarWrapper}>
      {/* Overlay that closes links of clicking outside */}
      { showLinks && <div onClick={handleLinkClick} className={styles.overlay}></div>}
      <div className={styles.linkWrapper}>
        <Link to="/" className={styles.logo}>goodfilms</Link>
        <div className={styles.linkDropdown}>
          <button onClick={() => setShowLinks(!showLinks)}>{currentPage}{!showLinks ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}</button>
          <div onClick={handleLinkClick} className={`${styles.navLinks} ${!showLinks && styles.hideLinks}`}>
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
      </div>
    </nav>
  )
}

export default Navbar
