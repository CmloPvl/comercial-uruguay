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
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
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
  // =============================================
  const {
    products,
    loading,
    error,
    loadProducts,
    handleDelete,
    handleToggleActive,
  } = useAdminProductos();

  // =============================================
  // 🔄 ESTADO DE CARGA (con Skeleton)
  // =============================================
  if (loading) {
    return (
      <Layout title="Gestionar Productos">
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-2">
            📋 Gestionar Productos
            <Badge className="bg-[#00D2D3] text-white text-sm ml-2">
              {products.length} productos
            </Badge>
          </h1>
          <Link to="/crear-publicacion">
            <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
              ➕ Crear Producto
            </Button>
          </Link>
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
        ) : (
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
                  {products.map((product) => (
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
                          <Link to={`/admin/productos/${product.id}/editar`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition"
                              title="Editar producto"
                            >
                              ✏️
                            </Button>
                          </Link>

                          {/* Activar/Desactivar */}
                          <Button
                            variant="outline"
                            size="sm"
                            className={
                              product.isActive
                                ? "border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white transition"
                                : "border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition"
                            }
                            onClick={() =>
                              handleToggleActive(product.id, product.isActive, product.name)
                            }
                            title={product.isActive ? "Desactivar producto" : "Activar producto"}
                          >
                            {product.isActive ? "⏸️" : "▶️"}
                          </Button>

                          {/* Eliminar */}
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white transition"
                            onClick={() => handleDelete(product.id, product.name)}
                            title="Eliminar producto"
                          >
                            🗑️
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}