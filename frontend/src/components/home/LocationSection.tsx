// 📁 frontend/src/components/home/LocationSection.tsx

/**
 * 📌 LOCATION SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra la ubicación, horarios y datos de contacto del local.
 * Actualmente es estático, pero puede conectarse a Google Maps en el futuro.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos estáticos (dirección, horarios)
 * - Placeholder para Google Maps (fácil de reemplazar)
 * - Badges con información de contacto
 * - Responsive (mobile-first)
 */

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

export function LocationSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#FAF9E2]/50 via-[#F0C0F0]/30 to-[#F0F0C0]/40">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <Badge className="bg-[#7D5FFF] text-white mb-4 px-4 py-1 rounded-full font-bold">
          📍 Ubicación
        </Badge>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060] mb-2">
          📍 ENCUÉNTRANOS
        </h2>
        <p className="text-lg text-[#6A757C] mb-6">
          Uruguay 660 esquina Colón, Valparaíso
        </p>

        {/* Mapa (placeholder) */}
        <Card className="border-2 border-[#00D2D3]/30 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="h-64 md:h-80 rounded-xl flex flex-col items-center justify-center text-[#6A757C]/40 text-sm border-2 border-dashed border-[#7D5FFF]/30 bg-[#FAF9E2]/20">
              <span className="text-5xl mb-3">🗺️</span>
              <span className="text-[#603060] font-medium">Google Maps</span>
              <span className="text-xs text-[#6A757C]/40 mt-1">
                Próximamente disponible
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Badges de información */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] border border-[#00D2D3]/30 px-3 py-1.5 text-xs">
            🕐 Lun-Vie 10:00-18:30, Sab 10:00 a 15:00 horas
          </Badge>
          <Badge className="bg-[#FFD93D]/10 text-[#303030] border border-[#FFD93D]/30 px-3 py-1.5 text-xs">
            🏪 Retiro en tienda
          </Badge>
          <Badge className="bg-[#90C090]/10 text-[#90C090] border border-[#90C090]/30 px-3 py-1.5 text-xs">
            🚚 Envíos a regiones
          </Badge>
        </div>
      </div>
    </section>
  );
}