// 📁 frontend/src/services/userService.ts

/**
 * 📌 SERVICIO DE USUARIOS
 * 
 * Maneja todas las operaciones relacionadas con usuarios:
 * - Perfil del usuario (cliente)
 * - Administración de usuarios (admin)
 * - Cambio de roles
 * - Activación/desactivación de usuarios
 * - Eliminación de usuarios
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Tipado fuerte con TypeScript
 * - Métodos claros y documentados
 */

import api from './api';

// =============================================
// 📌 TIPOS
// =============================================

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'CLIENTE' | 'ADMIN';
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateUserData {
  fullName?: string;
  phone?: string;
  address?: string;
}

export interface UpdatePasswordData {
  currentPassword: string;
  newPassword: string;
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
// 📌 SERVICIO
// =============================================

export const userService = {
  // =============================================
  // 👤 PERFIL DEL USUARIO (Cliente)
  // =============================================

  /**
   * Obtener perfil del usuario autenticado
   * @returns {Promise<User>} - Datos del usuario
   */
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data.data;
  },

  /**
   * Actualizar perfil del usuario autenticado
   * @param {UpdateUserData} data - Datos a actualizar
   * @returns {Promise<User>} - Usuario actualizado
   */
  async updateProfile(data: UpdateUserData): Promise<User> {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  },

  /**
   * Cambiar contraseña del usuario autenticado
   * @param {UpdatePasswordData} data - Contraseña actual y nueva
   * @returns {Promise<{ message: string }>} - Mensaje de confirmación
   */
  async updatePassword(data: UpdatePasswordData): Promise<{ message: string }> {
    const response = await api.put('/auth/password', data);
    return response.data;
  },

  /**
   * Eliminar cuenta del usuario autenticado
   * @returns {Promise<void>}
   */
  async deleteAccount(): Promise<void> {
    await api.delete('/auth/profile');
  },

  // =============================================
  // 👥 ADMINISTRACIÓN DE USUARIOS (Admin)
  // =============================================

  /**
   * Obtener todos los usuarios (solo ADMIN)
   * @param {number} page - Número de página
   * @param {number} limit - Cantidad por página
   * @param {string} search - Término de búsqueda (opcional)
   * @returns {Promise<PaginatedResponse<User>>} - Lista paginada de usuarios
   */
  async getUsers(page: number = 1, limit: number = 10, search?: string): Promise<PaginatedResponse<User>> {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (search) params.append('search', search);

    const response = await api.get(`/admin/users?${params.toString()}`);
    const rawData = response.data.data;
    return {
      data: rawData.users || [],
      pagination: rawData.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 }
    };
  },

  /**
   * Cambiar rol de un usuario (solo ADMIN)
   * @param {number} userId - ID del usuario
   * @param {'CLIENTE' | 'ADMIN'} role - Nuevo rol
   * @returns {Promise<User>} - Usuario actualizado
   */
  async updateUserRole(userId: number, role: 'CLIENTE' | 'ADMIN'): Promise<User> {
    const response = await api.put(`/admin/users/${userId}/role`, { role });
    return response.data.data;
  },

  /**
   * Activar o desactivar un usuario (solo ADMIN)
   * @param {number} userId - ID del usuario
   * @returns {Promise<User>} - Usuario actualizado
   */
  async toggleUserActive(userId: number): Promise<User> {
    const response = await api.put(`/admin/users/${userId}/toggle-active`);
    return response.data.data;
  },

  /**
   * Eliminar un usuario (solo ADMIN)
   * @param {number} userId - ID del usuario
   * @returns {Promise<void>}
   */
  async deleteUser(userId: number): Promise<void> {
    await api.delete(`/admin/users/${userId}`);
  },
};