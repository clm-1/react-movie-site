import React from 'react'
import styles from '../css/PageNotFound.module.css';

const Loading = () => {
  return (
    <div className="page-container">
      <div className={styles.pageNotFoundWrapper}>
        <p>Loading...</p>
      </div>
    </div>
  )
}

export default Loading
