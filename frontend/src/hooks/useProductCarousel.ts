// 📁 frontend/src/hooks/useProductCarousel.ts

/**
 * 📌 HOOK PERSONALIZADO: useProductCarousel
 * 
 * Encapsula toda la lógica de un carrusel de productos:
 * - Navegación (siguiente/anterior)
 * - Auto-scroll (se mueve solo)
 * - Detección de hover (pausa auto-scroll)
 * - Índice actual (para indicadores)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en cualquier carrusel de productos
 * - Fácil de testear
 * 
 * @param {Product[]} products - Lista de productos
 * @param {boolean} autoScroll - Auto-scroll activado
 * @returns {Object} - Estados y funciones del carrusel
 */

import { useRef, useEffect, useState } from "react";
import type { Product } from "../services/productService";

// =============================================
// 📦 CONSTANTES
// =============================================

const SCROLL_AMOUNT = 320; // Ancho de cada producto + gap
const AUTO_SCROLL_INTERVAL = 4000; // 4 segundos
const MIN_PRODUCTS_FOR_ARROWS = 4;

// =============================================
// 🎯 HOOK PRINCIPAL
// =============================================

export function useProductCarousel(
  products: Product[],
  autoScroll: boolean = false
) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // =============================================
  // ⬅️➡️ NAVEGACIÓN
  // =============================================

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * SCROLL_AMOUNT * 4,
        behavior: "smooth",
      });
    }
  };

  // =============================================
  // 🔄 AUTO-SCROLL
  // =============================================

  useEffect(() => {
    if (!autoScroll || products.length <= MIN_PRODUCTS_FOR_ARROWS || isHovered) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 10;

        if (isAtEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
        }
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [autoScroll, products.length, isHovered]);

  // =============================================
  // 📊 DETECTAR ÍNDICE ACTUAL (para indicadores)
  // =============================================

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const index = Math.round(el.scrollLeft / SCROLL_AMOUNT);
      setCurrentIndex(index);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // =============================================
  // 🖱️ PAUSA AL HOVER
  // =============================================

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    scrollRef,
    isHovered,
    currentIndex,
    scrollLeft,
    scrollRight,
    scrollToIndex,
    handleMouseEnter,
    handleMouseLeave,
    showArrows: products.length > MIN_PRODUCTS_FOR_ARROWS,
  };
}