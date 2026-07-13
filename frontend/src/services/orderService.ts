import api from './api';

export interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  deliveryOption: string;
  whatsappMessage?: string;
  createdAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export const orderService = {
  // Obtener todos los pedidos del usuario autenticado
  async getOrders(): Promise<Order[]> {
    const response = await api.get('/orders');
    return response.data.data;
  },

  // Obtener detalle de un pedido específico
  async getOrderById(orderId: string): Promise<Order> {
    const response = await api.get(`/orders/${orderId}`);
    return response.data.data;
  },

  // Crear un nuevo pedido desde el carrito
  async createOrder(data: { deliveryOption: string; whatsappMessage?: string }): Promise<Order> {
    const response = await api.post('/orders', data);
    return response.data.data;
  },
};