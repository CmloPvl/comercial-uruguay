// 📁 frontend/src/hooks/useFeaturedProducts.ts

/**
 * 📌 HOOK PERSONALIZADO: useFeaturedProducts
 * 
 * Encapsula toda la lógica de los productos destacados:
 * - Carga de productos destacados desde la API
 * - Estado de carga y error
 * - Reintentar carga
 * 
 * ✅ Buenas prácticas:
 * - Responsabilidad única (solo destacados)
 * - Reutilizable en Home, Productos, Ofertas, etc.
 * - Manejo de errores con toasts centralizados
 * - Fácil de testear
 * 
 * 🆕 Hook nuevo (separado de useHome)
 */

import { useState, useEffect } from "react";
import { productService, type Product } from "../services/productService";
import {
  showErrorToastWithFallback,
  productErrors,
} from "../utils/errorMessages";

export function useFeaturedProducts() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🔄 CARGAR DESTACADOS
  // =============================================
  const loadFeatured = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getFeatured();
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
  // 🚀 EFECTO: CARGAR AL INICIO
  // =============================================
  useEffect(() => {
    loadFeatured();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    products,
    loading,
    error,
    loadFeatured,
  };
}