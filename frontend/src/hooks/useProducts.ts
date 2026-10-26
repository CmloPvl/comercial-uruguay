// 📁 frontend/src/hooks/useProducts.ts

/**
 * 📌 HOOK PERSONALIZADO: useProducts
 * 
 * Encapsula toda la lógica de la página de productos (tienda):
 * - Carga de productos
 * - Filtros (categoría, precio)
 * - Favoritos
 * - Carrito
 * - Estados de carga y error
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Usa useCategories (evita duplicación)
 * - Usa helper de toasts (consistencia)
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts centralizados
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { productService, type Product } from "../services/productService";
import { favoriteService } from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useCategories } from "./useCategories";
import { 
  showErrorToastWithFallback, 
  showSuccessToast, 
  successMessages,
  productErrors,
  cartErrors,
  authErrors,
} from "../utils/errorMessages";

export function useProducts() {
  // =============================================
  // 🔍 PARÁMETROS DE URL
  // =============================================
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // =============================================
  // 🔐 CONTEXTOS
  // =============================================
  const { user } = useAuth();
  const { addItemById } = useCart();

  // =============================================
  // 📂 CATEGORÍAS (hook genérico)
  // =============================================
  const { categoriesWithIcons } = useCategories();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // =============================================
  // 🔄 CARGAR PRODUCTOS
  // =============================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts({ search: searchQuery });
      setProducts(data || []);
    } catch (err) {
      const errorMessage = productErrors.notFound;
      setError(errorMessage);
      showErrorToastWithFallback(err, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // ❤️ CARGAR FAVORITOS
  // =============================================
  const loadFavorites = async () => {
    try {
      const favs = await favoriteService.getFavorites();
      setFavorites(new Set(favs.map((f) => f.product.id)));
    } catch (err) {
      // Silencioso (no es crítico)
    }
  };

  // =============================================
  // ❤️ TOGGLE FAVORITO
  // =============================================
  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      if (favorites.has(productId)) {
        await favoriteService.removeFavorite(productId);
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        showSuccessToast("Producto eliminado de favoritos");
      } else {
        await favoriteService.addFavorite(productId);
        setFavorites((prev) => new Set([...prev, productId]));
        showSuccessToast("Producto agregado a favoritos");
      }
    } catch (err) {
      showErrorToastWithFallback(err, "Error al guardar favoritos");
    }
  };

  // =============================================
  // 🛒 AGREGAR AL CARRITO
  // =============================================
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      await addItemById(productId, 1);
      showSuccessToast(successMessages.addedToCart);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.empty);
    }
  };

  // =============================================
  // 🔍 FILTROS
  // =============================================
  const handlePriceChange = (min: string, max: string) => {
    setPriceRange({ min, max });
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    showSuccessToast("Filtros limpiados");
  };

  // =============================================
  // 📊 FILTRAR PRODUCTOS
  // =============================================
  const filteredProducts = products.filter((p) => {
    const matchesCategory = !selectedCategory || p.category_name === selectedCategory;
    const minPrice = priceRange.min !== "" ? Number(priceRange.min) : 0;
    const maxPrice = priceRange.max !== "" ? Number(priceRange.max) : Infinity;
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadProducts();
    if (user) {
      loadFavorites();
    }
  }, [searchQuery]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // Estados
    products,
    loading,
    error,
    selectedCategory,
    priceRange,
    showFilters,
    favorites,
    filteredProducts,
    categoriesWithIcons,
    searchQuery,

    // Funciones
    setSelectedCategory,
    setShowFilters,
    handlePriceChange,
    handleClearFilters,
    handleToggleFavorite,
    handleAddToCart,
    loadProducts,
    loadFavorites,
  };
}