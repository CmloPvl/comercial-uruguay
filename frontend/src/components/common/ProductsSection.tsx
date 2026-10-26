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
 * - Animaciones con framer-motion
 * - Responsive (mobile-first)
 * 
 * 📌 Ejemplos de uso:
 * 
 * 1. Destacados (Home):
 *    <ProductsSection
 *      products={featured}
 *      loading={loading}
 *      error={error}
 *      onAddToCart={handleAddToCart}
 *      onRetry={load}
 *      badge="⭐ Destacados"
 *      title="⭐ Artículos Destacados"
 *      subtitle="Los productos que elegimos para ti"
 *    />
 * 
 * 2. Ofertas:
 *    <ProductsSection
 *      products={offers}
 *      loading={loading}
 *      error={error}
 *      onAddToCart={handleAddToCart}
 *      onRetry={load}
 *      badge="🔥 Ofertas"
 *      title="🔥 Ofertas del mes"
 *      subtitle="Aprovecha estos precios"
 *      ctaText="Ver todas las ofertas"
 *      ctaLink="/ofertas"
 *    />
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
  // =============================================
  // 📦 DATOS (obligatorios)
  // =============================================
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (productId: string, productName: string) => void;
  onRetry: () => void;

  // =============================================
  // 🎨 PERSONALIZACIÓN (opcionales con defaults)
  // =============================================
  badge?: string;
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  emptyMessage?: string;
}

// =============================================
// 🎯 SKELETON DE PRODUCTOS
// =============================================
const ProductSkeleton = () => (
  <div className="flex-shrink-0 w-[280px] border-2 border-[#00D2D3]/30 rounded-xl p-4 space-y-3">
    <Skeleton className="w-full h-40 rounded-lg" />
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
  // Datos
  products,
  loading,
  error,
  onAddToCart,
  onRetry,

  // Personalización (con defaults)
  badge = "⭐ Destacados",
  title = "⭐ Artículos Destacados",
  subtitle = "Los productos que elegimos para ti",
  showCTA = true,
  ctaText = "🛒 Ver tienda virtual →",
  ctaLink = "/productos",
  backgroundColor = "bg-white",
  emptyMessage = "No hay productos disponibles.",
}: ProductsSectionProps) {
  return (
    <section className={`py-16 px-4 ${backgroundColor}`}>
      <div className="max-w-6xl mx-auto">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge className="bg-[#00D2D3] text-white mb-2 px-4 py-1 rounded-full">
            {badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
            {title}
          </h2>
          <p className="text-[#6A757C] mt-2">
            {subtitle}
          </p>
        </motion.div>

        {/* =============================================
        📦 CONTENIDO
        ============================================= */}
        {loading ? (
          // 🔄 Estado de carga
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          // ❌ Estado de error
          <div className="text-center py-12">
            <p className="text-[#FF6B81]">❌ {error}</p>
            <button
              onClick={onRetry}
              className="mt-2 text-[#7D5FFF] hover:underline font-medium"
            >
              🔄 Reintentar
            </button>
          </div>
        ) : (
          // ✅ Carrusel de productos con auto-scroll
          <ProductCarousel
            products={products}
            onAddToCart={onAddToCart}
            emptyMessage={emptyMessage}
            autoScroll={true}
          />
        )}

        {/* =============================================
        🔗 CTA (opcional)
        ============================================= */}
        {showCTA && (
          <div className="text-center mt-8">
            <Link to={ctaLink}>
              <Button className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
                {ctaText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}