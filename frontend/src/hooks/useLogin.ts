/**
 * 📌 HOOK PERSONALIZADO: useLogin
 * 
 * Este hook encapsula toda la lógica de autenticación para la página de login.
 * Sigue el principio de "Separación de Responsabilidades":
 * - La lógica (estados, validaciones, peticiones) está aquí.
 * - El diseño (UI) está en el componente Login.tsx.
 * 
 * ✅ Buenas prácticas aplicadas:
 * - Uso de react-hook-form para manejo de formularios
 * - Validación con Zod (loginSchema)
 * - Manejo de errores con try/catch
 * - Persistencia de "Recordarme" con localStorage
 * - Toasts para feedback al usuario
 * - Tipado fuerte con TypeScript
 * 
 * @returns {Object} Objeto con funciones y estados para el login
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

// =============================================
// 📦 IMPORTACIONES LOCALES
// =============================================
import { useAuth } from "../context/AuthContext";
import { loginSchema, type LoginFormData } from "../schemas/auth.schema";

/**
 * 🎯 HOOK PRINCIPAL
 * 
 * @returns {Object} {
 *   register,      // Registra campos en react-hook-form
 *   handleSubmit,  // Maneja el envío del formulario
 *   errors,        // Errores de validación
 *   error,         // Error general de autenticación
 *   isSubmitting,  // Estado de carga
 *   remember,      // Estado del checkbox "Recordarme"
 *   setRemember    // Actualiza el estado de "Recordarme"
 * }
 */
export function useLogin() {
  // =============================================
  // 🔧 ESTADOS LOCALES
  // =============================================
  
  /** Estado para errores de autenticación (ej: credenciales incorrectas) */
  const [error, setError] = useState<string>("");
  
  /** Estado del checkbox "Recordarme" */
  const [remember, setRemember] = useState(false);

  // =============================================
  // 🔐 CONTEXTOS Y HOOKS
  // =============================================
  
  /** Función de login desde el contexto de autenticación */
  const { login } = useAuth();
  
  /** Hook de navegación de React Router */
  const navigate = useNavigate();

  // =============================================
  // 📝 REACT-HOOK-FORM
  // 
  // Configuración del formulario con validación Zod.
  // - resolver: Conecta react-hook-form con Zod
  // - defaultValues: Valores iniciales del formulario
  // =============================================
  const {
    register,
    handleSubmit,
    setValue,
    getValues, // ✅ Agregamos getValues para manejar "Recordarme"
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
  // 3. Si es exitoso, redirige al perfil
  // 4. Si falla, muestra un toast con el error
  // =============================================
  const onSubmit = async (data: LoginFormData) => {
    // Resetear error antes de intentar
    setError("");

    try {
      // ✅ Guardar email si "Recordarme" está activo
      if (remember) {
        localStorage.setItem("rememberedEmail", data.email);
        toast.success("📧 Email guardado", {
          icon: "🔖",
          style: {
            border: "2px solid #7D5FFF",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      // ✅ Intentar autenticar al usuario
      await login(data.email, data.password);

      // ✅ Si llega aquí, el login fue exitoso
      toast.success("✅ ¡Bienvenido de vuelta!", {
        icon: "👋",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });

      // ✅ Redirigir al perfil del usuario
      navigate("/perfil");

    } catch (err: any) {
      // ✅ Mostrar error al usuario
      const errorMessage = err.message || "Credenciales incorrectas";
      setError(errorMessage);
      
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });

      // ✅ Log para debugging
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
    error,
    isSubmitting,
    remember,
    setRemember,
    getValues, // ✅ Para manejar "Recordarme" desde el componente
  };
}