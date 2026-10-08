// 📁 frontend/src/components/home/HeroContent.tsx

/**
 * 📌 HERO CONTENT — COMPONENTE DE DISEÑO
 * 
 * Columna izquierda del Hero: título, descripción, botones, badges, redes y estadísticas.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Sin categorías (están en CategoriesSection)
 * - Servicios destacados clickeables
 * - Reutilizable en otras páginas
 * - Responsive (mobile-first)
 * - Colores de redes centralizados en empresaConfig
 */

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaTruck,
  FaStore,
  FaUsers,
} from "react-icons/fa";
import { empresaConfig } from "../../config/empresa";

// =============================================
// 🎨 ANIMACIONES
// =============================================

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6 }}
      className="space-y-5 text-center lg:text-left"
    >
      {/* Badge de bienvenida */}
      <Badge className="bg-gradient-to-r from-[#603060] to-[#7D5FFF] text-white px-4 py-1.5 rounded-full inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 shadow-lg">
        🎉 ¡Bienvenido a {empresaConfig.nombre}!
      </Badge>

      {/* Título */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-[#303030]">
        Todo lo que necesitas
        <br />
        <span className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#FF6B81] bg-clip-text text-transparent">
          en un solo lugar
        </span>
      </h1>

      {/* Descripción */}
      <p className="text-base sm:text-lg text-[#303030] max-w-lg mx-auto lg:mx-0 leading-relaxed">
  <span className="text-[#603060] font-semibold">Importadora con más de 10 años</span> en Valparaíso. Productos económicos y atención amigable.
</p>

      {/* Botones principales */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
        <Link to="/productos">
          <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
            🛒 Ver Catálogo
          </Button>
        </Link>
        <Link to="/ofertas">
          <Button className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
            🔥 Ofertas
          </Button>
        </Link>
      </div>

      {/* Servicios destacados (clickeables) */}
      <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
        <Link to="/envios-y-retiros">
          <Badge className="bg-[#00D2D3] text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2">
            <FaTruck size={16} /> Envíos a todo Chile
          </Badge>
        </Link>
        <Link to="/retiro">
          <Badge className="bg-[#FFD93D] text-[#303030] px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2">
            <FaStore size={16} /> Retiro en tienda
          </Badge>
        </Link>
        <Link to="/nosotros">
          <Badge className="bg-[#90C090] text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer flex items-center gap-2">
            <FaUsers size={16} /> Nosotros
          </Badge>
        </Link>
      </div>

      {/* Redes Sociales */}
      <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start pt-1">
        <span className="text-sm font-medium text-[#6A757C]">Síguenos:</span>
        <a 
          href={empresaConfig.social.facebook.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ backgroundColor: empresaConfig.social.facebook.color }} 
          className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg" 
          aria-label={empresaConfig.social.facebook.label}
        >
          <FaFacebook size={18} />
        </a>
        <a 
          href={empresaConfig.social.instagram.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ backgroundColor: empresaConfig.social.instagram.color }} 
          className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg" 
          aria-label={empresaConfig.social.instagram.label}
        >
          <FaInstagram size={18} />
        </a>
        <a 
          href={empresaConfig.social.tiktok.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ backgroundColor: empresaConfig.social.tiktok.color }} 
          className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg" 
          aria-label={empresaConfig.social.tiktok.label}
        >
          <FaTiktok size={18} />
        </a>
        <a 
          href={empresaConfig.social.whatsapp.url} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ backgroundColor: empresaConfig.social.whatsapp.color }} 
          className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg" 
          aria-label={empresaConfig.social.whatsapp.label}
        >
          <FaWhatsapp size={18} />
        </a>
      </div>

      {/* Estadísticas */}
      <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
        <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#7D5FFF]/20">
          <p className="text-2xl font-extrabold text-[#7D5FFF]">+10</p>
          <p className="text-xs text-[#6A757C] font-medium">Años</p>
        </div>
        <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#FF6B81]/20">
          <p className="text-2xl font-extrabold text-[#FF6B81]">+1000</p>
          <p className="text-xs text-[#6A757C] font-medium">Productos</p>
        </div>
        <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#00D2D3]/20">
          <p className="text-2xl font-extrabold text-[#00D2D3]">+500</p>
          <p className="text-xs text-[#6A757C] font-medium">Clientes</p>
        </div>
      </div>
    </motion.div>
  );
}