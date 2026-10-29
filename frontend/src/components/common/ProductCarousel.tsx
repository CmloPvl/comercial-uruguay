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
 * 🆕 Usa ProductCard con variant="carousel" (unificado)
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
      {/* ⬅️ FLECHA IZQUIERDA */}
      {showArrows && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-[#7D5FFF] hover:text-white text-[#7D5FFF] p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* 📦 CARRUSEL */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0 w-[280px] snap-start"
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
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* 🎨 GRADIENTES INDICADORES (móvil) */}
      {products.length > 1 && (
        <>
          <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none md:hidden" />
          <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </>
      )}

      {/* 🟢 INDICADORES (puntos) */}
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