// 📁 frontend/src/components/home/BenefitsSection.tsx

/**
 * 📌 BENEFITS SECTION
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra los beneficios clave del comercio.
 * Los datos son completamente estáticos.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Datos estáticos definidos internamente
 * - Sin lógica ni estado
 * - Animaciones con framer-motion
 * - Responsive (mobile-first)
 */

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";

// 🎨 Beneficios
const benefits = [
  {
    icon: "💰",
    title: "Buenos Precios",
    description: "Los mejores precios del mercado",
    color: "border-[#FFD93D] hover:shadow-[#FFD93D]/30",
  },
  {
    icon: "📦",
    title: "Amplio Catálogo",
    description: "Encuentra todo lo que necesitas",
    color: "border-[#00D2D3] hover:shadow-[#00D2D3]/30",
  },
  {
    icon: "🤝",
    title: "Atención Cercana",
    description: "Trato personalizado y confiable",
    color: "border-[#FF6B81] hover:shadow-[#FF6B81]/30",
  },
  {
    icon: "📍",
    title: "Ubicación Céntrica",
    description: "Fácil acceso en el centro de Valpo",
    color: "border-[#7D5FFF] hover:shadow-[#7D5FFF]/30",
  },
];

export function BenefitsSection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-[#00D2D3]/10 via-[#F0C0F0]/10 to-[#FFD93D]/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
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

        {/* Grid de beneficios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`border-2 ${benefit.color} hover:shadow-xl transition-all hover:-translate-y-1`}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3 animate-bounce">{benefit.icon}</div>
                  <h3 className="font-bold text-[#303030] text-lg">{benefit.title}</h3>
                  <p className="text-sm text-[#6A757C] mt-1">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}