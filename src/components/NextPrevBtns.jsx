import React from 'react';
import styles from '../css/NextPrevBtns.module.css';

// Render next/previous-buttons
// Check if current page is 1 (should not go back further in that case)
// Check if current page === total_pages of result and disable "next" button if that is the case
const NextPrevBtns = ({ page, totalPages, setParams }) => {
  return (
    <div className={styles.pageNumberWrapper}>
      <button disabled={page === '1'} onClick={() => {
        if (+page !== 1) {
          setParams({ page: +page - 1 });
        }
      }}>{<i className="fas fa-chevron-circle-left"></i>}</button>
      <h2>Page: {page} / {totalPages && totalPages}</h2>
      <button disabled={+page >= totalPages} onClick={() => {
        if (+page >= totalPages) {
          return;
        } else {
          setParams({ page: +page + 1 })
        }
      }}>{<i className="fas fa-chevron-circle-right"></i>}</button>
    </div>
  )
}

export default NextPrevBtns
