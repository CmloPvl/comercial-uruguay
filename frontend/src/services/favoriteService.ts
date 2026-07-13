import api from './api';

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

export interface FavoriteResponse {
  success: boolean;
  data: Favorite[] | Favorite;
  message?: string;
}

export const favoriteService = {
  // Obtener todos los favoritos del usuario
  async getFavorites(): Promise<Favorite[]> {
    const response = await api.get<FavoriteResponse>('/favorites');
    return response.data.data as Favorite[];
  },

  // Agregar producto a favoritos
  async addFavorite(productId: string): Promise<Favorite> {
    const response = await api.post<FavoriteResponse>(`/favorites/${productId}`);
    return response.data.data as Favorite;
  },

  // Eliminar producto de favoritos
  async removeFavorite(productId: string): Promise<void> {
    await api.delete(`/favorites/${productId}`);
  },

  // Verificar si un producto está en favoritos
  async isFavorite(productId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some(fav => fav.product.id === productId);
    } catch {
      return false;
    }
  }
};