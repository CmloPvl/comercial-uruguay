// 📁 frontend/src/hooks/useFavoritos.ts

/**
 * 📌 HOOK PERSONALIZADO: useFavoritos
 * 
 * Encapsula toda la lógica de la página de Favoritos:
 * - Carga de favoritos desde la API
 * - Eliminación de favoritos
 * - Estados de carga, error y autenticación
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones de favoritos
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { favoriteService, type Favorite } from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";

export function useFavoritos() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================

  // useAuth(): Extrae el estado de autenticación del usuario
  const { isAuthenticated } = useAuth();

  // =============================================
  // 🎯 ESTADOS
  // =============================================

  /** Lista de productos favoritos del usuario */
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  /** Estado de carga */
  const [loading, setLoading] = useState(true);

  /** Mensaje de error (si ocurre) */
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🔄 CARGAR FAVORITOS
  // =============================================

  /**
   * loadFavorites: Obtiene la lista de favoritos desde el backend
   * 
   * 1. Activa el estado de carga
   * 2. Llama al servicio para obtener favoritos
   * 3. Actualiza el estado con los datos
   * 4. Maneja errores con toast
   */
  const loadFavorites = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await favoriteService.getFavorites();
      setFavorites(data);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar favoritos";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🗑️ ELIMINAR FAVORITO
  // =============================================

  /**
   * handleRemoveFavorite: Elimina un producto de favoritos
   * 
   * 1. Llama al servicio para eliminar el favorito
   * 2. Actualiza el estado local (elimina el producto de la lista)
   * 3. Muestra un toast de éxito
   * 4. Maneja errores con toast
   * 
   * @param {string} productId - ID del producto a eliminar
   */
  const handleRemoveFavorite = async (productId: string) => {
    try {
      await favoriteService.removeFavorite(productId);
      setFavorites((prev) => prev.filter((fav) => fav.product.id !== productId));
      toast.success("🗑️ Producto eliminado de favoritos", {
        icon: "❤️",
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } catch (err: any) {
      const errorMessage = err.message || "Error al eliminar de favoritos";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================

  /**
   * useEffect: Carga los favoritos cuando el usuario está autenticado
   * 
   * - Si el usuario está autenticado, carga los favoritos
   * - Si no, desactiva el estado de carga
   */
  useEffect(() => {
    if (isAuthenticated) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    // 📦 Estados
    favorites,
    loading,
    error,
    isAuthenticated,

    // 📤 Funciones
    loadFavorites,
    handleRemoveFavorite,
  };
}