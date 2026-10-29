// 📁 frontend/src/hooks/useCarrito.ts

/**
 * 📌 HOOK PERSONALIZADO: useCarrito
 * 
 * Encapsula toda la lógica de la página del Carrito.
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de estados y funciones del carrito
 * - Comentarios explicativos
 * - Toasts centralizados con errorMessages.ts
 * 
 * 🆕 Soporte para packs promocionales en el mensaje de WhatsApp
 * 🆕 Toasts de feedback al actualizar/eliminar/vaciar el carrito
 */

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { empresaConfig } from "../config/empresa";
// 🆕 Importar helper de toasts
import {
  showSuccessToast,
  showErrorToastWithFallback,
  successMessages,
  cartErrors,
} from "../utils/errorMessages";

export function useCarrito() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================

  // useCart(): Extrae los datos y funciones del carrito
  const {
    items,
    totalItems,
    totalPrice,
    clearCart,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  // useAuth(): Extrae los datos del usuario autenticado
  const { user } = useAuth();

  // =============================================
  // 🎯 ESTADO LOCAL
  // =============================================

  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro");

  // =============================================
  // 🆕 WRAPPERS CON TOASTS
  // =============================================
  // Envolvemos las funciones del contexto para mostrar toasts
  // (éxito al completar, error si falla)

  /**
   * Actualiza la cantidad de un producto con toast de feedback.
   */
  const handleUpdateQuantity = async (id: number | string, quantity: number) => {
    try {
      await updateQuantity(id, quantity);
      showSuccessToast(successMessages.quantityUpdated);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.updateFailed);
    }
  };

  /**
   * Elimina un producto del carrito con toast de feedback.
   */
  const handleRemoveItem = async (id: number | string) => {
    try {
      await removeItem(id);
      showSuccessToast(successMessages.itemRemoved);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.removeFailed);
    }
  };

  /**
   * Vacía el carrito con toast de feedback.
   */
  const handleClearCart = async () => {
    try {
      await clearCart();
      showSuccessToast(successMessages.cartCleared);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.clearFailed);
    }
  };

  // =============================================
  // 📧 GENERAR MENSAJE DE WHATSAPP
  // =============================================
  /**
   * Genera el mensaje de WhatsApp con el detalle del pedido.
   * 
   * Si un item tiene pack aplicado, lo muestra así:
   *   "1. Colgador de ropa (x3) - 🎁 1 pack de 3 → $1.000"
   * 
   * Si no tiene pack:
   *   "2. Juguete (x2) - $500 c/u → $1.000"
   */
  const generateWhatsAppMessage = () => {
    const productList = items
      .map((item, index) => {
        // Usar subtotal del backend (con packs) o calcular
        const subtotal = item.subtotal ?? (item.price * item.quantity);
        
        // Si tiene pack aplicado, mostrarlo
        if (item.packApplied && item.packQuantity && item.packPrice) {
          const packs = Math.floor(item.quantity / item.packQuantity);
          const remainder = item.quantity % item.packQuantity;
          
          let packText = `🎁 ${packs} pack${packs > 1 ? 's' : ''} de ${item.packQuantity}`;
          if (remainder > 0) {
            packText += ` + ${remainder} suelto${remainder > 1 ? 's' : ''}`;
          }
          
          return `${index + 1}. ${item.name} (x${item.quantity}) - ${packText} → $${subtotal.toLocaleString()}`;
        }
        
        // Sin pack: formato normal
        return `${index + 1}. ${item.name} (x${item.quantity}) - $${item.price.toLocaleString()} c/u → $${subtotal.toLocaleString()}`;
      })
      .join("\n");

    const message = `¡Hola ${empresaConfig.nombre}! 👋

Quiero hacer el siguiente pedido:

📦 **Mi Pedido**
${"─".repeat(50)}
${productList}
${"─".repeat(50)}
**Subtotal:** $${totalPrice.toLocaleString()}

👤 **Datos del cliente:**
Nombre: ${user?.fullName || "Cliente"}
Teléfono: ${user?.phone || "No especificado"}

📍 **Opción de entrega:** ${deliveryOption === "retiro" ? "Retiro en tienda" : "Envío a domicilio"}

¿Podrían confirmar disponibilidad y coordinar? ¡Gracias! 🙌`;

    return encodeURIComponent(message);
  };

  // =============================================
  // 📤 ENVIAR MENSAJE POR WHATSAPP
  // =============================================
  /**
   * Abre WhatsApp con el mensaje del pedido.
   */
  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${empresaConfig.whatsapp}?text=${message}`, "_blank");
  };

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    // 📦 Datos del carrito
    items,
    totalItems,
    totalPrice,
    loading,

    // 🔐 Datos del usuario
    user,

    // 🎯 Estado local
    deliveryOption,
    setDeliveryOption,

    // 📤 Funciones (con toasts)
    clearCart: handleClearCart,          // 🆕 wrapper
    updateQuantity: handleUpdateQuantity, // 🆕 wrapper
    removeItem: handleRemoveItem,        // 🆕 wrapper
    handleWhatsApp,
  };
}