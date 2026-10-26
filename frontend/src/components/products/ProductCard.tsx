// 📁 frontend/src/components/products/ProductCard.tsx

/**
 * 📌 PRODUCT CARD
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Tarjeta individual de producto que se muestra en el grid de la tienda.
 * 
 * ✅ Responsabilidades:
 * - Mostrar la información del producto (imagen, nombre, precio, categoría)
 * - Mostrar estado de oferta y descuento
 * - Mostrar estado de stock (agotado)
 * - Botón "Agregar al carrito"
 * - Botón "Favoritos" (corazón)
 * - 🆕 Mostrar badge de pack promocional ("3 por $1000")
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica de negocio
 * - Maneja estados visuales (sin stock, oferta, favorito, pack)
 * - Accesible (alt en imágenes, labels)
 * - Lazy loading de imágenes
 * - Altura consistente en el grid
 */

import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import type { Product } from "../../services/productService";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => void;
  showActions?: boolean;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  showActions = true,
}: ProductCardProps) {
  // =============================================
  // 🧮 CÁLCULOS DERIVADOS
  // =============================================

  const finalPrice =
    product.isOnSale && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const isOutOfStock = product.stock === 0;

  const hasImage =
    product.images && Array.isArray(product.images) && product.images.length > 0;

  const isOnSale = product.isOnSale && product.discount > 0;

  // 🆕 ¿Tiene pack promocional?
  const hasPack =
    product.packPrice != null &&
    product.packQuantity != null &&
    product.packQuantity > 0 &&
    product.packPrice > 0;

  // =============================================
  // 🖥️ RENDERIZADO
  // =============================================

  return (
    <Card className="border-2 border-[#00D2D3]/30 hover:border-[#7D5FFF] transition-all hover:shadow-xl group h-full flex flex-col">
      <CardContent className="p-4 flex flex-col flex-grow">
        {/* =============================================
        🖼️ IMAGEN (con Link al detalle)
        ============================================= */}
        <Link to={`/producto/${product.id}`}>
          <div className="aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            {hasImage ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-6xl">📦</span>
            )}
          </div>
        </Link>

        {/* =============================================
        🏷️ CATEGORÍA (si existe)
        ============================================= */}
        {product.category && (
          <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 mb-2 w-fit">
            {product.category.name}
          </Badge>
        )}

        {/* =============================================
        📝 NOMBRE DEL PRODUCTO
        ============================================= */}
        <Link to={`/producto/${product.id}`}>
          <h3 className="font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors line-clamp-2 min-h-[48px]">
            {product.name}
          </h3>
        </Link>

        {/* =============================================
        💰 PRECIO Y OFERTA
        ============================================= */}
        <div className="flex items-center justify-between mt-3 mb-2">
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">
                ${product.price.toLocaleString("es-CL")}
              </span>
            )}
            <span className={`text-lg font-extrabold ${isOnSale ? "text-[#FF6B81]" : "text-[#603060]"}`}>
              ${Math.round(finalPrice).toLocaleString("es-CL")}
            </span>
          </div>
          {isOnSale && (
            <Badge className="bg-[#FF6B81] text-white font-bold text-xs">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* =============================================
        🆕 PACK PROMOCIONAL
        ============================================= */}
        {hasPack && (
          <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-2 mb-2">
            <p className="text-xs font-bold text-[#603060] text-center">
              🎁 {product.packQuantity} por ${product.packPrice!.toLocaleString("es-CL")}
            </p>
          </div>
        )}

        {/* =============================================
        🎯 ACCIONES (Botones)
        ============================================= */}
        {showActions && (
          <div className="flex gap-2 mt-auto pt-2">
            <Button
              onClick={onAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isOutOfStock ? "Producto sin stock" : `Agregar ${product.name} al carrito`}
            >
              {isOutOfStock ? "Sin Stock" : "🛒 Agregar"}
            </Button>

            {onToggleFavorite && (
              <Button
                variant="outline"
                onClick={onToggleFavorite}
                className={`border-2 ${
                  isFavorite
                    ? "border-[#FF6B81] text-[#FF6B81] bg-[#FF6B81]/10"
                    : "border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10"
                } font-bold text-sm py-2 px-4 rounded-lg transition-all hover:scale-[1.02]`}
                aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
              >
                {isFavorite ? "❤️" : "♡"}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}