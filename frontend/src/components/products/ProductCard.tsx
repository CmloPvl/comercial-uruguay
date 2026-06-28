// src/components/products/ProductCard.tsx
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { Card, CardContent } from "../ui/card"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image?: string
  isOnSale?: boolean
  discount?: number
  stock?: number
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  isOnSale = false, 
  discount = 0,
  stock = 10 
}: ProductCardProps) {
  const finalPrice = isOnSale && discount > 0 ? price * (1 - discount / 100) : price
  const isOutOfStock = stock === 0

  // Colores aleatorios para bordes (variedad)
  const borderColors = [
    "border-[#00D2D3] hover:border-[#7D5FFF]",
    "border-[#FF6B81] hover:border-[#FFD93D]",
    "border-[#FFD93D] hover:border-[#00D2D3]",
    "border-[#7D5FFF] hover:border-[#FF6B81]",
    "border-[#FF9F43] hover:border-[#7D5FFF]",
    "border-[#90C090] hover:border-[#FFD93D]",
  ]
  const randomBorder = borderColors[id % borderColors.length]

  return (
    <Card className={`border-2 ${randomBorder} shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden group`}>
      <CardContent className="p-4">
        {/* Imagen */}
        <div className="relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition">
          {image || "📦"}
          {isOnSale && discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold animate-pulse">
              🔥 -{discount}%
            </Badge>
          )}
          {isOutOfStock && (
            <Badge className="absolute top-2 right-2 bg-[#303030] text-white font-bold">
              ⛔ Sin Stock
            </Badge>
          )}
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition-colors line-clamp-1">
          {name}
        </h3>
        
        {/* Precio */}
        <div className="flex items-center gap-2 mt-1">
          {isOnSale && discount > 0 && (
            <span className="text-sm text-gray-400 line-through">${price.toLocaleString()}</span>
          )}
          <p className={`font-bold text-xl ${isOnSale ? 'text-[#FF6B81]' : 'text-[#7D5FFF]'}`}>
            ${Math.round(finalPrice).toLocaleString()}
          </p>
          {isOnSale && discount > 0 && (
            <Badge className="bg-[#FFD93D] text-[#303030] text-xs">
              Ahorra ${Math.round(price * discount / 100).toLocaleString()}
            </Badge>
          )}
        </div>

        {/* Stock */}
        <p className={`text-sm mt-1 flex items-center gap-1 ${isOutOfStock ? 'text-[#FF6B81]' : 'text-[#00D2D3]'}`}>
          {isOutOfStock ? '❌ Agotado' : `✅ ${stock} unidades disponibles`}
        </p>

        {/* Botones */}
        <div className="flex gap-2 mt-3">
          <Link to={`/producto/${id}`} className="flex-1">
            <Button variant="outline" className="w-full border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition-all">
              👁️ Ver detalle
            </Button>
          </Link>
          {!isOutOfStock ? (
            <Button className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold transition-all hover:scale-105">
              🛒 Agregar
            </Button>
          ) : (
            <Button className="flex-1 bg-gray-300 text-gray-500 cursor-not-allowed">
              🔔 Avisarme
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}