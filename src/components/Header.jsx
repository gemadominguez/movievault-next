'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import styles from './Header.module.css'
import MovieCard from './MovieCard'
import MovieInfo from './MovieInfo'
import TopHeader from './TopHeader'
import Button from './Button'

function Header({ movies, genres, featuredMovie }) {
  const [localMovies, setLocalMovies] = useState([])
  const [currentFeatured, setCurrentFeatured] = useState(null)
  const [animateBackground, setAnimateBackground] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setLocalMovies(movies)
    setCurrentFeatured(featuredMovie)
  }, [movies, featuredMovie])

  useEffect(() => {
    if (!currentFeatured) return
    setAnimateBackground(false)
    const timeout = setTimeout(() => setAnimateBackground(true), 50)
    return () => clearTimeout(timeout)
  }, [currentFeatured?.id])

  // ✨ Automático cada 6 segundos
  useEffect(() => {
    if (!localMovies.length || !currentFeatured) return

    const interval = setInterval(() => {
      const currentIndex = localMovies.findIndex(m => m.id === currentFeatured.id)
      const nextIndex = (currentIndex + 1) % localMovies.length
      const nextMovie = localMovies[nextIndex]
      handleMovieClick(nextMovie)
    }, 6000)

    return () => clearInterval(interval)
  }, [localMovies, currentFeatured])

  const getGenreNames = (ids) => {
    return ids
      .map(id => genres.find(g => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2)
  }

  const backgroundImage = currentFeatured?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentFeatured.backdrop_path}`
    : ''

  const handleMovieClick = (movie) => {
    setCurrentFeatured(movie)
    const reordered = [
      ...localMovies.filter((m) => m.id !== movie.id),
      movie,
    ]
    setLocalMovies(reordered)
  }

  const handleKnowMore = () => {
    if (currentFeatured) {
      router.push(`/movie/${currentFeatured.id}`)
    }
  }

  return (
    <header className={styles['header-container']}>
      <div
        className={`${styles['header-bg']} ${animateBackground ? styles['zoom-animate'] : ''}`}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      <div className="container">
        <TopHeader />

        <div className="grid-12">
          <div className={styles['movie-section']}>
            <div className={`grid-4 ${styles['movie-info__wrapper']}`}>
              {currentFeatured && (
                <MovieInfo
                  title={currentFeatured.title}
                  synopsis={currentFeatured.overview}
                  genres={getGenreNames(currentFeatured.genre_ids)}
                  background={currentFeatured.backdrop_path}
                  fullSynopsis={false}
                  showTopLabel={true}
                />
              )}
              <Button
                text="know more"
                className="btn btn--secondary"
                onClick={handleKnowMore}
              />
            </div>

            <div className={`grid-8 ${styles['movie-cards__wrapper']}`}>
              {localMovies
                .filter((movie) => movie.id !== currentFeatured?.id)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average.toFixed(1)}
                    genres={getGenreNames(movie.genre_ids)}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    onClick={() => handleMovieClick(movie)}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="grid-9"></div>
        <div className={`grid-3 ${styles['tmdb-attribution']}`}>
          <p>
            This website uses the TMDb API but is not endorsed or certified by TMDb.
          </p>
        </div>
      </div>
    </header>
  )
}

export default Header
