import api from './api';

export interface Category {
  id: string;  // ✅ string para compatibilidad con React Router
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export const categoryService = {
  // =============================================
  // OBTENER TODAS LAS CATEGORÍAS
  // =============================================
  async getCategories(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data.data;
  },

  // =============================================
  // CREAR CATEGORÍA (solo ADMIN)
  // =============================================
  async createCategory(data: { name: string; description?: string; icon?: string }): Promise<Category> {
    const response = await api.post('/categories', data);
    return response.data.data;
  },

  // =============================================
  // ACTUALIZAR CATEGORÍA (solo ADMIN)
  // =============================================
  async updateCategory(id: string, data: { name?: string; description?: string; icon?: string }): Promise<Category> {
    const response = await api.put(`/categories/${id}`, data);
    return response.data.data;
  },

  // =============================================
  // ELIMINAR CATEGORÍA (solo ADMIN)
  // =============================================
  async deleteCategory(id: string): Promise<void> {
    await api.delete(`/categories/${id}`);
  },
};