// 📁 frontend/src/components/products/ProductCard.tsx

/**
 * 📌 PRODUCT CARD
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Tarjeta individual de producto reutilizable en:
 * - Grid del catálogo (variant="default")
 * - Carrusel de destacados (variant="carousel")
 * 
 * ✅ Responsabilidades:
 * - Mostrar info del producto (imagen, nombre, precio, categoría)
 * - Mostrar oferta y descuento
 * - Mostrar estado de stock (disponible / consultar)
 * - Mostrar pack promocional
 * - Botón "Agregar al carrito" con loader
 * - Botón "Favoritos" (corazón)
 * 
 * ✅ Buenas prácticas:
 * - Mobile first
 * - Altura consistente (min-h fijo en nombre)
 * - Jerarquía visual clara
 * - Imagen edge-to-edge (ocupa todo el ancho, sin padding)
 * 
 * 🆕 Soporte para crops (recortes de imagen)
 *    - Si hay crop: aplica objectPosition + scale + aspect dinámico
 *    - Si no hay crop: object-cover (llena el contenedor)
 *    - El fondo degradado solo se ve si no hay imagen
 * 
 * 🔧 Fix: CardContent sin flex-grow (evita espacio blanco abajo)
 * 🔧 Fix: min-h del nombre subido a 48px/56px (2 líneas fijas)
 * 🔧 Fix: text-xssm:text-sm → text-xs sm:text-sm (typo)
 */

