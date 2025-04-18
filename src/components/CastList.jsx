'use client'

import { useRef } from 'react'
import Image from 'next/image'

import arrowLeft from '@/assets/icons/arrow_left.svg'
import arrowRight from '@/assets/icons/arrow_right.svg'
import noPhoto from '@/assets/noPhoto.png'

import styles from './CastList.module.css'

function CastList({ cast }) {
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' })
  }

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' })
  }

  return (
    <div className={`grid-12 ${styles['cast-list']}`}>
      <div className={styles['cast-list__header']}>
        <h3 className={styles['cast-list__title']}>Casting</h3>

        <div className={styles['cast-list__arrows']}>
          <button
            className={`${styles['cast-list__arrow']} ${styles['cast-list__arrow--left']}`}
            onClick={scrollLeft}
          >
            <Image src={arrowLeft} alt="Scroll left" width={24} height={24} />
          </button>

          <button
            className={`${styles['cast-list__arrow']} ${styles['cast-list__arrow--right']}`}
            onClick={scrollRight}
          >
            <Image src={arrowRight} alt="Scroll right" width={24} height={24} />
          </button>
        </div>
      </div>

      <div className={styles['cast-list__wrapper']}>
        <div className={styles['cast-list__carousel']} ref={scrollRef}>
          {cast.slice(0, 12).map((actor) => (
            <div key={actor.id} className={styles['cast-list__item']}>
              <div className={styles['cast-list__image-wrapper']}>
                <Image
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : noPhoto
                  }
                  alt={actor.name}
                  priority
                  className={styles['cast-list__image']}
                  width={185}
                  height={278}
                />
                <div className={styles['cast-list__overlay']} />
                <span className={styles['cast-list__name']}>{actor.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CastList
