import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"
import type { Product } from "../../services/productService"

interface ProductCardProps {
  product: Product
  isFavorite?: boolean
  onToggleFavorite?: () => void
  onAddToCart?: () => void
  showActions?: boolean
}

export default function ProductCard({ 
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  showActions = true
}: ProductCardProps) {
  const finalPrice = product.isOnSale && product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product.price

  const isOutOfStock = product.stock === 0
  const hasImage = product.images && Array.isArray(product.images) && product.images.length > 0

  return (
    <Card className="border-2 border-[#00D2D3]/30 hover:border-[#7D5FFF] transition-all hover:shadow-xl group">
      <CardContent className="p-4">
        {/* Imagen */}
        <Link to={`/producto/${product.id}`}>
          <div className="aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            {hasImage ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-6xl">📦</span>
            )}
          </div>
        </Link>

        {/* Categoría */}
        {product.category && (
          <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 mb-2">
            {product.category.name}
          </Badge>
        )}

        {/* Nombre */}
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* Precio */}
        <div className="flex items-center justify-between mt-2">
          <div>
            {product.isOnSale && product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${product.price.toLocaleString('es-CL')}
              </span>
            )}
            <span className="text-lg font-extrabold text-[#603060]">
              ${Math.round(finalPrice).toLocaleString('es-CL')}
            </span>
          </div>
          {product.isOnSale && product.discount > 0 && (
            <Badge className="bg-[#FF6B81] text-white">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* Acciones */}
        {showActions && (
          <div className="flex gap-2 mt-3">
            <Button
              onClick={onAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? "Sin Stock" : "🛒 Agregar"}
            </Button>
            {onToggleFavorite && (
              <Button
                variant="outline"
                onClick={onToggleFavorite}
                className={`border-2 ${isFavorite ? 'border-[#FF6B81] text-[#FF6B81] bg-[#FF6B81]/10' : 'border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10'} font-bold text-sm py-2 px-4 rounded-lg transition-all hover:scale-[1.02]`}
              >
                {isFavorite ? '❤️' : '♡'}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}