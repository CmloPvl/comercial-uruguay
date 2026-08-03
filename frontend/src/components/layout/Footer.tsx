// 📁 frontend/src/components/layout/Footer.tsx

/**
 * 📌 FOOTER — VERSIÓN PROFESIONAL
 * 
 * Inspirado en los footers de Falabella y Ripley.
 * Estructura de 4 columnas con información clara y organizada.
 */

import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaWhatsapp, FaTruck, FaStore } from "react-icons/fa";
import { empresaConfig } from "../../config/empresa";
import Logo from "../common/Logo";
import { FooterSocial } from "./FooterSocial";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* ====== GRID PRINCIPAL (4 columnas) ====== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/20">
          
          {/* =============================================
          COLUMNA 1: Logo + descripción + redes sociales
          ============================================= */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="h-12 w-auto mb-3" />
            <p className="text-white/80 text-sm leading-relaxed">
              {empresaConfig.descripcion}
            </p>
            <p className="text-white/60 text-sm mt-2">
              Más de 10 años de experiencia en Valparaíso.
            </p>
            <FooterSocial social={empresaConfig} />
          </div>

          {/* =============================================
          COLUMNA 2: Te ayudamos (inspirado en Falabella)
          ============================================= */}
          <div>
            <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
              <span>💡</span> Te ayudamos
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/contacto" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  📞 Contáctanos
                </Link>
              </li>
              <li>
                <Link to="/envios-y-retiros" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  🚚 Envíos y retiros
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  📋 Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  🔒 Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* =============================================
          COLUMNA 3: Comercial Uruguay (inspirado en Ripley)
          ============================================= */}
          <div>
            <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
              <span>🏪</span> Comercial Uruguay
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/nosotros" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  👥 Sobre nosotros
                </Link>
              </li>
              <li>
                <Link to="/productos" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  🛍️ Nuestra tienda
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">
                  🔥 Ofertas
                </Link>
              </li>
              <li>
                <a
                  href={`https://wa.me/${empresaConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  💬 WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* =============================================
          COLUMNA 4: Contacto y ubicación
          ============================================= */}
          <div>
            <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
              <span>📍</span> Contacto
            </h4>
            <ul className="space-y-3 text-white/80 text-sm">
              <li className="flex items-start gap-2 hover:text-white transition">
                <FaMapMarkerAlt className="text-[#FF6B81] text-lg mt-0.5 flex-shrink-0" />
                <span>{empresaConfig.direccion}</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFD93D] transition">
                <FaPhone className="text-[#FFD93D] text-lg flex-shrink-0" />
                <a href={`tel:${empresaConfig.telefono}`} className="hover:text-[#FFD93D] transition-colors">
                  {empresaConfig.telefono}
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FF6B81] transition">
                <FaEnvelope className="text-[#FF6B81] text-lg flex-shrink-0" />
                <a href={`mailto:${empresaConfig.email}`} className="hover:text-[#FF6B81] transition-colors">
                  {empresaConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition">
                <FaClock className="text-[#00D2D3] text-lg mt-0.5 flex-shrink-0" />
                <div>
                  <div>Lun-Vie: {empresaConfig.horario.lunesViernes}</div>
                  <div>Sáb: {empresaConfig.horario.sabado}</div>
                  <div>Dom: Cerrado</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ====== FRANJA DE SERVICIOS ====== */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-white/10">
          <span className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <FaWhatsapp size={16} />
            WhatsApp
          </span>
          <span className="inline-flex items-center gap-2 bg-[#90C090] hover:bg-[#90C090]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <FaTruck size={16} />
            Envíos a todo Chile
          </span>
          <span className="inline-flex items-center gap-2 bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <FaStore size={16} />
            Retiro en tienda
          </span>
        </div>

        {/* ====== FRANJA INFERIOR ====== */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <p className="text-white/60 text-sm">
            © {empresaConfig.año} {empresaConfig.nombre} - Todos los derechos reservados
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <Link to="/privacidad" className="hover:text-[#FFD93D] transition-colors">
              Políticas de Privacidad
            </Link>
            <Link to="/terminos" className="hover:text-[#FFD93D] transition-colors">
              Términos y Condiciones
            </Link>
            <Link to="/contacto" className="hover:text-[#FFD93D] transition-colors">
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}