import api from './api';

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

export const userService = {
  // =============================================
  // OBTENER PERFIL DEL USUARIO
  // =============================================
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile');
    return response.data.data;
  },

  // =============================================
  // ACTUALIZAR PERFIL
  // =============================================
  async updateProfile(data: UpdateUserData): Promise<User> {
    const response = await api.put('/auth/profile', data);
    return response.data.data;
  },

  // =============================================
  // CAMBIAR CONTRASEÑA
  // =============================================
  async updatePassword(data: UpdatePasswordData): Promise<{ message: string }> {
    const response = await api.put('/auth/password', data);
    return response.data;
  },

  // =============================================
  // ELIMINAR CUENTA (Opcional)
  // =============================================
  async deleteAccount(): Promise<void> {
    await api.delete('/auth/profile');
  },
};