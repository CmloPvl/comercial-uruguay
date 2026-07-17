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
  category?: { id: string; name: string };
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  createdAt: string;
  updatedAt: string;
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
    return response.data.data;
  },

  // =============================================
  // OBTENER PRODUCTO POR ID
  // =============================================
  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },

  // =============================================
  // CREAR PRODUCTO (solo ADMIN)
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
    tags?: string[];     // ✅ Agregado
    variants?: string[]; // ✅ Agregado
    isActive?: boolean;
  }): Promise<Product> {
    const response = await api.post('/products', productData);
    return response.data.data;
  },

  // =============================================
  // ACTUALIZAR PRODUCTO
  // =============================================
  async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data;
  },

  // =============================================
  // ELIMINAR PRODUCTO
  // =============================================
  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};