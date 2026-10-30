// 📁 frontend/src/components/info/RetiroSection.tsx

/**
 * 📌 RETIRO SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Sección informativa sobre retiro en tienda.
 * Reutilizable en:
 * - /retiro (solo)
 * - /envios-y-retiros (dentro de tabs)
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Usa empresaConfig (sin hardcodear)
 * - Reutilizable
 * - Accesible
 * 
 * 🆕 Fix mobile: flex-wrap en h2, items-start + break-words en aviso
 * 🆕 Padding responsive (p-4 sm:p-6)
 */

import { Card, CardContent } from "../ui/card";
import { FaStore, FaMapMarkerAlt, FaClock, FaWhatsapp, FaInfoCircle } from "react-icons/fa";
import { empresaConfig } from "../../config/empresa";

export function RetiroSection() {
  const whatsappUrl = `https://wa.me/${empresaConfig.whatsapp}?text=Hola!%20Quiero%20consultar%20sobre%20mi%20pedido%20para%20retiro...`;

  return (
    <div className="space-y-6">
      {/* =============================================
      DIRECCIÓN
      ============================================= */}
      <Card className="border-2 border-[#FF6B81]/30 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#603060] flex items-center gap-2 mb-3 flex-wrap">
            <FaMapMarkerAlt className="text-[#FF6B81] flex-shrink-0" />
            Dirección del local
          </h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg break-words">
            <strong>{empresaConfig.direccion}</strong>
          </p>
          <p className="text-gray-500 mt-1">{empresaConfig.comuna}, Chile</p>

          {/* Botón Google Maps */}
          <a
            href={empresaConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 bg-[#7D5FFF] hover:bg-[#603060] text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            🗺️ Ver en Google Maps
          </a>
        </CardContent>
      </Card>

      {/* =============================================
      HORARIO
      ============================================= */}
      <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#603060] flex items-center gap-2 mb-3 flex-wrap">
            <FaClock className="text-[#00D2D3] flex-shrink-0" />
            Horario de atención
          </h2>
          <ul className="space-y-2 text-gray-600 text-sm sm:text-base">
            <li><strong>Lunes a Viernes:</strong> {empresaConfig.horario.lunesViernes}</li>
            <li><strong>Sábado:</strong> {empresaConfig.horario.sabado}</li>
            <li><strong>Domingo:</strong> {empresaConfig.horario.domingo}</li>
          </ul>
        </CardContent>
      </Card>

      {/* =============================================
      CÓMO FUNCIONA EL RETIRO
      ============================================= */}
      <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#603060] flex items-center gap-2 mb-3 flex-wrap">
            <FaStore className="text-[#FF6B81] flex-shrink-0" />
            ¿Cómo funciona el retiro?
          </h2>
          <ol className="list-decimal pl-5 sm:pl-6 space-y-2 text-gray-600 text-sm sm:text-base">
            <li>Realiza tu pedido y selecciona <strong>"Retiro en tienda"</strong> al finalizar la compra.</li>
            <li>Recibirás un mensaje de confirmación cuando tu pedido esté listo.</li>
            <li>Ven a nuestro local con tu <strong>cédula de identidad</strong> y el <strong>número de pedido</strong>.</li>
            <li>Revisa tu pedido en el momento del retiro.</li>
          </ol>

          {/* Aviso importante (fix mobile) */}
          <div className="mt-4 bg-[#FFD93D]/20 p-3 rounded-lg border border-[#FFD93D]/40">
            <p className="text-sm text-[#303030] flex items-start gap-2">
              <FaInfoCircle className="text-[#FF6B81] flex-shrink-0 mt-0.5" />
              <span className="break-words">⚠️ Recuerda esperar la confirmación de disponibilidad antes de venir a retirar.</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* =============================================
      CTA WHATSAPP
      ============================================= */}
      <Card className="border-2 border-[#25D366]/30 shadow-lg bg-[#25D366]/5">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-[#603060] flex items-center gap-2 mb-3 flex-wrap">
            <FaWhatsapp className="text-[#25D366] flex-shrink-0" />
            ¿Tienes dudas?
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Contáctanos por WhatsApp para coordinar tu retiro o resolver cualquier duda.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#25D366]/80 text-white font-bold px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 text-sm"
          >
            <FaWhatsapp size={18} />
            Consultar por WhatsApp
          </a>
        </CardContent>
      </Card>
    </div>
  );
}