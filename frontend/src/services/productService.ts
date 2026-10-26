// 📁 frontend/src/services/productService.ts

/**
 * 📌 SERVICIO DE PRODUCTOS
 * 
 * Maneja todas las operaciones relacionadas con productos:
 * - Obtener todos los productos
 * - Obtener productos destacados
 * - Obtener producto por ID
 * - Crear producto
 * - Actualizar producto
 * - Eliminar producto
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Tipado fuerte con TypeScript
 * - Sin logs innecesarios (solo en desarrollo)
 * 
 * 🆕 Soporte para packs promocionales (packPrice, packQuantity)
 */

import api from './api';

// =============================================
// 📋 INTERFACES
// =============================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: string;
  category_name?: string;
  category?: { id: string; name: string };
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  tags?: string[];
  variants?: string[];
  destacado?: boolean;            // 🆕 Campo destacado (opcional)
  packPrice?: number | null;      // 🆕 Precio del pack (null si no hay)
  packQuantity?: number | null;   // 🆕 Cantidad del pack (null si no hay)
  createdAt: string;
  updatedAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateProductData {
  name: string;
  description: string;
  sku: string;
  categoryId: string;
  price: number;
  stock: number;
  images: string[];
  isOnSale?: boolean;
  discount?: number;
  tags?: string[];
  variants?: string[];
  isActive?: boolean;
  destacado?: boolean;            // 🆕 Campo destacado (opcional)
  packPrice?: number | null;      // 🆕 Precio del pack (opcional)
  packQuantity?: number | null;   // 🆕 Cantidad del pack (opcional)
}

export interface GetProductsParams {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}

// =============================================
// 📦 SERVICIO
// =============================================

export const productService = {
  // =============================================
  // 📋 OBTENER TODOS LOS PRODUCTOS
  // =============================================
  async getProducts(params?: GetProductsParams): Promise<Product[]> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.category) queryParams.append('category', params.category);
      if (params?.search) queryParams.append('search', params.search);
      if (params?.page) queryParams.append('page', params.page.toString());
      if (params?.limit) queryParams.append('limit', params.limit.toString());

      const response = await api.get(`/products?${queryParams.toString()}`);

      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data?.data)) {
        return response.data.data;
      }

      console.warn('⚠️ [productService] Respuesta inesperada:', response.data);
      return [];
    } catch (error) {
      console.error('❌ [productService] Error al obtener productos:', error);
      throw error;
    }
  },

  // =============================================
  // ⭐ OBTENER PRODUCTOS DESTACADOS
  // =============================================
  async getFeatured(): Promise<Product[]> {
    try {
      const response = await api.get('/products/destacados');

      if (Array.isArray(response.data)) {
        return response.data;
      }
      if (response.data?.success && Array.isArray(response.data.data)) {
        return response.data.data;
      }
      if (Array.isArray(response.data?.data)) {
        return response.data.data;
      }

      console.warn('⚠️ [productService] Respuesta inesperada en getFeatured:', response.data);
      return [];
    } catch (error) {
      console.error('❌ [productService] Error al obtener destacados:', error);
      throw error;
    }
  },

  // =============================================
  // 👤 OBTENER PRODUCTO POR ID
  // =============================================
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`❌ [productService] Error al obtener producto ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // ✨ CREAR PRODUCTO
  // =============================================
  async createProduct(productData: CreateProductData): Promise<Product> {
    try {
      const payload = {
        ...productData,
        tags: productData.tags ? JSON.stringify(productData.tags) : '[]',
        variants: productData.variants ? JSON.stringify(productData.variants) : '[]',
      };

      const response = await api.post('/products', payload);
      return response.data.data;
    } catch (error) {
      console.error('❌ [productService] Error al crear producto:', error);
      throw error;
    }
  },

  // =============================================
  // ✏️ ACTUALIZAR PRODUCTO
  // =============================================
  async updateProduct(
    id: string,
    productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error) {
      console.error(`❌ [productService] Error al actualizar producto ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // 🗑️ ELIMINAR PRODUCTO
  // =============================================
  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
    } catch (error) {
      console.error(`❌ [productService] Error al eliminar producto ${id}:`, error);
      throw error;
    }
  },
};