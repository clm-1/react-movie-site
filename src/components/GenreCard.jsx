import React from 'react';
import styles from '../css/GenreCard.module.css';
import { useHistory } from 'react-router-dom';

const GenreCard = ({ genre }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/genres/${genre.id}/${genre.name}`);
  }

  return (
    <div className={styles.genreCardWrapper} onClick={handleClick}>
      <p>{ genre.name }</p>
    </div>
  )
};

export default GenreCard;
