import api from './api';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  stock: number;
  isOnSale?: boolean;
  discount?: number;
}

export interface CartResponse {
  cartId: string;
  items: CartItem[];
  totalItems: number;
  total: number;
}

export const cartService = {
  // =============================================
  // OBTENER CARRITO DEL USUARIO
  // =============================================
  async getCart(): Promise<CartResponse> {
    const response = await api.get('/cart');
    return response.data.data;
  },

  // =============================================
  // AGREGAR PRODUCTO AL CARRITO
  // =============================================
  async addItem(productId: string, quantity: number): Promise<CartResponse> {
    const response = await api.post('/cart/items', { productId, quantity });
    return response.data.data;
  },

  // =============================================
  // ACTUALIZAR CANTIDAD DE UN PRODUCTO
  // =============================================
  async updateQuantity(productId: string, quantity: number): Promise<CartResponse> {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response.data.data;
  },

  // =============================================
  // ELIMINAR PRODUCTO DEL CARRITO
  // =============================================
  async removeItem(productId: string): Promise<void> {
    await api.delete(`/cart/items/${productId}`);
  },

  // =============================================
  // VACIAR CARRITO
  // =============================================
  async clearCart(): Promise<void> {
    await api.delete('/cart');
  },
};