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
 * - Toasts centralizados con el helper errorMessages
 * - Mensajes consistentes y controlados
 */

import { useState } from "react";
import { 
  showErrorToastWithFallback, 
  showSuccessToast, 
  successMessages,
  authErrors,
} from "../utils/errorMessages";
import { authService } from "../services/api";

export function useRecoverPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación: email requerido
    if (!email || !email.trim()) {
      const msg = "Por favor, ingresa tu correo electrónico";
      setError(msg);
      showErrorToastWithFallback(new Error(msg), authErrors.emailNotVerified);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // ✅ Llamar a la API
      await authService.forgotPassword(email);

      setSuccess(true);
      showSuccessToast(successMessages.passwordRecoverySent);

    } catch (err: any) {
      // ✅ Mostrar error con fallback del helper
      const errorMsg = err.message || "Error al enviar el correo de recuperación";
      setError(errorMsg);
      showErrorToastWithFallback(err, "Error al enviar el correo de recuperación");
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