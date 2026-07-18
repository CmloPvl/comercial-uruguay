import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { FaWhatsapp } from "react-icons/fa";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  deliveryOption: 'retiro' | 'envio';
  onDeliveryChange: (option: 'retiro' | 'envio') => void;
  onWhatsApp: () => void;
  loading?: boolean;
}

export default function CartSummary({
  totalItems,
  totalPrice,
  deliveryOption,
  onDeliveryChange,
  onWhatsApp,
  loading = false,
}: CartSummaryProps) {
  return (
    <Card className="border-2 border-[#7D5FFF] sticky top-4 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-[#603060] mb-4">📋 Resumen</h2>
        
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-[#303030]">Subtotal ({totalItems} productos)</span>
            <span className="font-bold text-[#7D5FFF]">${totalPrice.toLocaleString()}</span>
          </div>
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between font-bold text-lg">
              <span className="text-[#303030]">Total</span>
              <span className="text-[#603060]">${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Opción de entrega */}
        <div className="mt-4 space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition">
            <input
              type="radio"
              name="delivery"
              value="retiro"
              checked={deliveryOption === "retiro"}
              onChange={() => onDeliveryChange("retiro")}
              className="accent-[#7D5FFF] w-4 h-4"
            />
            <span className="text-sm text-[#303030]">🏪 Retiro en tienda</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition">
            <input
              type="radio"
              name="delivery"
              value="envio"
              checked={deliveryOption === "envio"}
              onChange={() => onDeliveryChange("envio")}
              className="accent-[#7D5FFF] w-4 h-4"
            />
            <span className="text-sm text-[#303030]">📦 Envío a domicilio</span>
          </label>
        </div>

        {/* ✅ Botón de WhatsApp con ícono y color */}
        <Button
          onClick={onWhatsApp}
          disabled={loading || totalItems === 0}
          className="w-full mt-6 bg-[#25D366] hover:bg-[#25D366]/90 text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <FaWhatsapp size={20} />
          {loading ? "Enviando..." : "Enviar pedido por WhatsApp"}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          El pedido se enviará para confirmar disponibilidad
        </p>
      </CardContent>
    </Card>
  );
}