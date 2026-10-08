// 📁 frontend/src/components/home/Hero.tsx

/**
 * 📌 HERO — COMPONENTE CONTENEDOR
 * 
 * Este componente une la lógica (useHero) con los subcomponentes:
 * - HeroContent: Columna izquierda (título, botones, redes, stats)
 * - HeroLocalCard: Columna derecha (tarjeta del local + carrusel)
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño (SoC)
 * - Componente contenedor (solo une piezas)
 * - Subcomponentes reutilizables
 * - Fondo decorativo centralizado
 */

import { useHero } from "../../hooks/useHero";
import { HeroContent } from "./HeroContent";
import { HeroLocalCard } from "./HeroLocalCard";

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export default function Hero() {
  // =============================================
  // 🧠 LÓGICA (extraída a useHero)
  // =============================================
  const { images, isUploading, isAdmin, uploadImage, removeImage } = useHero();

  // =============================================
  // 📤 MANEJAR SUBIDA DE IMAGEN
  // =============================================

  const handleUpload = (file: File) => {
    uploadImage(file);
  };

  const handleRemove = (index: number) => {
    if (images[index]) {
      removeImage(images[index].id);
    }
  };

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F0C0] via-[#F0C0F0] to-[#FF9F43]/30 min-h-[85vh] flex items-center py-10 px-4">
      {/* =============================================
      🎨 FONDO DECORATIVO
      ============================================= */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#7D5FFF] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#00D2D3] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#90C090] blur-3xl"></div>
        <div className="absolute top-20 right-20 w-56 h-56 rounded-full bg-[#FF6B81] blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-[#FFD93D] blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-[#603060] blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-[#FF9F43] blur-3xl"></div>
      </div>

      {/* =============================================
      📄 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        {/* Columna Izquierda */}
        <HeroContent />

        {/* Columna Derecha */}
        <HeroLocalCard
          images={images}
          isAdmin={isAdmin}
          isUploading={isUploading}
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
      </div>
    </section>
  );
}