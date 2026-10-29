// 📁 frontend/src/services/cartService.ts

/**
 * 📌 SERVICIO DE CARRITO
 * 
 * Maneja todas las operaciones del carrito:
 * - Obtener carrito del usuario
 * - Agregar producto
 * - Actualizar cantidad
 * - Eliminar producto
 * - Vaciar carrito
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Tipado fuerte con TypeScript
 * - Comentarios explicativos
 * 
 * 🆕 Soporte para packs promocionales:
 *   - packPrice: precio del pack (null si no hay)
 *   - packQuantity: cantidad del pack (null si no hay)
 *   - packApplied: si se aplicó el pack en este item
 *   - subtotal: calculado en el backend con packs
 */

import api from './api';

// =============================================
// 📋 INTERFACES
// =============================================

/**
 * Item individual del carrito (tal como viene del backend)
 */
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  stock: number;
  isOnSale?: boolean;
  discount?: number;
  packPrice?: number | null;      // 🆕 Precio del pack (null si no hay)
  packQuantity?: number | null;   // 🆕 Cantidad del pack (null si no hay)
  packApplied?: boolean;          // 🆕 ¿Se aplicó el pack?
  subtotal?: number;              // 🆕 Subtotal calculado con packs
}

/**
 * Respuesta del carrito completo
 */
export interface CartResponse {
  cartId: string;
  items: CartItem[];
  totalItems: number;
  total: number;
}

// =============================================
// 📦 SERVICIO
// =============================================

export const cartService = {
  // =============================================
  // 📦 OBTENER CARRITO DEL USUARIO
  // =============================================
  /**
   * Devuelve el carrito completo del usuario autenticado.
   * Incluye items, subtotales (con packs) y total general.
   */
  async getCart(): Promise<CartResponse> {
    const response = await api.get('/cart');
    return response.data.data;
  },

  // =============================================
  // ➕ AGREGAR PRODUCTO AL CARRITO
  // =============================================
  /**
   * Agrega un producto al carrito.
   * 
   * @param productId - ID del producto
   * @param quantity - Cantidad a agregar
   */
  async addItem(productId: string, quantity: number): Promise<CartResponse> {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data.data;
  },

  // =============================================
  // ✏️ ACTUALIZAR CANTIDAD
  // =============================================
  /**
   * Actualiza la cantidad de un producto en el carrito.
   * 
   * @param productId - ID del producto
   * @param quantity - Nueva cantidad
   */
  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data.data;
  },

  // =============================================
  // 🗑️ ELIMINAR PRODUCTO
  // =============================================
  /**
   * Elimina un producto específico del carrito.
   * 
   * @param productId - ID del producto
   */
  async removeItem(productId: string): Promise<void> {
    await api.delete(`/cart/items/${productId}`);
  },

  // =============================================
  // 🗑️ VACIAR CARRITO
  // =============================================
  /**
   * Elimina todos los items del carrito.
   */
  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
};