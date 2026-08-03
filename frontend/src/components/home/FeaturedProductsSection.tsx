// 📁 frontend/src/components/home/FeaturedProductsSection.tsx

/**
 * 📌 FEATURED PRODUCTS SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los productos destacados en la página principal.
 * Recibe los datos por props, no tiene lógica propia.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - Maneja estados de carga y error visualmente
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
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import type { Product } from "../../services/productService";

interface FeaturedProductsSectionProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (productId: string, productName: string) => void;
  onRetry: () => void;
}

// 🎨 Skeleton para productos destacados (componente interno)
const ProductSkeleton = () => (
  <div className="border-2 border-[#00D2D3]/30 rounded-xl p-4 space-y-3">
    <Skeleton className="w-full h-40 rounded-lg" />
    <Skeleton className="h-4 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
    <Skeleton className="h-6 w-1/3" />
    <Skeleton className="h-10 w-full rounded-xl" />
  </div>
);

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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge className="bg-[#00D2D3] text-white mb-2 px-4 py-1 rounded-full">
            ⭐ Destacados
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
            ⭐ PRODUCTOS DESTACADOS
          </h2>
          <p className="text-[#6A757C] mt-2">Los productos más populares del momento</p>
        </motion.div>

        {/* Contenido */}
        {loading ? (
          // 🔄 Estado de carga
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
        ) : products.length === 0 ? (
          // 📭 Sin productos
          <div className="text-center py-12">
            <p className="text-[#6A757C]">No hay productos disponibles.</p>
          </div>
        ) : (
          // ✅ Grid de productos
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product, index) => {
              const finalPrice =
                product.isOnSale && product.discount > 0
                  ? product.price * (1 - product.discount / 100)
                  : product.price;
              const hasImage =
                product.images && Array.isArray(product.images) && product.images.length > 0;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
                    <CardContent className="p-4">
                      {/* Imagen */}
                      <Link to={`/producto/${product.id}`}>
                        <div className="relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition">
                          {hasImage ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            "📦"
                          )}
                          {product.isOnSale && product.discount > 0 && (
                            <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-2 py-1 rounded-full animate-pulse">
                              🔥 -{product.discount}%
                            </Badge>
                          )}
                        </div>
                      </Link>

                      {/* Nombre */}
                      <Link to={`/producto/${product.id}`}>
                        <h3 className="font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Precio */}
                      <div className="flex items-center gap-2">
                        {product.isOnSale && product.discount > 0 && (
                          <span className="text-sm text-[#6A757C] line-through">
                            ${product.price.toLocaleString("es-CL")}
                          </span>
                        )}
                        <p
                          className={`font-bold text-xl ${
                            product.isOnSale ? "text-[#FF6B81]" : "text-[#7D5FFF]"
                          }`}
                        >
                          ${Math.round(finalPrice).toLocaleString("es-CL")}
                        </p>
                      </div>

                      {/* Botón agregar */}
                      <Button
                        onClick={() => onAddToCart(product.id, product.name)}
                        className="w-full mt-3 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold transition-all shadow-md hover:shadow-lg rounded-xl"
                      >
                        🛒 Agregar
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Ver todos los productos */}
        <div className="text-center mt-8">
          <Link
            to="/productos"
            className="text-[#FF6B81] font-bold hover:underline hover:text-[#7D5FFF] transition text-lg"
          >
            Ver todos los productos →
          </Link>
        </div>
      </div>
    </section>
  );
}