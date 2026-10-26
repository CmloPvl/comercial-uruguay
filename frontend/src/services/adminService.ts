// 📁 frontend/src/services/adminService.ts

/**
 * 📌 SERVICIO DE ADMIN
 * 
 * Maneja todas las operaciones del panel admin:
 * - Dashboard (stats, pedidos recientes)
 * - Productos (listar, actualizar, eliminar)
 * - Pedidos (listar, cambiar estado)
 * 
 * ✅ Buenas prácticas:
 * - Tipado fuerte con TypeScript
 * - Separación de responsabilidades
 * - Reutilizable
 * 
 * 🆕 Soporte para packs promocionales (packPrice, packQuantity)
 */

import api from './api';

// =============================================
// 📋 INTERFACES
// =============================================

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
  description: string;
  price: number;
  stock: number;
  sku: string;
  categoryId?: number;
  category_name: string;
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  images: string[];
  destacado?: boolean;            // 🆕 Campo destacado
  packPrice?: number | null;      // 🆕 Precio del pack (null si no hay)
  packQuantity?: number | null;   // 🆕 Cantidad del pack (null si no hay)
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

// =============================================
// 📦 SERVICIO
// =============================================

export const adminService = {
  // =============================================
  // DASHBOARD
  // =============================================
  
  async getStats(): Promise<DashboardStats> {
    const response = await api.get('/admin/stats');
    return response.data.data;
  },

  async getRecentOrders(limit: number = 5): Promise<Order[]> {
    const response = await api.get(`/admin/orders/recent?limit=${limit}`);
    return response.data.data;
  },

  // =============================================
  // PRODUCTOS (Admin)
  // =============================================
  
  async getProducts(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedResponse<Product>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);
    
    const response = await api.get(`/admin/products?${params.toString()}`);
    console.log('📦 AdminService - Respuesta completa:', response.data);
    
    const rawData = response.data.data;
    return {
      data: rawData.products || [],
      pagination: rawData.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/admin/products/${id}`);
  },

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const response = await api.put(`/admin/products/${id}`, data);
    return response.data.data;
  },

  // =============================================
  // PEDIDOS (Admin)
  // =============================================
  
  async getOrders(page: number = 1, limit: number = 10, status?: string): Promise<PaginatedResponse<Order>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    
    const response = await api.get(`/admin/orders?${params.toString()}`);
    const rawData = response.data.data;
    return {
      data: rawData.orders || [],
      pagination: rawData.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  },

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await api.put(`/admin/orders/${orderId}/status`, { status });
    return response.data.data;
  },
};