import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import NoSearch from '../components/NoSearch';
import styles from '../css/Search.module.css';
import { useUrlSearchParams } from 'use-url-search-params';

const Search = () => {
  const [params, setParams] = useUrlSearchParams({ q: '' })
  const [searchInput, setSearchInput] = useState(params.q);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ q: searchInput });
  }

  const handleClear = () => {
    setParams({ page: 1, q: '' })
    setSearchInput('');
  }

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
