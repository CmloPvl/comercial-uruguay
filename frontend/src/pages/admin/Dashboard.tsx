import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useAuth } from "../../context/AuthContext";
import { adminService, type DashboardStats, type Order } from "../../services/adminService";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    monthlySales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar estadísticas reales desde el backend
      const statsData = await adminService.getStats();
      setStats(statsData);
      
      // Cargar pedidos recientes reales
      const ordersData = await adminService.getRecentOrders(5);
      setRecentOrders(ordersData);
    } catch (err: any) {
      setError(err.message || "Error al cargar el dashboard");
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // Verificar si el usuario es admin
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
              <p className="text-gray-500 mb-6">
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
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout title="Panel Administrador">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando panel...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // Verificar si hay datos reales
  const hasData = stats.totalProducts > 0 || stats.totalOrders > 0 || stats.totalUsers > 0;

  return (
    <Layout title="Panel Administrador">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-3">
                👑 Panel de Administración
              </h1>
              <p className="text-gray-500 mt-1">
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

        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <StatCard
            title="Productos"
            value={stats.totalProducts}
            icon="🛍️"
            color="from-[#7D5FFF] to-[#603060]"
            link="/admin/productos"
          />
          <StatCard
            title="Pedidos"
            value={stats.totalOrders}
            icon="📦"
            color="from-[#00D2D3] to-[#0098A8]"
            link="/admin/pedidos"
          />
          <StatCard
            title="Usuarios"
            value={stats.totalUsers}
            icon="👥"
            color="from-[#FFD93D] to-[#F0C030]"
            link="/admin/usuarios"
          />
          <StatCard
            title="Pendientes"
            value={stats.pendingOrders}
            icon="⏳"
            color="from-[#FF6B81] to-[#E0556E]"
            link="/admin/pedidos?status=pending"
          />
          <StatCard
            title="Ventas del Mes"
            value={`$${stats.monthlySales.toLocaleString('es-CL')}`}
            icon="💰"
            color="from-[#90C090] to-[#5A9E6E]"
            link="/admin/pedidos"
          />
        </div>

        {/* Acciones rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#603060] mb-4 flex items-center gap-2">
                ✨ Acciones Rápidas
              </h3>
              <div className="flex flex-wrap gap-3">
                <Link to="/crear-publicacion">
                  <Button className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold">
                    ➕ Crear Producto
                  </Button>
                </Link>
                <Link to="/admin/pedidos">
                  <Button className="bg-gradient-to-r from-[#00D2D3] to-[#0098A8] hover:from-[#0098A8] hover:to-[#00D2D3] text-white font-bold">
                    📦 Ver Pedidos
                  </Button>
                </Link>
                <Link to="/admin/productos">
                  <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold">
                    📋 Gestionar Productos
                  </Button>
                </Link>
                <Link to="/admin/categorias">
  <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold">
    📂 Gestionar Categorías
  </Button>
</Link>
              </div>
            </CardContent>
          </Card>
          
          {/* Info rápida */}
          <Card className="border-2 border-[#FFD93D] shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-[#603060] mb-4 flex items-center gap-2">
                📊 Resumen Rápido
              </h3>
              {!hasData ? (
                <div className="text-center py-6">
                  <p className="text-4xl mb-3">🚀</p>
                  <p className="text-gray-500 font-medium">¡Comienza tu tienda!</p>
                  <p className="text-sm text-gray-400 mt-1">
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
                  <div className="bg-[#F0F0C0]/30 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Productos activos</p>
                    <p className="text-2xl font-bold text-[#603060]">{stats.totalProducts}</p>
                  </div>
                  <div className="bg-[#F0C0F0]/30 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Pedidos totales</p>
                    <p className="text-2xl font-bold text-[#00D2D3]">{stats.totalOrders}</p>
                  </div>
                  <div className="bg-[#D4F0D4]/30 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Ventas del mes</p>
                    <p className="text-2xl font-bold text-[#90C090]">${stats.monthlySales.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="bg-[#FFE0D4]/30 p-3 rounded-lg text-center">
                    <p className="text-sm text-gray-500">Pendientes</p>
                    <p className="text-2xl font-bold text-[#FF6B81]">{stats.pendingOrders}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Últimos pedidos */}
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
                <p className="text-gray-500 font-medium">No hay pedidos aún</p>
                <p className="text-sm text-gray-400 mt-1">
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
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-2 font-medium text-[#7D5FFF]">{order.orderNumber}</td>
                        <td className="py-3 px-2 text-gray-600">{order.user_name}</td>
                        <td className="py-3 px-2 font-bold text-[#603060]">${order.total.toLocaleString('es-CL')}</td>
                        <td className="py-3 px-2">
                          <Badge className={`${
                            order.status === 'PENDIENTE' || order.status === 'RECIBIDO' ? 'bg-[#FF6B81] text-white' :
                            order.status === 'REVISION' ? 'bg-[#FF9F43] text-white' :
                            order.status === 'CONFIRMADO' ? 'bg-[#FFD93D] text-[#303030]' :
                            order.status === 'ENVIADO' ? 'bg-[#00D2D3] text-white' :
                            order.status === 'ENTREGADO' ? 'bg-[#90C090] text-white' :
                            'bg-gray-400 text-white'
                          }`}>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString('es-CL')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}

// =============================================
// COMPONENTE STATCARD
// =============================================
interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  link: string;
}

function StatCard({ title, value, icon, color, link }: StatCardProps) {
  return (
    <Link to={link}>
      <Card className={`border-2 border-transparent bg-gradient-to-br ${color} text-white shadow-lg hover:shadow-2xl transition-all hover:scale-105 cursor-pointer`}>
        <CardContent className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-xs font-medium uppercase tracking-wider">{title}</p>
              <p className="text-2xl font-extrabold">{value}</p>
            </div>
            <span className="text-3xl opacity-80">{icon}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}