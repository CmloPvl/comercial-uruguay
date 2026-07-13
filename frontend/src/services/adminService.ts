import api from './api';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  pendingOrders: number;
  monthlySales: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  user_name: string;
  user_email: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sku: string;
  category_name: string;
  isActive: boolean;
  createdAt: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export const adminService = {
  // =============================================
  // DASHBOARD
  // =============================================
  
  /**
   * Obtener estadísticas del dashboard
   */
  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/admin/stats');
    return response.data.data;
  },

  /**
   * Obtener pedidos recientes
   */
  async getRecentOrders(limit: number = 5): Promise<Order[]> {
    const response = await api.get(`/admin/orders/recent?limit=${limit}`);
    return response.data.data;
  },

  // =============================================
  // PRODUCTOS (Admin)
  // =============================================
  
  /**
   * Obtener todos los productos (con paginación)
   */
  async getProducts(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    
    const response = await api.get(`/admin/products?${params.toString()}`);
    return response.data.data;
  },

  // =============================================
  // PEDIDOS (Admin)
  // =============================================
  
  /**
   * Obtener todos los pedidos (con paginación y filtro)
   */
  async getOrders(page: number = 1, limit: number = 10, status?: string): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    
    const response = await api.get(`/admin/orders?${params.toString()}`);
    return response.data.data;
  },

  /**
   * Actualizar estado de un pedido
   */
  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status });
    return response.data.data;
  },
};