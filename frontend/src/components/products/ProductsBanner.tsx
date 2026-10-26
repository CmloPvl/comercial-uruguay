// 📁 frontend/src/components/products/ProductsBanner.tsx

/**
 * 📌 PRODUCTS BANNER
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Banner de la página de productos (tienda).
 * Muestra el título, descripción y contador de productos.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos por props
 * - Animaciones con framer-motion
 * - Gradiente con paleta de colores
 * - Responsive (mobile-first)
 * - Sin categorías (están en ProductFilters)
 * - Accesible con aria-label
 */

import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Truck, Store } from "lucide-react";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface ProductsBannerProps {
  productCount: number;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export function ProductsBanner({
  productCount,
}: ProductsBannerProps) {
  return (
    <div 
      className="relative bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-16 px-4 overflow-hidden"
      aria-label="Banner de la tienda"
    >
      {/* =============================================
      🎨 ELEMENTOS DECORATIVOS (reducidos)
      ============================================= */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#FFD93D] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#FF6B81] blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#90C090] blur-3xl"></div>
      </div>

      <div className="relative max-w-6xl mx-auto text-center">
        {/* =============================================
        📌 BADGE CON ANIMACIÓN
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-5 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            🛍️ Tienda Oficial
            <Sparkles className="w-4 h-4 text-[#FF6B81]" />
          </Badge>
        </motion.div>

        {/* =============================================
        📝 TÍTULO PRINCIPAL
        ============================================= */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-lg"
        >
          <span className="text-[#FFD93D]"></span> Tienda{" "}
          <span className="bg-gradient-to-r from-[#FFD93D] via-[#FF6B81] to-[#00D2D3] bg-clip-text text-transparent">
            Comercial Uruguay
          </span>
        </motion.h1>

        {/* =============================================
        📝 SUBTÍTULO
        ============================================= */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/90 mt-3 text-lg max-w-2xl mx-auto"
        >
          Encuentra miles de productos para tu hogar y familia.
        </motion.p>

        {/* =============================================
        📊 CONTADOR DE PRODUCTOS
        ============================================= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center gap-4 mt-3"
        >
          <Badge 
            className="bg-[#FFD93D]/20 text-white border border-[#FFD93D]/30 px-4 py-1.5 rounded-full text-sm flex items-center gap-2"
            aria-label={`${productCount} productos disponibles`}
          >
            <span className="text-[#FFD93D] font-bold">{productCount}</span>
            productos disponibles
          </Badge>
        </motion.div>

        {/* =============================================
        🎯 SERVICIOS DESTACADOS
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          <Badge className="bg-[#00D2D3]/20 text-white border border-[#00D2D3]/30 px-3 py-1.5 text-xs flex items-center gap-1">
            <Truck className="w-3 h-3" /> Envíos a todo Chile
          </Badge>
          <Badge className="bg-[#FF6B81]/20 text-white border border-[#FF6B81]/30 px-3 py-1.5 text-xs flex items-center gap-1">
            <Store className="w-3 h-3" /> Retiro en tienda
          </Badge>
          <Badge className="bg-[#FFD93D]/20 text-white border border-[#FFD93D]/30 px-3 py-1.5 text-xs flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Ofertas exclusivas
          </Badge>
        </motion.div>
      </div>
    </div>
  );
}