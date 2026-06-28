export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6">
        {/* Grid principal */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/20">
          
          {/* Columna 1: Logo y descripción */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <span className="animate-bounce">🏪</span> Comercial Uruguay
            </h3>
            <p className="text-white/80 mt-3 text-sm leading-relaxed">
              Todo lo que necesitas en un solo lugar. Más de 10 años en Valparaíso ofreciendo productos de calidad y atención cercana.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="bg-white/20 hover:bg-[#FFD93D] hover:text-[#303030] p-2 rounded-full transition-all duration-300 hover:scale-110">
                <span className="text-xl">📘</span>
              </a>
              <a href="#" className="bg-white/20 hover:bg-[#FFD93D] hover:text-[#303030] p-2 rounded-full transition-all duration-300 hover:scale-110">
                <span className="text-xl">📸</span>
              </a>
              <a href="#" className="bg-white/20 hover:bg-[#FFD93D] hover:text-[#303030] p-2 rounded-full transition-all duration-300 hover:scale-110">
                <span className="text-xl">💬</span>
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
              <span>🔗</span> Navegación
            </h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-white/80 hover:text-[#FFD93D] transition-colors hover:translate-x-1 inline-block">Home</a></li>
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
                <span className="text-[#FF6B81] text-lg">📍</span>
                <span>Uruguay 660 esquina Colón, Valparaíso</span>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FFD93D] transition">
                <span className="text-[#FFD93D] text-lg">📱</span>
                <a href="tel:+56912345678" className="hover:text-[#FFD93D] transition-colors">+56 9 1234 5678</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#00D2D3] transition">
                <span className="text-[#00D2D3] text-lg">📞</span>
                <a href="tel:321234567" className="hover:text-[#00D2D3] transition-colors">32 123 4567</a>
              </li>
              <li className="flex items-center gap-2 hover:text-[#FF6B81] transition">
                <span className="text-[#FF6B81] text-lg">✉️</span>
                <a href="mailto:comercialuruguay@gmail.com" className="hover:text-[#FF6B81] transition-colors">comercialuruguay@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* ====== NUEVO: Franja de WhatsApp y Envíos ====== */}
        <div className="flex flex-wrap items-center justify-center gap-4 py-4 border-b border-white/10">
          <a 
            href="https://wa.me/56912345678?text=Hola%20Comercial%20Uruguay%2C%20quiero%20consultar%20sobre..." 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#00D2D3] hover:bg-[#00D2D3]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            <span className="text-lg">💬</span>
            Gestiona tu pedido por WhatsApp
          </a>
          <span className="text-white/40">|</span>
          <span className="inline-flex items-center gap-2 bg-[#90C090] hover:bg-[#90C090]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <span className="text-lg">📦</span>
            Envíos a todo Chile
          </span>
          <span className="text-white/40">|</span>
          <span className="inline-flex items-center gap-2 bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm">
            <span className="text-lg">🏪</span>
            Retiro en tienda
          </span>
        </div>

        {/* Franja inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 gap-4">
          <p className="text-white/60 text-sm">
            © 2026 Comercial Uruguay - Todos los derechos reservados
          </p>
          <div className="flex gap-6 text-sm text-white/60">
            <a href="#" className="hover:text-[#FFD93D] transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-[#FFD93D] transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-[#FFD93D] transition-colors">Preguntas Frecuentes</a>
          </div>
        </div>
      </div>
    </footer>
  )
}