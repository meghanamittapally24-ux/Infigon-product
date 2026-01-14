"use client"

import { useEffect, useState } from "react"
import { fetchProducts } from "@/lib/api"
import { Product } from "@/types/product"
import ProductCard from "@/components/ProductCard"
import SearchBar from "@/components/SearchBar"
import CategoryFilter from "@/components/CategoryFilter"
import Loader from "@/components/Loader"
import ErrorState from "@/components/ErrorState"
import { getFavorites } from "@/lib/storage"

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />
  if (error) return <ErrorState message={error} />

  const favorites = getFavorites()

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory = category
      ? product.category === category
      : true

    const matchesFavorites = showFavorites
      ? favorites.includes(product.id)
      : true

    return matchesSearch && matchesCategory && matchesFavorites
  })

  const categories = Array.from(
    new Set(products.map(product => product.category))
  )

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6">
      <h1 className="text-3xl font-bold text-black text-center mb-6">
        Products
      </h1>

      {/* FILTER BAR */}
      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter
          categories={categories}
          selected={category}
          onChange={setCategory}
        />
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="px-4 py-2 border border-black rounded text-black"
        >
          {showFavorites ? "Show All" : "Show Favorites"}
        </button>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}



