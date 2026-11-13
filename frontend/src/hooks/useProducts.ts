// 📁 frontend/src/hooks/useProducts.ts

/**
 * 📌 HOOK PERSONALIZADO: useProducts
 * 
 * Encapsula toda la lógica de la página de productos (tienda):
 * - Carga de productos (con filtros desde backend)
 * - Filtros (search, categoría, precio) → backend con debounce
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
 * 
 * 🆕 Debounce de 300ms en search (evita peticiones por tecla)
 * 🆕 Debounce de 300ms en precios (evita recarga por tecla)
 * 🆕 Filtros van al backend (search + category + minPrice + maxPrice)
 * 🆕 Categoría se sincroniza con la URL (`?categoria=...`)
 * 🆕 `setLoading` solo en carga inicial (evita parpadeo)
 * 🆕 `filteredProducts` ya no filtra en cliente (backend es fuente de verdad)
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
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = decodeURIComponent(searchParams.get("categoria") || "");

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
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // 🆕 Valores debounced (300ms)
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [debouncedPriceRange, setDebouncedPriceRange] = useState({ min: "", max: "" });

  // 🆕 selectedCategory derivado de la URL (fuente de verdad)
  const selectedCategory = categoryQuery;

  // =============================================
  // 🆕 CAMBIAR CATEGORÍA (sincroniza con URL)
  // =============================================
  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category) {
      newParams.set("categoria", category);
    } else {
      newParams.delete("categoria");
    }
    setSearchParams(newParams);
  };

  // =============================================
  // 🔄 CARGAR PRODUCTOS (con filtros al backend)
  // =============================================
  const loadProducts = async (showLoading = false) => {
    try {
      if (showLoading) setLoading(true);
      setError(null);
      const data = await productService.getProducts({
        search: debouncedSearch || undefined,
        category: categoryQuery || undefined,
        minPrice: debouncedPriceRange.min !== "" ? Number(debouncedPriceRange.min) : undefined,
        maxPrice: debouncedPriceRange.max !== "" ? Number(debouncedPriceRange.max) : undefined,
      });
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
    setPriceRange({ min: "", max: "" });
    setDebouncedSearch("");
    setDebouncedPriceRange({ min: "", max: "" });
    // 🆕 Limpiar categoría de la URL
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categoria");
    newParams.delete("search");
    setSearchParams(newParams);
    showSuccessToast("Filtros limpiados");
  };

  // =============================================
  // 📊 PRODUCTOS FILTRADOS
  // El backend ya filtra, así que no filtramos en cliente
  // =============================================
  const filteredProducts = products;

  // =============================================
  // 🚀 EFECTOS
  // =============================================

  // 🆕 Debounce del search (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 🆕 Debounce de precios (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedPriceRange(priceRange);
    }, 300);
    return () => clearTimeout(timer);
  }, [priceRange]);

  // 🆕 Cargar productos cuando cambian los filtros debounced
  // Solo muestra loading si no hay productos (evita parpadeo)
  useEffect(() => {
    loadProducts(products.length === 0);
  }, [debouncedSearch, categoryQuery, debouncedPriceRange.min, debouncedPriceRange.max]);

  // 🆕 Cargar favoritos al montar (si hay usuario)
  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

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
    setSelectedCategory: handleCategoryChange,  // 🆕 Ahora actualiza la URL
    setShowFilters,
    handlePriceChange,
    handleClearFilters,
    handleToggleFavorite,
    handleAddToCart,
    loadProducts,
    loadFavorites,
  };
}