'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getRandomMovie } from '@/tmdb'
import styles from '@/components/LoadingPage.module.css'
import Image from 'next/image'

export default function LoadingPage() {
  const [fadeOut, setFadeOut] = useState(false)
  const router = useRouter()

  useEffect(() => {
    async function loadAndRedirect() {
      const movie = await getRandomMovie()

      setTimeout(() => setFadeOut(true), 3000)
      setTimeout(() => {
        router.push(`/movie/${movie.id}`)
      }, 4000)
    }

    loadAndRedirect()
  }, [])

  return (
    <div className={`${styles.loading} ${fadeOut ? styles['fade-out'] : ''}`}>
      <video autoPlay muted loop className={styles['loading__video']}>
        <source src="/videos/background.mp4" type="video/mp4" />
      </video>

      <div className={styles['loading__content']}>
            <Image
                className={styles['loading__key']}
                src="/icons/key.svg"
                alt="key"
                width={40}
                height={40}
                priority
            />
        <p className={styles['loading__text']}>Looking for a gem in the vault...</p>
      </div>
    </div>
  )
}