import { useState } from "react";
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
  onAddToCart?: () => Promise<void> | void;
  showActions?: boolean;
  variant?: "default" | "carousel";
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
  variant = "default",
}: ProductCardProps) {
  const [adding, setAdding] = useState(false);

  // =============================================
  // 🧮 CÁLCULOS DERIVADOS
  // =============================================
  const finalPrice =
    product.isOnSale && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  const needsStockCheck = product.stock === 0;

  const hasImage =
    product.images && Array.isArray(product.images) && product.images.length > 0;

  const isOnSale = product.isOnSale && product.discount > 0;

  const hasPack =
    product.packPrice != null &&
    product.packQuantity != null &&
    product.packQuantity > 0 &&
    product.packPrice > 0;

  const isCarousel = variant === "carousel";

  // =============================================
  // 🆕 CROP: recorte de la primera imagen
  // =============================================
  const crop = product.crops?.[0] || null;
  const hasCrop = !!crop;

  // =============================================
  // 🆕 ESTILOS DE IMAGEN SEGÚN CROP
  // =============================================
  const imageStyle: React.CSSProperties = hasCrop
    ? {
        objectFit: "cover",
        objectPosition: `${crop.x}px ${crop.y}px`,
        transform: `scale(${crop.zoom})`,
        transformOrigin: "top left",
      }
    : {
        objectFit: "cover",
      };

  // =============================================
  // 🆕 ASPECT DINÁMICO SEGÚN CROP
  // =============================================
  const aspectClass =
    hasCrop && crop.aspect === 16 / 9
      ? "aspect-video"
      : hasCrop && crop.aspect === 3 / 4
      ? "aspect-[3/4]"
      : "aspect-square";

  // =============================================
  // 🆕 HANDLER: AGREGAR AL CARRITO (con loader)
  // =============================================
  const handleAddClick = async () => {
    if (!onAddToCart) return;
    setAdding(true);
    try {
      await onAddToCart();
    } finally {
      setAdding(false);
    }
  };

  // =============================================
  // 🖥️ RENDERIZADO
  // =============================================
  return (
    <Card
      className={`
        border-2 border-[#00D2D3] hover:border-[#7D5FFF]
        transition-all hover:shadow-xl sm:hover:-translate-y-1
        group h-full flex flex-col overflow-hidden
        ${isCarousel ? "min-h-[400px]" : ""}
      `}
    >
      {/* 🔧 CardContent: h-full (no flex-grow) para no dejar espacio blanco */}
      <CardContent className="flex flex-col h-full p-0">
        {/* =============================================
        🖼️ IMAGEN (edge-to-edge, ocupa todo el ancho)
        ============================================= */}
        <Link to={`/producto/${product.id}`} className="block relative">
          <div
            className={`
              relative
              ${aspectClass}
              bg-gradient-to-br
              ${isCarousel
                ? "from-[#FFD93D]/20 to-[#FF6B81]/20"
                : "from-[#F0F0C0]/30 to-[#F0C0F0]/30"
              }
              flex items-center justify-center
              overflow-hidden
            `}
          >
            {hasImage ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className="w-full h-full transition-transform duration-300 sm:group-hover:scale-105"
                style={imageStyle}
              />
            ) : (
              // Sin imagen: mostrar ícono placeholder sobre el fondo degradado
              <span className="text-5xl sm:text-6xl">📦</span>
            )}

            {/* Badge de oferta */}
            {isOnSale && (
              <Badge
                className={`
                  absolute bg-[#FF6B81] text-white font-bold z-10
                  ${isCarousel
                    ? "top-1.5 left-1.5 px-1.5 py-0.5 text-[10px] rounded-full animate-pulse"
                    : "top-2 left-2 px-2 py-1 text-[10px] sm:text-xs rounded-full"
                  }
                `}
              >
                {isCarousel ? "🔥 " : ""}-{product.discount}%
              </Badge>
            )}
          </div>
        </Link>

        {/* =============================================
        📝 CONTENIDO (con padding para que respire)
        ============================================= */}
        <div
          className={`
            flex flex-col flex-grow
            ${isCarousel ? "p-3 sm:p-3.5 space-y-1.5" : "p-3 sm:p-4 space-y-2"}
          `}
        >
          {/* Categoría */}
          {product.category_name && (
            <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 w-fit text-[10px] sm:text-xs">
              {product.category_name}
            </Badge>
          )}

          {/* Nombre */}
          <Link to={`/producto/${product.id}`}>
            <h3
              className={`
                font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors
                line-clamp-2
                ${isCarousel
                  ? "text-sm sm:text-base min-h-[40px] sm:min-h-[48px]"
                  : "text-sm sm:text-base min-h-[48px] sm:min-h-[56px]"
                }
              `}
            >
              {product.name}
            </h3>
          </Link>

          {/* Precio */}
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-[10px] sm:text-xs text-gray-400 line-through">
                ${product.price.toLocaleString("es-CL")}
              </span>
            )}
            <span
              className={`
                font-bold
                ${isOnSale ? "text-[#FF6B81]" : "text-[#603060]"}
                ${isCarousel ? "text-base sm:text-lg" : "text-base sm:text-lg"}
              `}
            >
              ${Math.round(finalPrice).toLocaleString("es-CL")}
            </span>
          </div>

          {/* Pack promocional */}
          {hasPack && (
            <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-1.5 sm:p-2">
              <p className="text-[10px] sm:text-xs font-bold text-[#603060] text-center">
                🎁 {product.packQuantity} por ${product.packPrice!.toLocaleString("es-CL")}
              </p>
            </div>
          )}

          {/* Stock por WhatsApp */}
          {needsStockCheck && (
            <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-1.5 sm:p-2">
              <p className="text-[10px] sm:text-xs font-bold text-[#603060] text-center">
                📲 Stock por WhatsApp
              </p>
            </div>
          )}

          {/* =============================================
          🎯 ACCIONES (dentro del padding del contenido)
          ============================================= */}
          {showActions && (
            <div className="flex gap-1.5 sm:gap-2 mt-auto pt-2 sm:pt-3">
              <Button
                onClick={handleAddClick}
                disabled={adding}
                className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold text-xs sm:text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all sm:hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed"
                aria-label={`Agregar ${product.name} al carrito`}
              >
                {adding ? "Agregando..." : "🛒 Agregar"}
              </Button>

              {onToggleFavorite && (
                <Button
                  variant="outline"
                  onClick={onToggleFavorite}
                  className={`
                    border-2 font-bold text-xs sm:text-sm py-2 px-2.5 sm:px-3 rounded-lg
                    transition-all sm:hover:scale-[1.02]
                    ${isFavorite
                      ? "border-[#FF6B81] text-[#FF6B81] bg-[#FF6B81]/10"
                      : "border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10"
                    }
                  `}
                  aria-label={isFavorite ? `Quitar ${product.name} de favoritos` : `Agregar ${product.name} a favoritos`}
                >
                  {isFavorite ? "❤️" : "♡"}
                </Button>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}