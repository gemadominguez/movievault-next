import Header from '../components/Header'
import { getPopularMovies, getGenres } from '@/tmdb'

export default async function HomePage() {
  const movies = await getPopularMovies()
  const genres = await getGenres()

  return (
    <Header
      movies={movies}
      genres={genres}
      featuredMovie={movies[0]}
    />
  )
}
