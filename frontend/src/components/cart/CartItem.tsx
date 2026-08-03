// 📁 frontend/src/components/cart/CartItem.tsx

/**
 * 📌 CART ITEM
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra un producto en el carrito de compras.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props (NO usa contexto directamente)
 * - Reutilizable en otras partes de la app
 * - Fácil de testear (no depende de contexto)
 * - Accesible (aria-labels en botones)
 * 
 * @param {Object} props
 * @param {CartItemType} props.item - Datos del producto en el carrito
 * @param {Function} props.onUpdateQuantity - Función para actualizar cantidad
 * @param {Function} props.onRemoveItem - Función para eliminar producto
 * @returns {JSX.Element} - Tarjeta del producto en el carrito
 */

import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import type { CartItem as CartItemType } from "../../context/CartContext";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface CartItemProps {
  /** Datos del producto en el carrito */
  item: CartItemType;
  /** Función para actualizar la cantidad del producto */
  onUpdateQuantity: (id: number | string, quantity: number) => Promise<void>;
  /** Función para eliminar el producto del carrito */
  onRemoveItem: (id: number | string) => Promise<void>;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function CartItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
}: CartItemProps) {
  // =============================================
  // 🧮 FUNCIÓN AUXILIAR
  // =============================================

  /**
   * formatPrice: Formatea un número como precio en CLP
   * @param {number} price - Precio a formatear
   * @returns {string} - Precio formateado (ej: "1.500")
   */
  const formatPrice = (price: number): string => {
    return price.toLocaleString("es-CL");
  };

  // =============================================
  // 🖥️ RENDERIZADO
  // =============================================

  return (
    <Card className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition">
      <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-4">
        
        {/* =============================================
        🖼️ IMAGEN
        ============================================= */}
        <div className="w-20 h-20 bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 rounded-lg flex items-center justify-center text-3xl flex-shrink-0">
          {item.image || "📦"}
        </div>

        {/* =============================================
        📝 INFORMACIÓN DEL PRODUCTO
        ============================================= */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-bold text-[#303030]">{item.name}</h3>
          <p className="text-[#7D5FFF] font-bold">${formatPrice(item.price)} c/u</p>
        </div>

        {/* =============================================
        🔢 CONTROLES DE CANTIDAD
        ============================================= */}
        <div className="flex items-center gap-2">
          {/* Botón: Disminuir cantidad */}
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-8 h-8 rounded-full border-2 border-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition flex items-center justify-center font-bold"
            aria-label="Disminuir cantidad"
            disabled={item.quantity <= 1}
          >
            −
          </button>

          {/* Cantidad actual */}
          <span className="text-lg font-bold w-8 text-center" aria-label="Cantidad">
            {item.quantity}
          </span>

          {/* Botón: Aumentar cantidad */}
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-8 h-8 rounded-full border-2 border-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition flex items-center justify-center font-bold"
            aria-label="Aumentar cantidad"
            disabled={item.quantity >= item.stock}
          >
            +
          </button>
        </div>

        {/* =============================================
        💰 SUBTOTAL Y ELIMINAR
        ============================================= */}
        <div className="flex items-center gap-4">
          <p className="font-bold text-[#603060] min-w-[80px] text-right">
            ${formatPrice(item.price * item.quantity)}
          </p>
          <Button
            variant="ghost"
            className="text-[#FF6B81] hover:bg-[#FF6B81]/10"
            onClick={() => onRemoveItem(item.id)}
            aria-label="Eliminar producto del carrito"
          >
            ✕
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}