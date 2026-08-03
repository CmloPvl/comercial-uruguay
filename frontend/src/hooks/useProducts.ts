// 📁 frontend/src/hooks/useProductos.ts

/**
 * 📌 HOOK PERSONALIZADO: useProductos
 * 
 * Encapsula toda la lógica de la página de productos (tienda):
 * - Carga de productos y categorías
 * - Filtros (categoría, precio)
 * - Favoritos
 * - Carrito
 * - Estados de carga y error
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { productService, type Product } from "../services/productService";
import { categoryService, type Category } from "../services/categoryService";
import { favoriteService } from "../services/favoriteService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// 🎨 Iconos por defecto para categorías
const defaultCategoryIcons: Record<string, string> = {
  'Cabello': '💇',
  'Juguetes': '🧸',
  'Cumpleaños': '🎂',
  'Hogar': '🏠',
  'Melamina': '🍽️',
  'Temporada': '🍂',
};

// 🎨 Colores para categorías
const categoryColors = [
  { color: "hover:bg-[#FF6B81]/20 hover:border-[#FF6B81]" },
  { color: "hover:bg-[#C06060]/20 hover:border-[#C06060]" },
  { color: "hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { color: "hover:bg-[#7D5FFF]/20 hover:border-[#7D5FFF]" },
  { color: "hover:bg-[#FF9F43]/20 hover:border-[#FF9F43]" },
  { color: "hover:bg-[#603060]/20 hover:border-[#603060]" },
];

export function useProductos() {
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
  // 🎯 ESTADOS
  // =============================================
  const [productos, setProductos] = useState<Product[]>([]);
  const [categorias, setCategorias] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // =============================================
  // 📦 CATEGORÍAS CON ICONOS Y COLORES
  // =============================================
  const categoriesWithIcons = categorias.map((cat, index) => ({
    ...cat,
    icon: cat.icon || defaultCategoryIcons[cat.name] || '📦',
    color: categoryColors[index % categoryColors.length].color,
  }));

  // =============================================
  // 🔄 CARGAR DATOS
  // =============================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts({ search: searchQuery });
      setProductos(data || []);
    } catch (err: any) {
      setError(err.message || "Error al cargar productos");
      toast.error("❌ Error al cargar productos", {
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

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategorias(data);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      toast.error("❌ Error al cargar categorías", {
        style: {
          border: "2px solid #FF9F43",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  };

  const loadFavorites = async () => {
    try {
      const favs = await favoriteService.getFavorites();
      setFavorites(new Set(favs.map((f) => f.product.id)));
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
    }
  };

  // =============================================
  // ❤️ FAVORITOS
  // =============================================
  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      toast.error("🔒 Inicia sesión para guardar favoritos", {
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
      if (favorites.has(productId)) {
        await favoriteService.removeFavorite(productId);
        setFavorites((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        toast.success("🗑️ Producto eliminado de favoritos", {
          style: {
            border: "2px solid #FF9F43",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      } else {
        await favoriteService.addFavorite(productId);
        setFavorites((prev) => new Set([...prev, productId]));
        toast.success("❤️ Producto agregado a favoritos", {
          style: {
            border: "2px solid #7D5FFF",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      }
    } catch (err: any) {
      toast.error(err.message || "Error al guardar favoritos", {
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
  // 🛒 CARRITO
  // =============================================
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error("🔒 Inicia sesión para agregar al carrito", {
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
      toast.success("✅ Producto agregado al carrito", {
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } catch (err: any) {
      toast.error(err.message || "Error al agregar al carrito", {
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
  // 🔍 FILTROS
  // =============================================
  const handlePriceChange = (min: string, max: string) => {
    setPriceRange({ min, max });
  };

  const handleClearFilters = () => {
    setSelectedCategory("");
    setPriceRange({ min: "", max: "" });
    toast.success("🧹 Filtros limpiados", {
      style: {
        border: "2px solid #00D2D3",
        padding: "16px",
        backgroundColor: "#FAF9E2",
        color: "#303030",
      },
    });
  };

  // =============================================
  // 📊 FILTRAR PRODUCTOS
  // =============================================
  const filteredProducts = productos.filter((p) => {
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
    loadCategories();
    if (user) {
      loadFavorites();
    }
  }, [searchQuery]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // Estados
    productos,
    categorias,
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
    loadCategories,
    loadFavorites,
  };
}