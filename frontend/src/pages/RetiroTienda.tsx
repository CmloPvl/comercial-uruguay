// 📁 frontend/src/pages/RetiroTienda.tsx

/**
 * 📌 PÁGINA: RETIRO EN TIENDA
 * 
 * Página específica de retiro (URL directa: /retiro).
 * Reutiliza RetiroSection.
 * 
 * ✅ Buenas prácticas:
 * - Usa RetiroSection (sin duplicar contenido)
 * - Header específico con la paleta oficial
 * - Link a /envios-y-retiros para ver ambas opciones
 * - Mobile-first (sin scroll horizontal)
 * 
 * 🆕 Banner rediseñado (paleta purple/cyan, texto blanco)
 * 🆕 Fix: overflow-x-hidden en el header (evita scroll horizontal en mobile)
 */

import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import { RetiroSection } from "../components/info/RetiroSection";
import { FaStore } from "react-icons/fa";

export default function RetiroTienda() {
  return (
    <Layout title="Retiro en Tienda">
      {/* ====== HEADER (rediseñado) ====== */}
      <div className="relative bg-gradient-to-br from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-12 sm:py-16 px-4 overflow-hidden">
        {/* Decoración de fondo (blobs) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#FFD93D] blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-[#FF6B81] blur-3xl"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1.5 rounded-full font-bold inline-flex items-center gap-2">
            <FaStore /> Retiro en Tienda
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Ven a buscar tu <br className="sm:hidden" />
            <span className="text-[#FFD93D]">pedido</span>
          </h1>
          <p className="text-white/80 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Haz tu pedido online y retíralo directamente en nuestro local.
            Sin filas, sin esperas, con la atención de siempre.
          </p>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 overflow-x-hidden">
        <RetiroSection />

        {/* Link a la página paraguas */}
        <div className="mt-8 text-center">
          <Link
            to="/envios-y-retiros"
            className="inline-flex items-center gap-2 text-[#7D5FFF] hover:text-[#603060] font-medium text-sm sm:text-base"
          >
            🚚 ¿Prefieres envío a domicilio? Ver opciones de envío →
          </Link>
        </div>
      </div>
    </Layout>
  );
}