import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useUrlSearchParams } from 'use-url-search-params';
import MovieList from '../components/MovieList';
import NoSearch from '../components/NoSearch';

import styles from '../css/Search.module.css';

const Search = () => {
  const [params, setParams] = useUrlSearchParams({ q: '' })
  const [searchInput, setSearchInput] = useState('');
  const history = useHistory();

  // Change state on input change
  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  // Set params to searchInput state on submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ page: 1, q: searchInput });
  }

  // Clear form: reset params and searchInput
  const handleClear = () => {
    history.push('/search/page=1&q=');
    setSearchInput('');
  }

  // Set search input to previous query if there is one
  useEffect(() => {
    if (params.q) {
      setSearchInput(params.q);
    }
  }, [params])

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Search</h1>
      </div>
      <div className={styles.searchWrapper}>
          <form onSubmit={handleSubmit}>
            <input 
              id="movie-search" 
              type="text" 
              value={searchInput}
              onChange={handleInputChange}/>
            <div className={styles.formBtnWrapper}>
              <button type="submit" onClick={handleSubmit}><i className="fas fa-search"></i></button>
              <button type="reset" onClick={handleClear}><i className="fas fa-times"></i></button>
            </div>
          </form>
        </div>
        { params.q ? 
          <MovieList searchQuery={params.q} /> :
          <NoSearch msg={'Please search for movies above...'} />
        }
    </div>
  )
}

export default Search
