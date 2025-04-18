'use client'

import { useEffect, useState } from 'react'
import styles from './MoviePage.module.css'

function TrailerEmbed({ title, tmdbTrailerKey }) {
  const [ytKey, setYtKey] = useState(null)

  useEffect(() => {
    async function fetchYouTubeTrailer() {
      if (tmdbTrailerKey) {
        setYtKey(tmdbTrailerKey)
        return
      }

      try {
        const query = encodeURIComponent(`${title} trailer`)
        const ytResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}&type=video&maxResults=1`
        )
        const ytData = await ytResponse.json()
        const video = ytData.items?.[0]
        if (video) {
          setYtKey(video.id.videoId)
        }
      } catch (err) {
        console.error('Error fetching trailer from YouTube:', err)
      }
    }

    fetchYouTubeTrailer()
  }, [title, tmdbTrailerKey])

  if (!ytKey) return <p style={{ color: 'white' }}>Cargando tráiler...</p>

  return (
    <div className={styles['movie-detail__video']}>
      <iframe
        src={`https://www.youtube.com/embed/${ytKey}?rel=0&modestbranding=1`}
        title="Trailer"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default TrailerEmbed
