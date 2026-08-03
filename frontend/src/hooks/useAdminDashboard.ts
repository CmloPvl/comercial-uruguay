// 📁 frontend/src/hooks/useAdminDashboard.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminDashboard
 * 
 * Encapsula toda la lógica del Dashboard de Administración:
 * - Carga de estadísticas (productos, pedidos, usuarios, ventas)
 * - Carga de pedidos recientes
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones del dashboard
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { adminService, type DashboardStats, type Order } from "../services/adminService";
import { useAuth } from "../context/AuthContext";

export function useAdminDashboard() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================
  const { user } = useAuth();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    pendingOrders: 0,
    monthlySales: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 📊 VERIFICAR SI HAY DATOS
  // =============================================
  const hasData = stats.totalProducts > 0 || stats.totalOrders > 0 || stats.totalUsers > 0;

  // =============================================
  // 🔄 CARGAR DATOS DEL DASHBOARD
  // =============================================
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar estadísticas
      const statsData = await adminService.getStats();
      setStats(statsData);

      // Cargar pedidos recientes
      const ordersData = await adminService.getRecentOrders(5);
      setRecentOrders(ordersData);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar el dashboard";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadDashboardData();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    user,
    stats,
    loading,
    recentOrders,
    error,
    hasData,

    // 📤 Funciones
    loadDashboardData,
  };
}