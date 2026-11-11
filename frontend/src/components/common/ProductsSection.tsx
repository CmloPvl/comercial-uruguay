// 📁 frontend/src/components/common/ProductsSection.tsx

/**
 * 📌 PRODUCTS SECTION - COMPONENTE REUTILIZABLE
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Sección de productos con título, subtítulo y carrusel.
 * 100% reutilizable: sirve para Destacados, Ofertas, Novedades, etc.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - 100% reutilizable (todas las props con defaults)
 * - Usa ProductCarousel (también reutilizable)
 * - Maneja estados de carga y error visualmente
 * - Mobile-first
 * 
 * 🆕 Prop `compact` para versión más pequeña (catálogo, ofertas)
 * 🆕 `compact` reduce padding, título y espacios
 */

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { ProductCarousel } from "./ProductCarousel";
import type { Product } from "../../services/productService";

// =============================================
// 📋 INTERFAZ DE PROPS
// =============================================

interface ProductsSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (productId: string, productName: string) => void;
  onRetry: () => void;

  badge?: string;
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  emptyMessage?: string;
  compact?: boolean;  // 🆕
}

// =============================================
// 🎯 SKELETON DE PRODUCTOS
// =============================================
const ProductSkeleton = ({ compact }: { compact?: boolean }) => (
  <div className={`flex-shrink-0 ${compact ? "w-[60vw] max-w-[200px]" : "w-[70vw] max-w-[240px]"} border-2 border-[#00D2D3]/30 rounded-xl p-3 space-y-3`}>
    <Skeleton className="w-full aspect-square rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-10 w-full rounded-xl" />
  </div>
);

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function ProductsSection({
  products,
  loading,
  error,
  onAddToCart,
  onRetry,
  badge = "⭐ Destacados",
  title = "⭐ Artículos Destacados",
  subtitle = "Los productos que elegimos para ti",
  showCTA = true,
  ctaText = "🛒 Ver tienda virtual →",
  ctaLink = "/productos",
  backgroundColor = "bg-white",
  emptyMessage = "No hay productos disponibles.",
  compact = false,  // 🆕
}: ProductsSectionProps) {
  return (
    <section className={`${compact ? "py-6" : "py-16"} ${backgroundColor}`}>
      {/* HEADER (con padding) */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`text-center ${compact ? "mb-4" : "mb-10"}`}
        >
          <Badge className={`bg-[#00D2D3] text-white mb-2 ${compact ? "px-3 py-0.5 text-xs" : "px-4 py-1"} rounded-full`}>
            {badge}
          </Badge>
          <h2 className={`${compact ? "text-xl md:text-2xl" : "text-3xl md:text-4xl"} font-extrabold text-[#603060]`}>
            {title}
          </h2>
          <p className={`text-[#6A757C] ${compact ? "mt-1 text-sm" : "mt-2"}`}>
            {subtitle}
          </p>
        </motion.div>
      </div>

      {/* CARRUSEL */}
      <div className="max-w-6xl mx-auto px-4">
        {loading ? (
          <div className="flex gap-3 sm:gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <ProductSkeleton key={i} compact={compact} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-[#FF6B81]">❌ {error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-[#7D5FFF] hover:underline font-medium"
            >
              🔄 Reintentar
            </button>
          </div>
        ) : (
          <ProductCarousel
            products={products}
            onAddToCart={onAddToCart}
            emptyMessage={emptyMessage}
            autoScroll={true}
          />
        )}
      </div>

      {/* CTA (con padding) */}
      {showCTA && (
        <div className="text-center mt-8 px-4">
          <Link to={ctaLink}>
            <Button className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              {ctaText}
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}