import React from 'react'
import { useHistory } from 'react-router-dom';

import styles from '../css/PageNotFound.module.css';

// Render page not found if there is an error
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
