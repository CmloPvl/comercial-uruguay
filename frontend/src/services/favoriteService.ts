// 📁 frontend/src/services/favoriteService.ts

/**
 * 📌 SERVICIO DE FAVORITOS
 * 
 * Maneja todas las operaciones relacionadas con favoritos:
 * - Obtener todos los favoritos del usuario
 * - Agregar producto a favoritos
 * - Eliminar producto de favoritos
 * - Verificar si un producto está en favoritos
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

export interface Favorite {
  id: string;
  product: {
    id: string;
    name: string;
    price: number;
    images: string[];
  };
  createdAt: string;
}

export interface FavoritesListResponse {
  success: boolean;
  data: Favorite[];
  message?: string;
}

export interface FavoriteSingleResponse {
  success: boolean;
  data: Favorite;
  message?: string;
}

// =============================================
// 📦 SERVICIO
// =============================================

export const favoriteService = {
  // =============================================
  // 📋 OBTENER TODOS LOS FAVORITOS
  // =============================================
  /**
   * Obtiene todos los favoritos del usuario autenticado
   * @returns {Promise<Favorite[]>} - Lista de favoritos
   */
  async getFavorites(): Promise<Favorite[]> {
    try {
      const response = await api.get<FavoritesListResponse>('/favorites');
      return response.data.data;
    } catch (error) {
      console.error('❌ [favoriteService] Error al obtener favoritos:', error);
      throw error;
    }
  },

  // =============================================
  // ✨ AGREGAR A FAVORITOS
  // =============================================
  /**
   * Agrega un producto a favoritos
   * @param {string} productId - ID del producto
   * @returns {Promise<Favorite>} - Favorito creado
   */
  async addFavorite(productId: string): Promise<Favorite> {
    try {
      const response = await api.post<FavoriteSingleResponse>(`/favorites/${productId}`);
      return response.data.data;
    } catch (error) {
      console.error(`❌ [favoriteService] Error al agregar favorito ${productId}:`, error);
      throw error;
    }
  },

  // =============================================
  // 🗑️ ELIMINAR DE FAVORITOS
  // =============================================
  /**
   * Elimina un producto de favoritos
   * @param {string} productId - ID del producto
   * @returns {Promise<void>}
   */
  async removeFavorite(productId: string): Promise<void> {
    try {
      await api.delete(`/favorites/${productId}`);
    } catch (error) {
      console.error(`❌ [favoriteService] Error al eliminar favorito ${productId}:`, error);
      throw error;
    }
  },

  // =============================================
  // 🔍 VERIFICAR SI ES FAVORITO
  // =============================================
  /**
   * Verifica si un producto está en favoritos
   * @param {string} productId - ID del producto
   * @returns {Promise<boolean>} - true si está en favoritos
   */
  async isFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some((fav) => fav.product.id === productId);
    } catch {
      return false;
    }
  },
};