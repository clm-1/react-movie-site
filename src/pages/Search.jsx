import React from 'react';
import styles from '../css/Search.module.css';

const Search = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Search</h1>
      </div>
      <div className={styles.searchWrapper}>
          <form>
            <input id="movie-search" type="text" placeholder="Search for movies..."></input>
          </form>
        </div>
    </div>
  )
}

export default Search
