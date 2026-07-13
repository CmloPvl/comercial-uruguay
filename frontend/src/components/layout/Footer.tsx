import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaTruck, FaStore } from 'react-icons/fa';
import { empresaConfig } from '../../config/empresa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ====== GRID PRINCIPAL ====== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/20">
          
          {/* Columna 1: Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="animate-bounce">🏪</span> {empresaConfig.nombre}
            </h3>
            <p className="text-white/80 mt-3 text-sm leading-relaxed">
              {empresaConfig.descripcion}
            </p>
            
            {/* Redes Sociales con colores reales */}
            <div className="flex gap-3 mt-4">
              <a 
                href={empresaConfig.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#1877F2] hover:bg-[#1877F2]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <FaFacebook size={18} />
              </a>
              <a 
                href={empresaConfig.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#E4405F] hover:bg-[#E4405F]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <FaInstagram size={18} />
              </a>
              <a 
                href={empresaConfig.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#000000] hover:bg-[#000000]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="TikTok"
              >
                <FaTiktok size={18} />
              </a>
              <a 
                href={`https://wa.me/${empresaConfig.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#25D366] hover:bg-[#25D366]/80 text-white p-2 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
              <span>🔗</span> Navegación
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Inicio</a></li>
              <li><a href="/productos" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Tienda</a></li>
              <li><a href="/ofertas" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Ofertas</a></li>
              <li><a href="/nosotros" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Nosotros</a></li>
              <li><a href="/contacto" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Contacto</a></li>
            </ul>
          </div>

          {/* Columna 3: Categorías */}
          <div>
            <h4 className="font-bold text-[#FF6B81] text-lg mb-4 flex items-center gap-2">
              <span>📂</span> Categorías
            </h4>
            <ul className="space-y-2">
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">💇 Cabello</li>
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">🧸 Juguetes</li>
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">🎂 Cumpleaños</li>
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">🏠 Hogar</li>
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">🍽️ Melamina</li>
              <li className="text-white/80 hover:text-[#FF6B81] transition-colors cursor-pointer hover:translate-x-1 inline-block">🍂 Temporada</li>
            </ul>
          </div>

          {/* Columna 4: Contacto y ubicación */}
          <div>
            <h4 className="font-bold text-[#00D2D3] text-lg mb-4 flex items-center gap-2">
              <span>📍</span> Contacto
            </h4>
            <ul className="space-y-3 text-white/80">
              <li className="flex items-start gap-2 hover:text-white transition">
                <FaMapMarkerAlt className="text-[#FF6B81] text-lg mt-0.5" />
                <span>{empresaConfig.direccion}</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFD93D] transition">
                <FaPhone className="text-[#FFD93D] text-lg" />
                <a href={`tel:${empresaConfig.telefono}`} className="hover:text-[#FFD93D] transition-colors">
                  {empresaConfig.telefono}
                </a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FF6B81] transition">
                <FaEnvelope className="text-[#FF6B81] text-lg" />
                <a href={`mailto:${empresaConfig.email}`} className="hover:text-[#FF6B81] transition-colors">
                  {empresaConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-2 hover:text-white transition text-sm">
                <FaClock className="text-[#00D2D3] text-lg mt-0.5" />
                <div>
                  <div>Lun-Vie: {empresaConfig.horario.lunesViernes}</div>
                  <div>Sáb: {empresaConfig.horario.sabado}</div>
                  <div>Dom: {empresaConfig.horario.domingo}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ====== FRANJA DE SERVICIOS ====== */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-white/10">
          <a 
            href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola%20${empresaConfig.nombre}%2C%20quiero%20consultar%20sobre...`}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            <FaWhatsapp size={18} />
            Gestiona tu pedido por WhatsApp
          </a>
          <span className="text-white/30">|</span>
          <span className="inline-flex items-center gap-2 bg-[#90C090] hover:bg-[#90C090]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <FaTruck size={16} />
            Envíos a todo Chile
          </span>
          <span className="text-white/30">|</span>
          <span className="inline-flex items-center gap-2 bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
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