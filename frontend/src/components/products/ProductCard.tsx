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
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - Sin lógica de negocio
 * - Maneja estados visuales (stock, oferta, favorito, pack, agregando)
 * - Accesible (alt, aria-labels)
 * - Lazy loading de imágenes
 * - Altura consistente
 * 
 * 🆕 variant="default" | "carousel"
 * 🆕 Stock 0 → "Stock por WhatsApp" (no bloquea agregar)
 * 🆕 Loader al agregar al carrito
 * 🆕 Fix: usa category_name (no category)
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
  // 🎨 ESTILOS SEGÚN VARIANTE
  // =============================================
  const styles = {
    image: isCarousel
      ? "relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl"
      : "aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden",
    name: isCarousel
      ? "font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition line-clamp-1"
      : "font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors line-clamp-2 min-h-[48px]",
    price: isCarousel ? "font-bold text-xl" : "text-lg font-extrabold",
    saleBadge: isCarousel
      ? "absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-2 py-1 rounded-full animate-pulse"
      : "bg-[#FF6B81] text-white font-bold text-xs",
  };

  // =============================================
  // 🖥️ RENDERIZADO
  // =============================================
  return (
    <Card className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:shadow-xl hover:-translate-y-1 group h-full flex flex-col overflow-hidden">
      <CardContent className="p-4 flex flex-col flex-grow">
        {/* 🖼️ IMAGEN */}
        <Link to={`/producto/${product.id}`}>
          <div className={styles.image}>
            {hasImage ? (
              <img
                src={product.images[0]}
                alt={product.name}
                loading="lazy"
                className={
                  isCarousel
                    ? "w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                    : "w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                }
              />
            ) : (
              <span className="text-6xl">📦</span>
            )}
            {isOnSale && (
              <Badge className={styles.saleBadge}>
                {isCarousel ? "🔥 " : ""}-{product.discount}%
              </Badge>
            )}
          </div>
        </Link>

        {/* 🏷️ CATEGORÍA (fix: category_name) */}
        {product.category_name && (
          <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 mb-2 w-fit">
            {product.category_name}
          </Badge>
        )}

        {/* 📝 NOMBRE */}
        <Link to={`/producto/${product.id}`}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>

        {/* 💰 PRECIO */}
        <div className={`flex items-center justify-between ${isCarousel ? "mt-1 mb-2" : "mt-3 mb-2"}`}>
          <div className="flex flex-col">
            {isOnSale && (
              <span className="text-xs text-gray-400 line-through">
                ${product.price.toLocaleString("es-CL")}
              </span>
            )}
            <span className={`${styles.price} ${isOnSale ? "text-[#FF6B81]" : "text-[#603060]"}`}>
              ${Math.round(finalPrice).toLocaleString("es-CL")}
            </span>
          </div>
        </div>

        {/* 🎁 PACK */}
        {hasPack && (
          <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-2 mb-2">
            <p className="text-xs font-bold text-[#603060] text-center">
              🎁 {product.packQuantity} por ${product.packPrice!.toLocaleString("es-CL")}
            </p>
          </div>
        )}

        {/* 📲 STOCK POR WHATSAPP */}
        {needsStockCheck && (
          <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-2 mb-2">
            <p className="text-xs font-bold text-[#603060] text-center">
              📲 Stock por WhatsApp
            </p>
          </div>
        )}

        {/* 🎯 ACCIONES */}
        {showActions && (
          <div className="flex gap-2 mt-auto pt-2">
            <Button
              onClick={handleAddClick}
              disabled={adding}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label={`Agregar ${product.name} al carrito`}
            >
              {adding ? "Agregando..." : "🛒 Agregar"}
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