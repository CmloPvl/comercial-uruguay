// src/components/home/Hero.tsx
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFD93D] via-[#F0C030] to-[#FF9F43] text-[#303030] py-20 px-4">
      {/* Decoración de fondo con colores vibrantes */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-[#7D5FFF] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#00D2D3] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#90C090] blur-3xl"></div>
        <div className="absolute top-20 right-20 w-48 h-48 rounded-full bg-[#FF6B81] blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
        {/* ====== TEXTO Y BOTONES ====== */}
        <div className="flex-1 text-center md:text-left">
          <Badge className="bg-[#7D5FFF] text-white mb-4 px-4 py-1 rounded-full animate-pulse">
            🎉 ¡Bienvenido a Comercial Uruguay!
          </Badge>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            TODO LO QUE NECESITAS <br />
            <span className="text-[#7D5FFF] bg-white/20 px-3 py-1 rounded-xl inline-block mt-1 drop-shadow-lg">
              EN UN SOLO LUGAR
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-[#303030] mt-4 max-w-lg font-medium">
            Hogar, cumpleaños, juguetes, artículos para el cabello, melamina y productos de temporada.
          </p>
          
          {/* ====== BOTONES PRINCIPALES (Shadcn) ====== */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <Link to="/productos">
              <Button className="bg-[#7D5FFF] hover:bg-[#7D5FFF]/80 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                🔍 Ver Catálogo
              </Button>
            </Link>
            <Link to="/ofertas">
              <Button className="bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                🔥 Ver Ofertas
              </Button>
            </Link>
          </div>

          {/* ====== BOTONES DE WHATSAPP Y ENVÍOS (HTML puro) ====== */}
          <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
            {/* WhatsApp - botón con estilo Shadcn pero como enlace externo */}
            <a 
              href="https://wa.me/56912345678?text=Hola%20Comercial%20Uruguay%2C%20quiero%20consultar%20sobre..." 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#00D2D3] hover:bg-[#00D2D3]/80 text-white font-bold px-6 py-3 text-md rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105"
            >
              <span className="text-xl">💬</span>
              Gestiona tu pedido por WhatsApp
            </a>
            
            {/* Envíos */}
            <Link to="/envios">
              <Button className="bg-[#90C090] hover:bg-[#90C090]/80 text-white font-bold px-6 py-3 text-md rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                📦 Envíos a todo Chile
              </Button>
            </Link>
          </div>

          {/* ====== INFO ADICIONAL DE ENVÍOS ====== */}
          <div className="flex flex-wrap gap-4 mt-3 justify-center md:justify-start">
            <Badge className="bg-white/30 backdrop-blur-sm text-[#303030] border border-[#00D2D3] px-3 py-1.5 text-sm">
              🏪 Retiro en tienda
            </Badge>
            <Badge className="bg-white/30 backdrop-blur-sm text-[#303030] border border-[#90C090] px-3 py-1.5 text-sm">
              📦 Envío a regiones
            </Badge>
            <Badge className="bg-white/30 backdrop-blur-sm text-[#303030] border border-[#7D5FFF] px-3 py-1.5 text-sm">
              💬 Consulta por WhatsApp
            </Badge>
          </div>

          {/* ====== ESTADÍSTICAS ====== */}
          <div className="flex flex-wrap gap-6 mt-8 justify-center md:justify-start">
            <div className="text-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <p className="text-2xl font-extrabold text-[#7D5FFF]">+10</p>
              <p className="text-xs text-[#303030]/70">Años de experiencia</p>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <p className="text-2xl font-extrabold text-[#FF6B81]">+1000</p>
              <p className="text-xs text-[#303030]/70">Productos disponibles</p>
            </div>
            <div className="text-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
              <p className="text-2xl font-extrabold text-[#00D2D3]">+500</p>
              <p className="text-xs text-[#303030]/70">Clientes felices</p>
            </div>
          </div>
        </div>

        {/* ====== RECUADRO DEL LOCAL ====== */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-[#00D2D3] shadow-2xl max-w-sm w-full hover:shadow-[#00D2D3]/30 transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl animate-bounce">🏪</span>
            <h3 className="text-xl font-bold text-[#7D5FFF]">Comercial Uruguay</h3>
            <Badge className="bg-[#90C090] text-white ml-auto">★ Local</Badge>
          </div>
          
          <div className="bg-gradient-to-br from-[#00D2D3]/20 to-[#90C090]/20 h-40 rounded-lg flex flex-col items-center justify-center text-[#303030] text-sm mb-3 border-2 border-dashed border-[#00D2D3] hover:border-[#90C090] transition">
            <span className="text-5xl mb-2 animate-pulse">📸</span>
            <span className="font-medium">Próximamente: foto de nuestro local</span>
          </div>
          
          <div className="space-y-2">
            <p className="text-[#303030] flex items-center gap-2 text-sm">
              <span className="text-[#FF6B81] text-lg">📍</span> 
              <span className="font-medium">Uruguay 660, Valparaíso</span>
            </p>
            <p className="text-[#303030] flex items-center gap-2 text-sm">
              <span className="text-[#00D2D3] text-lg">🕐</span> 
              <span className="font-medium">Lunes a Sábado 09:00 - 19:00 hrs</span>
            </p>
            
            {/* Badges de contacto */}
            <div className="flex flex-wrap gap-2 mt-2">
              <a 
                href="https://wa.me/56912345678" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00D2D3] hover:bg-[#00D2D3]/80 text-white text-xs font-medium px-3 py-1 rounded-full transition"
              >
                💬 WhatsApp
              </a>
              <Badge className="bg-[#90C090] text-white cursor-pointer hover:bg-[#90C090]/80 px-3 py-1">
                📦 Envíos
              </Badge>
              <Badge className="bg-[#FF6B81] text-white cursor-pointer hover:bg-[#FF6B81]/80 px-3 py-1">
                🏪 Retiro en tienda
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}