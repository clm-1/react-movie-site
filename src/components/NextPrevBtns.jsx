import React from 'react';

import styles from '../css/NextPrevBtns.module.css';

// Render next/previous-buttons
// Check if current page is 1 (should not go back further in that case)
// Check if current page === total_pages of result and disable "next" button if that is the case
const NextPrevBtns = ({ page, totalPages, setParams, isPreviousData }) => {
  if (!page || isNaN(+page)) page = 1;
  
  return (
    <div className={styles.pageNumberWrapper}>
      <button className="fas fa-chevron-circle-left" disabled={page === '1' || isPreviousData} onClick={() => {
        if (+page !== 1) {
          setParams({ page: +page - 1 });
        }
      }}></button>
      <h2>Page: {page} / {totalPages && totalPages}</h2>
      <button className="fas fa-chevron-circle-right" disabled={+page >= totalPages || isPreviousData} onClick={() => {
        if (+page >= totalPages) {
          return;
        } else if (+page < totalPages || !isPreviousData) {
          setParams({ page: +page + 1 })
        }
      }}></button>
    </div>
  )
}

export default NextPrevBtns
