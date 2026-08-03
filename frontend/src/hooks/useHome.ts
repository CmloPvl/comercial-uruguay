// 📁 frontend/src/hooks/useHome.ts

/**
 * 📌 HOOK PERSONALIZADO: useHome
 * 
 * Encapsula toda la lógica de la página Home:
 * - Carga de productos desde la API
 * - Estado de carga y error
 * - Agregar productos al carrito
 * - Productos destacados
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
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
  // 📦 PRODUCTOS DESTACADOS (primeros 6)
  // =============================================
  const featuredProducts = products.slice(0, 6);

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
      const errorMessage = err.message || "Error al cargar productos";
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
  // 🛒 AGREGAR AL CARRITO
  // =============================================
  const handleAddToCart = async (productId: string, productName: string) => {
    if (!user) {
      toast.error("🔒 Inicia sesión para agregar al carrito", {
        icon: "🔐",
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      return;
    }

    try {
      await addItemById(productId, 1);
      toast.success(`✅ ${productName} agregado al carrito`, {
        icon: "🛒",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } catch (err: any) {
      toast.error(`❌ ${err.message || "Error al agregar"}`, {
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
    featuredProducts,
    loadProducts,
    handleAddToCart,
  };
}