// src/components/products/ProductList.tsx
import ProductCard from "./ProductCard"
import { Card, CardContent } from "../ui/card"

interface Product {
  id: number
  name: string
  price: number
  image?: string
  isOnSale?: boolean
  discount?: number
  stock?: number
}

interface ProductListProps {
  products: Product[]
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card className="border-2 border-[#FFD93D] shadow-lg">
        <CardContent className="py-12 text-center">
          <div className="text-6xl mb-4 animate-bounce">🔍</div>
          <h3 className="text-xl font-bold text-[#603060]">No encontramos productos</h3>
          <p className="text-gray-500 mt-2 max-w-md mx-auto">
            Probá ajustando el rango de precio o quitando alguno de los filtros aplicados.
          </p>
          <div className="flex justify-center gap-3 mt-4">
            <span className="inline-block px-3 py-1 bg-[#FFD93D]/20 text-[#FFD93D] rounded-full text-xs font-medium">
              🧹 Limpia los filtros
            </span>
            <span className="inline-block px-3 py-1 bg-[#00D2D3]/20 text-[#00D2D3] rounded-full text-xs font-medium">
              🔄 Intenta de nuevo
            </span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}