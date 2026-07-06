import { useCart } from "../../context/CartContext"
import { Button } from "../ui/button"
import { Card, CardContent } from "../ui/card"
import type { CartItem as CartItemType } from "../../context/CartContext"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <Card className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Imagen */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          {item.image || "📦"}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-[#303030]">{item.name}</h3>
          <p className="text-[#7D5FFF] font-bold">${item.price.toLocaleString()} c/u</p>
        </div>

        {/* Cantidad */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full border-2 border-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition flex items-center justify-center font-bold"
          >
            −
          </button>
          <span className="text-lg font-bold w-8 text-center">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full border-2 border-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition flex items-center justify-center font-bold"
          >
            +
          </button>
        </div>

        {/* Subtotal y eliminar */}
        <div className="flex items-center gap-4">
          <p className="font-bold text-[#603060] min-w-[80px] text-right">
            ${(item.price * item.quantity).toLocaleString()}
          </p>
          <Button
            variant="ghost"
            className="text-[#FF6B81] hover:bg-[#FF6B81]/10"
            onClick={() => removeItem(item.id)}
          >
            ✕
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}