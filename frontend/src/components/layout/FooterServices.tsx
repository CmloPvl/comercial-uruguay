// 📁 frontend/src/components/layout/FooterServices.tsx

/**
 * 📌 FOOTER SERVICES
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra la franja de servicios del Footer:
 * - WhatsApp para gestión de pedidos
 * - Envíos a todo Chile (enlace a página)
 * - Retiro en tienda (enlace a página con ancla)
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos por props
 * - Enlaces a página completa de información
 * - Estilos consistentes con el Footer
 * 
 * @param {Object} props
 * @param {string} props.whatsapp - Número de WhatsApp
 * @param {string} props.nombre - Nombre de la empresa
 */

import { Link } from "react-router-dom";
import { FaWhatsapp, FaTruck, FaStore, FaInfoCircle } from "react-icons/fa";

interface FooterServicesProps {
  whatsapp: string;
  nombre: string;
}

export function FooterServices({ whatsapp, nombre }: FooterServicesProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-white/10">
      
      {/* WhatsApp - Enlace externo */}
      <a
        href={`https://wa.me/${whatsapp}?text=Hola%20${nombre}%2C%20quiero%20consultar%20sobre...`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
        aria-label="Gestiona tu pedido por WhatsApp"
      >
        <FaWhatsapp size={18} />
        Gestiona tu pedido por WhatsApp
      </a>

      <span className="text-white/30">|</span>

      {/* Envíos a todo Chile - Enlace a página */}
      <Link
        to="/envios-y-retiros"
        className="group inline-flex items-center gap-2 bg-[#90C090] hover:bg-[#90C090]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm cursor-pointer"
        aria-label="Más información sobre envíos"
      >
        <FaTruck size={16} />
        Envíos a todo Chile
        <FaInfoCircle 
          size={12} 
          className="opacity-70 group-hover:opacity-100 transition-opacity" 
        />
      </Link>

      <span className="text-white/30">|</span>

      {/* Retiro en tienda - Enlace a página con ancla */}
      <Link
        to="/envios-y-retiros#retiro"
        className="group inline-flex items-center gap-2 bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm cursor-pointer"
        aria-label="Más información sobre retiro en tienda"
      >
        <FaStore size={16} />
        Retiro en tienda
        <FaInfoCircle 
          size={12} 
          className="opacity-70 group-hover:opacity-100 transition-opacity" 
        />
      </Link>
    </div>
  );
}