import ProductCard from "./ProductCard"
import type { Product } from "../../services/productService"

interface ProductGridProps {
  products: Product[]
  favorites?: Set<string>
  onToggleFavorite?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export default function ProductGrid({ 
  products, 
  favorites = new Set(), 
  onToggleFavorite, 
  onAddToCart 
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-bold text-[#303030]">No hay productos</h3>
        <p className="text-gray-500 mt-2">Prueba con otros filtros.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(product.id) : undefined}
          onAddToCart={onAddToCart ? () => onAddToCart(product.id) : undefined}
        />
      ))}
    </div>
  )
}