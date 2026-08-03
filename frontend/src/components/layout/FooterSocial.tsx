// 📁 frontend/src/components/layout/FooterSocial.tsx

/**
 * 📌 FOOTER SOCIAL
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los iconos de redes sociales con sus colores reales.
 * Recibe la configuración de la empresa por props.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos por props (no depende de contexto)
 * - Reutilizable en otras partes de la app
 * - Colores reales de cada red social
 * 
 * @param {Object} props
 * @param {Object} props.social - Objeto con las URLs de redes sociales
 * @param {string} props.social.facebook - URL de Facebook
 * @param {string} props.social.instagram - URL de Instagram
 * @param {string} props.social.tiktok - URL de TikTok
 * @param {string} props.social.whatsapp - Número de WhatsApp
 */

import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

interface FooterSocialProps {
  social: {
    facebook: string;
    instagram: string;
    tiktok: string;
    whatsapp: string;
  };
}

export function FooterSocial({ social }: FooterSocialProps) {
  return (
    <div className="flex gap-3 mt-4">
      <a
        href={social.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1877F2] hover:bg-[#1877F2]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="Facebook"
      >
        <FaFacebook size={18} />
      </a>
      <a
        href={social.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E4405F] hover:bg-[#E4405F]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="Instagram"
      >
        <FaInstagram size={18} />
      </a>
      <a
        href={social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#000000] hover:bg-[#000000]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="TikTok"
      >
        <FaTiktok size={18} />
      </a>
      <a
        href={`https://wa.me/${social.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#25D366] hover:bg-[#25D366]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label="WhatsApp"
      >
        <FaWhatsapp size={18} />
      </a>
    </div>
  );
}