import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../context/AuthContext";
import { orderService, type Order } from "../services/orderService";

export default function MisPedidos() {
  const { user, isAuthenticated } = useAuth();  // ✅ user para personalizar
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar tus pedidos");
    } finally {
      setLoading(false);
    }
  };

  // Estados de pedido con colores
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'RECIBIDO': { label: '📩 Recibido', className: 'bg-[#FF6B81] text-white' },
      'REVISION': { label: '🔍 En Revisión', className: 'bg-[#FF9F43] text-white' },
      'CONFIRMADO': { label: '✅ Confirmado', className: 'bg-[#FFD93D] text-[#303030]' },
      'ENVIADO': { label: '📦 Enviado', className: 'bg-[#00D2D3] text-white' },
      'ENTREGADO': { label: '🏠 Entregado', className: 'bg-[#90C090] text-white' },
      'CANCELADO': { label: '❌ Cancelado', className: 'bg-gray-400 text-white' },
    };
    return statusMap[status] || { label: status, className: 'bg-gray-400 text-white' };
  };

  // =============================================
  // NO AUTENTICADO
  // =============================================
  if (!isAuthenticated) {
    return (
      <Layout title="Mis Pedidos">
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                Inicia sesión para ver tus pedidos
              </h2>
              <p className="text-gray-500 mb-6">
                Revisa el estado de tus compras y sigue tus pedidos.
              </p>
              <Link to="/login">
                <Button className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  Iniciar Sesión
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // CARGANDO
  // =============================================
  if (loading) {
    return (
      <Layout title="Mis Pedidos">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando tus pedidos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // SIN PEDIDOS
  // =============================================
  if (orders.length === 0) {
    return (
      <Layout title="Mis Pedidos">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-extrabold text-[#603060]">📦 Mis Pedidos</h1>
            <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
              {user?.fullName?.split(' ')[0] || 'Usuario'}
            </span>
          </div>
          <Card className="border-2 border-[#00D2D3] shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                No tienes pedidos aún
              </h2>
              <p className="text-gray-500 mb-6">
                Explora nuestra tienda y realiza tu primera compra.
              </p>
              <Link to="/productos">
                <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🛍️ Ir a la Tienda
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // LISTA DE PEDIDOS
  // =============================================
  return (
    <Layout title="Mis Pedidos">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header con nombre del usuario */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-extrabold text-[#603060]">📦 Mis Pedidos</h1>
              <span className="text-sm text-gray-400 font-medium bg-gray-100 px-3 py-1 rounded-full">
                {user?.fullName?.split(' ')[0] || 'Usuario'}
              </span>
            </div>
            <p className="text-gray-500 mt-1">
              {orders.length} pedido{orders.length !== 1 ? 's' : ''} realizado{orders.length !== 1 ? 's' : ''}
            </p>
          </div>
          {error && (
            <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-2 rounded-lg text-sm">
              ⚠️ {error}
            </div>
          )}
        </div>

        {/* Lista de pedidos */}
        <div className="space-y-4">
          {orders.map((order) => {
            const status = getStatusBadge(order.status);
            return (
              <Link to={`/pedido/${order.id}`} key={order.id}>
                <Card className="border-2 border-[#00D2D3]/30 hover:border-[#7D5FFF] transition-all hover:shadow-xl cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      {/* Info del pedido */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="font-bold text-[#603060] text-lg">
                            {order.orderNumber}
                          </span>
                          <Badge className={status.className}>
                            {status.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString('es-CL', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>

                      {/* Total y acción */}
                      <div className="flex items-center gap-4 w-full sm:w-auto">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Total</p>
                          <p className="text-xl font-extrabold text-[#603060]">
                            ${order.total.toLocaleString('es-CL')}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3]/10 hover:text-[#00D2D3]"
                        >
                          Ver Detalle →
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}