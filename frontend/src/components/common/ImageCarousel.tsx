// 📁 frontend/src/components/common/ImageCarousel.tsx

/**
 * 📌 IMAGE CAROUSEL - COMPONENTE REUTILIZABLE
 * 
 * Carrusel de imágenes con autoplay, controles e indicadores.
 * Se puede usar en:
 * - Hero (imágenes del local)
 * - Detalle de Producto (imágenes del producto)
 * - Admin (vista previa)
 * - Ofertas destacadas
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - Reutilizable en toda la app
 * - Accesible con aria-label
 * - Responsive (mobile-first)
 * 
 * @param {Object} props
 * @param {string[]} props.images - Lista de URLs de imágenes
 * @param {string} props.alt - Texto alternativo para las imágenes
 * @param {number} props.interval - Tiempo entre cambios (ms)
 * @param {boolean} props.autoplay - Reproducción automática
 * @param {string} props.className - Clases adicionales
 * @param {boolean} props.isAdmin - Mostrar controles admin
 * @param {Function} props.onUpload - Función para subir imagen (admin)
 * @param {Function} props.onRemove - Función para eliminar imagen (admin)
 * @param {boolean} props.isUploading - Estado de carga al subir
 */

import { useImageCarousel } from "../../hooks/useImageCarousel";
import { ChevronLeft, ChevronRight, Upload, X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt?: string;
  interval?: number;
  autoplay?: boolean;
  className?: string;
  isAdmin?: boolean;
  onUpload?: (file: File) => void;
  onRemove?: (index: number) => void;
  isUploading?: boolean;
}

export function ImageCarousel({
  images,
  alt = "Imagen",
  interval = 4000,
  autoplay = true,
  className = "",
  isAdmin = false,
  onUpload,
  onRemove,
  isUploading = false,
}: ImageCarouselProps) {
  const {
    currentIndex,
    currentImage,
    goToNext,
    goToPrevious,
    goToIndex,
    handleMouseEnter,
    handleMouseLeave,
  } = useImageCarousel(images, interval, autoplay);

  // =============================================
  // 📤 MANEJAR SUBIDA DE IMAGEN
  // =============================================

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
    // Resetear input
    e.target.value = "";
  };

  // =============================================
  // 🖥️ RENDER
  // =============================================

  // Si no hay imágenes, mostrar placeholder
  if (images.length === 0) {
    return (
      <div
        className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-[#00D2D3] hover:border-[#90C090] transition-all bg-gradient-to-br from-[#00D2D3]/10 to-[#90C090]/10 flex items-center justify-center ${className}`}
      >
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-[#00D2D3]/10 flex items-center justify-center mx-auto mb-2">
            <Upload className="w-8 h-8 text-[#00D2D3]" />
          </div>
          <p className="text-[#6A757C] font-medium text-sm">
            {isAdmin ? "Haz clic para subir una imagen" : "No hay imágenes disponibles"}
          </p>
          {isAdmin && (
            <p className="text-xs text-[#6A757C]/40">PNG, JPG o WEBP (máx. 2MB)</p>
          )}
          {isAdmin && (
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          )}
        </div>
      </div>
    );
  }

  // =============================================
  // 🖥️ CARRUSEL CON IMÁGENES
  // =============================================

  return (
    <div
      className={`relative group aspect-[4/3] rounded-2xl overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Imagen actual */}
      <img
        src={currentImage || images[0]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-transform duration-500"
      />

      {/* =============================================
      🎯 CONTROLES ADMIN (solo visible para admin)
      ============================================= */}
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 z-10">
          {/* Botón subir imagen */}
          <label className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-all hover:scale-110 cursor-pointer">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          {/* Botón eliminar imagen */}
          {images.length > 1 && (
            <button
              onClick={() => onRemove?.(currentIndex)}
              className="bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-all hover:scale-110"
              aria-label="Eliminar imagen"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      {/* =============================================
      ➡️ FLECHAS DE NAVEGACIÓN
      ============================================= */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
            aria-label="Imagen siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* =============================================
      🟢 INDICADORES (puntos)
      ============================================= */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* =============================================
      🔢 CONTADOR (ej: 1/4)
      ============================================= */}
      {images.length > 1 && (
        <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}