// 📁 frontend/src/components/home/HeroLocalCard.tsx

/**
 * 📌 HERO LOCAL CARD — COMPONENTE DE DISEÑO
 * 
 * Columna derecha del Hero: tarjeta del local con carrusel e info de contacto.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe props (imágenes, funciones)
 * - Reutilizable en otras páginas (Contacto, Nosotros)
 * - Responsive (mobile-first)
 * - Botón de WhatsApp con color real (#25D366)
 * - Horario horizontal (Lun-Vie | Sáb)
 */

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { ImageCarousel } from "../common/ImageCarousel";
import { FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { empresaConfig } from "../../config/empresa";

// =============================================
// 🎨 ANIMACIONES
// =============================================

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// =============================================
// 📦 TIPOS
// =============================================

interface HeroLocalCardProps {
  images: { id: string; url: string; alt: string }[];
  isAdmin: boolean;
  isUploading: boolean;
  onUpload: (file: File) => void;
  onRemove: (index: number) => void;
}

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function HeroLocalCard({
  images,
  isAdmin,
  isUploading,
  onUpload,
  onRemove,
}: HeroLocalCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center lg:justify-end"
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl border-2 border-[#00D2D3] shadow-2xl hover:shadow-[#00D2D3]/30 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🏪</span>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#603060]">{empresaConfig.nombre}</h3>
            <p className="text-xs text-[#6A757C]">📍 Valparaíso, Chile</p>
          </div>
          <Badge className="bg-[#90C090] text-white text-xs">★ Local</Badge>
        </div>

        {/* Carrusel de imágenes */}
        <ImageCarousel
          images={images.map(img => img.url)}
          alt="Local Comercial Uruguay"
          interval={4000}
          autoplay={true}
          isAdmin={isAdmin}
          onUpload={onUpload}
          onRemove={onRemove}
          isUploading={isUploading}
        />

        {/* Información de contacto */}
        <div className="mt-4 space-y-2">
          {/* Dirección */}
          <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
            <span className="text-[#FF6B81] text-lg">📍</span>
            <span className="font-medium text-[#303030] text-sm truncate">
              {empresaConfig.direccion}
            </span>
          </div>

          {/* Horario horizontal */}
          <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
            <span className="text-[#00D2D3] text-lg">🕐</span>
            <span className="font-medium text-[#303030] text-sm">
              Lun-Vie: {empresaConfig.horario.lunesViernes} | Sáb: {empresaConfig.horario.sabado}
            </span>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
            <FaWhatsapp className="text-[#25D366] text-lg" />
            <a href={`https://wa.me/${empresaConfig.whatsapp}`} target="_blank" rel="noopener noreferrer" className="font-medium text-[#00D2D3] hover:text-[#603060] transition-colors text-sm">
              {empresaConfig.telefono}
            </a>
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
            <SiGmail className="text-[#EA4335] text-lg" />
            <a href={`mailto:${empresaConfig.email}`} className="font-medium text-[#603060] hover:text-[#7D5FFF] transition-colors text-xs sm:text-sm truncate">
              {empresaConfig.email}
            </a>
          </div>
        </div>

        {/* Botón WhatsApp con color real */}
        <a
          href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola%20${empresaConfig.nombre}%2C%20quiero%20consultar%20sobre...`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ backgroundColor: empresaConfig.social.whatsapp.color }}
          className="mt-4 w-full flex items-center justify-center gap-2 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm hover:opacity-90"
        >
          <FaWhatsapp size={20} />
          Consultar por WhatsApp
        </a>
      </div>
    </motion.div>
  );
}