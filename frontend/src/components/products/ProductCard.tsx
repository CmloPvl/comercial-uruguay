// 📁 frontend/src/components/products/ProductCard.tsx

import { useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import type { Product } from "../../services/productService";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onAddToCart?: () => Promise<void> | void;
  showActions?: boolean;
  variant?: "default" | "carousel";
}

export default function ProductCard({
  product,
  isFavorite = false,
  onToggleFavorite,
  onAddToCart,
  showActions = true,
  variant = "default",
}: ProductCardProps) {
  const [adding, setAdding] = useState(false);

  const finalPrice =
    product.isOnSale && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  // 🆕 Como el catálogo no opera en vivo, siempre mostrar "Stock a confirmar"
  const needsStockCheck = true;

  const hasImage =
    product.images && Array.isArray(product.images) && product.images.length > 0;

  const isOnSale = product.isOnSale && product.discount > 0;

  const hasPack =
    product.packPrice != null &&
    product.packQuantity != null &&
    product.packQuantity > 0 &&
    product.packPrice > 0;

  const isCarousel = variant === "carousel";

  // 🆕 Ya no necesitamos crop (la imagen ya está recortada en Supabase)
  const aspectClass = "aspect-square";

  const handleAddClick = async () => {
    if (!onAddToCart) return;
    setAdding(true);
    try {
      await onAddToCart();
    } finally {
      setAdding(false);
    }
  };

  return (
    <Card
      className={`
        border-2 border-[#00D2D3] hover:border-[#7D5FFF]
        transition-all hover:shadow-xl sm:hover:-translate-y-1
        group h-full flex flex-col overflow-hidden
        ${isCarousel ? "min-h-[400px]" : ""}
      `}
    >
      <CardContent className="flex flex-col h-full p-0">
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
                className="w-full h-full object-cover transition-transform duration-300 sm:group-hover:scale-105"
              />
            ) : (
              <span className="text-5xl sm:text-6xl">📦</span>
            )}

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

        <div
          className={`
            flex flex-col flex-grow
            ${isCarousel ? "p-3 sm:p-3.5 space-y-1.5" : "p-3 sm:p-4 space-y-2"}
          `}
        >
          {product.category_name && (
            <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 w-fit text-[10px] sm:text-xs">
              {product.category_name}
            </Badge>
          )}

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

          {hasPack && (
            <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-1.5 sm:p-2">
              <p className="text-[10px] sm:text-xs font-bold text-[#603060] text-center">
                🎁 {product.packQuantity} por ${product.packPrice!.toLocaleString("es-CL")}
              </p>
            </div>
          )}

          {needsStockCheck && (
            <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-1.5 sm:p-2">
              <p className="text-[10px] sm:text-xs font-bold text-[#603060] text-center">
                📲 Stock a confirmar por WhatsApp
              </p>
            </div>
          )}

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