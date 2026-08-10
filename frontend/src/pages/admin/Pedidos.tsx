// 📁 frontend/src/pages/admin/Pedidos.tsx

/**
 * 📌 PÁGINA: ADMIN PEDIDOS
 * 
 * Panel de administración de pedidos.
 * Conecta la lógica (useAdminPedidos) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Breadcrumb para navegación
 * - Filtro por estado
 * - Paginación
 * - Modal de confirmación para cambio de estado
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
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
import { useAdminPedidos, ORDER_STATUSES } from "../../hooks/useAdminPedidos";
import { useAuth } from "../../context/AuthContext";

// =============================================
// 🎯 FUNCIÓN PARA OBTENER COLOR DEL ESTADO
// =============================================
const getStatusColor = (status: string) => {
  const found = ORDER_STATUSES.find((s) => s.value === status);
  return found?.color || "bg-gray-400 text-white";
};

// =============================================
// 🎯 SKELETON DE LA TABLA
// =============================================
const TableSkeleton = () => (
  <div className="space-y-3">
    {/* Encabezados */}
    <div className="flex gap-4 pb-2 border-b border-gray-200">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-28 ml-auto" />
    </div>

    {/* Filas */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-4 w-28 ml-auto" />
      </div>
    ))}
  </div>
);

export default function AdminPedidos() {
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useAdminPedidos)
  // =============================================
  const {
    filteredOrders,
    paginatedOrders,
    loading,
    error,
    statusFilter,
    currentPage,
    totalPages,
    handleFilterChange,
    handlePageChange,
    openStatusDialog,
    confirmStatusChange,
    closeDialogs,
    statusDialogOpen,
    selectedOrder,
    newStatus,
    setNewStatus,
    loadOrders,
  } = useAdminPedidos();

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
                No tienes permisos para gestionar pedidos.
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
  // 🔄 ESTADO DE CARGA (con Skeleton shadcn)
  // =============================================
  if (loading) {
    return (
      <Layout title="Gestionar Pedidos">
        {/* Breadcrumb skeleton */}
        <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          {/* Filtro skeleton */}
          <Skeleton className="h-10 w-48 mb-4" />

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
    <Layout title="Gestionar Pedidos">
      {/* =============================================
      📍 BREADCRUMB
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
                  Gestionar Pedidos
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
                📦 Gestionar Pedidos
                <Badge className="bg-[#00D2D3] text-white text-sm ml-2">
                  {filteredOrders.length} pedidos
                </Badge>
              </h1>
            </div>
            <p className="text-[#6A757C] mt-1">
              Administra los pedidos de tu tienda
            </p>
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
          </div>
        </div>

        {/* =============================================
        🔍 FILTRO POR ESTADO
        ============================================= */}
        <div className="mb-4">
          <Select value={statusFilter} onValueChange={handleFilterChange}>
            <SelectTrigger className="w-[200px] border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] rounded-xl">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
              <SelectItem value="">📊 Todos los estados</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  <span className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${status.color.split(' ')[0]}`}></span>
                    {status.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* =============================================
        ❌ ERROR
        ============================================= */}
        {error && (
          <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">{error}</span>
            <button
              onClick={loadOrders}
              className="ml-auto text-[#FF6B81] hover:text-[#603060] font-bold underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* =============================================
        📦 LISTA DE PEDIDOS
        ============================================= */}
        {filteredOrders.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-[#6A757C] font-medium">
                {statusFilter ? `No hay pedidos con estado "${statusFilter}"` : "No hay pedidos aún"}
              </p>
              {statusFilter && (
                <button
                  onClick={() => handleFilterChange("")}
                  className="mt-4 text-[#7D5FFF] hover:underline font-medium"
                >
                  Limpiar filtro →
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-[#F0F0C0]/30 to-[#F0C0F0]/30">
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Nº Pedido</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Cliente</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Total</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Estado</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Fecha</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium text-[#7D5FFF]">{order.orderNumber}</td>
                        <td className="py-3 px-4 text-[#6A757C]">{order.user_name}</td>
                        <td className="py-3 px-4 font-bold text-[#603060]">
                          ${Number(order.total).toLocaleString("es-CL")}
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-[#6A757C]">
                          {new Date(order.createdAt).toLocaleDateString("es-CL")}
                        </td>
                        <td className="py-3 px-4">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition"
                            onClick={() => openStatusDialog(order)}
                          >
                            🔄 Cambiar Estado
                          </Button>
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
                  Mostrando {paginatedOrders.length} de {filteredOrders.length} pedidos
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
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
      🔄 MODAL DE CAMBIO DE ESTADO (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={statusDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent className="border-2 border-[#7D5FFF]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#603060] flex items-center gap-2">
              <span className="text-2xl">🔄</span> Cambiar Estado del Pedido
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              Pedido: <strong className="text-[#303030]">{selectedOrder?.orderNumber}</strong>
              <br />
              Cliente: <strong className="text-[#303030]">{selectedOrder?.user_name}</strong>
              <br />
              <br />
              <span className="text-sm">
                Estado actual:{" "}
                <Badge className={selectedOrder ? getStatusColor(selectedOrder.status) : ""}>
                  {selectedOrder?.status}
                </Badge>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <label className="text-sm font-bold text-[#303030] flex items-center gap-2">
              <span className="text-[#00D2D3]">📌</span> Nuevo estado
            </label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="w-full border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] bg-white rounded-xl mt-1.5">
                <SelectValue placeholder="Seleccionar nuevo estado..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
                {ORDER_STATUSES.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <span className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${status.color.split(' ')[0]}`}></span>
                      {status.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmStatusChange}
              className="bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white"
            >
              ✅ Actualizar Estado
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}