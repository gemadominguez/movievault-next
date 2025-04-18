'use client'

import styles from './MovieCard.module.css'
import GenreTag from './GenreTag'
import Image from 'next/image'
import Link from 'next/link'

function MovieCard({ id, title, rating, genres, image, onClick }) {
  return (
    <Link href={`/movie/${id}`} style={{ textDecoration: 'none' }}>
      <div
        className={styles['movie-card']}
        style={{ backgroundImage: `url(${image})` }}
        onClick={onClick}
      >
        <div className={styles['movie-card__rating']}>
          <h3>{rating}</h3>
          <Image src="/icons/star.svg" alt="star" width={24} height={24} />
        </div>

        <div className={styles['movie-card__title']}>
          <h2>{title}</h2>

          <div className={styles['movie-card__genre-tag']}>
            {genres.map((genre) => (
              <GenreTag key={genre} genre={genre} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
