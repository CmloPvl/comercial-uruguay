// 📁 frontend/src/components/home/CategoriesSection.tsx

/**
 * 📌 CATEGORIES SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra las categorías disponibles en la tienda.
 * Los datos son estáticos (hardcodeados en el componente).
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos estáticos definidos dentro del componente
 * - Enlaces a la página de productos con filtro
 * - Responsive (mobile-first)
 * - Animaciones con framer-motion
 */

import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

// 🎨 Categorías con colores variados
const categories = [
  { name: "Cabello", icon: "💇", color: "border-[#FF6B81] hover:bg-[#FF6B81]/10 hover:border-[#FF6B81]" },
  { name: "Juguetes", icon: "🧸", color: "border-[#00D2D3] hover:bg-[#00D2D3]/10 hover:border-[#00D2D3]" },
  { name: "Cumpleaños", icon: "🎂", color: "border-[#FFD93D] hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { name: "Hogar", icon: "🏠", color: "border-[#7D5FFF] hover:bg-[#7D5FFF]/10 hover:border-[#7D5FFF]" },
  { name: "Melamina", icon: "🍽️", color: "border-[#FF9F43] hover:bg-[#FF9F43]/10 hover:border-[#FF9F43]" },
  { name: "Temporada", icon: "🍂", color: "border-[#603060] hover:bg-[#603060]/10 hover:border-[#603060]" },
];

export function CategoriesSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0C030]/10 to-[#FF9F43]/20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Grid de categorías */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/productos?categoria=${cat.name}`}
                className={`bg-white p-4 rounded-xl border-2 ${cat.color} shadow-md hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer group block`}
              >
                <div className="text-5xl mb-2 group-hover:scale-110 transition">
                  {cat.icon}
                </div>
                <p className="font-bold text-[#303030] text-sm group-hover:text-[#7D5FFF] transition">
                  {cat.name}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Ver todas las categorías */}
        <div className="text-center mt-8">
          <Link
            to="/productos"
            className="text-[#7D5FFF] font-bold hover:underline hover:text-[#603060] transition text-lg"
          >
            Ver todas las categorías →
          </Link>
        </div>
      </div>
    </section>
  );
}