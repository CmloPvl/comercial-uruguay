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
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica de negocio
 * - Maneja estados visuales (sin stock, oferta, favorito)
 * - Accesible (alt en imágenes, labels)
 * 
 * @param {Object} props
 * @param {Product} props.product - Datos del producto
 * @param {boolean} [props.isFavorite] - Si el producto está en favoritos
 * @param {Function} [props.onToggleFavorite] - Función para agregar/eliminar favoritos
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @param {boolean} [props.showActions] - Mostrar botones de acción (por defecto: true)
 * @returns {JSX.Element} - Tarjeta de producto
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
  /** Datos del producto a mostrar */
  product: Product;
  /** Indica si el producto está en favoritos (por defecto: false) */
  isFavorite?: boolean;
  /** Función para agregar/eliminar de favoritos */
  onToggleFavorite?: () => void;
  /** Función para agregar al carrito */
  onAddToCart?: () => void;
  /** Mostrar botones de acción (por defecto: true) */
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

  // ✅ Precio final: si está en oferta, aplica el descuento
  const finalPrice =
    product.isOnSale && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // ✅ ¿Está agotado?
  const isOutOfStock = product.stock === 0;

  // ✅ ¿Tiene imagen?
  const hasImage =
    product.images && Array.isArray(product.images) && product.images.length > 0;

  // =============================================
  // 🖥️ RENDERIZADO
  // =============================================

  return (
    // 🃏 Tarjeta con efecto hover
    <Card className="border-2 border-[#00D2D3]/30 hover:border-[#7D5FFF] transition-all hover:shadow-xl group">
      <CardContent className="p-4">
        {/* =============================================
        🖼️ IMAGEN (con Link al detalle)
        ============================================= */}
        <Link to={`/producto/${product.id}`}>
          <div className="aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            {hasImage ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              // 📦 Placeholder si no hay imagen
              <span className="text-6xl">📦</span>
            )}
          </div>
        </Link>

        {/* =============================================
        🏷️ CATEGORÍA (si existe)
        ============================================= */}
        {product.category && (
          <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 mb-2">
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
        <div className="flex items-center justify-between mt-2">
          <div>
            {/* Precio original (tachado) si está en oferta */}
            {product.isOnSale && product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through mr-2">
                ${product.price.toLocaleString("es-CL")}
              </span>
            )}
            {/* Precio final (destacado) */}
            <span className="text-lg font-extrabold text-[#603060]">
              ${Math.round(finalPrice).toLocaleString("es-CL")}
            </span>
          </div>
          {/* Badge de descuento */}
          {product.isOnSale && product.discount > 0 && (
            <Badge className="bg-[#FF6B81] text-white font-bold">
              -{product.discount}%
            </Badge>
          )}
        </div>

        {/* =============================================
        🎯 ACCIONES (Botones)
        ============================================= */}
        {showActions && (
          <div className="flex gap-2 mt-3">
            {/* 🛒 Botón: Agregar al carrito */}
            <Button
              onClick={onAddToCart}
              disabled={isOutOfStock}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={isOutOfStock ? "Producto sin stock" : "Agregar al carrito"}
            >
              {isOutOfStock ? "Sin Stock" : "🛒 Agregar"}
            </Button>

            {/* ❤️ Botón: Favoritos */}
            {onToggleFavorite && (
              <Button
                variant="outline"
                onClick={onToggleFavorite}
                className={`border-2 ${
                  isFavorite
                    ? "border-[#FF6B81] text-[#FF6B81] bg-[#FF6B81]/10"
                    : "border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10"
                } font-bold text-sm py-2 px-4 rounded-lg transition-all hover:scale-[1.02]`}
                aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
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