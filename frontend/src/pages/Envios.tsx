// 📁 frontend/src/pages/Envios.tsx

/**
 * 📌 PÁGINA: ENVÍOS
 * 
 * Página específica de envíos (URL directa: /envios).
 * Reutiliza EnviosSection.
 * 
 * ✅ Buenas prácticas:
 * - Usa EnviosSection (sin duplicar contenido)
 * - Header específico
 * - Link a /envios-y-retiros para ver ambas opciones
 */

import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import { EnviosSection } from "../components/info/EnviosSection";

export default function Envios() {
  return (
    <Layout title="Envíos">
      {/* ====== HEADER ====== */}
      <div className="bg-gradient-to-r from-[#00D2D3] via-[#7D5FFF] to-[#603060] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1.5 rounded-full font-bold">
            🚚 Envíos
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Envíos a <span className="text-[#FFD93D]">todo Chile</span>
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Conoce cómo enviamos tus productos a cualquier rincón del país.
          </p>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <EnviosSection />

        {/* Link a la página paraguas */}
        <div className="mt-8 text-center">
          <Link
            to="/envios-y-retiros?tab=retiro"
            className="inline-flex items-center gap-2 text-[#7D5FFF] hover:text-[#603060] font-medium"
          >
            🏪 ¿Prefieres retirar en tienda? Ver opciones de retiro →
          </Link>
        </div>
      </div>
    </Layout>
  );
}