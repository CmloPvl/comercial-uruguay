// 📁 frontend/src/components/layout/footer/FooterSocial.tsx

/**
 * 📌 FOOTER SOCIAL
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los iconos de redes sociales con sus colores reales.
 * Recibe la configuración desde empresaConfig.social.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos por props (no depende de contexto)
 * - Reutilizable en otras partes de la app
 * - Colores reales de cada red social
 * - Usa empresaConfig.social (url + color + label)
 * 
 * @param {Object} props
 * @param {Object} props.social - Objeto con las redes sociales
 * @param {Object} props.social.facebook - { url, color, label }
 * @param {Object} props.social.instagram - { url, color, label }
 * @param {Object} props.social.tiktok - { url, color, label }
 * @param {Object} props.social.whatsapp - { url, color, label }
 */

import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";

// =============================================
// 📦 TIPOS
// =============================================

interface SocialNetwork {
  url: string;
  color: string;
  label: string;
}

interface FooterSocialProps {
  social: {
    facebook: SocialNetwork;
    instagram: SocialNetwork;
    tiktok: SocialNetwork;
    whatsapp: SocialNetwork;
  };
}

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function FooterSocial({ social }: FooterSocialProps) {
  return (
    <div className="flex gap-3 mt-4">
      {/* Facebook */}
      <a
        href={social.facebook.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: social.facebook.color }}
        className="hover:opacity-80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={social.facebook.label}
      >
        <FaFacebook size={18} />
      </a>

      {/* Instagram */}
      <a
        href={social.instagram.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: social.instagram.color }}
        className="hover:opacity-80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={social.instagram.label}
      >
        <FaInstagram size={18} />
      </a>

      {/* TikTok */}
      <a
        href={social.tiktok.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: social.tiktok.color }}
        className="hover:opacity-80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={social.tiktok.label}
      >
        <FaTiktok size={18} />
      </a>

      {/* WhatsApp */}
      <a
        href={social.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{ backgroundColor: social.whatsapp.color }}
        className="hover:opacity-80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
        aria-label={social.whatsapp.label}
      >
        <FaWhatsapp size={18} />
      </a>
    </div>
  );
}