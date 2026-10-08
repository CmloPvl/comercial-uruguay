// 📁 frontend/src/components/home/BenefitsSection.tsx

/**
 * 📌 BENEFITS SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los beneficios clave del comercio.
 * Los datos vienen de empresaConfig.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos centralizados en empresaConfig
 * - Animaciones con framer-motion
 * - Accesible con aria-label
 * - Responsive (mobile-first)
 */

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { empresaConfig } from "../../config/empresa";

// =============================================
// 🖥️ COMPONENTE PRINCIPAL
// =============================================

export function BenefitsSection() {
  return (
    <section 
      className="py-16 px-4 bg-gradient-to-br from-[#00D2D3]/10 via-[#F0C0F0]/10 to-[#FFD93D]/10"
      aria-label="Beneficios de Comercial Uruguay"
    >
      <div className="max-w-6xl mx-auto">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <Badge className="bg-[#FFD93D] text-[#303030] mb-2 px-4 py-1 rounded-full">
            ✨ Beneficios
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
            ✨ ¿POR QUÉ ELEGIRNOS?
          </h2>
          <p className="text-[#6A757C] mt-2">
            Descubre por qué somos tu mejor opción
          </p>
        </motion.div>

        {/* =============================================
        📦 GRID DE BENEFICIOS
        ============================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {empresaConfig.benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-2 ${benefit.color} hover:shadow-xl transition-all hover:-translate-y-1`}
                aria-label={`${benefit.title}: ${benefit.description}`}
              >
                <CardContent className="p-6 text-center">
                  <div 
                    className="text-5xl mb-3 animate-bounce"
                    aria-hidden="true"
                  >
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-[#303030] text-lg">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-[#6A757C] mt-1">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}