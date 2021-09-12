import React from 'react'
import styles from '../css/PageNotFound.module.css';
import { useHistory } from 'react-router-dom';

const PageNotFound = () => {
  const history = useHistory();

  return (
    <div className="page-container">
      <div className={styles.pageNotFoundWrapper}>
        <p>Page not found...</p>
        <button onClick={() => history.goBack()}>Back</button>
      </div>
    </div>
  )
}

export default PageNotFound
