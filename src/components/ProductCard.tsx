"use client"

import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { getFavorites, toggleFavorite } from "@/lib/storage"
import { useEffect, useState } from "react"

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    setFavorites(getFavorites())
  }, [])

  const isFavorite = favorites.includes(product.id)

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites(toggleFavorite(product.id))
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="block no-underline text-black"
    >
      <div
        className="bg-white border border-gray-200 rounded-lg p-2
                   flex gap-2 transition-all duration-200
                   hover:shadow-md"
      >
        {/* IMAGE */}
        <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={90}
            height={90}
            className="object-contain"
          />
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-black leading-tight line-clamp-2">
            {product.title}
          </h3>

          <p className="text-xs text-black capitalize leading-tight">
            {product.category}
          </p>

          <div className="flex items-center justify-between mt-1">
            <span className="text-sm font-bold text-black">
              ₹ {product.price}
            </span>

            <button
              onClick={handleFavorite}
              className={`w-9 h-9 rounded-full flex items-center justify-center
                border text-xl transition
                ${
                  isFavorite
                    ? "bg-red-500 border-red-500 text-white"
                    : "border-black text-black"
                }`}
            >
              {isFavorite ? "♥" : "♡"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}





