// 📁 frontend/src/hooks/useProductoDetalle.ts

/**
 * 📌 HOOK PERSONALIZADO: useProductoDetalle
 * 
 * Encapsula toda la lógica de la página de detalle de producto:
 * - Carga del producto por ID
 * - Verificación de favoritos
 * - Agregar al carrito
 * - Agregar/eliminar favoritos
 * - Desactivar producto (solo admin)
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * 🆕 handleDesactivar (soft delete, solo admin)
 * 🆕 user expuesto (para condicionales admin)
 * 
 * @param {string} id - ID del producto
 * @returns {Object} - Estados y funciones del detalle de producto
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { productService } from "../services/productService";
import { favoriteService } from "../services/favoriteService";
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  productErrors,
  cartErrors,
  authErrors,
} from "../utils/errorMessages";

export function useProductoDetalle(id: string | undefined) {
  const { user } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [deactivating, setDeactivating] = useState(false);  // 🆕

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================
  const finalPrice = product?.isOnSale && product?.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product?.price || 0;

  const isOutOfStock = product?.stock === 0;

  // =============================================
  // 🔄 CARGAR PRODUCTO
  // =============================================
  const loadProduct = async () => {
    if (!id) {
      setError("ID de producto no proporcionado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      setProduct(data);

      if (user) {
        const fav = await favoriteService.isFavorite(id);
        setIsFavorite(fav);
      }
    } catch (err: any) {
      const errorMessage = err.message || productErrors.notFound;
      setError(errorMessage);
      showErrorToastWithFallback(err, productErrors.notFound);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🛒 AGREGAR AL CARRITO
  // =============================================
  const handleAddToCart = async () => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      setAddingToCart(true);
      addItem(
        {
          id: product.id,
          name: product.name,
          price: finalPrice,
          image: product.images?.[0],
          stock: product.stock,
          isOnSale: product.isOnSale,
          discount: product.discount,
        },
        quantity
      );
      showSuccessToast(`"${product.name}" ${successMessages.addedToCart}`);
    } catch (err: any) {
      showErrorToastWithFallback(err, cartErrors.addFailed);
    } finally {
      setAddingToCart(false);
    }
  };

  // =============================================
  // ⭐ AGREGAR/ELIMINAR FAVORITO
  // =============================================
  const handleToggleFavorite = async () => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(product.id);
        setIsFavorite(false);
        showSuccessToast("Eliminado de favoritos");
      } else {
        await favoriteService.addFavorite(product.id);
        setIsFavorite(true);
        showSuccessToast("Agregado a favoritos");
      }
    } catch (err: any) {
      showErrorToastWithFallback(err, "Error al actualizar favoritos");
    }
  };

  // =============================================
  // 🆕 DESACTIVAR PRODUCTO (solo admin)
  // =============================================
  /**
   * Soft delete: marca isActive = false
   * El producto desaparece del catálogo pero queda en admin (se puede reactivar).
   * Después de desactivar, redirige al catálogo.
   */
  const handleDesactivar = async () => {
    if (!user || user.role !== "ADMIN") {
      showErrorToastWithFallback(new Error("No autorizado"), "No autorizado");
      return;
    }

    try {
      setDeactivating(true);
      await productService.updateProduct(product.id, { isActive: false });
      showSuccessToast(`"${product.name}" desactivado. Ya no aparece en el catálogo.`);
      // Redirigir al catálogo (el producto ya no existe públicamente)
      navigate("/productos");
    } catch (err: any) {
      showErrorToastWithFallback(err, "Error al desactivar el producto");
    } finally {
      setDeactivating(false);
    }
  };

  // =============================================
  // 📦 MANEJAR CANTIDAD
  // =============================================
const increaseQuantity = () => {
  // 🆕 Si stock = 0 (consultar), permitir hasta 99. Si stock > 0, limitar al stock real.
  const max = product?.stock && product.stock > 0 ? product.stock : 99;
  setQuantity((prev) => Math.min(max, prev + 1));
};

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadProduct();
  }, [id, user]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    product,
    loading,
    error,
    quantity,
    isFavorite,
    addingToCart,
    finalPrice,
    isOutOfStock,

    // 🆕 Usuario (para condicionales admin)
    user,

    // 🆕 Estado de desactivar
    deactivating,

    // 📤 Funciones
    loadProduct,
    handleAddToCart,
    handleToggleFavorite,
    handleDesactivar,  // 🆕
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
  };
}