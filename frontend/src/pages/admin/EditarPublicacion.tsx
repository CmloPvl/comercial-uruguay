// 📁 frontend/src/pages/admin/EditarPublicacion.tsx

/**
 * 📌 PÁGINA: EDITAR PUBLICACIÓN
 * 
 * Panel de edición de productos existentes.
 * 
 * ✅ Mejoras aplicadas:
 * - Reemplazado breadcrumb manual por AppBreadcrumb
 * - Reemplazado skeleton manual por ProductFormSkeleton
 * - Usa los nuevos componentes reutilizables
 * - Sin <Layout>: App.tsx ya envuelve con <AdminLayout>
 * 
 * 🆕 Header eliminado: ProductFormHeader lo maneja
 * 🆕 Props (title, description, badge) pasadas al ProductForm
 */

import { useParams, Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { AppBreadcrumb } from "@/components/common/AppBreadcrumb";
import { ProductFormSkeleton } from "@/components/admin/products/ProductFormSkeleton";
import ProductForm from "../../components/admin/products/ProductForm";
import { useEditarPublicacion } from "../../hooks/useEditarPublicacion";
import { useAuth } from "../../context/AuthContext";

export default function EditarPublicacion() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useEditarPublicacion)
  // =============================================
  const {
    product,
    loading,
    loadingCategories,
    submitting,
    error,
    categories,
    handleSubmit,
  } = useEditarPublicacion(id!);

  // =============================================
  // 🔒 ACCESO DENEGADO (No ADMIN)
  // =============================================
  if (user?.role !== "ADMIN") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Badge className="bg-[#FF6B81] text-white text-lg px-6 py-2">
            🚫 Acceso Denegado
          </Badge>
          <p className="text-[#6A757C] mt-4">
            No tienes permisos para editar publicaciones.
            <br />
            Esta sección es solo para administradores.
          </p>
          <Link to="/">
            <Button className="mt-6 bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              🏠 Volver al Inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // =============================================
  // 🔄 ESTADO DE CARGA (Skeleton)
  // =============================================
  if (loading || loadingCategories) {
    return <ProductFormSkeleton />;
  }

  // =============================================
  // ❌ ESTADO DE ERROR
  // =============================================
  if (error || !product) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Badge className="bg-[#FF6B81] text-white text-lg px-6 py-2">
            ❌ Error
          </Badge>
          <p className="text-[#6A757C] mt-4">{error || "Producto no encontrado"}</p>
          <Link to="/admin/productos">
            <Button className="mt-6 bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              ← Volver a Productos
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <>
      {/* =============================================
      📍 BREADCRUMB (usando AppBreadcrumb)
      ============================================= */}
      <AppBreadcrumb
        variant="admin"
        items={[
          { label: "Inicio", href: "/" },
          { label: "Dashboard", href: "/admin" },
          { label: "Gestionar Productos", href: "/admin/productos" },
          { label: `✏️ Editar ${product.name}` },
        ]}
      />

      {/* =============================================
      📦 CONTENIDO PRINCIPAL (solo el formulario)
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          loading={submitting}
          title={`✏️ Editar ${product.name}`}
          description={`Actualiza los datos del producto. SKU: ${product.sku}`}
          submitText="💾 Actualizar producto"
          categories={categories}
          categoriesLoading={loadingCategories}
          badge="✏️ Editar Producto"
        />
      </div>
    </>
  );
}