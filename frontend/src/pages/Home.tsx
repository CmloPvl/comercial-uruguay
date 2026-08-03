// 📁 frontend/src/pages/Home.tsx

/**
 * 📌 HOME — PÁGINA PRINCIPAL
 * 
 * Este componente SOLO conecta la lógica (useHome) con el diseño (secciones).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componente limpio y fácil de leer
 * - Solo renderiza secciones
 */

import Layout from "../components/layout/Layout";
import Hero from "../components/home/Hero";
import { CategoriesSection } from "../components/home/CategoriesSection";
import { FeaturedProductsSection } from "../components/home/FeaturedProductsSection";
import { BenefitsSection } from "../components/home/BenefitsSection";
import { LocationSection } from "../components/home/LocationSection";
import { useHome } from "../hooks/useHome";

export default function Home() {
  const {
    featuredProducts,
    loading,
    error,
    loadProducts,
    handleAddToCart,
  } = useHome();

  return (
    <Layout>
      {/* Hero */}
      <Hero />

      {/* Categorías */}
      <CategoriesSection />

      {/* Productos Destacados */}
      <FeaturedProductsSection
        products={featuredProducts}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
        onRetry={loadProducts}
      />

      {/* Beneficios */}
      <BenefitsSection />

      {/* Ubicación */}
      <LocationSection />
    </Layout>
  );
}