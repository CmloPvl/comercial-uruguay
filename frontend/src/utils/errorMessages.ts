// 📁 frontend/src/utils/errorMessages.ts

/**
 * 📌 HELPER DE MENSAJES Y TOASTS
 * 
 * Centraliza TODOS los mensajes de la aplicación y las funciones para mostrarlos.
 * 
 * ✅ Buenas prácticas:
 * - Un solo lugar para todos los mensajes (errores, éxitos, información)
 * - Iconos consistentes por tipo (✅ éxito, ❌ error, ⚠️ advertencia, ℹ️ información)
 * - Estilos consistentes para todos los toasts
 * - Fácil de mantener y escalar
 * - Los mensajes de error son controlados por el helper (no por el backend)
 * 
 * 🎯 Uso:
 * - Los hooks IMPORTAN las funciones y mensajes de este helper
 * - Los hooks NUNCA tienen mensajes hardcodeados
 * - La UI NUNCA tiene toasts directos
 * 
 * 📋 Cómo agregar un nuevo mensaje:
 * 1. Identifica la categoría (auth, product, cart, etc.)
 * 2. Agrega el mensaje en la sección correspondiente
 * 3. El hook lo importa y lo usa
 */

import toast from 'react-hot-toast';

// =============================================
// 📋 ICONOS CENTRALIZADOS POR TIPO
// =============================================

const ICONS = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
} as const;

// =============================================
// 🔴 MENSAJES DE ERROR - AUTENTICACIÓN
// =============================================

