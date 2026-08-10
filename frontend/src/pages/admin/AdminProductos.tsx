// 📁 frontend/src/pages/admin/AdminProductos.tsx

/**
 * 📌 PÁGINA: ADMIN PRODUCTOS
 * 
 * Panel de administración de productos.
 * Conecta la lógica (useAdminProductos) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Acciones completas (eliminar, activar/desactivar)
 * - Modales de confirmación con AlertDialog de shadcn/ui
 * - Breadcrumb con estilo consistente
 * - Tooltips en botones de acciones
 * - Contadores de activos/inactivos
 * - Buscador de productos
 * - Paginación
 * - Botón para volver al Dashboard
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { Input } from "../../components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { useAdminProductos } from "../../hooks/useAdminProductos";

// =============================================
// 🎯 SKELETON DE LA TABLA (usando shadcn)
// =============================================
const TableSkeleton = () => (
  <div className="space-y-3">
    {/* Encabezados */}
    <div className="flex gap-4 pb-2 border-b border-gray-200">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-24 ml-auto" />
    </div>

    {/* Filas */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-6 w-16" />
        <div className="flex gap-2 ml-auto">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default function AdminProductos() {
  // =============================================
  // 🧠 LÓGICA (extraída a useAdminProductos)
  // ✅ PRIMERO: llamar al hook SIEMPRE antes de cualquier condicional
  // =============================================
  const {
    products,
    loading,
    error,
    loadProducts,
    filteredProducts,
    paginatedProducts,
    activeCount,
    inactiveCount,
    currentPage,
    totalPages,
    setCurrentPage,
    searchTerm,
    handleSearch,
    openDeleteDialog,
    openToggleDialog,
    confirmDelete,
    confirmToggle,
    closeDialogs,
    deleteDialogOpen,
    toggleDialogOpen,
    selectedProduct,
  } = useAdminProductos();

  // =============================================
  // 🔄 ESTADO DE CARGA (con Skeleton)
  // ✅ DESPUÉS: condicionales y renders
  // =============================================
  if (loading) {
    return (
      <Layout title="Gestionar Productos">
        {/* Breadcrumb skeleton */}
        <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          {/* Tabla skeleton */}
          <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
            <CardContent className="p-4">
              <TableSkeleton />
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
    <Layout title="Gestionar Productos">
      {/* =============================================
      📍 BREADCRUMB (con estilo consistente)
      ============================================= */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
        <div className="max-w-7xl mx-auto">
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
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Gestionar Productos
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-2">
                📋 Gestionar Productos
                <Badge className="bg-[#00D2D3] text-white text-sm ml-2">
                  {products.length} productos
                </Badge>
              </h1>
              <div className="flex gap-2">
                <Badge className="bg-[#90C090] text-white text-sm">
                  ✅ {activeCount} activos
                </Badge>
                <Badge className="bg-[#6A757C] text-white text-sm">
                  ⏸️ {inactiveCount} inactivos
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
              >
                ← Volver al Dashboard
              </Button>
            </Link>
            <Link to="/crear-publicacion">
              <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                ➕ Crear Producto
              </Button>
            </Link>
          </div>
        </div>

        {/* =============================================
        🔍 BUSCADOR
        ============================================= */}
        <div className="mb-4">
          <Input
            placeholder="🔍 Buscar productos por nombre, SKU o descripción..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md border-[#7D5FFF] focus:border-[#603060]"
          />
        </div>

        {/* =============================================
        ❌ ERROR
        ============================================= */}
        {error && (
          <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">{error}</span>
            <button
              onClick={loadProducts}
              className="ml-auto text-[#FF6B81] hover:text-[#603060] font-bold underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* =============================================
        📦 LISTA DE PRODUCTOS
        ============================================= */}
        {products.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-[#6A757C] font-medium">No hay productos creados</p>
              <Link
                to="/crear-publicacion"
                className="mt-4 inline-block text-[#7D5FFF] hover:underline font-medium"
              >
                Crear el primer producto →
              </Link>
            </CardContent>
          </Card>
        ) : filteredProducts.length === 0 ? (
          <Card className="border-2 border-[#FFD93D] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-[#6A757C] font-medium">
                No hay productos que coincidan con "{searchTerm}"
              </p>
              <button
                onClick={() => handleSearch("")}
                className="mt-4 text-[#7D5FFF] hover:underline font-medium"
              >
                Limpiar búsqueda →
              </button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-[#F0F0C0]/30 to-[#F0C0F0]/30">
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Producto</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">SKU</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Precio</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Stock</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Estado</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedProducts.map((product) => (
                      <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium text-[#303030]">{product.name}</td>
                        <td className="py-3 px-4 text-[#6A757C]">{product.sku}</td>
                        <td className="py-3 px-4 font-bold text-[#603060]">
                          ${Number(product.price).toLocaleString("es-CL")}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              product.stock > 10
                                ? "bg-[#90C090] text-white"
                                : product.stock > 0
                                ? "bg-[#FFD93D] text-[#303030]"
                                : "bg-[#FF6B81] text-white"
                            }
                          >
                            {product.stock > 0 ? `${product.stock} unidades` : "Sin stock"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={
                              product.isActive
                                ? "bg-[#00D2D3] text-white"
                                : "bg-[#6A757C] text-white"
                            }
                          >
                            {product.isActive ? "✅ Activo" : "⏸️ Inactivo"}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            {/* Editar */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Link to={`/admin/productos/${product.id}/editar`}>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition"
                                    >
                                      ✏️
                                    </Button>
                                  </Link>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Editar producto</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {/* Activar/Desactivar */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={
                                      product.isActive
                                        ? "border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white transition"
                                        : "border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition"
                                    }
                                    onClick={() =>
                                      openToggleDialog(product.id, product.isActive, product.name)
                                    }
                                  >
                                    {product.isActive ? "⏸️" : "▶️"}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{product.isActive ? "Desactivar producto" : "Activar producto"}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {/* Eliminar */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white transition"
                                    onClick={() => openDeleteDialog(product.id, product.name)}
                                  >
                                    🗑️
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar producto</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* =============================================
            📄 PAGINACIÓN
            ============================================= */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <span className="text-sm text-[#6A757C]">
                  Mostrando {paginatedProducts.length} de {filteredProducts.length} productos
                  {searchTerm && ` (filtrados de ${products.length} totales)`}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
                  >
                    Anterior
                  </Button>
                  <span className="flex items-center px-3 text-sm text-[#6A757C]">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* =============================================
      🗑️ MODAL DE ELIMINAR (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent className="border-2 border-[#FF6B81]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#FF6B81] flex items-center gap-2">
              <span className="text-2xl">⚠️</span> ¿Eliminar producto?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              ¿Estás seguro de que quieres eliminar{" "}
              <strong className="text-[#303030]">"{selectedProduct?.name}"</strong>?
              <br />
              <span className="text-[#FF6B81] font-medium">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-[#FF6B81] hover:bg-[#603060] text-white"
            >
              🗑️ Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* =============================================
      🔄 MODAL DE ACTIVAR/DESACTIVAR (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={toggleDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent
          className={`border-2 ${selectedProduct?.isActive ? "border-[#FF9F43]" : "border-[#00D2D3]"}`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`flex items-center gap-2 ${
                selectedProduct?.isActive ? "text-[#FF9F43]" : "text-[#00D2D3]"
              }`}
            >
              <span className="text-2xl">🔄</span>
              {selectedProduct?.isActive ? "Desactivar" : "Activar"} producto?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              ¿Quieres{" "}
              <strong>{selectedProduct?.isActive ? "desactivar" : "activar"}</strong> el producto{" "}
              <strong className="text-[#303030]">"{selectedProduct?.name}"</strong>?
              <br />
              <span className="text-[#6A757C] text-sm">
                {selectedProduct?.isActive
                  ? "El producto ya no será visible en la tienda."
                  : "El producto será visible en la tienda nuevamente."}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmToggle}
              className={
                selectedProduct?.isActive
                  ? "bg-[#FF9F43] hover:bg-[#603060] text-white"
                  : "bg-[#00D2D3] hover:bg-[#603060] text-white"
              }
            >
              {selectedProduct?.isActive ? "⏸️ Desactivar" : "▶️ Activar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}