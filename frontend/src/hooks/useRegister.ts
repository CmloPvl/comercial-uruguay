// 📁 frontend/src/hooks/useRegister.ts

/**
 * 📌 HOOK PERSONALIZADO: useRegister
 * 
 * Encapsula toda la lógica de registro de usuarios.
 * Separación de responsabilidades: la lógica está aquí, el diseño en el componente.
 * 
 * ✅ Buenas prácticas:
 * - Manejo de estado (error, isSubmitting)
 * - Validación con Zod (registerSchema)
 * - Llamada a la API a través de AuthContext
 * - Toasts centralizados con el helper errorMessages
 * - Redirección después del registro exitoso
 * - Mensajes consistentes y controlados
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Helper de toasts (centralizado)
import { 
  showErrorToastWithFallback, 
  showSuccessToast, 
  successMessages,
} from "../utils/errorMessages";

// =============================================
// 📦 IMPORTACIONES LOCALES
// =============================================
import { useAuth } from "../context/AuthContext";
import { registerSchema, type RegisterFormData } from "../schemas/auth.schema";

export function useRegister() {
  // =============================================
  // 🔧 ESTADOS LOCALES
  // =============================================
  
  /** Estado para errores de registro (se muestra en la UI) */
  const [error, setError] = useState<string>("");

  // =============================================
  // 🔐 CONTEXTOS Y HOOKS
  // =============================================
  
  /** Función de registro desde el contexto global de autenticación */
  const { register: registerUser } = useAuth();
  
  /** Hook de navegación de React Router - redirige después del registro */
  const navigate = useNavigate();

  // =============================================
  // 📝 REACT-HOOK-FORM + ZOD
  // 
  // Configuración del formulario con validación Zod.
  // - resolver: Conecta react-hook-form con Zod
  // - defaultValues: Valores iniciales del formulario
  // - watch: Para validación en vivo de contraseñas
  // =============================================
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      termsAccepted: false,
    },
  });

  // =============================================
  // 🚀 MANEJAR ENVÍO DEL FORMULARIO
  // 
  // 1. Intenta registrar al usuario con el backend
  // 2. Si es exitoso, redirige al login y muestra toast de éxito
  // 3. Si falla, muestra toast de error con mensaje del helper
  // =============================================
  const onSubmit = async (data: RegisterFormData) => {
    // Resetear error antes de intentar
    setError("");

    try {
      // ✅ Intentar registrar al usuario
      await registerUser({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone || undefined,
        termsAccepted: data.termsAccepted,
      });

      // ✅ Si llega aquí, el registro fue exitoso
      showSuccessToast(successMessages.registerSuccess);

      // ✅ Redirigir al login
      navigate("/login");

    } catch (err: any) {
      // ✅ Mostrar error al usuario usando el helper
      const errorMessage = err.message || "Error al registrar usuario";
      setError(errorMessage);
      showErrorToastWithFallback(err, "Error al registrar usuario");
    }
  };

  // =============================================
  // 📦 EXPORTACIÓN
  // 
  // Retorna todo lo necesario para el componente Registro
  // =============================================
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    error,
    isSubmitting,
    watch,
  };
}