// 📁 frontend/src/hooks/useImageCarousel.ts

/**
 * 📌 HOOK PERSONALIZADO: useImageCarousel
 * 
 * Encapsula toda la lógica de un carrusel de imágenes:
 * - Navegación (siguiente/anterior)
 * - Autoplay (reproducción automática)
 * - Pausa al hover (desktop)
 * - Pausa al tocar (mobile) con reanudación automática
 * - Reset al cambiar imágenes
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en cualquier carrusel
 * - Fácil de testear
 * 
 * 🆕 Navegación manual pausa el autoplay por 10s (mobile)
 * 🆕 setIsPaused expuesto (para control externo)
 * 
 * @param {string[]} images - Lista de URLs de imágenes
 * @param {number} interval - Tiempo entre cambios (ms)
 * @param {boolean} autoplay - Reproducción automática
 */

import { useState, useEffect, useCallback, useRef } from "react";

export function useImageCarousel(
  images: string[],
  interval: number = 4000,
  autoplay: boolean = true
) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalImages = images.length;

  // =============================================
  // 📸 NAVEGACIÓN
  // =============================================

  /**
   * 🆕 Pausar autoplay temporalmente (al tocar flecha/punto)
   * Se reanuda automáticamente después de 10s
   */
  const pauseTemporarily = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 10000);
  }, []);

  const goToNext = useCallback(() => {
    if (totalImages === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalImages);
    pauseTemporarily();  // 🆕
  }, [totalImages, pauseTemporarily]);

  const goToPrevious = useCallback(() => {
    if (totalImages === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
    pauseTemporarily();  // 🆕
  }, [totalImages, pauseTemporarily]);

  const goToIndex = useCallback((index: number) => {
    if (index < 0 || index >= totalImages) return;
    setCurrentIndex(index);
    pauseTemporarily();  // 🆕
  }, [totalImages, pauseTemporarily]);

  // =============================================
  // ⏱️ AUTOPLAY
  // =============================================

  useEffect(() => {
    if (!autoplay || totalImages === 0 || isPaused) return;

    timerRef.current = setInterval(goToNext, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoplay, interval, goToNext, totalImages, isPaused]);

  // =============================================
  // 🖱️ PAUSA AL HOVER (desktop)
  // =============================================

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  // =============================================
  // 🔄 RESET AL CAMBIAR IMÁGENES
  // =============================================

  useEffect(() => {
    setCurrentIndex(0);
  }, [images]);

  // =============================================
  // 🧹 LIMPIEZA
  // =============================================

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    currentIndex,
    totalImages,
    currentImage: totalImages > 0 ? images[currentIndex] || null : null,
    goToNext,
    goToPrevious,
    goToIndex,
    isPaused,
    setIsPaused,      // 🆕 Exponer para control externo
    handleMouseEnter,
    handleMouseLeave,
  };
}