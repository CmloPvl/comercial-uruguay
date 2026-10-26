// 📁 frontend/src/pages/Home.tsx

/**
 * 📌 HOME — PÁGINA PRINCIPAL
 * 
 * Este componente SOLO conecta la lógica con el diseño (secciones).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componente limpio y fácil de leer
 * - Solo renderiza secciones
 * - Cada hook tiene responsabilidad única
 * 
 * 🆕 Usa useFeaturedProducts para los destacados
 */

import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { ProductsSection } from "../components/common/ProductsSection";
import { BenefitsSection } from "../components/home/BenefitsSection";
import { LocationSection } from "../components/home/LocationSection";
import { useHome } from "../hooks/useHome";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";  // 🆕

export default function Home() {
  // =============================================
  // 🆕 DESTACADOS (hook dedicado)
  // =============================================
  const {
    products: featuredProducts,
    loading: featuredLoading,
    error: featuredError,
    loadFeatured,
  } = useFeaturedProducts();

  // =============================================
  // 🧠 HOME BASE (carrito)
  // =============================================
  const {
    handleAddToCart,
  } = useHome();

  return (
    <Layout>
      {/* Hero */}
      <Hero />

      {/* Categorías */}
      <CategoriesSection />

      {/* Productos Destacados (usa useFeaturedProducts) */}
      <ProductsSection
        products={featuredProducts}
        loading={featuredLoading}
        error={featuredError}
        onAddToCart={handleAddToCart}
        onRetry={loadFeatured}
      />

      {/* Beneficios */}
      <BenefitsSection />

      {/* Ubicación */}
      <LocationSection />
    </Layout>
  );
}