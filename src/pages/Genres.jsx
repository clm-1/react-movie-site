import React from 'react';
import MovieList from '../components/MovieList';
import { useQuery } from 'react-query';
import { getGenres } from '../services/MovieAPI';
import GenreCard from '../components/GenreCard';
import styles from '../css/Genres.module.css';

const Genres = () => {
  const { data, isError, error, isLoading } = useQuery('genres', () => {
    return getGenres();
  })

  data && console.log(data);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Genres</h1>
        {/* <select name="genres" id="genre-select">
          <option value="action">Action</option>
        </select> */}
      </div>
      <div className={styles.genreList}>
        { data && data.genres.map((genre, i) => (
          <GenreCard key={i} genre={genre} />
        )) }
      </div>
      {/* <MovieList genre={37} /> */}
    </div>
  )
}

export default Genres
