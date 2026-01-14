import { Product } from "@/types/product"

const BASE_URL = "https://fakestoreapi.com"

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`)
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export async function fetchProductById(id: string): Promise<Product> {
  if (!id) {
    throw new Error("Product ID is missing")
  }

  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store", // VERY IMPORTANT
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch product ${id}`)
  }

  const text = await res.text()

  if (!text) {
    throw new Error("Empty API response")
  }

  return JSON.parse(text)
}




