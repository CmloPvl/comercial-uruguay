// 📁 frontend/src/components/cart/CartSummary.tsx

/**
 * 📌 CART SUMMARY
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra el resumen del carrito de compras:
 * - Subtotal y total
 * - Opciones de entrega (Retiro en tienda / Envío a domicilio)
 * - Botón para enviar pedido por WhatsApp
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica de negocio
 * - Sticky en desktop (se queda fijo al hacer scroll)
 * - Accesible (labels en inputs)
 * 
 * @param {Object} props
 * @param {number} props.totalItems - Cantidad total de productos en el carrito
 * @param {number} props.totalPrice - Precio total del carrito
 * @param {'retiro' | 'envio'} props.deliveryOption - Opción de entrega seleccionada
 * @param {Function} props.onDeliveryChange - Función para cambiar la opción de entrega
 * @param {Function} props.onWhatsApp - Función para enviar pedido por WhatsApp
 * @param {boolean} [props.loading] - Estado de carga (por defecto: false)
 * @returns {JSX.Element} - Resumen del carrito
 */

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface CartSummaryProps {
  /** Cantidad total de productos en el carrito */
  totalItems: number;
  /** Precio total del carrito */
  totalPrice: number;
  /** Opción de entrega seleccionada ('retiro' o 'envio') */
  deliveryOption: "retiro" | "envio";
  /** Función para cambiar la opción de entrega */
  onDeliveryChange: (option: "retiro" | "envio") => void;
  /** Función para enviar el pedido por WhatsApp */
  onWhatsApp: () => void;
  /** Estado de carga (deshabilita el botón) */
  loading?: boolean;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function CartSummary({
  totalItems,
  totalPrice,
  deliveryOption,
  onDeliveryChange,
  onWhatsApp,
  loading = false,
}: CartSummaryProps) {
  return (
    // 📦 Tarjeta sticky (se queda fija en desktop)
    <Card className="border-2 border-[#7D5FFF] sticky top-4 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        
        {/* =============================================
        📌 TÍTULO
        ============================================= */}
        <h2 className="text-xl font-bold text-[#603060] mb-4">
          📋 Resumen
        </h2>

        {/* =============================================
        💰 CÁLCULOS
        ============================================= */}
        <div className="space-y-3">
          {/* Subtotal */}
          <div className="flex justify-between">
            <span className="text-[#303030]">
              Subtotal ({totalItems} productos)
            </span>
            <span className="font-bold text-[#7D5FFF]">
              ${totalPrice.toLocaleString()}
            </span>
          </div>

          {/* Total (con línea divisoria) */}
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-[#303030]">Total</span>
              <span className="text-[#603060]">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* =============================================
        📦 OPCIÓN DE ENTREGA
        ============================================= */}
        <div className="mt-4 space-y-2">
          {/* Radio: Retiro en tienda */}
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition">
            <input
              type="radio"
              name="delivery"
              value="retiro"
              checked={deliveryOption === "retiro"}
              onChange={() => onDeliveryChange("retiro")}
              className="accent-[#7D5FFF] w-4 h-4"
              aria-label="Retiro en tienda"
            />
            <span className="text-sm text-[#303030]">🏪 Retiro en tienda</span>
          </label>

          {/* Radio: Envío a domicilio */}
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition">
            <input
              type="radio"
              name="delivery"
              value="envio"
              checked={deliveryOption === "envio"}
              onChange={() => onDeliveryChange("envio")}
              className="accent-[#7D5FFF] w-4 h-4"
              aria-label="Envío a domicilio"
            />
            <span className="text-sm text-[#303030]">📦 Envío a domicilio</span>
          </label>
        </div>

        {/* =============================================
        📤 BOTÓN WHATSAPP
        ============================================= */}
       <Button
  onClick={onWhatsApp}
  disabled={loading || totalItems === 0}
  className="
    w-full 
    mt-6 
    bg-gradient-to-r from-[#25D366] to-[#128C7E] 
    hover:from-[#128C7E] hover:to-[#075E54] 
    text-white 
    font-bold 
    py-4 px-8 
    text-lg 
    rounded-2xl 
    shadow-lg hover:shadow-2xl 
    transition-all duration-300 
    hover:scale-[1.03] 
    active:scale-[0.97]
    disabled:opacity-50 
    disabled:cursor-not-allowed 
    disabled:hover:scale-100
    flex items-center justify-center gap-3
    relative
    overflow-hidden
    group
  "
>
  {/* ✅ Efecto de brillo al hacer hover */}
  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
  
  {/* ✅ Icono con animación */}
  <FaWhatsapp 
    size={22} 
    className="group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-300" 
  />
  
  {loading ? (
    <span className="flex items-center gap-2">
      <span className="animate-spin">⏳</span> Enviando...
    </span>
  ) : (
    "Envía al Whatsapp"
  )}
</Button>

        {/* Nota informativa */}
        <p className="text-xs text-[#6A757C] text-center mt-2">
          El pedido se enviará para confirmar disponibilidad
        </p>
      </CardContent>
    </Card>
  );
}