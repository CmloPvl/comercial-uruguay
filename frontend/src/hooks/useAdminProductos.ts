// 📁 frontend/src/hooks/useAdminProductos.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminProductos
 * 
 * Encapsula toda la lógica de la página de administración de productos:
 * - Carga de productos
 * - Eliminación de productos (con modal de confirmación)
 * - Activación/desactivación de productos (con modal de confirmación)
 * - Búsqueda de productos por nombre o SKU
 * - Paginación de productos
 * - Estados de carga, error y datos
 * - Estados para control de modales (AlertDialog de shadcn/ui)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts (helper centralizado)
 * - Modales de confirmación con shadcn/ui (reemplaza confirm() nativo)
 * 
 * 🆕 Toasts migrados al helper (errorMessages.ts)
 * 
 * @returns {Object} - Estados y funciones de admin productos
 */

import { useState, useEffect, useMemo } from "react";
// 🆕 Migrado: ya no se usa toast directo
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  productErrors,
} from "../utils/errorMessages";
import { adminService, type Product } from "../services/adminService";

export function useAdminProductos() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🎯 ESTADOS PARA BÚSQUEDA Y PAGINACIÓN
  // =============================================
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // =============================================
  // 🎯 ESTADOS PARA MODALES (shadcn/ui AlertDialog)
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
      // ✅ Manejo seguro de datos
      setProducts(data?.data || []);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar productos";
      setError(errorMessage);
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, productErrors.notFound);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🔍 PRODUCTOS FILTRADOS (búsqueda)
  // =============================================
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }
    const term = searchTerm.toLowerCase().trim();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

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
  // 🔄 RESETEAR PÁGINA AL BUSCAR
  // =============================================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Volver a la primera página al buscar
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
  // 🗑️ CONFIRMAR ELIMINAR (se ejecuta desde el modal)
  // =============================================
  const confirmDelete = async () => {
    if (!selectedProduct) return;

    try {
      await adminService.deleteProduct(selectedProduct.id);
      // 🆕 Toast migrado al helper
      showSuccessToast(
        `${selectedProduct.name} ${successMessages.productDeleted}`
      );
      // ✅ Recargar la lista después de eliminar
      await loadProducts();
    } catch (err: any) {
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, productErrors.deleteFailed);
    } finally {
      // ✅ Cerrar modal y limpiar selección
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // =============================================
  // 🔄 CONFIRMAR ACTIVAR/DESACTIVAR (se ejecuta desde el modal)
  // =============================================
  const confirmToggle = async () => {
    if (!selectedProduct) return;

    const newStatus = !selectedProduct.isActive;

    try {
      await adminService.updateProduct(selectedProduct.id, { isActive: newStatus });
      // 🆕 Toast migrado al helper (mensaje según acción)
      showSuccessToast(
        `${selectedProduct.name} ${
          newStatus ? successMessages.productActivated : successMessages.productDeactivated
        }`
      );
      await loadProducts();
    } catch (err: any) {
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, productErrors.toggleFailed);
    } finally {
      // ✅ Cerrar modal y limpiar selección
      setToggleDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  // =============================================
  // ❌ CERRAR MODALES (sin ejecutar acción)
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

    // 📊 Paginación
    currentPage,
    totalPages,
    itemsPerPage,
    setCurrentPage,

    // 🔍 Búsqueda
    searchTerm,
    handleSearch,

    // 📤 Funciones principales
    loadProducts,

    // 🗑️ Funciones para abrir modales
    openDeleteDialog,
    openToggleDialog,

    // ✅ Funciones de confirmación
    confirmDelete,
    confirmToggle,

    // ❌ Cerrar modales
    closeDialogs,

    // 🎯 Estados de los modales
    deleteDialogOpen,
    toggleDialogOpen,
    selectedProduct,
  };
}