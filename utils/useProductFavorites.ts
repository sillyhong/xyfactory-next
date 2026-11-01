import { useEffect, useState } from 'react'

const STORAGE_KEY = 'xy-product-favorites'

export function useProductFavorites(productPath: string) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const sync = () => {
      try {
        const stored: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
        setFavorites(Array.isArray(stored) ? stored.filter((value): value is string => typeof value === 'string') : [])
      } catch {
        setFavorites([])
      }
    }
    sync()
    window.addEventListener('storage', sync)
    return () => window.removeEventListener('storage', sync)
  }, [])

  const toggleFavorite = () => {
    if (!productPath) return
    const next = favorites.includes(productPath)
      ? favorites.filter((path) => path !== productPath)
      : [...favorites, productPath]
    setFavorites(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      // Keep the control usable for this visit when browser storage is disabled.
    }
  }

  return { isFavorite: favorites.includes(productPath), toggleFavorite }
}