export const authErrors = {
  /** Credenciales incorrectas (email o contraseña inválidos) */
  invalidCredentials: "Credenciales incorrectas. Verifica tu email y contraseña.",
  /** Cuenta bloqueada por seguridad */
  accountLocked: "Cuenta bloqueada. Contacta a soporte.",
  /** Demasiados intentos fallidos */
  tooManyAttempts: "Demasiados intentos. Espera 15 minutos.",
  /** Usuario no encontrado en la base de datos */
  userNotFound: "Usuario no encontrado.",
  /** Email no verificado */
  emailNotVerified: "Verifica tu email antes de iniciar sesión.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - PRODUCTOS
// =============================================

export const productErrors = {
  /** Producto no encontrado en la base de datos */
  notFound: "Producto no encontrado.",
  /** Producto sin stock disponible */
  outOfStock: "Producto sin stock.",
  /** Precio inválido (negativo o cero) */
  invalidPrice: "Precio inválido.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - CARRITO
// =============================================

export const cartErrors = {
  /** Carrito vacío */
  empty: "El carrito está vacío.",
  /** Producto no está en el carrito */
  itemNotFound: "El producto no está en el carrito.",
  /** Stock insuficiente para la cantidad solicitada */
  quantityExceeded: "No hay suficiente stock.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - CATEGORÍAS
// =============================================

export const categoryErrors = {
  /** Categoría no encontrada */
  notFound: "Categoría no encontrada.",
  /** Categoría con productos asociados (no se puede eliminar) */
  hasProducts: "La categoría tiene productos asociados. No se puede eliminar.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - PEDIDOS
// =============================================

export const orderErrors = {
  /** Pedido no encontrado */
  notFound: "Pedido no encontrado.",
  /** Estado de pedido inválido */
  invalidStatus: "Estado de pedido inválido.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - USUARIOS (ADMIN)
// =============================================

export const userErrors = {
  /** Usuario no encontrado */
  notFound: "Usuario no encontrado.",
  /** Email ya registrado */
  emailExists: "El email ya está registrado.",
  /** Rol inválido */
  invalidRole: "Rol inválido.",
};

// =============================================
// 📋 MENSAJES DE ERROR POR CÓDIGO HTTP
// =============================================

export const getErrorMessage = (error: any): string => {
  // 🔍 Extraer información del error
  const status = error.response?.status;
  const code = error.code;
  const message = error.response?.data?.message || error.message;

  // 📋 Log para depuración (solo en desarrollo)
  if (import.meta.env.DEV) {
    console.log('🔍 Error detectado:', { status, code, message, error });
  }

  // =============================================
  // 🔴 ERRORES HTTP POR CÓDIGO DE ESTADO
  // =============================================

  switch (status) {
    case 400:
      return handle400Error(error);
    case 401:
      return "No autorizado. Inicia sesión nuevamente.";
    case 403:
      return "No tienes permisos para realizar esta acción.";
    case 404:
      return "Recurso no encontrado. Verifica la información.";
    case 409:
      return "Conflicto. El recurso ya existe o está en uso.";
    case 422:
      return "Datos inválidos. Revisa los campos del formulario.";
    case 429:
      return "Demasiadas peticiones. Espera 15 minutos e intenta de nuevo.";
    case 500:
      return "Error en el servidor. Intenta más tarde.";
    case 502:
      return "El servidor no responde. Intenta más tarde.";
    case 503:
      return "Servicio no disponible. Intenta más tarde.";
    default:
      // Si hay un mensaje específico del backend, usarlo
      return message || "Ocurrió un error inesperado.";
  }
};

// =============================================
// 🛠️ MANEJADORES ESPECÍFICOS POR TIPO DE ERROR
// =============================================

/**
 * Maneja errores 400 (Bad Request)
 * Retorna mensajes específicos según el contexto
 */
const handle400Error = (error: any): string => {
  const message = error.response?.data?.message;
  
  // Errores específicos de validación
  if (message?.includes('email')) {
    return "El email ya está registrado o es inválido.";
  }
  if (message?.includes('password')) {
    return "La contraseña debe tener al menos 6 caracteres.";
  }
  if (message?.includes('sku')) {
    return "El SKU ya está registrado. Usa uno diferente.";
  }
  if (message?.includes('stock')) {
    return "El stock debe ser un número válido.";
  }
  if (message?.includes('price')) {
    return "El precio debe ser un número válido.";
  }
  
  // Mensaje genérico
  return message || "Datos inválidos. Revisa los campos e intenta de nuevo.";
};

// =============================================
// ✅ MENSAJES DE ÉXITO
// =============================================

export const successMessages = {
  // Productos
  productCreated: "Producto creado exitosamente",
  productUpdated: "Producto actualizado exitosamente",
  productDeleted: "Producto eliminado exitosamente",
  productActivated: "Producto activado exitosamente",
  productDeactivated: "Producto desactivado exitosamente",

  // Categorías
  categoryCreated: "Categoría creada exitosamente",
  categoryUpdated: "Categoría actualizada exitosamente",
  categoryDeleted: "Categoría eliminada exitosamente",

  // Pedidos
  orderStatusUpdated: "Estado del pedido actualizado exitosamente",

  // Usuarios
  userRoleUpdated: "Rol de usuario actualizado exitosamente",
  userActivated: "Usuario activado exitosamente",
  userDeactivated: "Usuario desactivado exitosamente",
  userDeleted: "Usuario eliminado exitosamente",

  // Autenticación
  loginSuccess: "Inicio de sesión exitoso",
  registerSuccess: "Registro exitoso",
  passwordReset: "Contraseña restablecida exitosamente",
  passwordRecoverySent: "Email de recuperación enviado",

  // Imágenes
  imageUploaded: "Imagen subida exitosamente",
  imageDeleted: "Imagen eliminada exitosamente",

  // General
  changesSaved: "Cambios guardados exitosamente",
  changesCancelled: "Cambios cancelados",
};

// =============================================
// 📋 MENSAJES DE ADVERTENCIA E INFORMACIÓN
// =============================================

export const infoMessages = {
  noProducts: "No hay productos creados aún",
  noOrders: "No hay pedidos aún",
  noCategories: "No hay categorías creadas aún",
  noUsers: "No hay usuarios registrados aún",
  noFavorites: "No tienes favoritos guardados",
  emptyCart: "Tu carrito está vacío",
  searchNoResults: "No se encontraron resultados",
};

// =============================================
// 🔧 FUNCIONES PARA MOSTRAR TOASTS
// =============================================

/**
 * Muestra un error en un toast con estilos consistentes
 * Versión profesional: SIEMPRE usa el mensaje de fallback
 * 
 * @param error - Error capturado (se loguea para debugging)
 * @param fallbackMessage - Mensaje que SIEMPRE se muestra al usuario
 * @returns El mensaje de error mostrado
 * 
 * 🎯 Uso profesional:
 * - El hook pasa el error y un fallback específico del contexto
 * - El helper muestra el fallback y loguea el error real
 * - El usuario ve mensajes consistentes y controlados
 * - Los desarrolladores ven el error real en consola
 * 
 * 📋 Ejemplo en hook:
 *   showErrorToastWithFallback(err, authErrors.invalidCredentials);
 */
export const showErrorToastWithFallback = (error: any, fallbackMessage: string) => {
  // ✅ Log para debugging (el error real se ve en consola)
  if (error?.message) {
    console.log('🔍 Error real del backend:', error.message);
  }
  if (error?.response?.data?.message) {
    console.log('🔍 Error del backend:', error.response.data.message);
  }

  // ✅ Siempre mostrar el mensaje controlado (fallback)
  toast.error(fallbackMessage, {
    icon: ICONS.error,
    style: {
      border: "2px solid #FF6B81",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
  return fallbackMessage;
};

/**
 * Muestra un error en un toast con estilos consistentes
 * Versión simple: usa getErrorMessage para extraer el mensaje del error
 * 
 * @param error - Error capturado (puede ser de API o de la app)
 * @returns El mensaje de error mostrado
 */
export const showErrorToast = (error: any) => {
  const message = getErrorMessage(error);
  toast.error(message, {
    icon: ICONS.error,
    style: {
      border: "2px solid #FF6B81",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
  return message;
};

/**
 * Muestra un mensaje de éxito con estilos consistentes
 * El icono ✅ es fijo para todos los toasts de éxito
 * 
 * @param message - Mensaje de éxito a mostrar
 */
export const showSuccessToast = (message: string) => {
  toast.success(message, {
    icon: ICONS.success,
    style: {
      border: "2px solid #00D2D3",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
};