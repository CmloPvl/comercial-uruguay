// 📁 frontend/src/components/home/CategoriesSection.tsx

/**
 * 📌 CATEGORIES SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra las categorías dinámicas desde la API.
 * Usa useCategories para obtener las categorías con iconos y colores.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos dinámicos desde useCategories
 * - Grid responsive según cantidad de categorías
 * - Skeleton loading personalizado
 * - Hover con animaciones
 * - Botón "Ver todas" más visible
 * - Enlaces a la página de productos con filtro
 * - Responsive (mobile-first)
 * - Animaciones con framer-motion
 */

import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { useCategories } from "../../hooks/useCategories";

// =============================================
// 🎯 SKELETON DE CATEGORÍAS
// =============================================
const CategoriesSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white p-4 rounded-xl border-2 border-gray-200">
        <Skeleton className="h-12 w-12 rounded-full mx-auto mb-2" />
        <Skeleton className="h-4 w-3/4 mx-auto" />
      </div>
    ))}
  </div>
);

// =============================================
// 🎯 GRID RESPONSIVE SEGÚN CANTIDAD
// =============================================
const getGridCols = (count: number) => {
  if (count <= 3) return "grid-cols-1 sm:grid-cols-3";
  if (count <= 4) return "grid-cols-2 sm:grid-cols-4";
  return "grid-cols-2 sm:grid-cols-3 md:grid-cols-6";
};

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function CategoriesSection() {
  // =============================================
  // 🧠 LÓGICA (categorías dinámicas)
  // =============================================
  const { categoriesWithIcons, loading } = useCategories();

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0C030]/10 to-[#FF9F43]/20">
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
          <Badge className="bg-[#7D5FFF] text-white mb-2 px-4 py-1 rounded-full">
            📂 Categorías
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
            🛍️ EXPLORA POR CATEGORÍA
          </h2>
          <p className="text-[#6A757C] mt-2">
            Encuentra lo que buscas en nuestras categorías
          </p>
        </motion.div>

        {/* =============================================
        📂 GRID DE CATEGORÍAS (dinámico)
        ============================================= */}
        {loading ? (
          <CategoriesSkeleton />
        ) : categoriesWithIcons.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-4xl mb-3">📂</p>
            <p className="text-[#6A757C] font-medium">No hay categorías disponibles</p>
          </div>
        ) : (
          <div className={`grid ${getGridCols(categoriesWithIcons.length)} gap-4`}>
            {categoriesWithIcons.map((cat, index) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/productos?categoria=${cat.name}`}
                  className={`
                    bg-white 
                    p-4 
                    rounded-xl 
                    border-2 
                    ${cat.color.bg} 
                    shadow-md 
                    hover:shadow-xl 
                    hover:shadow-[#7D5FFF]/30
                    transition-all 
                    hover:-translate-y-2 
                    cursor-pointer 
                    group 
                    block
                    text-center
                  `}
                >
                  <div className="text-5xl mb-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {cat.icon}
                  </div>
                  <p className="font-bold text-[#303030] text-sm group-hover:text-[#7D5FFF] transition">
                    {cat.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* =============================================
        🔗 VER TODAS LAS CATEGORÍAS
        ============================================= */}
        <div className="text-center mt-8">
          <Link to="/productos">
            <Button
              className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold px-7 py-5 text-base rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Ver todos los productos →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}