// 📁 frontend/src/services/productService.ts

/**
 * 📌 SERVICIO DE PRODUCTOS
 * 
 * Maneja todas las operaciones relacionadas con productos:
 * - Obtener todos los productos
 * - Obtener producto por ID
 * - Crear producto
 * - Actualizar producto
 * - Eliminar producto
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Logs para depuración
 * - Tipado fuerte con TypeScript
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
  images: string[];           // ✅ Array de URLs de Supabase
  categoryId: string;
  category_name?: string;     // ✅ Viene del JOIN en el backend
  category?: { id: string; name: string };
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  tags?: string[];
  variants?: string[];
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

// =============================================
// 📦 SERVICIO
// =============================================

export const productService = {
  /**
   * 📋 OBTENER TODOS LOS PRODUCTOS
   * 
   * Obtiene todos los productos con filtros opcionales
   * @param {Object} params - Filtros (category, search, page, limit)
   * @returns {Promise<Product[]>} - Lista de productos
   */
  async getProducts(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`/products?${queryParams.toString()}`);
    console.log('🛒 [productService] Respuesta completa:', response.data);
    console.log('🛒 [productService] Tipo de respuesta:', typeof response.data);
    console.log('🛒 [productService] ¿Es array?', Array.isArray(response.data));
    
    // ✅ Si la respuesta es { success: true, data: [...] }
    if (response.data && response.data.success && Array.isArray(response.data.data)) {
      console.log('🛒 [productService] ✅ Usando response.data.data');
      return response.data.data;
    }
    
    // ✅ Si la respuesta es directamente un array
    if (Array.isArray(response.data)) {
      console.log('🛒 [productService] ✅ Usando response.data directamente');
      return response.data;
    }
    
    // ✅ Si la respuesta tiene data pero es un array
    if (response.data && Array.isArray(response.data.data)) {
      console.log('🛒 [productService] ✅ Usando response.data.data (alternativo)');
      return response.data.data;
    }
    
    // ✅ Si nada funciona, devolver array vacío
    console.warn('🛒 [productService] ⚠️ Respuesta inesperada:', response.data);
    return [];
  },

  /**
   * 👤 OBTENER PRODUCTO POR ID
   * 
   * Obtiene un producto específico por su ID
   * @param {string} id - ID del producto
   * @returns {Promise<Product>} - Producto
   */
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ [productService] Error al obtener producto ${id}:`, error);
      throw error;
    }
  },

  /**
   * ✨ CREAR PRODUCTO
   * 
   * Crea un nuevo producto
   * @param {Object} productData - Datos del producto
   * @returns {Promise<Product>} - Producto creado
   * 
   * 📝 IMPORTANTE:
   * - images: array de URLs de Supabase
   * - tags: array de strings
   * - variants: array de strings
   */
  async createProduct(productData: {
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
  }): Promise<Product> {
    try {
      console.log('📦 [productService] ===== INICIO CREAR PRODUCTO =====');
      console.log('📦 [productService] Datos recibidos completos:', productData);
      
      // 🔍 LOGS ESPECÍFICOS DE IMAGES
      console.log('📸 [productService] images ANTES de serializar:', productData.images);
      console.log('📸 [productService] type of images:', typeof productData.images);
      console.log('📸 [productService] images es array:', Array.isArray(productData.images));
      console.log('📸 [productService] images length:', productData.images?.length);
      console.log('📸 [productService] images[0]:', productData.images?.[0]);
      
      // 🎯 Preparar payload
      // ⚠️ IMPORTANTE: images NO se serializa a JSON, se envía como array
      const payload = {
        ...productData,
        tags: productData.tags ? JSON.stringify(productData.tags) : '[]',
        variants: productData.variants ? JSON.stringify(productData.variants) : '[]',
      };
      
      // 🔍 LOG DEL PAYLOAD FINAL
      console.log('📸 [productService] payload.images:', payload.images);
      console.log('📸 [productService] payload.images[0]:', payload.images?.[0]);
      console.log('📸 [productService] payload.images type:', typeof payload.images);
      console.log('📸 [productService] payload.images es array:', Array.isArray(payload.images));
      
      console.log('📦 [productService] Payload final:', payload);
      
      // 📤 Enviar al backend
      const response = await api.post('/products', payload);
      
      console.log('✅ [productService] Producto creado exitosamente:', response.data);
      console.log('📦 [productService] ===== FIN CREAR PRODUCTO =====');
      return response.data.data;
    } catch (error: any) {
      console.error('❌ [productService] Error al crear producto:', error);
      console.error('❌ [productService] Detalle del error:', error.response?.data);
      throw error;
    }
  },

  /**
   * ✏️ ACTUALIZAR PRODUCTO
   * 
   * Actualiza un producto existente
   * @param {string} id - ID del producto
   * @param {Object} productData - Datos a actualizar
   * @returns {Promise<Product>} - Producto actualizado
   */
  async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ [productService] Error al actualizar producto ${id}:`, error);
      throw error;
    }
  },

  /**
   * 🗑️ ELIMINAR PRODUCTO
   * 
   * Elimina (soft delete) un producto
   * @param {string} id - ID del producto
   * @returns {Promise<void>}
   */
  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`/products/${id}`);
      console.log(`🗑️ [productService] Producto ${id} eliminado`);
    } catch (error: any) {
      console.error(`❌ [productService] Error al eliminar producto ${id}:`, error);
      throw error;
    }
  },
};