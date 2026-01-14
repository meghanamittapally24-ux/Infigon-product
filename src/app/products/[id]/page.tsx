import Image from "next/image"
import { fetchProductById } from "@/lib/api"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params   // ✅ FIX IS HERE

  const product = await fetchProductById(id)

  if (!product) {
    notFound()
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={400}
          className="object-contain"
        />

        <div>
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-lg font-semibold mb-2">
            ₹ {product.price}
          </p>

          <span className="inline-block bg-gray-200 px-3 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
    </main>
  )
}


