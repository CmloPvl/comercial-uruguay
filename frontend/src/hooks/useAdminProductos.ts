// 📁 frontend/src/hooks/useAdminProductos.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminProductos
 * 
 * Encapsula toda la lógica de la página de administración de productos:
 * - Carga de productos
 * - Filtro por categoría (reutiliza useCategories)
 * - Búsqueda de productos por nombre o SKU
 * - Paginación de productos
 * - Eliminación / activación / desactivación (con modales)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutiliza useCategories (evita duplicación)
 * - Fácil de testear
 * - Manejo de errores con toasts (helper centralizado)
 * 
 * 🆕 Filtro por categoría (selectedCategory + setSelectedCategory)
 * 🆕 filteredProducts ahora filtra por categoría + búsqueda
 */

import { useState, useEffect, useMemo } from "react";
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  productErrors,
} from "../utils/errorMessages";
import { adminService, type Product } from "../services/adminService";
import { useCategories } from "./useCategories";  // 🆕

export function useAdminProductos() {
  // =============================================
  // 🆕 CATEGORÍAS (reutiliza hook existente)
  // =============================================
  const { categoriesWithIcons, loading: categoriesLoading } = useCategories();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🎯 ESTADOS PARA BÚSQUEDA, FILTRO Y PAGINACIÓN
  // =============================================
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");  // 🆕
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // =============================================
  // 🎯 ESTADOS PARA MODALES
  // =============================================
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{
    id: string;
    name: string;
    isActive?: boolean;
  } | null>(null);

  // =============================================
  // 🔄 CARGAR PRODUCTOS
  // =============================================
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getProducts(1, 50);
      setProducts(data?.data || []);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar productos";
      setError(errorMessage);
      showErrorToastWithFallback(err, productErrors.notFound);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🔍 PRODUCTOS FILTRADOS (búsqueda + categoría)
  // =============================================
  const filteredProducts = useMemo(() => {
    let result = products;

    // 🆕 Filtro por categoría
    if (selectedCategory) {
      result = result.filter((p) => p.category_name === selectedCategory);
    }

    // Filtro por búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.sku?.toLowerCase().includes(term) ||
          p.description?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [products, searchTerm, selectedCategory]);

  // =============================================
  // 📄 PRODUCTOS PAGINADOS
  // =============================================
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =============================================
  // 📊 CONTADORES
  // =============================================
  const activeCount = products.filter((p) => p.isActive).length;
  const inactiveCount = products.filter((p) => !p.isActive).length;

  // =============================================
  // 🔄 RESETEAR PÁGINA AL BUSCAR/FILTRAR
  // =============================================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // 🆕 Cambiar categoría y resetear página
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // =============================================
  // 🗑️ ABRIR MODAL DE ELIMINAR
  // =============================================
  const openDeleteDialog = (id: string, name: string) => {
    setSelectedProduct({ id, name });
    setDeleteDialogOpen(true);
  };

  // =============================================
  // 🔄 ABRIR MODAL DE ACTIVAR/DESACTIVAR
  // =============================================
  const openToggleDialog = (id: string, currentStatus: boolean, name: string) => {
    setSelectedProduct({ id, name, isActive: currentStatus });
    setToggleDialogOpen(true);
  };

  // =============================================
  // 🗑️ CONFIRMAR ELIMINAR
  // =============================================
  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await adminService.deleteProduct(selectedProduct.id);
      showSuccessToast(
        `${selectedProduct.name} ${successMessages.productDeleted}`
      );
      await loadProducts();
    } catch (err: any) {
      showErrorToastWithFallback(err, productErrors.deleteFailed);
    } finally {
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // =============================================
  // 🔄 CONFIRMAR ACTIVAR/DESACTIVAR
  // =============================================
  const confirmToggle = async () => {
    if (!selectedProduct) return;

    const newStatus = !selectedProduct.isActive;

    try {
      await adminService.updateProduct(selectedProduct.id, { isActive: newStatus });
      showSuccessToast(
        `${selectedProduct.name} ${
          newStatus ? successMessages.productActivated : successMessages.productDeactivated
        }`
      );
      await loadProducts();
    } catch (err: any) {
      showErrorToastWithFallback(err, productErrors.toggleFailed);
    } finally {
      setToggleDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // =============================================
  // ❌ CERRAR MODALES
  // =============================================
  const closeDialogs = () => {
    setDeleteDialogOpen(false);
    setToggleDialogOpen(false);
    setSelectedProduct(null);
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadProducts();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    products,
    loading,
    error,
    filteredProducts,
    paginatedProducts,
    activeCount,
    inactiveCount,

    // 🆕 Categorías
    categoriesWithIcons,
    categoriesLoading,

    // 📊 Paginación
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,

    // 🔍 Búsqueda y filtro
    searchTerm,
    selectedCategory,        // 🆕
    handleSearch,
    handleCategoryChange,    // 🆕

    // 📤 Funciones principales
    loadProducts,

    // 🗑️ Modales
    openDeleteDialog,
    openToggleDialog,
    confirmDelete,
    confirmToggle,
    closeDialogs,
    deleteDialogOpen,
    toggleDialogOpen,
    selectedProduct,
  };
}