import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { Badge } from "../ui/badge"
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaCamera, FaTimes, FaTruck, FaStore } from "react-icons/fa"
import { SiGmail } from "react-icons/si"
import { empresaConfig } from "../../config/empresa"
import { useAuth } from "../../context/AuthContext"

export default function Hero() {
  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN"
  const [localImage, setLocalImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setLocalImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setLocalImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Colores reales de redes sociales
  const socialColors = {
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#000000",
    whatsapp: "#25D366",
    youtube: "#FF0000"
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pale-lemon via-light-lavender to-peach/30 min-h-[85vh] flex items-center py-10 px-4">
      
      {/* ====== FONDO DECORATIVO ====== */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-purple-electric blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-mint-green blur-3xl"></div>
        <div className="absolute top-20 right-20 w-56 h-56 rounded-full bg-pink-vibrant blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-yellow-bright blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        
        {/* ============================================================ */}
        {/* COLUMNA IZQUIERDA */}
        {/* ============================================================ */}
        <div className="space-y-5 text-center lg:text-left">
          
          {/* Badge de bienvenida */}
          <Badge className="bg-purple-electric text-white px-4 py-1.5 rounded-full inline-flex items-center gap-2 w-fit mx-auto lg:mx-0">
            🎉 ¡Bienvenido a Comercial Uruguay!
          </Badge>
          
          {/* Título */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-primary">
            Todo lo que necesitas
            <br />
            <span className="bg-gradient-to-r from-purple-electric via-cyan to-pink-vibrant bg-clip-text text-transparent">
              en un solo lugar
            </span>
          </h1>
          
          <p className="text-base sm:text-lg text-charcoal/70 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Hogar, cumpleaños, juguetes, cabello, melamina y productos de temporada.
            <br />
            <span className="text-primary font-semibold">+10 años</span> de experiencia en Valparaíso.
          </p>
          
          {/* Botones principales */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Link to="/productos">
              <Button className="bg-purple-electric hover:bg-purple-electric/80 text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                🛒 Ver Catálogo
              </Button>
            </Link>
            <Link to="/ofertas">
              <Button className="bg-pink-vibrant hover:bg-pink-vibrant/80 text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-2xl transition-all hover:scale-105">
                🔥 Ofertas
              </Button>
            </Link>
          </div>

          {/* SERVICIOS DESTACADOS - MÁS GRANDES */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Badge className="bg-cyan text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaTruck size={16} /> Envíos a todo Chile
            </Badge>
            <Badge className="bg-yellow-bright text-charcoal px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaStore size={16} /> Retiro en tienda
            </Badge>
            <Badge className="bg-mint-green text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaWhatsapp size={16} /> WhatsApp
            </Badge>
          </div>

          {/* Redes Sociales con colores reales */}
          <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start pt-1">
            <span className="text-sm font-medium text-charcoal/50">Síguenos:</span>
            
            <a 
              href={empresaConfig.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: socialColors.facebook }}
              className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="Facebook"
            >
              <FaFacebook size={18} />
            </a>
            <a 
              href={empresaConfig.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: socialColors.instagram }}
              className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a 
              href={empresaConfig.tiktok} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: socialColors.tiktok }}
              className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="TikTok"
            >
              <FaTiktok size={18} />
            </a>
            <a 
              href={`https://wa.me/${empresaConfig.whatsapp}`} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ backgroundColor: socialColors.whatsapp }}
              className="text-white p-2.5 rounded-full transition-all hover:scale-110 shadow-md hover:shadow-lg"
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </a>
          </div>

          {/* Estadísticas */}
          <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
            <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-purple-electric/20">
              <p className="text-2xl font-extrabold text-purple-electric">+10</p>
              <p className="text-xs text-charcoal/60 font-medium">Años</p>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-pink-vibrant/20">
              <p className="text-2xl font-extrabold text-pink-vibrant">+1000</p>
              <p className="text-xs text-charcoal/60 font-medium">Productos</p>
            </div>
            <div className="text-center bg-white/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-cyan/20">
              <p className="text-2xl font-extrabold text-cyan">+500</p>
              <p className="text-xs text-charcoal/60 font-medium">Clientes</p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* COLUMNA DERECHA: TARJETA DEL LOCAL */}
        {/* ============================================================ */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl border-2 border-cyan shadow-2xl hover:shadow-cyan/30 transition-all duration-300">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏪</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{empresaConfig.nombre}</h3>
                <p className="text-xs text-charcoal/50">📍 Valparaíso, Chile</p>
              </div>
              <Badge className="bg-mint-green text-white text-xs">★ Local</Badge>
            </div>

            {/* ÁREA DE IMAGEN - solo ADMIN puede subir */}
            <div className="relative group aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-cyan hover:border-mint-green transition-all bg-gradient-to-br from-cyan/10 to-mint-green/10">
              {localImage ? (
                <>
                  <img 
                    src={localImage} 
                    alt="Local Comercial Uruguay" 
                    className="w-full h-full object-cover"
                  />
                  {isAdmin && (
                    <>
                      <button
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full transition-all hover:scale-110"
                        title="Eliminar imagen"
                      >
                        <FaTimes size={14} />
                      </button>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-white/90 hover:bg-white text-primary px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all hover:scale-105"
                        >
                          🔄 Cambiar imagen
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div 
                  onClick={() => isAdmin && fileInputRef.current?.click()}
                  className={`w-full h-full flex flex-col items-center justify-center ${isAdmin ? 'cursor-pointer hover:bg-cyan/5' : 'cursor-default'} transition-all`}
                >
                  <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center mb-2 group-hover:bg-cyan/20 transition-all">
                    <FaCamera className="text-2xl text-cyan" />
                  </div>
                  <p className="text-charcoal/60 font-medium text-sm text-center px-4">
                    {isAdmin ? "Haz clic para subir una foto" : "Foto del local próximamente"}
                  </p>
                  {isAdmin && (
                    <p className="text-xs text-charcoal/40 text-center">PNG, JPG o WEBP (máx. 2MB)</p>
                  )}
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Información de contacto con iconos */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 text-sm bg-charcoal/5 p-2.5 rounded-xl hover:bg-charcoal/10 transition">
                <span className="text-pink-vibrant text-lg">📍</span>
                <span className="font-medium text-charcoal text-sm truncate">{empresaConfig.direccion}</span>
              </div>
              
              <div className="flex items-center gap-3 text-sm bg-charcoal/5 p-2.5 rounded-xl hover:bg-charcoal/10 transition">
                <span className="text-cyan text-lg">🕐</span>
                <span className="font-medium text-charcoal text-sm">
                  Lun-Vie: {empresaConfig.horario.lunesViernes}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm bg-charcoal/5 p-2.5 rounded-xl hover:bg-charcoal/10 transition">
                <FaWhatsapp className="text-[#25D366] text-lg" />
                <a 
                  href={`https://wa.me/${empresaConfig.whatsapp}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-cyan hover:text-purple-electric transition-colors text-sm"
                >
                  {empresaConfig.telefono}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm bg-charcoal/5 p-2.5 rounded-xl hover:bg-charcoal/10 transition">
                <SiGmail className="text-[#EA4335] text-lg" />
                <a 
                  href={`mailto:${empresaConfig.email}`} 
                  className="font-medium text-primary hover:text-purple-electric transition-colors text-xs sm:text-sm truncate"
                >
                  {empresaConfig.email}
                </a>
              </div>
            </div>

            {/* Botón WhatsApp */}
            <a 
              href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola%20${empresaConfig.nombre}%2C%20quiero%20consultar%20sobre...`}
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan to-purple-electric hover:from-purple-electric hover:to-cyan text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
            >
              <FaWhatsapp size={18} />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}