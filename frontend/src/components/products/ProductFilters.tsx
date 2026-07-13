interface Category {
  id: string
  name: string
  icon: string
  color: string
}

interface ProductFiltersProps {
  categories: Category[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
  priceRange: { min: string; max: string }
  onPriceChange: (min: string, max: string) => void
  onClearFilters: () => void
}

export default function ProductFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  priceRange,
  onPriceChange,
  onClearFilters,
}: ProductFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-xl border-2 border-[#FF6B81] shadow-lg sticky top-4">
      <h3 className="font-bold text-lg text-[#603060] mb-4 flex items-center gap-2">
        <span>📂</span> Filtros
      </h3>

      <div className="space-y-4">
        {/* Categorías */}
        <div>
          <h4 className="font-semibold text-[#303030] mb-2">Categorías</h4>
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition"
            >
              <input
                type="checkbox"
                checked={selectedCategory === cat.name}
                onChange={() =>
                  onCategoryChange(selectedCategory === cat.name ? "" : cat.name)
                }
                className="accent-[#FF6B81] w-4 h-4"
              />
              <span className="text-sm">
                {cat.icon} {cat.name}
              </span>
            </label>
          ))}
        </div>

        {/* Rango de Precio */}
        <div>
          <h4 className="font-semibold text-[#303030] mb-2 flex items-center gap-2">
            <span>💰</span> Rango de Precio
          </h4>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange.min}
              onChange={(e) => onPriceChange(e.target.value, priceRange.max)}
              className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81]"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange.max}
              onChange={(e) => onPriceChange(priceRange.min, e.target.value)}
              className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81]"
            />
          </div>
        </div>

        {/* Botón limpiar */}
        <button
          onClick={onClearFilters}
          className="w-full bg-gradient-to-r from-[#FF6B81] to-[#C06060] hover:from-[#C06060] hover:to-[#FF6B81] text-white font-bold py-2.5 rounded-lg transition-all hover:scale-[1.02]"
        >
          🧹 Limpiar Filtros
        </button>
      </div>
    </div>
  )
}