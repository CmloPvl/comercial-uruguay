// 📁 frontend/src/components/common/ProductCarousel.tsx

/**
 * 📌 PRODUCT CAROUSEL - COMPONENTE REUTILIZABLE
 * 
 * Carrusel horizontal de productos con scroll nativo.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Usa useProductCarousel para toda la lógica
 * - Recibe productos por props
 * - Lazy loading de imágenes
 * - Flechas de navegación (desktop)
 * - Auto-scroll (opcional)
 * - Indicadores de scroll (puntos)
 * - Responsive (mobile-first)
 * - Reutilizable en toda la app
 * 
 * @param {Object} props
 * @param {Product[]} props.products - Lista de productos
 * @param {Function} props.onAddToCart - Función para agregar al carrito
 * @param {string} props.emptyMessage - Mensaje si no hay productos
 * @param {boolean} props.autoScroll - Auto-scroll activado
 */

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useProductCarousel } from "../../hooks/useProductCarousel";
import type { Product } from "../../services/productService";

// =============================================
// 📦 TIPOS
// =============================================

interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (productId: string, productName: string) => void;
  emptyMessage?: string;
  autoScroll?: boolean;
}

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function ProductCarousel({
  products,
  onAddToCart,
  emptyMessage = "No hay productos disponibles.",
  autoScroll = false,
}: ProductCarouselProps) {
  // =============================================
  // 🧠 LÓGICA (extraída a useProductCarousel)
  // =============================================
  const {
    scrollRef,
    currentIndex,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    handleMouseEnter,
    handleMouseLeave,
    showArrows,
  } = useProductCarousel(products, autoScroll);

  // =============================================
  // 📭 SIN PRODUCTOS
  // =============================================

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6A757C]">{emptyMessage}</p>
      </div>
    );
  }

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* =============================================
      ⬅️ FLECHA IZQUIERDA (desktop)
      ============================================= */}
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#7D5FFF] hover:text-white text-[#7D5FFF] p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* =============================================
      📦 CARRUSEL
      ============================================= */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => {
          const finalPrice =
            product.isOnSale && product.discount > 0
              ? product.price * (1 - product.discount / 100)
              : product.price;
          const hasImage =
            product.images && Array.isArray(product.images) && product.images.length > 0;

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <Card className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group h-full flex flex-col">
                <CardContent className="p-4 flex flex-col flex-grow">
                  {/* Imagen con lazy loading */}
                  <Link to={`/producto/${product.id}`}>
                    <div className="relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                      {hasImage ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          loading="lazy"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        "📦"
                      )}
                      {product.isOnSale && product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-2 py-1 rounded-full animate-pulse">
                          🔥 -{product.discount}%
                        </Badge>
                      )}
                    </div>
                  </Link>

                  {/* Nombre */}
                  <Link to={`/producto/${product.id}`}>
                    <h3 className="font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Precio */}
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    {product.isOnSale && product.discount > 0 ? (
                      <>
                        <span className="text-sm text-[#6A757C] line-through">
                          ${product.price.toLocaleString("es-CL")}
                        </span>
                        <p className="font-bold text-xl text-[#FF6B81]">
                          ${Math.round(finalPrice).toLocaleString("es-CL")}
                        </p>
                      </>
                    ) : (
                      <p className="font-bold text-xl text-[#7D5FFF]">
                        ${Math.round(finalPrice).toLocaleString("es-CL")}
                      </p>
                    )}
                  </div>

                  {/* Botón agregar */}
                  <div className="mt-auto pt-3">
                    <Button
                      onClick={() => onAddToCart(product.id, product.name)}
                      className="w-full bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold transition-all shadow-md hover:shadow-lg rounded-xl"
                    >
                      🛒 Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* =============================================
      ➡️ FLECHA DERECHA (desktop)
      ============================================= */}
      {showArrows && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#7D5FFF] hover:text-white text-[#7D5FFF] p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* =============================================
      🎨 GRADIENTES INDICADORES (móvil)
      ============================================= */}
      {products.length > 1 && (
        <>
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </>
      )}

      {/* =============================================
      🟢 INDICADORES (puntos)
      ============================================= */}
      {showArrows && (
        <div className="flex justify-center gap-1.5 mt-4">
          {products.slice(0, Math.ceil(products.length / 4)).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                Math.floor(currentIndex / 4) === index
                  ? "bg-[#7D5FFF] w-6"
                  : "bg-[#7D5FFF]/30 w-2"
              }`}
              aria-label={`Ir a página ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}