'use client'

import { useState } from 'react'
import styles from './SearchBar.module.css'
import { useRouter } from 'next/navigation'

function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles['search-bar']}>
      <input
        className={styles['search-bar__input']}
        type="text"
        placeholder="search a movie"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        name="search"
        id="search-input"
      />
      <button type="submit" className={styles['search-bar__button']}>
        <img src="/icons/lupa.svg" alt="search icon" />
      </button>
    </form>
  )
}

export default SearchBar
