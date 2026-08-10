// 📁 frontend/src/pages/admin/EditarPublicacion.tsx

/**
 * 📌 PÁGINA: EDITAR PUBLICACIÓN
 * 
 * Panel de edición de productos existentes.
 * Conecta la lógica (useEditarPublicacion) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Breadcrumb para navegación
 * - Manejo de errores
 */

import { useParams, Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { Button } from "../../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import ProductForm from "../../components/admin/ProductForm";
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
      <Layout title="Acceso Denegado">
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
      </Layout>
    );
  }

  // =============================================
  // 🔄 ESTADO DE CARGA (Skeleton)
  // =============================================
  if (loading || loadingCategories) {
    return (
      <Layout title="Editar Producto">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb skeleton */}
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          {/* Form skeleton */}
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <div className="border-2 border-[#7D5FFF] rounded-2xl p-6 space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i}>
                    <Skeleton className="h-4 w-32 mb-1.5" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/3 space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-2 border-[#7D5FFF] rounded-2xl p-6 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // ❌ ESTADO DE ERROR
  // =============================================
  if (error || !product) {
    return (
      <Layout title="Error">
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
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout title={`Editar ${product.name}`}>
      {/* =============================================
      📍 BREADCRUMB
      ============================================= */}
      <div className="bg-gradient-to-r from-[#FFD93D]/20 via-[#F0F0C0]/30 to-[#F0C0F0]/20 py-3 px-4 border-b-2 border-[#7D5FFF]">
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
                <BreadcrumbLink href="/admin" className="text-[#603060] hover:text-[#00D2D3]">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/productos" className="text-[#603060] hover:text-[#00D2D3]">
                  Gestionar Productos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  ✏️ Editar {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* =============================================
      📦 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] text-[#303030] px-4 py-1.5 rounded-full">
              ✏️ Editar Producto
            </Badge>
            <Badge className="bg-[#00D2D3] text-white px-3 py-1 rounded-full">
              {categories.length} categorías
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#603060] mt-3 flex items-center gap-3">
            ✏️ Editar {product.name}
            <span className="text-sm font-normal text-[#6A757C]">
              | SKU: {product.sku}
            </span>
          </h1>
          <p className="text-[#6A757C] mt-1">Actualiza los datos del producto.</p>
        </div>

        {/* =============================================
        📝 FORMULARIO (ProductForm)
        ============================================= */}
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          loading={submitting}
          title="Editar Producto"
          submitText="💾 Actualizar producto"
          categories={categories}
          categoriesLoading={loadingCategories}
        />
      </div>
    </Layout>
  );
}