// 📁 frontend/src/components/layout/footer/Footer.tsx

/**
 * 📌 FOOTER — VERSIÓN PROFESIONAL
 * 
 * Inspirado en los footers de Falabella y Ripley.
 * Estructura de 4 columnas con información clara y organizada.
 * 
 * ✅ Buenas prácticas:
 * - Usa componentes reutilizables (FooterColumn, FooterSocial, FooterServices)
 * - Datos desde empresaConfig (centralizados)
 * - Icono real de Gmail (como en el Hero)
 * - Sin enlaces duplicados
 * - Accesible con aria-label
 * - Responsive (mobile-first)
 * 
 * 🆕 Link a /retiro (Retiro en tienda)
 */

import { Link } from "react-router-dom";
import { SiGmail } from "react-icons/si";
import { empresaConfig } from "../../../config/empresa";
import Logo from "../../common/Logo";
import { FooterColumn } from "./FooterColumn";
import { FooterSocial } from "./FooterSocial";
import { FooterServices } from "./FooterServices";

export default function Footer() {
  return (
    <footer 
      className="bg-gradient-to-br from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white pt-12 pb-6"
      aria-label="Pie de página de Comercial Uruguay"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* =============================================
        📌 GRID PRINCIPAL (4 columnas)
        ============================================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/20">
          
          {/* COLUMNA 1: Logo + descripción + redes sociales */}
          <div className="col-span-1 md:col-span-1">
            <Logo className="h-12 w-auto mb-3" />
            <p className="text-white/80 text-sm leading-relaxed">
              {empresaConfig.descripcion}
            </p>
            <p className="text-white/60 text-sm mt-2">
              Más de 10 años de experiencia en Valparaíso.
            </p>
            <FooterSocial social={empresaConfig.social} />
          </div>

          {/* COLUMNA 2: Te ayudamos */}
          <FooterColumn title="Te ayudamos" icon="💡">
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/contacto" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  📞 Contáctanos
                </Link>
              </li>
              <li>
                <Link 
                  to="/envios-y-retiros" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  🚚 Envíos y retiros
                </Link>
              </li>
              {/* 🆕 Retiro en tienda */}
              <li>
                <Link 
                  to="/retiro" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  🏪 Retiro en tienda
                </Link>
              </li>
              <li>
                <Link 
                  to="/preguntas-frecuentes" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  ❓ Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </FooterColumn>

          {/* COLUMNA 3: Comercial Uruguay */}
          <FooterColumn title="Comercial Uruguay" icon="🏪">
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/nosotros" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  👥 Sobre nosotros
                </Link>
              </li>
              <li>
                <Link 
                  to="/productos" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  🛍️ Nuestra tienda
                </Link>
              </li>
              <li>
                <Link 
                  to="/ofertas" 
                  className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block"
                >
                  🔥 Ofertas
                </Link>
              </li>
            </ul>
          </FooterColumn>

          {/* COLUMNA 4: Contacto (iconos reales) */}
          <FooterColumn title="Contacto" icon="📍">
            <ul className="space-y-3 text-white/80 text-sm">
              {/* Dirección */}
              <li className="flex items-start gap-2 hover:text-white transition">
                <span className="text-[#FF6B81] text-lg mt-0.5 flex-shrink-0">📍</span>
                <span>{empresaConfig.direccion}</span>
              </li>

              {/* Teléfono */}
              <li className="flex items-center gap-2 hover:text-[#FFD93D] transition">
                <span className="text-[#FFD93D] text-lg flex-shrink-0">📞</span>
                <a 
                  href={`tel:${empresaConfig.telefono}`} 
                  className="hover:text-[#FFD93D] transition-colors"
                >
                  {empresaConfig.telefono}
                </a>
              </li>

              {/* Email con icono real de Gmail */}
              <li className="flex items-center gap-2 hover:text-[#FF6B81] transition">
                <SiGmail className="text-[#EA4335] text-lg flex-shrink-0" />
                <a 
                  href={`mailto:${empresaConfig.email}`} 
                  className="hover:text-[#FF6B81] transition-colors"
                >
                  {empresaConfig.email}
                </a>
              </li>

              {/* Horario compacto */}
              <li className="flex items-start gap-2 hover:text-white transition">
                <span className="text-[#00D2D3] text-lg mt-0.5 flex-shrink-0">🕐</span>
                <div>
                  <div>Lun-Vie: {empresaConfig.horario.lunesViernes}</div>
                  <div>Sáb: {empresaConfig.horario.sabado}</div>
                </div>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* =============================================
        🚚 FRANJA DE SERVICIOS
        ============================================= */}
        <FooterServices 
          whatsapp={empresaConfig.whatsapp}
          nombre={empresaConfig.nombre}
        />

        {/* =============================================
        📋 FRANJA INFERIOR
        ============================================= */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <p className="text-white/60 text-sm">
            © {empresaConfig.año} {empresaConfig.nombre} - Todos los derechos reservados
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-white/60 justify-center">
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