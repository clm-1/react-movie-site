import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMoviesByPerson, getPerson } from '../services/MovieAPI';
import styles from '../css/PersonDetails.module.css';

const PersonDetails = () => {
  const { id } = useParams();
  const { data, isError, error, isLoading } = useQuery(['person', id], () => {
    return getPerson(id);
  });
  const creditsData = useQuery(['person-credits', id], () => {
    return getMoviesByPerson(id);
  })
  const [readMore, setReadMore] = useState(false);
  const imgPrefix = 'https://image.tmdb.org/t/p/w500';
  const history = useHistory();

  // Sorting credit array
  // The array is not sorted by release date when using append_to_response=credits
  // I used this instead of discover because I could not find the character-name as a property when using the discover-endpoint
  let credits;
  let creditsPlanned;
  if (data && data.credits) {
    credits = data.credits.cast;
    // Filter credits (upcoming and no release date on top)
    credits = credits.filter(credit => credit.hasOwnProperty('release_date') && credit.release_date !== '');
    creditsPlanned = data.credits.cast.filter(credit => !credit.hasOwnProperty('release_date') || credit.release_date === '');
    // Sort movies by release date
    credits.sort((a, b) => {
      let dateA = a.release_date.split('-').join('');
      let dateB = b.release_date.split('-').join('');
      return dateB - dateA;
    })
    // Merge arrays
    credits = [...creditsPlanned, ...credits];
  }

  data && console.log(data);

  return (
    <div className="page-container">
      {data &&
        <div className={styles.personDetailsWrapper}>
          <div className={styles.personDetailsLeft}>
            <img src={`${imgPrefix}${data.profile_path}`} alt={`${data.name} profile picture`} />
            <div className={styles.personalInfo}>
              <h3>Known for:</h3>
              <p>{data.known_for_department ? data.known_for_department : '-'}</p>
              <h3>Date of birth:</h3>
              <p>{data.birthday ? data.birthday : '-'}</p>
              <h3>Place of birth:</h3>
              <p>{data.place_of_birth ? data.place_of_birth : '-'}</p>
              <h3>Also known as:</h3>
              {data.also_known_as.length > 0 ? data.also_known_as.map((name, i) => <p key={i}>{name}</p>) : '-'}
            </div>
          </div>
          <div className={styles.personDetailsRight}>
            <h1>{data.name}</h1>
            <h2>Biography:</h2>
            { data.biography ? 
            <div className={styles.bioWrapper}>
            {data.biography.length > 700 ?
              <>
                <p>{readMore ? data.biography : data.biography.slice(0, 700) + '...'}</p>
                <p className={styles.readMore} onClick={() => setReadMore(!readMore)}>{readMore ? 'Read Less' : 'Read More'} {'>'}</p>
              </> : <p>{data.biography}</p>}
          </div> : <div className={styles.noBio}>There is no bio for this person yet</div>}
            <h2>Actor:</h2>
            <div className={styles.actingCredits}>
              { credits.map((credit, i) => (
                <div key={i} onClick={() => history.push(`/movie/${credit.id}`)} className={styles.creditWrapper}>
                  <p className={styles.releaseDate}>{ credit.release_date ? credit.release_date.slice(0, 4) : '-' }</p>
                  <div className={styles.titleAndChar}>
                  <p className={styles.creditTitle}>{ credit.title }</p>
                  { credit.character && 
                    <>
                    <p className={styles.asChar}>as</p>
                    <p className={styles.charName}>{ credit.character }</p>
                    </>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>}
    </div>
  )
}

export default PersonDetails
