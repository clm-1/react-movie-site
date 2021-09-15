import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getPerson } from '../services/MovieAPI';
import PageNotFound from '../components/PageNotFound';
import Loading from '../components/Loading';
import noProfileImg from '../assets/images/no_profileimg.png';

import styles from '../css/PersonDetails.module.css';

const PersonDetails = () => {
  const { id } = useParams();
  const { data, isError, isLoading } = useQuery(['person', id], () => {
    return getPerson(id);
  });

  const [readMore, setReadMore] = useState(false);
  const [moreNames, setMoreNames] = useState(false);
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

  // Render also known as-info
  // Only shows max 3 as default, option to show more
  const renderAlsoKnownAs = () => {
    const numOfNames = moreNames ? data.also_known_as.length : 3;
    // Check which button to render
    const button = !moreNames ? 
      <button onClick={() => setMoreNames(true)}>Read More {`>`}</button> : 
      <button onClick={() => setMoreNames(false)}>Read Less {`>`}</button>

    return (
      <>
        { data.also_known_as.slice(0, numOfNames).map((name, i) => 
          <p key={i}>{name}</p>
        )}
        { data.also_known_as.length > 3 && button }
      </>
    )
  }

  data && console.log(data);

  return (
    <div className="page-container">
      {isLoading && <Loading />}
      {isError && <PageNotFound />}
      {data &&
        <div className={styles.personDetailsWrapper}>
          <div className={styles.personDetailsLeft}>
            {/* Show profile image or placeholder image */}
            <img src={data.profile_path ? `${imgPrefix}${data.profile_path}` : noProfileImg} alt={`${data.name} profile picture`} />
            <h1 className={styles.mobile}>{ data.name }</h1>
            <div className={styles.personalInfo}>
              {/* Check if info exists for each field and render that info or '-' */}
              <h3>Known for:</h3>
              <p>{data.known_for_department ? data.known_for_department : '-'}</p>
              <h3>Date of birth:</h3>
              <p>{data.birthday ? data.birthday : '-'}</p>
              <h3>Place of birth:</h3>
              <p>{data.place_of_birth ? data.place_of_birth : '-'}</p>
              <h3>Also known as:</h3>
              {data.also_known_as.length > 0 ? renderAlsoKnownAs() : '-'}
            </div>
          </div>
          <div className={styles.personDetailsRight}>
            <h1 className={styles.desktop}>{data.name}</h1>
            <h2>Biography:</h2>
            {data.biography ?
              <div className={styles.bioWrapper}>
                {/* Check length of bio, show up to 700 characters as default */}
                {data.biography.length > 700 ?
                  <>
                    <p>{readMore ? data.biography : data.biography.slice(0, 700) + '...'}</p>
                    {/* Hide or show complete bio */}
                    <p className={styles.readMore} onClick={() => setReadMore(!readMore)}>{readMore ? 'Read Less' : 'Read More'} {'>'}</p>
                  </> : <p>{data.biography}</p>}
              </div> : <div className={styles.noBio}>There is no bio for this person yet</div>}
            <h2>Actor:</h2>
            <div className={styles.actingCredits}>
              {credits.map((credit, i) => (
                // Map out credits, push to movie page on click
                <div key={i} onClick={() => history.push(`/movie/${credit.id}`)} className={styles.creditWrapper}>
                  <p className={styles.releaseDate}>{credit.release_date ? credit.release_date.slice(0, 4) : '-'}</p>
                  <div className={styles.titleAndChar}>
                    <p className={styles.creditTitle}>{ credit.title } </p>
                    <p className={styles.charName}>{ credit.character }</p>
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
