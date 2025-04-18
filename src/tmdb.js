const TMDB_TOKEN = process.env.NEXT_PUBLIC_TMDB_TOKEN

export async function getPopularMovies() {
  const response = await fetch(
    'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.results
}

export async function getGenres() {
  const response = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?language=en',
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.genres
}

export async function getMovieDetails(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=videos`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  if (!response.ok) {
    throw new Error('No se pudieron obtener los detalles de la película')
  }
  return await response.json()
}

export async function getMovieVideos(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.results
}

export async function getMovieCredits(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.cast
}

export async function getRandomMovie() {
  const randomPage = Math.floor(Math.random() * 500) + 1

  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${randomPage}`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )

  const data = await response.json()
  const moviesWithPoster = data.results.filter(
    (m) => m.poster_path && m.overview
  )

  const randomMovie =
    moviesWithPoster[Math.floor(Math.random() * moviesWithPoster.length)]

  return randomMovie
}

export async function searchMovies(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=es-ES`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.results
}

export async function getWatchProviders(movieId) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
      },
    }
  )
  const data = await response.json()
  return data.results?.ES || null
}

