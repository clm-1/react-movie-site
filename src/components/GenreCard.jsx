import React from 'react';
import styles from '../css/GenreCard.module.css';
import { useHistory } from 'react-router-dom';

const GenreCard = ({ genre }) => {
  const history = useHistory();

  // Send user to the genre with the correct id on click
  const handleClick = () => {
    history.push(`/genres/${genre.id}`);
  }

  return (
    <div className={styles.genreCardWrapper} onClick={handleClick}>
      <p>{ genre.name }</p>
    </div>
  )
};

export default GenreCard;
