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
 * - Scroll dinámico (detecta ancho real de la card)
 * 
 * 🆕 Scroll dinámico: detecta el ancho real de la card
 * 🆕 scrollToIndex funcional (1 página = 4 cards)
 */

import { useRef, useEffect, useState } from "react";
import type { Product } from "../services/productService";

// =============================================
// 📦 CONSTANTES
// =============================================

const AUTO_SCROLL_INTERVAL = 4000;
const MIN_PRODUCTS_FOR_ARROWS = 4;
const CARDS_PER_PAGE = 4;

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
  // 🆕 CALCULAR ANCHO DE CARD (dinámico)
  // =============================================
  /**
   * Detecta el ancho real de una card + gap.
   * Se actualiza al montar y al cambiar el tamaño de pantalla.
   */
  const getScrollAmount = (): number => {
    if (!scrollRef.current) return 240;
    const firstCard = scrollRef.current.firstElementChild as HTMLElement;
    if (!firstCard) return 240;
    // Ancho de la card + gap (12px mobile, 16px desktop)
    const gap = window.innerWidth >= 640 ? 16 : 12;
    return firstCard.offsetWidth + gap;
  };

  // =============================================
  // ⬅️➡️ NAVEGACIÓN
  // =============================================

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -getScrollAmount() * CARDS_PER_PAGE,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: getScrollAmount() * CARDS_PER_PAGE,
        behavior: "smooth",
      });
    }
  };

  /**
   * 🆕 Va a la página N (1 página = 4 cards)
   */
  const scrollToIndex = (pageIndex: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: pageIndex * getScrollAmount() * CARDS_PER_PAGE,
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
          scrollRef.current.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth",
          });
        }
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [autoScroll, products.length, isHovered]);

  // =============================================
  // 📊 DETECTAR ÍNDICE ACTUAL
  // =============================================

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const amount = getScrollAmount();
      const page = Math.round(el.scrollLeft / (amount * CARDS_PER_PAGE));
      setCurrentIndex(page);
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
    cardsPerPage: CARDS_PER_PAGE,
  };
}