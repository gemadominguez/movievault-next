'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { searchMovies, getGenres } from '@/tmdb'
import MovieCard from './MovieCard'
import TopHeader from './TopHeader'
import styles from './SearchResults.module.css'

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState([])
  const [genres, setGenres] = useState([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      if (query) {
        const [foundMovies, genreList] = await Promise.all([
          searchMovies(query),
          getGenres()
        ])
        setResults(foundMovies)
        setGenres(genreList)
      }
    }

    fetchData()
  }, [query])

  const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id)
        return genre ? genre.name : null
      })
      .filter(Boolean)
      .slice(0, 2)
  }

  return (
    <div className="container">
      <TopHeader />
      <h2 className={styles['search-title']}>
        {results.length > 0
          ? `Resultados para "${query}"`
          : `No se encontraron resultados para "${query}"`}
      </h2>

      <div className={`grid-12 ${styles['search-results']}`}>
        {results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => router.push(`/movie/${movie.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <MovieCard
              title={movie.title}
              rating={movie.vote_average.toFixed(1)}
              genres={getGenreNames(movie.genre_ids)}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              id={movie.id}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchResults
