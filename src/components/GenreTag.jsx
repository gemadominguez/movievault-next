'use client'

import styles from './GenreTag.module.css'

function GenreTag({ genre }) {
  return (
    <div className={styles['genre-tag']}>
      <div className={styles['genre-tag__theme']}>
        <p>{genre}</p>
      </div>
    </div>
  )
}

export default GenreTag
