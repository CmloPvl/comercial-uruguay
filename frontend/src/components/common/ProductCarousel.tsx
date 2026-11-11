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
 * - Mobile-first
 * - Reutilizable en toda la app
 * 
 * 🆕 Ancho responsive: 45vw en mobile (más chico que el catálogo)
 * 🆕 Bugs corregidos (opacity-0 group-hover)
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useProductCarousel } from "../../hooks/useProductCarousel";
import ProductCard from "../products/ProductCard";
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
  const {
    scrollRef,
    currentIndex,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    handleMouseEnter,
    handleMouseLeave,
    showArrows,
    cardsPerPage,
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
  // 📊 CALCULAR PÁGINAS
  // =============================================
  const totalPages = Math.ceil(products.length / cardsPerPage);

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <div
      className="relative group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ⬅️ FLECHA IZQUIERDA */}
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#7D5FFF] hover:text-white text-[#7D5FFF] p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Página anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* 📦 CARRUSEL (🆕 cards más chicas que el catálogo) */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            // 🆕 Ancho responsive: 45vw en mobile (más chico que el catálogo 50%)
            // En desktop, máximo 220px
            className="flex-shrink-0 w-[45vw] max-w-[220px] snap-start"
          >
            <ProductCard
              product={product}
              variant="carousel"
              onAddToCart={() => onAddToCart(product.id, product.name)}
            />
          </motion.div>
        ))}
      </div>

      {/* ➡️ FLECHA DERECHA */}
      {showArrows && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#7D5FFF] hover:text-white text-[#7D5FFF] p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Página siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* 🎨 GRADIENTES INDICADORES (móvil) */}
      {products.length > 1 && (
        <>
          <div className="absolute left-0 top-0 bottom-4 w-6 sm:w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-4 w-6 sm:w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </>
      )}

      {/* 🟢 INDICADORES (puntos) */}
      {showArrows && totalPages > 1 && (
        <div className="flex justify-center gap-1.5 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
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