import ProductGrid from "./ProductGrid"
import type { Product } from "../../services/productService"

interface ProductListProps {
  products: Product[]
  favorites?: Set<string>
  onToggleFavorite?: (productId: string) => void
  onAddToCart?: (productId: string) => void
}

export default function ProductList({ 
  products, 
  favorites, 
  onToggleFavorite, 
  onAddToCart 
}: ProductListProps) {
  return (
    <ProductGrid 
      products={products}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  )
}