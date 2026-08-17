// 📁 frontend/src/pages/admin/CrearPublicacion.tsx

/**
 * 📌 PÁGINA: CREAR PUBLICACIÓN
 * 
 * Panel de creación de nuevos productos.
 * Conecta la lógica (useCrearPublicacion) con el diseño (componentes UI).
 * 
 * ✅ Mejoras aplicadas:
 * - Usa ProductForm reutilizable (elimina duplicación con EditarPublicacion)
 * - Código reducido: ~250 → ~100 líneas (60% menos)
 * - Mantenimiento más fácil (cambios en un solo lugar)
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import ProductForm from "@/components/admin/products/ProductForm";
import { useCrearPublicacion } from "../../hooks/useCrearPublicacion";
import { useAuth } from "../../context/AuthContext";

export default function CrearPublicacion() {
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useCrearPublicacion)
  // =============================================
  const {
    loading,
    categories,
    loadingCategories,
    handleSubmit,
  } = useCrearPublicacion();

  // =============================================
  // 🔒 ACCESO DENEGADO (No ADMIN)
  // =============================================
  if (user?.role !== "ADMIN") {
    return (
      <Layout title="Acceso Denegado">
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#FF6B81] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                Acceso Denegado
              </h2>
              <p className="text-[#6A757C] mb-6">
                No tienes permisos para crear publicaciones.
                <br />
                Esta sección es solo para administradores.
              </p>
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🏠 Volver al Inicio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout title="Crear Publicación">
      {/* =============================================
      📍 BREADCRUMB
      ============================================= */}
      <AppBreadcrumb
        variant="admin"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Dashboard", href: "/admin" },
          { label: "Gestionar Productos", href: "/admin/productos" },
          { label: "Crear Nuevo Producto" },
        ]}
      />

      {/* =============================================
      📦 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] text-white px-4 py-1.5 rounded-full">
              📝 Administración
            </Badge>
            <Badge className="bg-[#FFD93D] text-[#303030] px-3 py-1 rounded-full">
              {categories.length} categorías
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#603060] mt-3 flex items-center gap-3">
            ✨ Nuevo Producto
            <span className="text-sm font-normal text-[#6A757C]">
              | Publica un nuevo producto en la tienda
            </span>
          </h1>
          <p className="text-[#6A757C] mt-1">
            Completa los datos del producto para publicarlo en la tienda.
          </p>
        </div>

        {/* =============================================
        📝 FORMULARIO (ProductForm reutilizable)
        ============================================= */}
        <ProductForm
          onSubmit={handleSubmit}
          loading={loading}
          title="Crear Producto"
          submitText="🚀 Publicar producto"
          categories={categories}
          categoriesLoading={loadingCategories}
          badge="📝 Administración"
        />
      </div>
    </Layout>
  );
}