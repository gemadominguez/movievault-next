'use client'

import GenreTag from './GenreTag'
import styles from './MovieInfo.module.css'
import Image from 'next/image'

function MovieInfo({
  title,
  genres,
  synopsis,
  fullSynopsis = false,
  showTopLabel = true,
  rating,
}) {
  return (
    <section className={styles['movie-info']}>
      {showTopLabel && (
        <h3 className={styles['movie-info__label']}>
          TOP 10 FILMS OF THE MONTH
        </h3>
      )}

      {!showTopLabel && rating && (
        <div className={styles['movie-info__rating']}>
          <h3>{rating}</h3>
          <Image src="/icons/star.svg" alt="star" width={24} height={24} />

        </div>
      )}

      <h1 className={styles['movie-info__title']}>{title}</h1>

      <div className={styles['movie-info__genres']}>
        {genres.map((genre) => (
          <GenreTag key={genre} genre={genre} />
        ))}
      </div>

      <p
        className={
          fullSynopsis
            ? `${styles['movie-info__synopsis--full']}`
            : `${styles['movie-info__synopsis']}`
        }
      >
        {synopsis}
      </p>
    </section>
  )
}

export default MovieInfo
