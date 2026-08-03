// 📁 frontend/src/pages/EnviosYRetiros.tsx

/**
 * 📌 PÁGINA: ENVÍOS Y RETIROS
 * 
 * Página informativa sobre las opciones de envío y retiro.
 * 
 * ✅ Buenas prácticas:
 * - Componente de diseño (UI)
 * - Información clara y estructurada
 * - Fácil de mantener y actualizar
 * - Llamada a la acción (WhatsApp)
 */

import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { FaTruck, FaStore, FaWhatsapp,  FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function EnviosYRetiros() {
  return (
    <Layout title="Envíos y Retiros">
      {/* ====== HEADER ====== */}
      <div className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1.5 rounded-full font-bold">
            🚚 Envíos y Retiros
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Llevamos tus productos a <br />
            <span className="text-[#FFD93D]">todo Chile</span>
          </h1>
          <p className="text-white/80 mt-4 text-lg max-w-2xl mx-auto">
            Conoce nuestras opciones de envío a regiones y retiro en tienda.
            Haz tu pedido desde donde estés y recíbelo en tu casa o ven a buscarlo.
          </p>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* =============================================
        OPCIÓN 1: ENVÍOS A REGIONES
        ============================================= */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <FaTruck className="text-4xl text-[#90C090]" />
            <h2 className="text-3xl font-extrabold text-[#603060]">🚚 Envíos a todo Chile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Cobertura */}
            <Card className="border-2 border-[#90C090]/30 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#603060] mb-3">📦 Cobertura</h3>
                <p className="text-[#6A757C] mb-4">
                  Realizamos envíos a todas las regiones de Chile a través de Starken.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-gray-100 py-2">
                    <span className="font-medium text-[#303030]">🚀 Región Metropolitana</span>
                    <Badge className="bg-[#90C090] text-white">1-2 días hábiles</Badge>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 py-2">
                    <span className="font-medium text-[#303030]">🚚 Regiones cercanas</span>
                    <Badge className="bg-[#00D2D3] text-white">2-4 días hábiles</Badge>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-[#303030]">📮 Regiones extremas</span>
                    <Badge className="bg-[#FF9F43] text-white">4-7 días hábiles</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Card: Costos */}
            <Card className="border-2 border-[#90C090]/30 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#603060] mb-3">💰 Costos de envío</h3>
                <p className="text-[#6A757C] mb-4">
                  El costo del envío se calcula al momento de confirmar tu pedido.
                </p>
                <div className="bg-[#FAF9E2] p-4 rounded-lg space-y-2">
                  <p className="text-sm text-[#303030] flex items-center gap-2">
                    <span className="text-[#90C090]">✅</span> Envío estándar: <span className="font-bold">desde $3.500</span>
                  </p>
                  <p className="text-sm text-[#303030] flex items-center gap-2">
                    <span className="text-[#90C090]">✅</span> Envío express: <span className="font-bold">desde $5.900</span>
                  </p>
                  <p className="text-sm text-[#6A757C] mt-2">
                    * Los precios pueden variar según el peso y la región de destino.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA Envíos */}
          <div className="text-center mt-8">
            <Link to="/contacto">
              <Button className="bg-gradient-to-r from-[#90C090] to-[#00D2D3] hover:from-[#00D2D3] hover:to-[#90C090] text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <FaWhatsapp className="mr-2" /> Consulta tu envío por WhatsApp
              </Button>
            </Link>
          </div>
        </section>

     {/* =============================================
OPCIÓN 2: RETIRO EN TIENDA (VERSIÓN COMPLETA)
============================================ */}
<section id="retiro" className="mb-16 scroll-mt-20">
  <div className="flex items-center gap-3 mb-6">
    <FaStore className="text-4xl text-[#FF6B81]" />
    <h2 className="text-3xl font-extrabold text-[#603060]">🏪 Retiro en tienda</h2>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* ====== CARD 1: Dirección y cómo llegar ====== */}
    <Card className="border-2 border-[#FF6B81]/30 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-[#603060] mb-3">📍 Dirección</h3>
        <p className="text-[#6A757C] text-lg font-medium">
          Uruguay 660 esquina Colón, Valparaíso
        </p>
        
        {/* Cómo llegar */}
        <div className="mt-4 space-y-2">
          <p className="font-semibold text-[#603060] text-sm">🚗 ¿Cómo llegar?</p>
          <ul className="text-sm text-[#6A757C] space-y-1 list-disc list-inside">
            <li>📍 A pasos de la plaza Echaurren</li>
            <li>🚌 Líneas de micro: 101, 102, 103, 104</li>
            <li>🚶‍♂️ A 5 minutos caminando desde el centro de Valparaíso</li>
          </ul>
        </div>

        {/* Mapa placeholder */}
        <div className="mt-4 h-32 bg-[#FAF9E2] rounded-lg flex items-center justify-center text-[#6A757C] border-2 border-dashed border-[#7D5FFF]/30">
          <span className="text-sm">🗺️ Mapa interactivo (próximamente)</span>
        </div>
      </CardContent>
    </Card>

    {/* ====== CARD 2: Horarios y proceso ====== */}
    <Card className="border-2 border-[#FF6B81]/30 shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-[#603060] mb-3">🕐 Horario de atención</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-gray-100 py-2">
            <span className="font-medium text-[#303030]">Lun - Vie</span>
            <span className="text-[#6A757C]">10:00 - 18:30</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-100 py-2">
            <span className="font-medium text-[#303030]">Sábado</span>
            <span className="text-[#6A757C]">10:00 - 15:00</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="font-medium text-[#303030]">Domingo</span>
            <span className="text-[#6A757C]">Cerrado</span>
          </div>
        </div>

        {/* Proceso de retiro */}
        <div className="mt-4 p-4 bg-[#FAF9E2] rounded-lg">
          <p className="font-semibold text-[#603060] text-sm mb-2">📋 ¿Cómo retirar tu pedido?</p>
          <ol className="text-sm text-[#6A757C] space-y-1.5 list-decimal list-inside">
            <li>Haz tu pedido por WhatsApp</li>
            <li>Espera la confirmación de disponibilidad</li>
            <li>Ven a la tienda en el horario indicado</li>
            <li>Muestra tu número de pedido al llegar</li>
            <li>¡Recoge tu compra!</li>
          </ol>
        </div>

        {/* Aviso importante */}
        <div className="mt-4 bg-[#FFD93D]/20 p-3 rounded-lg border border-[#FFD93D]/40">
          <p className="text-sm text-[#303030] flex items-center gap-2">
            <FaInfoCircle className="text-[#FF6B81]" />
            <span>⚠️ Recuerda esperar la confirmación de disponibilidad antes de venir a retirar.</span>
          </p>
        </div>
      </CardContent>
    </Card>
  </div>

  {/* CTA Retiro */}
  <div className="text-center mt-8">
    <Link to="/contacto">
      <Button className="bg-gradient-to-r from-[#75ff6b] to-[#5fff43] hover:from-[#FF9F43] hover:to-[#6bff72] text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
        <FaWhatsapp className="mr-2" /> Confirma tu retiro por WhatsApp
      </Button>
    </Link>
  </div>
