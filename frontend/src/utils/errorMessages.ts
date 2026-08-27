// 📁 frontend/src/utils/errorMessages.ts

/**
 * 📌 HELPER DE MENSAJES Y TOASTS
 * 
 * Centraliza TODOS los mensajes de la aplicación y las funciones para mostrarlos.
 * 
 * ✅ Buenas prácticas:
 * - Un solo lugar para todos los mensajes (errores, éxitos, información)
 * - Estilos consistentes para todos los toasts
 * - Fácil de mantener y escalar
 * - Los mensajes de error son controlados por el helper (no por el backend)
 * - Usa iconTheme en lugar de icon para evitar el icono de "visto" adicional
 */

import toast from 'react-hot-toast';

// =============================================
// 🔴 MENSAJES DE ERROR - AUTENTICACIÓN
// =============================================

export const authErrors = {
  invalidCredentials: "Credenciales incorrectas. Verifica tu email y contraseña.",
  accountLocked: "Cuenta bloqueada. Contacta a soporte.",
  tooManyAttempts: "Demasiados intentos. Espera 15 minutos.",
  userNotFound: "Usuario no encontrado.",
  emailNotVerified: "Verifica tu email antes de iniciar sesión.",
  loginRequired: "Inicia sesión para realizar esta acción.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - PRODUCTOS
// =============================================

export const productErrors = {
  notFound: "Producto no encontrado.",
  outOfStock: "Producto sin stock.",
  invalidPrice: "Precio inválido.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - CARRITO
// =============================================

export const cartErrors = {
  empty: "El carrito está vacío.",
  itemNotFound: "El producto no está en el carrito.",
  quantityExceeded: "No hay suficiente stock.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - CATEGORÍAS
// =============================================

export const categoryErrors = {
  notFound: "Categoría no encontrada.",
  hasProducts: "La categoría tiene productos asociados. No se puede eliminar.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - PEDIDOS
// =============================================

export const orderErrors = {
  notFound: "Pedido no encontrado.",
  invalidStatus: "Estado de pedido inválido.",
};

// =============================================
// 🔴 MENSAJES DE ERROR - USUARIOS (ADMIN)
// =============================================

export const userErrors = {
  notFound: "Usuario no encontrado.",
  emailExists: "El email ya está registrado.",
  invalidRole: "Rol inválido.",
};

// =============================================
// 📋 MENSAJES DE ERROR POR CÓDIGO HTTP
// =============================================

export const getErrorMessage = (error: any): string => {
  const status = error.response?.status;
  const code = error.code;
  const message = error.response?.data?.message || error.message;

  if (import.meta.env.DEV) {
    console.log('🔍 Error detectado:', { status, code, message, error });
  }

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
      return message || "Ocurrió un error inesperado.";
  }
};

const handle400Error = (error: any): string => {
  const message = error.response?.data?.message;
  
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
  
  return message || "Datos inválidos. Revisa los campos e intenta de nuevo.";
};

// =============================================
// ✅ MENSAJES DE ÉXITO
// =============================================

export const successMessages = {
  productCreated: "Producto creado exitosamente",
  productUpdated: "Producto actualizado exitosamente",
  productDeleted: "Producto eliminado exitosamente",
  productActivated: "Producto activado exitosamente",
  productDeactivated: "Producto desactivado exitosamente",

  categoryCreated: "Categoría creada exitosamente",
  categoryUpdated: "Categoría actualizada exitosamente",
  categoryDeleted: "Categoría eliminada exitosamente",

  orderStatusUpdated: "Estado del pedido actualizado exitosamente",

  userRoleUpdated: "Rol de usuario actualizado exitosamente",
  userActivated: "Usuario activado exitosamente",
  userDeactivated: "Usuario desactivado exitosamente",
  userDeleted: "Usuario eliminado exitosamente",

  loginSuccess: "Inicio de sesión exitoso",
  registerSuccess: "Registro exitoso",
  passwordReset: "Contraseña restablecida exitosamente",
  passwordRecoverySent: "Email de recuperación enviado",

  imageUploaded: "Imagen subida exitosamente",
  imageDeleted: "Imagen eliminada exitosamente",

  addedToCart: "Producto agregado al carrito",

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

export const showErrorToastWithFallback = (error: any, fallbackMessage: string) => {
  if (error?.message) {
    console.log('🔍 Error real del backend:', error.message);
  }
  if (error?.response?.data?.message) {
    console.log('🔍 Error del backend:', error.response.data.message);
  }

  toast.error(fallbackMessage, {
    iconTheme: {
      primary: '#FF6B81',
      secondary: '#FFFFFF',
    },
    style: {
      border: "2px solid #FF6B81",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
  return fallbackMessage;
};

export const showErrorToast = (error: any) => {
  const message = getErrorMessage(error);
  toast.error(message, {
    iconTheme: {
      primary: '#FF6B81',
      secondary: '#FFFFFF',
    },
    style: {
      border: "2px solid #FF6B81",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
  return message;
};

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    iconTheme: {
      primary: '#00D2D3',
      secondary: '#FFFFFF',
    },
    style: {
      border: "2px solid #00D2D3",
      padding: "16px",
      backgroundColor: "#FAF9E2",
      color: "#303030",
    },
  });
};