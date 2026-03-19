import React from 'react';
import styles from './StarRating.module.css';

export default function StarRating({ rating, count, size = 'sm' }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);

  return (
    <div className={`${styles.wrapper} ${styles[size]}`}>
      <div className={styles.stars}>
        {'★'.repeat(full)}
        {half ? '½' : ''}
        {'☆'.repeat(empty)}
      </div>
      <span className={styles.rating}>{rating}</span>
      {count !== undefined && (
        <span className={styles.count}>({count.toLocaleString()})</span>
      )}
    </div>
  );
}
