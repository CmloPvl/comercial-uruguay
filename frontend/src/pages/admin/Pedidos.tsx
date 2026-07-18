import { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { adminService, type Order } from "../../services/adminService";

export default function AdminPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await adminService.getOrders(1, 20);
      setOrders(data.data || []);  // ✅ CORREGIDO
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Gestionar Pedidos">
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando pedidos...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Gestionar Pedidos">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-extrabold text-[#603060] mb-6">📦 Gestionar Pedidos</h1>

        {orders.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-gray-500 font-medium">No hay pedidos aún</p>
            </CardContent>
          </Card>
        ) : (
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
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                      <td className="py-3 px-4 font-medium text-[#7D5FFF]">{order.orderNumber}</td>
                      <td className="py-3 px-4 text-gray-600">{order.user_name}</td>
                      <td className="py-3 px-4 font-bold text-[#603060]">
                        ${Number(order.total).toLocaleString('es-CL')}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${
                          order.status === 'PENDIENTE' || order.status === 'RECIBIDO' ? 'bg-[#FF6B81] text-white' :
                          order.status === 'CONFIRMADO' ? 'bg-[#FFD93D] text-[#303030]' :
                          order.status === 'ENVIADO' ? 'bg-[#00D2D3] text-white' :
                          order.status === 'ENTREGADO' ? 'bg-[#90C090] text-white' :
                          'bg-gray-400 text-white'
                        }`}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString('es-CL')}
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