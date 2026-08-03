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
 * 
 * @returns {Object} - Estados y funciones del carrito
 */

import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { empresaConfig } from "../config/empresa";

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
    updateQuantity, // ✅ AGREGAR
    removeItem,     // ✅ AGREGAR
  } = useCart();

  // useAuth(): Extrae los datos del usuario autenticado
  const { user } = useAuth();

  // =============================================
  // 🎯 ESTADO LOCAL
  // =============================================

  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro");

  // =============================================
  // 📧 GENERAR MENSAJE DE WHATSAPP
  // =============================================

  const generateWhatsAppMessage = () => {
    const productList = items
      .map((item, index) => {
        const subtotal = item.price * item.quantity;
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

    // 📤 Funciones
    clearCart,
    updateQuantity, // ✅ AGREGAR
    removeItem,     // ✅ AGREGAR
    handleWhatsApp,
  };
}