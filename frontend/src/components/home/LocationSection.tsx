// 📁 frontend/src/components/home/LocationSection.tsx

/**
 * 📌 LOCATION SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra la ubicación, horarios y datos de contacto del local.
 * Integra Google Maps con las coordenadas reales (sin API Key).
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos desde empresaConfig (centralizados)
 * - Google Maps integrado con iframe embed (sin API Key)
 * - Botón "Cómo llegar"
 * - Accesible con aria-label
 * - Responsive (mobile-first)
 */

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { empresaConfig } from "../../config/empresa";
import { MapPin, Clock, Store, Truck, Navigation } from "lucide-react";

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function LocationSection() {
  // =============================================
  // 🗺️ URL DEL MAPA EMBEBIDO (sin API Key)
  // =============================================
  const mapEmbedUrl = `https://maps.google.com/maps?q=${empresaConfig.coordenadas.lat},${empresaConfig.coordenadas.lng}&z=15&output=embed`;

  return (
    <section 
      className="py-16 px-4 bg-gradient-to-br from-[#FAF9E2]/50 via-[#F0C0F0]/30 to-[#F0F0C0]/40"
      aria-label="Ubicación y contacto de Comercial Uruguay"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <Badge className="bg-[#7D5FFF] text-white mb-4 px-4 py-1 rounded-full font-bold">
          📍 Ubicación
        </Badge>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060] mb-2">
          📍 ENCUÉNTRANOS
        </h2>
        <p className="text-lg text-[#6A757C] mb-6 flex items-center justify-center gap-2">
          <MapPin className="w-5 h-5 text-[#FF6B81]" />
          {empresaConfig.direccion}
        </p>

        {/* =============================================
        🗺️ MAPA (Google Maps embed sin API Key)
        ============================================= */}
        <Card className="border-2 border-[#00D2D3]/30 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-0">
            <div className="h-64 md:h-80 w-full">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Comercial Uruguay en Google Maps"
                aria-label="Mapa de Google Maps mostrando la ubicación del local"
              />
            </div>
          </CardContent>
        </Card>

        {/* =============================================
        🧭 BOTÓN "CÓMO LLEGAR"
        ============================================= */}
        <div className="mt-4">
          <a
            href={empresaConfig.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-2 mx-auto"
              aria-label="Cómo llegar a Comercial Uruguay"
            >
              <Navigation className="w-4 h-4" />
              Cómo llegar
            </Button>
          </a>
        </div>

        {/* =============================================
        📋 BADGES DE INFORMACIÓN
        ============================================= */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {/* Horario */}
          <Badge 
            className="bg-[#00D2D3]/10 text-[#00D2D3] border border-[#00D2D3]/30 px-3 py-1.5 text-xs flex items-center gap-1.5"
            aria-label={`Horario: Lunes a Viernes ${empresaConfig.horario.lunesViernes}, Sábado ${empresaConfig.horario.sabado}`}
          >
            <Clock className="w-3 h-3" />
            Lun-Vie {empresaConfig.horario.lunesViernes} | Sáb {empresaConfig.horario.sabado}
          </Badge>

          {/* Retiro */}
          <Badge 
            className="bg-[#FFD93D]/10 text-[#303030] border border-[#FFD93D]/30 px-3 py-1.5 text-xs flex items-center gap-1.5"
            aria-label="Retiro en tienda disponible"
          >
            <Store className="w-3 h-3" />
            Retiro en tienda
          </Badge>

          {/* Envíos */}
          <Badge 
            className="bg-[#90C090]/10 text-[#90C090] border border-[#90C090]/30 px-3 py-1.5 text-xs flex items-center gap-1.5"
            aria-label="Envíos a regiones"
          >
            <Truck className="w-3 h-3" />
            Envíos a regiones
          </Badge>
        </div>
      </div>
    </section>
  );
}