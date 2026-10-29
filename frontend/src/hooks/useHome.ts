// 📁 frontend/src/hooks/useHome.ts

/**
 * 📌 HOOK PERSONALIZADO: useHome
 * 
 * Encapsula la lógica base de la página Home:
 * - Carga de productos desde la API
 * - Estado de carga y error
 * - Agregar productos al carrito
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Responsabilidad única
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts centralizados
 * 
 * 🆕 Los productos destacados ahora viven en useFeaturedProducts
 * 🆕 Toast de error correcto (cartErrors.addFailed)
 */

import { useState, useEffect } from "react";

// ✅ Helper de toasts (centraliza TODOS los mensajes)
import { 
  showErrorToastWithFallback, 
  showSuccessToast, 
  successMessages,
  productErrors,
  cartErrors,
  authErrors,
} from "../utils/errorMessages";

// =============================================
// 📦 IMPORTACIONES LOCALES
// =============================================
import { productService, type Product } from "../services/productService";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export function useHome() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================
  const { user } = useAuth();
  const { addItemById } = useCart();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🔄 CARGAR PRODUCTOS
  // =============================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      setProducts(data || []);
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
  const handleAddToCart = async (productId: string, productName: string) => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      await addItemById(productId, 1);
      showSuccessToast(`${productName} ${successMessages.addedToCart}`);
    } catch (err: any) {
      // 🆕 Mensaje correcto (no "carrito vacío")
      showErrorToastWithFallback(err, cartErrors.addFailed);
    }
  };

  // =============================================
  // 🚀 EFECTO: CARGAR PRODUCTOS AL INICIO
  // =============================================
  useEffect(() => {
    loadProducts();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    products,
    loading,
    error,
    loadProducts,
    handleAddToCart,
  };
}