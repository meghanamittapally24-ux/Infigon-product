const FAVORITES_KEY = "favorite_products"

export function getFavorites(): number[] {
  if (typeof window === "undefined") return []
  return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
}

export function toggleFavorite(id: number): number[] {
  const favorites = getFavorites()

  const updatedFavorites = favorites.includes(id)
    ? favorites.filter(item => item !== id)
    : [...favorites, id]

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites))
  return updatedFavorites
}
