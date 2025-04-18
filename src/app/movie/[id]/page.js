'use client'

import { use, useEffect, useState } from 'react'
import { getMovieDetails, getMovieCredits } from '@/tmdb'

import TopHeader from '@/components/TopHeader'
import MovieInfo from '@/components/MovieInfo'
import WatchInfo from '@/components/WatchInfo'
import CastList from '@/components/CastList'
import TrailerEmbed from '@/components/TrailerEmbed'
import styles from '@/components/MoviePage.module.css'

export default function MoviePage({ params }) {
  const { id: movieId } = use(params)

  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [tmdbTrailerKey, setTmdbTrailerKey] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieDetails(movieId)
        setMovie(data)

        const credits = await getMovieCredits(movieId)
        setCast(credits)

        const trailers = data.videos?.results?.filter(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )

        if (trailers && trailers.length > 0) {
          setTmdbTrailerKey(trailers[0].key)
        }
      } catch (error) {
        console.error('Error fetching movie data:', error)
      }
    }

    fetchData()
  }, [movieId])

  if (!movie) return <p style={{ color: 'white' }}>Cargando película...</p>

  return (
    <div className="container">
      <TopHeader />

      <div className={`grid-12 ${styles['movie-detail__section']}`}>
        <div className={`grid-4 ${styles['movie-detail__info']}`}>
          <MovieInfo
            showTopLabel={false}
            rating={movie.vote_average.toFixed(1)}
            title={movie.title}
            synopsis={movie.overview}
            genres={movie.genres.map((g) => g.name)}
            fullSynopsis={true}
          />
          <WatchInfo movieId={movie.id} />

        </div>

        <div className="grid-8">
          <TrailerEmbed title={movie.title} tmdbTrailerKey={tmdbTrailerKey} />
        </div>
      </div>

      <CastList cast={cast} />
    </div>
  )
}
