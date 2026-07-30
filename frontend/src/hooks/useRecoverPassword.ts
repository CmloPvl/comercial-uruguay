// 📁 frontend/src/hooks/useRecoverPassword.ts

/**
 * 📌 HOOK PERSONALIZADO: useRecoverPassword
 * 
 * Encapsula toda la lógica de recuperación de contraseña.
 * Separación de responsabilidades: la lógica está aquí, el diseño en el componente.
 * 
 * ✅ Buenas prácticas:
 * - Manejo de estado (email, loading, success, error)
 * - Llamada a la API
 * - Validación básica
 * - Toasts integrados
 */

import { useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/api";

export function useRecoverPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      toast.error("❌ Correo electrónico requerido", {
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
      setLoading(true);
      setError(null);

      // ✅ Usar la ruta correcta: forgot-password
      await authService.forgotPassword(email);

      setSuccess(true);
      toast.success("✅ Revisa tu correo para restablecer tu contraseña", {
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } catch (err: any) {
      const errorMessage = err.message || "Error al enviar el correo de recuperación";
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

  return {
    email,
    setEmail,
    loading,
    success,
    error,
    handleSubmit,
  };
}