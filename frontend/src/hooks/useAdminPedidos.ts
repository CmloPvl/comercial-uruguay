// 📁 frontend/src/hooks/useAdminPedidos.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminPedidos
 * 
 * Encapsula toda la lógica de la página de administración de pedidos:
 * - Carga de pedidos
 * - Filtrado por estado
 * - Paginación
 * - Cambio de estado de pedidos
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones de admin pedidos
 */

import { useState, useEffect, useMemo } from "react";
import toast from "react-hot-toast";
import { adminService, type Order } from "../services/adminService";

// 📊 Estados disponibles para pedidos
export const ORDER_STATUSES = [
  { value: "PENDIENTE", label: "Pendiente", color: "bg-[#FF6B81] text-white" },
  { value: "RECIBIDO", label: "Recibido", color: "bg-[#FF6B81] text-white" },
  { value: "REVISION", label: "En Revisión", color: "bg-[#FF9F43] text-white" },
  { value: "CONFIRMADO", label: "Confirmado", color: "bg-[#FFD93D] text-[#303030]" },
  { value: "ENVIADO", label: "Enviado", color: "bg-[#00D2D3] text-white" },
  { value: "ENTREGADO", label: "Entregado", color: "bg-[#90C090] text-white" },
];

export function useAdminPedidos() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // =============================================
  // 🎯 ESTADOS PARA MODALES
  // =============================================
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================
  const filteredOrders = useMemo(() => {
    if (!statusFilter) return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // =============================================
  // 🔄 CARGAR PEDIDOS
  // =============================================
  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminService.getOrders(currentPage, itemsPerPage, statusFilter);
      setOrders(data.data || []);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar pedidos";
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
  // 🔄 CAMBIAR ESTADO DE PEDIDO
  // =============================================
  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await adminService.updateOrderStatus(orderId, status);
      toast.success(`✅ Estado del pedido actualizado a "${status}"`, {
        icon: "🔄",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      await loadOrders();
    } catch (err: any) {
      const errorMessage = err.message || "Error al actualizar estado";
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
  // 🔍 ABRIR MODAL DE CAMBIO DE ESTADO
  // =============================================
  const openStatusDialog = (order: Order) => {
    setSelectedOrder(order);
    setNewStatus(order.status);
    setStatusDialogOpen(true);
  };

  // =============================================
  // ✅ CONFIRMAR CAMBIO DE ESTADO
  // =============================================
  const confirmStatusChange = async () => {
    if (!selectedOrder || !newStatus) return;
    await handleStatusChange(selectedOrder.id, newStatus);
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  // =============================================
  // 📄 MANEJAR FILTRO
  // =============================================
  const handleFilterChange = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Resetear a primera página al filtrar
  };

  // =============================================
  // 📄 MANEJAR PAGINACIÓN
  // =============================================
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // =============================================
  // ❌ CERRAR MODALES
  // =============================================
  const closeDialogs = () => {
    setStatusDialogOpen(false);
    setSelectedOrder(null);
    setNewStatus("");
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadOrders();
  }, [statusFilter, currentPage]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    orders,
    filteredOrders,
    paginatedOrders,
    loading,
    error,
    statusFilter,
    currentPage,
    totalPages,
    itemsPerPage,

    // 📤 Funciones
    loadOrders,
    handleFilterChange,
    handlePageChange,
    openStatusDialog,
    confirmStatusChange,
    closeDialogs,

    // 🎯 Estados del modal
    statusDialogOpen,
    selectedOrder,
    newStatus,
    setNewStatus,

    // 📊 Constantes
    ORDER_STATUSES,
  };
}