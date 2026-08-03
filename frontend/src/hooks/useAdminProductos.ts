// 📁 frontend/src/hooks/useAdminProductos.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminProductos
 * 
 * Encapsula toda la lógica de la página de administración de productos:
 * - Carga de productos
 * - Eliminación de productos
 * - Activación/desactivación de productos
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones de admin productos
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminService, type Product } from "../services/adminService";

export function useAdminProductos() {
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
      const data = await adminService.getProducts(1, 50);
      // ✅ Manejo seguro de datos
      setProducts(data?.data || []);
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
  // 🗑️ ELIMINAR PRODUCTO
  // =============================================
  const handleDelete = async (id: string, name: string) => {
    // ✅ Confirmación antes de eliminar
    if (!confirm(`¿Estás seguro de que quieres eliminar "${name}"? Esta acción no se puede deshacer.`)) {
      return;
    }

    try {
      await adminService.deleteProduct(id);
      toast.success(`✅ "${name}" eliminado correctamente`, {
        icon: "🗑️",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      // ✅ Recargar la lista después de eliminar
      await loadProducts();
    } catch (err: any) {
      const errorMessage = err.message || "Error al eliminar el producto";
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
  // 🔄 ACTIVAR/DESACTIVAR PRODUCTO
  // =============================================
  const handleToggleActive = async (id: string, currentStatus: boolean, name: string) => {
    const action = currentStatus ? "desactivar" : "activar";
    if (!confirm(`¿Quieres ${action} "${name}"?`)) {
      return;
    }

    try {
      await adminService.updateProduct(id, { isActive: !currentStatus });
      toast.success(`✅ "${name}" ${currentStatus ? "desactivado" : "activado"} correctamente`, {
        icon: currentStatus ? "⏸️" : "▶️",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      await loadProducts();
    } catch (err: any) {
      const errorMessage = err.message || `Error al ${action} el producto`;
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

    // 📤 Funciones
    loadProducts,
    handleDelete,
    handleToggleActive,
  };
}