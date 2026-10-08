// 📁 frontend/src/components/home/FeaturedProductsSection.tsx

/**
 * 📌 FEATURED PRODUCTS SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los productos destacados en la página principal.
 * Usa ProductCarousel con auto-scroll y lazy loading.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Usa ProductCarousel (reutilizable)
 * - Auto-scroll activado
 * - Maneja estados de carga y error visualmente
 * - Botón "Ver tienda virtual" más visible
 * - Reutilizable en otras páginas
 * 
 * @param {Object} props
 * @param {Product[]} props.products - Lista de productos a mostrar
 * @param {boolean} props.loading - Estado de carga
 * @param {string | null} props.error - Mensaje de error
 * @param {Function} props.onAddToCart - Función para agregar al carrito
 * @param {Function} props.onRetry - Función para reintentar carga
 */

import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { ProductCarousel } from "../common/ProductCarousel";
import type { Product } from "../../services/productService";

interface FeaturedProductsSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (productId: string, productName: string) => void;
  onRetry: () => void;
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

export function FeaturedProductsSection({
  products,
  loading,
  error,
  onAddToCart,
  onRetry,
}: FeaturedProductsSectionProps) {
  return (
    <section className="py-16 px-4 bg-white">
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
            ⭐ Los más vendidos
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
            ⭐ LOS MÁS VENDIDOS
          </h2>
          <p className="text-[#6A757C] mt-2">
            Los productos favoritos de nuestros clientes
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
            emptyMessage="No hay productos disponibles."
            autoScroll={true}
          />
        )}

        {/* =============================================
        🔗 VER TIENDA VIRTUAL
        ============================================= */}
        <div className="text-center mt-8">
          <Link to="/productos">
            <Button className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105">
              🛒 Ver tienda virtual →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}