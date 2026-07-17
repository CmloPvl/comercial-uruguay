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
  async getProducts(params?: { category?: string; search?: string; page?: number; limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    
    const response = await api.get(`/products?${queryParams.toString()}`);
    return response.data.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await api.get(`/products/${id}`);
    return response.data.data;
  },

  // ✅ CREATE PRODUCT - RECIBE ARRAYS Y LOS CONVIERTE A JSON
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
    tags?: string[];     // ✅ Recibe array
    variants?: string[]; // ✅ Recibe array
    isActive?: boolean;
  }): Promise<Product> {
    // Convertir arrays a JSON string antes de enviar al backend
    const payload = {
      ...productData,
      tags: productData.tags ? JSON.stringify(productData.tags) : '[]',
      variants: productData.variants ? JSON.stringify(productData.variants) : '[]',
    };
    const response = await api.post('/products', payload);
    return response.data.data;
  },

  async updateProduct(id: string, productData: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Product> {
    const response = await api.put(`/products/${id}`, productData);
    return response.data.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await api.delete(`/products/${id}`);
  },
};