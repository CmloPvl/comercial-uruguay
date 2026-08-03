// 📁 frontend/src/components/products/ProductsBanner.tsx

/**
 * 📌 PRODUCTS BANNER
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Banner de la página de productos (tienda).
 * Muestra el título, descripción y categorías con filtros.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - Animaciones con framer-motion
 * - Uso extensivo de la paleta de colores
 * - Gradiente simplificado (3 colores)
 * - Diseño moderno y atractivo
 * - Responsive (mobile-first)
 */

import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { Sparkles, ShoppingBag, Truck, Store } from "lucide-react";

interface ProductsBannerProps {
  categories: Array<{
    id: string;
    name: string;
    icon: string;
    color: string;
  }>;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  productCount: number;
}

export function ProductsBanner({
  categories,
  selectedCategory,
  onCategorySelect,
  productCount,
}: ProductsBannerProps) {
  return (
    // ✅ Gradiente simplificado (3 colores)
    <div className="relative bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-16 px-4 overflow-hidden">
      
      {/* =============================================
      🎨 ELEMENTOS DECORATIVOS (múltiples colores)
      ============================================= */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#FFD93D] blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-[#FF6B81] blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#FFD93D] blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-20 right-20 w-40 h-40 rounded-full bg-[#FFD93D] blur-3xl animate-pulse delay-500"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#90C090] blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute top-40 left-1/3 w-56 h-56 rounded-full bg-[#FF9F43] blur-3xl animate-pulse delay-2500"></div>
      </div>

      {/* 🎨 Formas flotantes pequeñas */}
      <div className="absolute top-10 right-10 w-8 h-8 rounded-full bg-[#FFD93D] blur-sm animate-bounce-slow"></div>
      <div className="absolute bottom-10 left-10 w-6 h-6 rounded-full bg-[#FF6B81] blur-sm animate-bounce-slow delay-2000"></div>
      <div className="absolute top-1/2 right-20 w-10 h-10 rounded-full bg-[#00D2D3] blur-sm animate-bounce-slow delay-1000"></div>

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
          <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-5 py-2 rounded-full font-bold text-sm shadow-lg flex items-center gap-2 animate-pulse">
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
          <span className="text-[#FFD93D]">🏪</span> Tienda{" "}
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
          <Badge className="bg-[#FFD93D]/20 text-white border border-[#FFD93D]/30 px-4 py-1.5 rounded-full text-sm flex items-center gap-2">
            <span className="text-[#FFD93D] font-bold">{productCount}</span>
            productos disponibles
          </Badge>
        </motion.div>

        {/* =============================================
        🏷️ CATEGORÍAS CON ANIMACIÓN POR LETRA
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-2 mt-6"
        >
          {/* Botón "Todas" */}
          <motion.button
            onClick={() => onCategorySelect("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 border-2 ${
              selectedCategory === ""
                ? "bg-[#FFD93D] text-[#303030] border-[#FFD93D] shadow-lg"
                : "bg-white/10 text-white border-white/20 hover:border-white/50 hover:bg-white/20"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌐 Todas
          </motion.button>

          {/* Categorías con colores individuales */}
          {categories.map((cat, index) => (
            <motion.button
              key={cat.id}
              onClick={() =>
                onCategorySelect(selectedCategory === cat.name ? "" : cat.name)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 border-2 ${
                selectedCategory === cat.name
                  ? "bg-[#FFD93D] text-[#303030] border-[#FFD93D] shadow-lg"
                  : "bg-white/10 text-white border-white/20 hover:border-white/50 hover:bg-white/20"
              } ${cat.color}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cat.icon} {cat.name}
            </motion.button>
          ))}
        </motion.div>

        {/* =============================================
        🎯 SERVICIOS DESTACADOS
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
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