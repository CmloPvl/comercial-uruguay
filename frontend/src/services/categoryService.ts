// 📁 frontend/src/services/categoryService.ts

/**
 * 📌 SERVICIO DE CATEGORÍAS
 * 
 * Maneja todas las operaciones relacionadas con categorías:
 * - Obtener todas las categorías
 * - Obtener categoría por ID
 * - Crear categoría (solo ADMIN)
 * - Actualizar categoría (solo ADMIN)
 * - Eliminar categoría (solo ADMIN)
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Tipado fuerte con TypeScript
 * - Sin logs innecesarios (solo errores)
 */

import api from './api';

// =============================================
// 📋 INTERFACES
// =============================================

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: string;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  icon?: string;
}

// =============================================
// 📦 SERVICIO
// =============================================

export const categoryService = {
  // =============================================
  // 📋 OBTENER TODAS LAS CATEGORÍAS
  // =============================================
  /**
   * Obtiene todas las categorías
   * @returns {Promise<Category[]>} - Lista de categorías
   */
  async getCategories(): Promise<Category[]> {
    try {
      const response = await api.get('/categories');
      return response.data.data;
    } catch (error) {
      console.error('❌ [categoryService] Error al obtener categorías:', error);
      throw error;
    }
  },

  // =============================================
  // 👤 OBTENER CATEGORÍA POR ID
  // =============================================
  /**
   * Obtiene una categoría por su ID
   * @param {string} id - ID de la categoría
   * @returns {Promise<Category>} - Categoría
   */
  async getCategoryById(id: string): Promise<Category> {
    try {
      const response = await api.get(`/categories/${id}`);
      return response.data.data;
    } catch (error) {
      console.error(`❌ [categoryService] Error al obtener categoría ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // ✨ CREAR CATEGORÍA (solo ADMIN)
  // =============================================
  /**
   * Crea una nueva categoría
   * @param {CreateCategoryData} data - Datos de la categoría
   * @returns {Promise<Category>} - Categoría creada
   */
  async createCategory(data: CreateCategoryData): Promise<Category> {
    try {
      const response = await api.post('/categories', data);
      return response.data.data;
    } catch (error) {
      console.error('❌ [categoryService] Error al crear categoría:', error);
      throw error;
    }
  },

  // =============================================
  // ✏️ ACTUALIZAR CATEGORÍA (solo ADMIN)
  // =============================================
  /**
   * Actualiza una categoría existente
   * @param {string} id - ID de la categoría
   * @param {UpdateCategoryData} data - Datos a actualizar
   * @returns {Promise<Category>} - Categoría actualizada
   */
  async updateCategory(id: string, data: UpdateCategoryData): Promise<Category> {
    try {
      const response = await api.put(`/categories/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error(`❌ [categoryService] Error al actualizar categoría ${id}:`, error);
      throw error;
    }
  },

  // =============================================
  // 🗑️ ELIMINAR CATEGORÍA (solo ADMIN)
  // =============================================
  /**
   * Elimina una categoría
   * @param {string} id - ID de la categoría
   * @returns {Promise<void>}
   */
  async deleteCategory(id: string): Promise<void> {
    try {
      await api.delete(`/categories/${id}`);
    } catch (error) {
      console.error(`❌ [categoryService] Error al eliminar categoría ${id}:`, error);
      throw error;
    }
  },
};