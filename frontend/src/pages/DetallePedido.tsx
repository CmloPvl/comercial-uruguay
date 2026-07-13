import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { useAuth } from "../context/AuthContext";
import { orderService, type Order, type OrderItem } from "../services/orderService";

export default function DetallePedido() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && id) {
      loadOrder();
    } else if (!isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated, id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await orderService.getOrderById(id!);
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Error al cargar el detalle del pedido");
    } finally {
      setLoading(false);
    }
  };

  // Estados de pedido con colores
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      RECIBIDO: { label: "📩 Recibido", className: "bg-[#FF6B81] text-white" },
      REVISION: { label: "🔍 En Revisión", className: "bg-[#FF9F43] text-white" },
      CONFIRMADO: { label: "✅ Confirmado", className: "bg-[#FFD93D] text-[#303030]" },
      ENVIADO: { label: "📦 Enviado", className: "bg-[#00D2D3] text-white" },
      ENTREGADO: { label: "🏠 Entregado", className: "bg-[#90C090] text-white" },
      CANCELADO: { label: "❌ Cancelado", className: "bg-gray-400 text-white" },
    };
    return statusMap[status] || { label: status, className: "bg-gray-400 text-white" };
  };

  // =============================================
  // NO AUTENTICADO
  // =============================================
  if (!isAuthenticated) {
    return (
      <Layout title="Detalle del Pedido">
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🔒</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                Inicia sesión para ver el detalle de tu pedido
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
      <Layout title="Detalle del Pedido">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando detalle del pedido...</p>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // ERROR O NO ENCONTRADO
  // =============================================
  if (error || !order) {
    return (
      <Layout title="Detalle del Pedido">
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-2xl font-bold text-[#603060] mb-2">
            Pedido no encontrado
          </h2>
          <p className="text-gray-500 mb-6">{error || "El pedido que buscas no existe."}</p>
          <Link to="/mis-pedidos">
            <Button className="bg-gradient-to-r from-[#00D2D3] to-[#0098A8] hover:from-[#0098A8] hover:to-[#00D2D3] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              ← Volver a mis pedidos
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const status = getStatusBadge(order.status);

  return (
    <Layout title={`Pedido ${order.orderNumber}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header con nombre del usuario */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div>
            <Link to="/mis-pedidos" className="text-[#00D2D3] hover:text-[#603060] transition-colors text-sm font-medium">
              ← Volver a mis pedidos
            </Link>
            <h1 className="text-3xl font-extrabold text-[#603060] mt-2">
              📋 Pedido {order.orderNumber}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Cliente: {user?.fullName || 'Usuario'}
            </p>
          </div>
          <Badge className={`${status.className} text-sm px-4 py-2`}>
            {status.label}
          </Badge>
        </div>

        {/* Información del pedido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2 border-[#00D2D3]/30">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Fecha del pedido</p>
              <p className="font-bold text-[#603060]">
                {new Date(order.createdAt).toLocaleDateString("es-CL", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#00D2D3]/30">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total del pedido</p>
              <p className="text-2xl font-extrabold text-[#603060]">
                ${order.total.toLocaleString("es-CL")}
              </p>
            </CardContent>
          </Card>
          <Card className="border-2 border-[#00D2D3]/30">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Método de entrega</p>
              <p className="font-bold text-[#603060]">
                {order.deliveryOption === "RETIRO_TIENDA" ? "🏪 Retiro en tienda" : "📦 Envío a domicilio"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Mensaje de WhatsApp (si existe) */}
        {order.whatsappMessage && (
          <Card className="border-2 border-[#FFD93D] bg-[#FFD93D]/10 mb-6">
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">📝 Mensaje para el vendedor:</p>
              <p className="text-[#303030] font-medium mt-1">{order.whatsappMessage}</p>
            </CardContent>
          </Card>
        )}

        {/* Lista de productos */}
        <h2 className="text-xl font-bold text-[#603060] mb-4">🛍️ Productos del pedido</h2>
        <Card className="border-2 border-[#00D2D3] shadow-lg">
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-[#F0F0C0]/30 to-[#F0C0F0]/30">
                  <th className="text-left py-4 px-4 font-bold text-[#603060]">Producto</th>
                  <th className="text-left py-4 px-4 font-bold text-[#603060]">Cantidad</th>
                  <th className="text-left py-4 px-4 font-bold text-[#603060]">Precio unitario</th>
                  <th className="text-left py-4 px-4 font-bold text-[#603060]">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item: OrderItem) => (
                  <tr key={item.productId} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 font-medium text-[#303030]">
                      <Link to={`/producto/${item.productId}`} className="hover:text-[#7D5FFF] transition-colors">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{item.quantity}</td>
                    <td className="py-4 px-4 text-gray-600">${item.unitPrice.toLocaleString("es-CL")}</td>
                    <td className="py-4 px-4 font-bold text-[#603060]">
                      ${item.subtotal.toLocaleString("es-CL")}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-gray-200 bg-[#F0F0C0]/20">
                  <td colSpan={3} className="py-4 px-4 text-right font-bold text-[#603060] text-lg">
                    Total
                  </td>
                  <td className="py-4 px-4 font-extrabold text-[#603060] text-xl">
                    ${order.total.toLocaleString("es-CL")}
                  </td>
                </tr>
              </tfoot>
            </table>
          </CardContent>
        </Card>

        {/* Acciones */}
        <div className="flex flex-wrap gap-4 mt-6">
          <Link to="/mis-pedidos">
            <Button variant="outline" className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3]/10">
              📋 Ver todos mis pedidos
            </Button>
          </Link>
          <Link to="/productos">
            <Button className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold">
              🛍️ Seguir comprando
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}