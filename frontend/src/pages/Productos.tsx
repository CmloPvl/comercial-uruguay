// 📁 frontend/src/pages/Productos.tsx

/**
 * 📌 PÁGINA: PRODUCTOS (TIENDA)
 * 
 * Página principal de la tienda.
 * Conecta la lógica (useProducts) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Filtros desktop y móvil
 * - Estados de carga y error
 * 
 * 🆕 Mejoras:
 * - Eliminado ProductsBanner (ocupaba espacio sin aportar)
 * - Agregado ProductsSection (destacados, reutilizable)
 * - Breadcrumb compacto (menos espacio, más foco en productos)
 * - Layout mobile-first (más espacio para el grid)
 */

import Layout from "../components/layout/Layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import ProductList from "../components/products/ProductList";
import ProductFilters from "../components/products/ProductFilters";
import { ProductsSection } from "../components/common/ProductsSection";  // 🆕
import { useProducts } from "../hooks/useProducts";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";    // 🆕

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function Productos() {
  // =============================================
  // 🧠 LÓGICA DEL CATÁLOGO (useProducts)
  // =============================================
  const {
    loading,
    error,
    filteredProducts,
    favorites,
    categoriesWithIcons,
    selectedCategory,
    priceRange,
    showFilters,
    setSelectedCategory,
    setShowFilters,
    handlePriceChange,
    handleClearFilters,
    handleToggleFavorite,
    handleAddToCart,
    loadProducts,
  } = useProducts();

  // =============================================
  // 🆕 LÓGICA DE DESTACADOS (useFeaturedProducts)
  // =============================================
  const {
    products: featuredProducts,
    loading: featuredLoading,
    error: featuredError,
    loadFeatured,
  } = useFeaturedProducts();

  // =============================================
  // 🔄 ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Cargando productos..." />
      </Layout>
    );
  }

  // =============================================
  // ❌ ESTADO DE ERROR
  // =============================================
  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] items-center justify-center py-12 px-4">
          <ErrorMessage message={error} onRetry={loadProducts} />
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout>
      {/* =============================================
      🍞 BREADCRUMB (compacto)
      ============================================= */}
      <div className="bg-[#FAF9E2] py-2 px-4 border-b border-[#7D5FFF]/20">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#6A757C] hover:text-[#603060] text-sm">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]/50" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#603060] font-semibold text-sm">
                  Tienda
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* =============================================
      ⭐ DESTACADOS (componente reutilizable)
      ============================================= */}
      {featuredProducts.length > 0 && (
        <ProductsSection
          products={featuredProducts}
          loading={featuredLoading}
          error={featuredError}
          onAddToCart={handleAddToCart}
          onRetry={loadFeatured}
          badge="⭐ Destacados"
          title="⭐ Artículos Destacados"
          subtitle="Los productos que elegimos para ti"
          showCTA={false}  // ✅ Sin botón "Ver tienda" (ya estás en ella)
        />
      )}

      {/* =============================================
      📦 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          
          {/* =============================================
          📂 FILTROS (Desktop)
          ============================================= */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              categories={categoriesWithIcons.map(cat => ({
                id: cat.id,
                name: cat.name,
                icon: cat.icon,
                color: cat.color.bg,
              }))}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* =============================================
          🛍️ PRODUCTOS
          ============================================= */}
          <div className="flex-1">
            {/* Cabecera de productos */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
              <p className="text-[#303030] font-medium flex items-center gap-2">
                <span className="text-[#FF6B81] font-bold">{filteredProducts.length}</span>
                productos encontrados
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden bg-[#FF6B81] hover:bg-[#C06060] text-white px-4 py-2 rounded-lg font-bold transition hover:scale-105"
                aria-label="Abrir filtros"
              >
                ⚙️ Filtrar
              </button>
            </div>

            {/* Lista de productos */}
            <ProductList
              products={filteredProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* =============================================
      📱 FILTROS MÓVIL (panel lateral)
      ============================================= */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-right">
            {/* Header del panel */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2">
                <span>📂</span> Filtros
              </h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-2xl hover:text-[#FF6B81] transition hover:scale-110"
                aria-label="Cerrar filtros"
              >
                ✕
              </button>
            </div>

            {/* Categorías en móvil */}
            <div className="space-y-4">
              {categoriesWithIcons.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat.name}
                    onChange={() =>
                      setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)
                    }
                    className="accent-[#FF6B81] w-4 h-4"
                  />
                  <span>
                    {cat.icon} {cat.name}
                  </span>
                </label>
              ))}
            </div>

            {/* Botón aplicar filtros */}
            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-gradient-to-r from-[#FF6B81] to-[#C06060] hover:from-[#C06060] hover:to-[#FF6B81] text-white font-bold py-3 rounded-lg mt-6 transition-all hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              ✅ Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
}