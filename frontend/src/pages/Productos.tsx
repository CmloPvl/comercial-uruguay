// 📁 frontend/src/pages/Productos.tsx

/**
 * 📌 PÁGINA: PRODUCTOS (TIENDA)
 * 
 * Página principal de la tienda.
 * Conecta la lógica (useProductos) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Banner separado en componente propio
 * - Filtros desktop y móvil
 * - Estados de carga y error
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
import { ProductsBanner } from "../components/products/ProductsBanner";
import { useProductos } from "../hooks/useProducts";

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function Productos() {
  // =============================================
  // 🧠 LÓGICA (extraída a useProductos)
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
  } = useProductos();

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
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
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
      🍞 BREADCRUMB
      ============================================= */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Tienda
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* =============================================
      🎨 BANNER (componente separado)
      ============================================= */}
      <ProductsBanner
        categories={categoriesWithIcons}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        productCount={filteredProducts.length}
      />

      {/* =============================================
      📦 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* =============================================
          📂 FILTROS (Desktop)
          ============================================= */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              categories={categoriesWithIcons}
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-[#303030] font-medium flex items-center gap-2">
                <span className="text-[#FF6B81] font-bold">{filteredProducts.length}</span>
                productos encontrados
              </p>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden bg-[#FF6B81] hover:bg-[#C06060] text-white px-4 py-2 rounded-lg font-bold transition hover:scale-105"
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
          {/* Panel de filtros móvil */}
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