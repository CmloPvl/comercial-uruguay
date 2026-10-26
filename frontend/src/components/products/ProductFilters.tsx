// 📁 frontend/src/components/products/ProductFilters.tsx

/**
 * 📌 PRODUCT FILTERS
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Panel de filtros para la tienda:
 * - Filtro por categorías (checkbox)
 * - Filtro por rango de precios (inputs numéricos)
 * - Botón para limpiar todos los filtros
 * 
 * ✅ Responsabilidades:
 * - Mostrar lista de categorías con checkbox
 * - Mostrar inputs para rango de precios
 * - Comunicar cambios al componente padre
 * - Limpiar todos los filtros
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica de negocio
 * - Accesible (labels, inputs con aria-label)
 * - Sticky en desktop
 * - Opción "Todas las categorías"
 * 
 * @param {Object} props
 * @param {Category[]} props.categories - Lista de categorías con iconos y colores
 * @param {string} props.selectedCategory - Categoría seleccionada (vacío = todas)
 * @param {Function} props.onCategoryChange - Función para cambiar categoría
 * @param {Object} props.priceRange - Rango de precios { min: string, max: string }
 * @param {Function} props.onPriceChange - Función para cambiar rango de precios
 * @param {Function} props.onClearFilters - Función para limpiar todos los filtros
 * @returns {JSX.Element} - Panel de filtros
 */

// =============================================
// 📌 INTERFAZ DE CATEGORÍA
// =============================================

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface ProductFiltersProps {
  /** Lista de categorías disponibles */
  categories: Category[];
  /** Categoría seleccionada actualmente ("" = todas) */
  selectedCategory: string;
  /** Función para cambiar la categoría seleccionada */
  onCategoryChange: (category: string) => void;
  /** Rango de precios actual { min: string, max: string } */
  priceRange: { min: string; max: string };
  /** Función para cambiar el rango de precios */
  onPriceChange: (min: string, max: string) => void;
  /** Función para limpiar todos los filtros */
  onClearFilters: () => void;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onClearFilters,
}: ProductFiltersProps) {
  // =============================================
  // 💰 FORMATEAR RANGO DE PRECIO
  // =============================================
  const formatPrice = (value: string) => {
    if (!value) return "";
    return Number(value).toLocaleString("es-CL");
  };

  const hasPriceRange = priceRange.min !== "" || priceRange.max !== "";

  return (
    <div 
      className="bg-white p-6 rounded-xl border-2 border-[#FF6B81] shadow-lg sticky top-4"
      role="region"
      aria-label="Panel de filtros de productos"
    >
      {/* =============================================
      📌 TÍTULO
      ============================================= */}
      <h3 className="font-bold text-lg text-[#603060] mb-4 flex items-center gap-2">
        <span>📂</span> Filtros
      </h3>

      {/* =============================================
      📂 SECCIÓN: CATEGORÍAS
      ============================================= */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-[#303030] mb-2">Categorías</h4>

          {/* ✅ Opción "Todas las categorías" */}
          <label
            className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition-colors"
          >
            <input
              type="checkbox"
              checked={selectedCategory === ""}
              onChange={() => onCategoryChange("")}
              className="accent-[#FF6B81] w-4 h-4 cursor-pointer"
              aria-label="Mostrar todas las categorías"
            />
            <span className="text-sm font-medium">
              🏷️ Todas las categorías
            </span>
          </label>

          {/* 📋 Lista de categorías con checkbox */}
          <div className="mt-2 ml-2 border-l-2 border-[#FF6B81]/20 pl-2">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedCategory === cat.name}
                  onChange={() =>
                    onCategoryChange(selectedCategory === cat.name ? "" : cat.name)
                  }
                  className="accent-[#FF6B81] w-4 h-4 cursor-pointer"
                  aria-label={`Filtrar por ${cat.name}`}
                />
                <span className="text-sm">
                  {cat.icon} {cat.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* =============================================
        💰 SECCIÓN: RANGO DE PRECIO
        ============================================= */}
        <div>
          <h4 className="font-semibold text-[#303030] mb-2 flex items-center gap-2">
            <span>💰</span> Rango de Precio
          </h4>
          <div className="flex gap-2">
            {/* Input: Precio mínimo */}
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceChange(e.target.value, priceRange.max)}
              className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81] transition-all"
              aria-label="Precio mínimo"
              min="0"
            />
            {/* Input: Precio máximo */}
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => onPriceChange(priceRange.min, e.target.value)}
              className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81] transition-all"
              aria-label="Precio máximo"
              min="0"
            />
          </div>

          {/* ✅ Rango de precio visible */}
          {hasPriceRange ? (
            <p className="text-xs text-[#303030] mt-1 font-medium">
              Mostrando: {priceRange.min ? `$${formatPrice(priceRange.min)}` : "$0"} -{" "}
              {priceRange.max ? `$${formatPrice(priceRange.max)}` : "∞"}
            </p>
          ) : (
            <p className="text-xs text-[#6A757C] mt-1">
              💡 Vacío muestra todos los precios
            </p>
          )}
        </div>

        {/* =============================================
        🧹 BOTÓN: LIMPIAR FILTROS
        ============================================= */}
        <button
          onClick={onClearFilters}
          className="w-full bg-gradient-to-r from-[#FF6B81] to-[#C06060] hover:from-[#C06060] hover:to-[#FF6B81] text-white font-bold py-2.5 rounded-lg transition-all hover:scale-[1.02] shadow-md hover:shadow-lg"
          aria-label="Limpiar todos los filtros"
        >
          🧹 Limpiar Filtros
        </button>
      </div>
    </div>
  );
}