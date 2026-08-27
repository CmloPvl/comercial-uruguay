// 📁 frontend/src/pages/admin/Dashboard.tsx

/**
 * 📌 PÁGINA: DASHBOARD ADMIN
 * 
 * Panel de administración principal.
 * Conecta la lógica (useAdminDashboard) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Estados de carga y error
 * - Breadcrumb para navegación
 * - Skeleton de shadcn/ui para carga
 * - Tooltips en botones de acciones rápidas
 * - Componentes shadcn/ui consistentes
 */

import { Link } from "react-router-dom";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { DashboardStats } from "../../components/admin/DashboardStats";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

// =============================================
// 🎯 SKELETON DEL DASHBOARD
// =============================================
const DashboardSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 py-8">
    {/* Breadcrumb skeleton */}
    <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81] -mx-4">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-5 w-48" />
      </div>
    </div>

    {/* Header skeleton */}
    <div className="mb-8 mt-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-5 w-48 mt-2" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>

    {/* Stats skeleton (5 tarjetas) */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-28 w-full rounded-xl" />
      ))}
    </div>

    {/* Acciones rápidas + Resumen skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>

    {/* Últimos pedidos skeleton */}
    <Skeleton className="h-64 w-full rounded-xl" />
  </div>
);

export default function AdminDashboard() {
  // =============================================
  // 🧠 LÓGICA (extraída a useAdminDashboard)
  // =============================================
  const {
    user,
    stats,
    loading,
    recentOrders,
    error,
    hasData,
    loadDashboardData,
  } = useAdminDashboard();

  // =============================================
  // 🔒 ACCESO DENEGADO (No ADMIN)
  // =============================================
  if (user?.role !== "ADMIN") {
    return (
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
        <Card className="max-w-md w-full border-2 border-[#FF6B81] shadow-2xl">
          <CardContent className="p-8 text-center">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-[#603060] mb-2">
              Acceso Denegado
            </h2>
            <p className="text-[#6A757C] mb-6">
              No tienes permisos para acceder al panel de administración.
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
    );
  }

  // =============================================
  // 🔄 ESTADO DE CARGA (con Skeleton shadcn)
  // =============================================
  if (loading) {
    return <DashboardSkeleton />;
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <>
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
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Dashboard
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
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-3">
                👑 Panel de Administración
              </h1>
              <p className="text-[#6A757C] mt-1">
                Bienvenido, {user.fullName}. Gestiona tu tienda desde aquí.
              </p>
            </div>
            <div className="flex gap-3">
              <Badge className="bg-[#00D2D3] text-white text-sm px-4 py-2">
                🟢 En línea
              </Badge>
              <Badge className="bg-[#FFD93D] text-[#303030] text-sm px-4 py-2">
                {user.role}
              </Badge>
            </div>
          </div>

          {error && (
            <div className="mt-4 bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl flex items-center gap-2">
              <span className="text-xl">⚠️</span>
              <span className="font-medium">{error}</span>
              <button
                onClick={loadDashboardData}
                className="ml-auto text-[#FF6B81] hover:text-[#603060] font-bold underline"
              >
                Reintentar
              </button>
            </div>
          )}
        </div>

        {/* =============================================
        📊 ESTADÍSTICAS
        ============================================= */}
        <DashboardStats stats={stats} />

        {/* =============================================
        ⚡ ACCIONES RÁPIDAS + RESUMEN
        ============================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* Acciones rápidas */}
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#603060] mb-4 flex items-center gap-2">
                ✨ Acciones Rápidas
              </h3>
              <div className="flex flex-wrap gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/crear-publicacion">
                        <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold">
                          ➕ Crear Producto
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Crear un nuevo producto para la tienda</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/admin/pedidos">
                        <Button className="bg-gradient-to-r from-[#00D2D3] to-[#0098A8] hover:from-[#0098A8] hover:to-[#00D2D3] text-white font-bold">
                          📦 Ver Pedidos
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ver todos los pedidos de la tienda</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/admin/productos">
                        <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold">
                          📋 Gestionar Productos
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Administrar el catálogo de productos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link to="/admin/categorias">
                        <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold">
                          📂 Gestionar Categorías
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Administrar las categorías de productos</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>

          {/* Resumen rápido */}
          <Card className="border-2 border-[#FFD93D] shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#603060] mb-4 flex items-center gap-2">
                📊 Resumen Rápido
              </h3>
              {!hasData ? (
                <div className="text-center py-6">
                  <p className="text-4xl mb-3">🚀</p>
                  <p className="text-[#6A757C] font-medium">¡Comienza tu tienda!</p>
                  <p className="text-sm text-[#6A757C] mt-1">
                    Crea tu primer producto para ver estadísticas aquí.
                  </p>
                  <Link to="/crear-publicacion">
                    <Button className="mt-4 bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold">
                      ➕ Crear mi primer producto
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-[#F0F0C0]/30 border-0 shadow-none">
                    <CardContent className="p-3 text-center">
                      <p className="text-sm text-[#6A757C]">Productos activos</p>
                      <p className="text-2xl font-bold text-[#603060]">{stats.totalProducts}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#F0C0F0]/30 border-0 shadow-none">
                    <CardContent className="p-3 text-center">
                      <p className="text-sm text-[#6A757C]">Pedidos totales</p>
                      <p className="text-2xl font-bold text-[#00D2D3]">{stats.totalOrders}</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#D4F0D4]/30 border-0 shadow-none">
                    <CardContent className="p-3 text-center">
                      <p className="text-sm text-[#6A757C]">Ventas del mes</p>
                      <p className="text-2xl font-bold text-[#90C090]">
                        ${stats.monthlySales.toLocaleString("es-CL")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-[#FFE0D4]/30 border-0 shadow-none">
                    <CardContent className="p-3 text-center">
                      <p className="text-sm text-[#6A757C]">Pendientes</p>
                      <p className="text-2xl font-bold text-[#FF6B81]">{stats.pendingOrders}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* =============================================
        📋 ÚLTIMOS PEDIDOS
        ============================================= */}
        <Card className="border-2 border-[#00D2D3] shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#603060] flex items-center gap-2">
                📋 Últimos Pedidos
              </h3>
              <Link to="/admin/pedidos">
                <span className="text-sm text-[#00D2D3] hover:text-[#603060] font-medium hover:underline transition-colors">
                  Ver todos →
                </span>
              </Link>
            </div>

            {recentOrders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">📭</p>
                <p className="text-[#6A757C] font-medium">No hay pedidos aún</p>
                <p className="text-sm text-[#6A757C] mt-1">
                  Los pedidos aparecerán aquí cuando los clientes realicen compras.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-3 px-2 font-bold text-[#603060]">Nº Pedido</th>
                      <th className="text-left py-3 px-2 font-bold text-[#603060]">Cliente</th>
                      <th className="text-left py-3 px-2 font-bold text-[#603060]">Total</th>
                      <th className="text-left py-3 px-2 font-bold text-[#603060]">Estado</th>
                      <th className="text-left py-3 px-2 font-bold text-[#603060]">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => {
                      const getStatusColor = (status: string) => {
                        const statusMap: Record<string, string> = {
                          PENDIENTE: "bg-[#FF6B81] text-white",
                          RECIBIDO: "bg-[#FF6B81] text-white",
                          REVISION: "bg-[#FF9F43] text-white",
                          CONFIRMADO: "bg-[#FFD93D] text-[#303030]",
                          ENVIADO: "bg-[#00D2D3] text-white",
                          ENTREGADO: "bg-[#90C090] text-white",
                        };
                        return statusMap[status] || "bg-gray-400 text-white";
                      };

                      return (
                        <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                          <td className="py-3 px-2 font-medium text-[#7D5FFF]">{order.orderNumber}</td>
                          <td className="py-3 px-2 text-[#6A757C]">{order.user_name}</td>
                          <td className="py-3 px-2 font-bold text-[#603060]">
                            ${order.total.toLocaleString("es-CL")}
                          </td>
                          <td className="py-3 px-2">
                            <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          </td>
                          <td className="py-3 px-2 text-[#6A757C]">
                            {new Date(order.createdAt).toLocaleDateString("es-CL")}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}