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
 * 🔧 Fix: usar api.whatsapp.com/send en vez de wa.me (evita corrupción de emojis)
 */

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { empresaConfig } from "../config/empresa";
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

  const {
    items,
    totalItems,
    totalPrice,
    clearCart,
    loading,
    updateQuantity,
    removeItem,
  } = useCart();

  const { user } = useAuth();

  // =============================================
  // 🎯 ESTADO LOCAL
  // =============================================

  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro");

  // =============================================
  // 🆕 WRAPPERS CON TOASTS
  // =============================================

  const handleUpdateQuantity = async (id: number | string, quantity: number) => {
    try {
      await updateQuantity(id, quantity);
      showSuccessToast(successMessages.quantityUpdated);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.updateFailed);
    }
  };

  const handleRemoveItem = async (id: number | string) => {
    try {
      await removeItem(id);
      showSuccessToast(successMessages.itemRemoved);
    } catch (err) {
      showErrorToastWithFallback(err, cartErrors.removeFailed);
    }
  };

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

  const generateWhatsAppMessage = () => {
    const productList = items
      .map((item, index) => {
        const subtotal = item.subtotal ?? (item.price * item.quantity);
        
        if (item.packApplied && item.packQuantity && item.packPrice) {
          const packs = Math.floor(item.quantity / item.packQuantity);
          const remainder = item.quantity % item.packQuantity;
          
          let packText = `🎁 ${packs} pack${packs > 1 ? 's' : ''} de ${item.packQuantity}`;
          if (remainder > 0) {
            packText += ` + ${remainder} suelto${remainder > 1 ? 's' : ''}`;
          }
          
          return `${index + 1}. ${item.name} (x${item.quantity}) - ${packText} → $${subtotal.toLocaleString()}`;
        }
        
        return `${index + 1}. ${item.name} (x${item.quantity}) - $${item.price.toLocaleString()} c/u → $${subtotal.toLocaleString()}`;
      })
      .join("\n");

    const message = `¡Hola ${empresaConfig.nombre}! 👋

Quiero hacer el siguiente pedido:

📦 *Mi Pedido*
${"─".repeat(50)}
${productList}
${"─".repeat(50)}
*Subtotal:* $${totalPrice.toLocaleString()}

👤 *Datos del cliente:*
Nombre: ${user?.fullName || "Cliente"}
Teléfono: ${user?.phone || "No especificado"}

📍 *Opción de entrega:* ${deliveryOption === "retiro" ? "Retiro en tienda" : "Envío a domicilio"}

⚠️ *Importante:* La disponibilidad de los productos será confirmada por WhatsApp. Una vez confirmada, coordinaremos el pago y la entrega.

¿Podrían confirmar disponibilidad y coordinar? ¡Gracias! 🙌`;

    return encodeURIComponent(message);
  };

  // =============================================
  // 📤 ENVIAR MENSAJE POR WHATSAPP
  // 🔧 Fix: api.whatsapp.com/send en vez de wa.me (evita corrupción de emojis)
  // =============================================

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage();
    window.open(
      `https://api.whatsapp.com/send?phone=${empresaConfig.whatsapp}&text=${message}`,
      "_blank"
    );
  };

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    items,
    totalItems,
    totalPrice,
    loading,
    user,
    deliveryOption,
    setDeliveryOption,
    clearCart: handleClearCart,
    updateQuantity: handleUpdateQuantity,
    removeItem: handleRemoveItem,
    handleWhatsApp,
  };
}