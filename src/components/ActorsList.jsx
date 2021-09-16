import React from 'react'
import noProfileImg from '../assets/images/no_profileimg.png';
import { useHistory } from 'react-router-dom';

import styles from '../css/MovieDetails.module.css';

const ActorsList = ({ data }) => {
  const history = useHistory();
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';

  if (!data.credits.cast.length) return null;

  return (
    <>
      <h2>Top Cast:</h2>
      <div className={styles.actorsWrapper}>
        {data.credits.cast.slice(0, 10).map((actor, i) => (
          <div
            key={i}
            className={styles.actorCard}
            onClick={() => history.push(`/people/${actor.id}`)}>
            <img src={actor.profile_path ? `${imgPrefix}${actor.profile_path}` : noProfileImg}></img>
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
      {data.credits.cast.length > 10 &&
        <>
          <h2>Additional Cast:</h2>
          <div className={styles.fullCast}>
            {data.credits.cast.slice(10).map((actor, i) => (
              <div key={i} className={styles.castCardSmall}>
                <img src={actor.profile_path ? `${imgPrefix}${actor.profile_path}` : noProfileImg} alt="" />
                <p key={i} onClick={() => history.push(`/people/${actor.id}`)}>{actor.name}</p>
              </div>
            ))}
          </div>
        </>
      }
    </>
  )
}

export default ActorsList
