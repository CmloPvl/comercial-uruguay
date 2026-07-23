import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaCamera,
  FaTimes,
  FaTruck,
  FaStore,
} from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { empresaConfig } from "../../config/empresa";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function Hero() {
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";
  const [localImage, setLocalImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tamaño (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("❌ La imagen excede el tamaño máximo de 2MB", {
          style: {
            border: "2px solid #FF6B81",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
        return;
      }

      // Validar tipo
      if (!file.type.startsWith("image/")) {
        toast.error("❌ El archivo no es una imagen válida", {
          style: {
            border: "2px solid #FF6B81",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const target = event.target as FileReader;
        if (target?.result) {
          setLocalImage(target.result as string);
          toast.success("✅ Imagen del local actualizada", {
            icon: "🖼️",
            style: {
              border: "2px solid #00D2D3",
              padding: "16px",
              backgroundColor: "#FAF9E2",
              color: "#303030",
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setLocalImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("🗑️ Imagen del local eliminada", {
      icon: "✅",
      style: {
        border: "2px solid #FF9F43",
        padding: "16px",
        backgroundColor: "#FAF9E2",
        color: "#303030",
      },
    });
  };

  // Colores reales de redes sociales
  const socialColors = {
    facebook: "#1877F2",
    instagram: "#E4405F",
    tiktok: "#000000",
    whatsapp: "#25D366",
  };

  // 🎨 Animaciones
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F0C0] via-[#F0C0F0] to-[#FF9F43]/30 min-h-[85vh] flex items-center py-10 px-4">
      {/* ====== FONDO DECORATIVO CON MÚLTIPLES COLORES ====== */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#7D5FFF] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#00D2D3] blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#90C090] blur-3xl"></div>
        <div className="absolute top-20 right-20 w-56 h-56 rounded-full bg-[#FF6B81] blur-3xl"></div>
        <div className="absolute bottom-40 left-1/4 w-64 h-64 rounded-full bg-[#FFD93D] blur-3xl"></div>
        <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-[#603060] blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 rounded-full bg-[#FF9F43] blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center w-full">
        {/* ============================================================ */}
        {/* COLUMNA IZQUIERDA */}
        {/* ============================================================ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-center lg:text-left"
        >
          {/* Badge de bienvenida */}
          <Badge className="bg-gradient-to-r from-[#603060] to-[#7D5FFF] text-white px-4 py-1.5 rounded-full inline-flex items-center gap-2 w-fit mx-auto lg:mx-0 shadow-lg">
            🎉 ¡Bienvenido a Comercial Uruguay!
          </Badge>

          {/* Título */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-[#303030]">
            Todo lo que necesitas
            <br />
           <span className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#FF6B81] bg-clip-text text-transparent">
  en un solo lugar
</span>
          </h1>

          <p className="text-base sm:text-lg text-[#6A757C] max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Hogar, cumpleaños, juguetes, cabello, melamina y productos de temporada.
            <br />
            <span className="text-[#603060] font-semibold">+10 años</span> de experiencia en Valparaíso.
          </p>

          {/* Botones principales */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
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

          {/* SERVICIOS DESTACADOS */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <Badge className="bg-[#00D2D3] text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaTruck size={16} /> Envíos a todo Chile
            </Badge>
            <Badge className="bg-[#FFD93D] text-[#303030] px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaStore size={16} /> Retiro en tienda
            </Badge>
            <Badge className="bg-[#90C090] text-white px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-default flex items-center gap-2">
              <FaWhatsapp size={16} /> WhatsApp
            </Badge>
          </div>

          {/* Redes Sociales con colores reales */}
          <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start pt-1">
            <span className="text-sm font-medium text-[#6A757C]">Síguenos:</span>

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

        {/* ============================================================ */}
        {/* COLUMNA DERECHA: TARJETA DEL LOCAL */}
        {/* ============================================================ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 rounded-3xl border-2 border-[#00D2D3] shadow-2xl hover:shadow-[#00D2D3]/30 transition-all duration-300">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">🏪</span>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-[#603060]">{empresaConfig.nombre}</h3>
                <p className="text-xs text-[#6A757C]">📍 Valparaíso, Chile</p>
              </div>
              <Badge className="bg-[#90C090] text-white text-xs">★ Local</Badge>
            </div>

            {/* ÁREA DE IMAGEN */}
            <div className="relative group aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-[#00D2D3] hover:border-[#90C090] transition-all bg-gradient-to-br from-[#00D2D3]/10 to-[#90C090]/10">
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
                          className="bg-white/90 hover:bg-white text-[#603060] px-3 py-1.5 rounded-full font-bold text-xs shadow-lg transition-all hover:scale-105"
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
                  className={`w-full h-full flex flex-col items-center justify-center ${
                    isAdmin ? "cursor-pointer hover:bg-[#00D2D3]/5" : "cursor-default"
                  } transition-all`}
                >
                  <div className="w-16 h-16 rounded-full bg-[#00D2D3]/10 flex items-center justify-center mb-2 group-hover:bg-[#00D2D3]/20 transition-all">
                    <FaCamera className="text-2xl text-[#00D2D3]" />
                  </div>
                  <p className="text-[#6A757C] font-medium text-sm text-center px-4">
                    {isAdmin ? "Haz clic para subir una foto" : "Foto del local próximamente"}
                  </p>
                  {isAdmin && (
                    <p className="text-xs text-[#6A757C]/40 text-center">PNG, JPG o WEBP (máx. 2MB)</p>
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

            {/* Información de contacto */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
                <span className="text-[#FF6B81] text-lg">📍</span>
                <span className="font-medium text-[#303030] text-sm truncate">
                  {empresaConfig.direccion}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
                <span className="text-[#00D2D3] text-lg">🕐</span>
                <span className="font-medium text-[#303030] text-sm">
                  Lun-Vie: {empresaConfig.horario.lunesViernes}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
                <FaWhatsapp className="text-[#25D366] text-lg" />
                <a
                  href={`https://wa.me/${empresaConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#00D2D3] hover:text-[#603060] transition-colors text-sm"
                >
                  {empresaConfig.telefono}
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm bg-[#303030]/5 p-2.5 rounded-xl hover:bg-[#303030]/10 transition">
                <SiGmail className="text-[#EA4335] text-lg" />
                <a
                  href={`mailto:${empresaConfig.email}`}
                  className="font-medium text-[#603060] hover:text-[#7D5FFF] transition-colors text-xs sm:text-sm truncate"
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
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
            >
              <FaWhatsapp size={18} />
              Consultar por WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}