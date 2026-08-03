// 📁 frontend/src/hooks/usePerfil.ts

/**
 * 📌 HOOK PERSONALIZADO: usePerfil
 * 
 * Encapsula toda la lógica de la página de Perfil:
 * - Carga de datos del usuario
 * - Actualización de perfil
 * - Cambio de contraseña
 * - Carga de pedidos
 * - Estados de carga, error y éxito
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones del perfil
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import { userService } from "../services/userService";
import { orderService, type Order } from "../services/orderService";

export function usePerfil() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================
  const { user, logout } = useAuth();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // =============================================
  // 🔄 CARGAR DATOS
  // =============================================
  const loadProfile = async () => {
    try {
      setLoadingProfile(true);
      const profile = await userService.getProfile();
      setFormData({
        fullName: profile.fullName || user?.fullName || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || user?.phone || "",
        address: profile.address || user?.address || "",
      });
    } catch (error) {
      console.error("Error al cargar perfil:", error);
      toast.error("❌ Error al cargar el perfil", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const loadOrders = async () => {
    try {
      const data = await orderService.getOrders();
      setOrders(data || []);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
      toast.error("❌ Error al cargar los pedidos", {
        style: {
          border: "2px solid #FF9F43",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  };

  // =============================================
  // 💾 GUARDAR PERFIL
  // =============================================
  const handleSave = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const updatedUser = await userService.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      });

      setSuccess("✅ Datos actualizados correctamente");
      toast.success("✅ Perfil actualizado", {
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });

      // Actualizar localStorage
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        userData.fullName = updatedUser.fullName;
        userData.phone = updatedUser.phone;
        userData.address = updatedUser.address;
        localStorage.setItem("user", JSON.stringify(userData));
      }

      setFormData({
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
      });

      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      const errorMessage = err.message || "Error al actualizar los datos";
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
  // 🔐 CAMBIAR CONTRASEÑA
  // =============================================
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("❌ Las contraseñas no coinciden");
      toast.error("❌ Las contraseñas no coinciden", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setError("❌ La contraseña debe tener al menos 8 caracteres");
      toast.error("❌ La contraseña debe tener al menos 8 caracteres", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      return;
    }

    setLoading(true);
    try {
      await userService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setSuccess("✅ Contraseña actualizada correctamente");
      toast.success("✅ Contraseña actualizada", {
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      const errorMessage = err.message || "Error al actualizar la contraseña";
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
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    if (user) {
      loadProfile();
      loadOrders();
    }
  }, [user]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    user,
    logout,
    loading,
    loadingProfile,
    orders,
    error,
    success,
    formData,
    setFormData,
    passwordData,
    setPasswordData,

    // 📤 Funciones
    handleSave,
    handlePasswordChange,
    loadProfile,
    loadOrders,
  };
}