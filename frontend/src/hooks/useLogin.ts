/**
 * 📌 HOOK PERSONALIZADO: useLogin
 * 
 * Encapsula toda la lógica de autenticación para la página de login.
 * 
 * ✅ Principios aplicados:
 * - Separación de Responsabilidades (SoC): La lógica está aquí, la UI en Login.tsx
 * - Centralización de mensajes: Todos los mensajes vienen del helper errorMessages
 * - Tipado fuerte con TypeScript
 * - Persistencia de sesión con localStorage
 * - Redirección según rol (ADMIN → /admin, CLIENTE → /perfil)
 * 
 * @returns {Object} {
 *   register,      // Registra campos en react-hook-form
 *   handleSubmit,  // Maneja el envío del formulario
 *   errors,        // Errores de validación (Zod)
 *   isSubmitting,  // Estado de carga
 *   remember,      // Estado del checkbox "Recordarme"
 *   setRemember    // Actualiza el estado de "Recordarme"
 * }
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// ✅ Helper de toasts (centraliza TODOS los mensajes y estilos)
import { 
  showErrorToastWithFallback,
  showSuccessToast, 
  successMessages,
  authErrors,
} from "../utils/errorMessages";

// =============================================
// 📦 IMPORTACIONES LOCALES
// =============================================
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

export function useLogin() {
  // =============================================
  // 🔧 ESTADOS LOCALES
  // =============================================
  
  /** Estado del checkbox "Recordarme" - persiste el email del usuario */
  const [remember, setRemember] = useState(false);

  // =============================================
  // 🔐 CONTEXTOS Y HOOKS
  // =============================================
  
  /** Función de login desde el contexto global de autenticación */
  const { login } = useAuth(); // ✅ Ya no necesitamos user del contexto
  
  /** Hook de navegación de React Router - redirige después del login */
  const navigate = useNavigate();

  // =============================================
  // 📝 REACT-HOOK-FORM + ZOD
  // 
  // Configuración del formulario con validación Zod.
  // - resolver: Conecta react-hook-form con Zod
  // - defaultValues: Valores iniciales del formulario
  // =============================================
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // =============================================
  // 💾 EFECTO: Cargar email guardado
  // 
  // Si el usuario marcó "Recordarme" anteriormente,
  // cargamos el email guardado en localStorage.
  // =============================================
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setRemember(true);
    }
  }, [setValue]);

  // =============================================
  // 🚀 MANEJAR ENVÍO DEL FORMULARIO
  // 
  // 1. Guarda el email en localStorage si "Recordarme" está activo
  // 2. Intenta autenticar al usuario con el backend
  // 3. login() devuelve el usuario → lo usamos para redirigir
  // 4. Si falla, muestra toast de error con mensaje del helper
  // =============================================
  const onSubmit = async (data: LoginFormData) => {
    try {
      // ✅ Guardar email si "Recordarme" está activo
      if (remember) {
        localStorage.setItem("rememberedEmail", data.email);
        showSuccessToast("📧 Email guardado");
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ✅ Intentar autenticar al usuario
      // ✅ login() ahora devuelve el usuario
      const loggedUser = await login(data.email, data.password);

      // ✅ Si llega aquí, el login fue exitoso
      showSuccessToast(successMessages.loginSuccess);

      // ✅ Redirigir según el rol del usuario (usando el usuario devuelto)
      if (loggedUser?.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }

    } catch (err: any) {
      // ✅ El helper decide cómo mostrar el error
      // ✅ El hook solo pasa el error y el fallback específico del contexto
      showErrorToastWithFallback(err, authErrors.invalidCredentials);

      // ✅ Log para debugging en desarrollo
      console.error("Login error:", err);
    }
  };

  // =============================================
  // 📦 EXPORTACIÓN
  // 
  // Retorna todo lo necesario para el componente Login
  // =============================================
  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    isSubmitting,
    remember,
    setRemember,
    getValues,
  };
}