</section>

        {/* =============================================
        PREGUNTAS FRECUENTES
        ============================================= */}
        <section>
          <h2 className="text-3xl font-extrabold text-[#603060] text-center mb-8">
            ❓ Preguntas frecuentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <Card className="border-2 border-[#7D5FFF]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <h4 className="font-bold text-[#603060] mb-1">¿Cuánto tardan en llegar los productos?</h4>
                <p className="text-sm text-[#6A757C]">Depende de la región. 1-2 días en RM, 2-4 en regiones cercanas y 4-7 en regiones extremas.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#7D5FFF]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <h4 className="font-bold text-[#603060] mb-1">¿Puedo retirar mi pedido el mismo día?</h4>
                <p className="text-sm text-[#6A757C]">Sí, siempre que recibas la confirmación de disponibilidad antes de venir.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#7D5FFF]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <h4 className="font-bold text-[#603060] mb-1">¿Cómo sé si mi producto está en stock?</h4>
                <p className="text-sm text-[#6A757C]">Al hacer tu pedido por WhatsApp, te confirmaremos la disponibilidad real.</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#7D5FFF]/20 hover:shadow-lg transition-shadow">
              <CardContent className="p-5">
                <h4 className="font-bold text-[#603060] mb-1">¿Qué pasa si no estoy en casa cuando llegue el envío?</h4>
                <p className="text-sm text-[#6A757C]">Starken dejará un aviso y podrás coordinar un segundo intento de entrega.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ====== CTA FINAL ====== */}
        <div className="text-center mt-12 pt-8 border-t border-gray-200">
          <p className="text-[#6A757C] mb-4">
            ¿Tienes más preguntas sobre envíos o retiros?
          </p>
          <Link to="/contacto">
            <Button className="bg-gradient-to-r from-[#25D366] to-[#00D2D3] hover:from-[#00D2D3] hover:to-[#25D366] text-white font-bold px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
              <FaWhatsapp className="mr-2" size={20} /> Contáctanos por WhatsApp
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}