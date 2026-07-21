import api from './api';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: string;
  category_name?: string;  // ✅ NUEVO - viene del JOIN en el backend
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

export const productService = {
  // =============================================
  // OBTENER TODOS LOS PRODUCTOS
  // =============================================
async getProducts(params?: { category?: string; search?: string; page?: number; limit?: number }) {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.search) queryParams.append('search', params.search);
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  
  const response = await api.get(`/products?${queryParams.toString()}`);
  console.log('🛒 [productService] Respuesta completa:', response.data);
  
  // ✅ Devuelve el array directamente
  return response.data.data;  // ← Esto es el array de productos
},

  // =============================================
  // OBTENER PRODUCTO POR ID
  // =============================================
  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ [productService] Error al obtener producto ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // CREAR PRODUCTO
  // =============================================
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
      console.log('📦 [productService] Creando producto:', productData);
      
      const payload = {
        ...productData,
        tags: productData.tags ? JSON.stringify(productData.tags) : '[]',
        variants: productData.variants ? JSON.stringify(productData.variants) : '[]',
      };
      
      const response = await api.post('/products', payload);
      console.log('✅ [productService] Producto creado:', response.data);
      return response.data.data;
    } catch (error: any) {
      console.error('❌ [productService] Error al crear producto:', error);
      throw error;
    }
  },

  // =============================================
  // ACTUALIZAR PRODUCTO
  // =============================================
  async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data.data;
    } catch (error: any) {
      console.error(`❌ [productService] Error al actualizar producto ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // ELIMINAR PRODUCTO
  // =============================================
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