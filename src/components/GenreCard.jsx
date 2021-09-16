import React from 'react';
import { useHistory } from 'react-router-dom';

import styles from '../css/GenreCard.module.css';

const GenreCard = ({ genre }) => {
  const history = useHistory();

  // Send user to the genre with the correct id on click
  const handleClick = () => {
    history.push(`/genres/${genre.id}?page=1`);
  }

  return (
    <div className={styles.genreCardWrapper} onClick={handleClick}>
      <p>{ genre.name }</p>
    </div>
  )
};

export default GenreCard;
