// 📁 frontend/src/pages/EnviosYRetiros.tsx

/**
 * 📌 PÁGINA: ENVÍOS Y RETIROS
 * 
 * Página informativa con tabs para alternar entre:
 * - 🚚 Envíos a todo Chile
 * - 🏪 Retiro en tienda
 * 
 * ✅ Buenas prácticas:
 * - Usa Tabs de shadcn/ui
 * - Reutiliza EnviosSection y RetiroSection
 * - URL directa a cada sección (?tab=retiro)
 * - Responsive (mobile-first)
 * 
 * 🆕 Tabs rediseñados: más compactos, iconos grandes, textos cortos
 * 🆕 Header responsive (padding y tipografía mobile-first)
 */

import { useSearchParams } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { EnviosSection } from "../components/info/EnviosSection";
import { RetiroSection } from "../components/info/RetiroSection";

export default function EnviosYRetiros() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab");
  const initialTab = tabParam === "retiro" ? "retiro" : "envios";

  const handleTabChange = (value: string) => {
    if (value === "retiro") {
      setSearchParams({ tab: "retiro" });
    } else {
      setSearchParams({});
    }
  };

  return (
    <Layout title="Envíos y Retiros">
      {/* ====== HEADER ====== */}
      <div className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1.5 rounded-full font-bold">
            🚚 Envíos y Retiros
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            Llevamos tus productos a <br />
            <span className="text-[#FFD93D]">todo Chile</span>
          </h1>
          <p className="text-white/80 mt-4 text-base sm:text-lg max-w-2xl mx-auto">
            Conoce nuestras opciones de envío a regiones y retiro en tienda.
            Haz tu pedido desde donde estés y recíbelo en tu casa o ven a buscarlo.
          </p>
        </div>
      </div>

      {/* ====== TABS ====== */}
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 overflow-x-hidden">
        <Tabs defaultValue={initialTab} onValueChange={handleTabChange} className="w-full">
          {/* TabsList mejorado: más compacto, textos cortos, iconos grandes */}
          <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8 bg-[#FAF9E2] border-2 border-[#7D5FFF]/20 rounded-xl p-1 gap-1 h-auto">
            <TabsTrigger
              value="envios"
              className="
                data-[state=active]:bg-gradient-to-r 
                data-[state=active]:from-[#00D2D3] 
                data-[state=active]:to-[#7D5FFF] 
                data-[state=active]:text-white 
                data-[state=active]:shadow-md
                rounded-lg 
                font-bold 
                py-3 px-2
                text-sm sm:text-base
                transition-all
                flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
                whitespace-nowrap
              "
            >
              <span className="text-lg sm:text-xl">🚚</span>
              <span>Envíos</span>
            </TabsTrigger>
            <TabsTrigger
              value="retiro"
              className="
                data-[state=active]:bg-gradient-to-r 
                data-[state=active]:from-[#FF6B81] 
                data-[state=active]:to-[#FFD93D] 
                data-[state=active]:text-[#303030] 
                data-[state=active]:shadow-md
                rounded-lg 
                font-bold 
                py-3 px-2
                text-sm sm:text-base
                transition-all
                flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2
                whitespace-nowrap
              "
            >
              <span className="text-lg sm:text-xl">🏪</span>
              <span>Retiro</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="envios" className="mt-0">
            <EnviosSection />
          </TabsContent>

          <TabsContent value="retiro" className="mt-0">
            <RetiroSection />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}