import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FaTruck, FaClock, FaWhatsapp } from "react-icons/fa";
import { empresaConfig } from "../config/empresa";

export default function Envios() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Badge className="bg-[#00D2D3] text-white mb-4 px-4 py-1 rounded-full">
          🚚 Envíos
        </Badge>
        <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
          📦 Política de Envíos
        </h1>
        <p className="text-gray-500 mb-8">
          Conoce cómo gestionamos los envíos a todo Chile.
        </p>

        <div className="space-y-6">
          <Card className="border-2 border-[#00D2D3]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaTruck className="text-[#00D2D3]" />
                Zonas de cobertura
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Realizamos envíos a <strong>todo Chile</strong> (Regiones I a XII, incluyendo Isla de Pascua).
                El tiempo de entrega varía según la ubicación:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-600">
                <li><strong>Región Metropolitana y Valparaíso:</strong> 1-3 días hábiles</li>
                <li><strong>Regiones V a VIII:</strong> 2-4 días hábiles</li>
                <li><strong>Regiones IX a XII:</strong> 3-6 días hábiles</li>
                <li><strong>Isla de Pascua:</strong> 7-10 días hábiles</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#00D2D3]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <span className="text-2xl">💰</span>
                Costos de envío
              </h2>
              <p className="text-gray-600 leading-relaxed">
                El costo del envío se calcula automáticamente al finalizar la compra, según el peso y la ubicación.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-600">
                <li><strong>Envíos dentro de Valparaíso:</strong> $2.500 CLP</li>
                <li><strong>Envíos a regiones (hasta 5kg):</strong> $4.500 - $6.500 CLP</li>
                <li><strong>Envíos a regiones (más de 5kg):</strong> Cotizar por WhatsApp</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#00D2D3]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaClock className="text-[#FFD93D]" />
                Plazos de entrega
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Los plazos comienzan a contar desde la confirmación del pedido y el pago.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-600">
                <li>Envíos confirmados antes de las 14:00 se despachan el mismo día.</li>
                <li>Envíos confirmados después de las 14:00 se despachan al día siguiente.</li>
                <li>No realizamos envíos en días festivos ni domingos.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#25D366]/30 shadow-lg bg-[#25D366]/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaWhatsapp className="text-[#25D366]" />
                Consultas sobre envíos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                ¿Tienes dudas sobre el envío de un producto? Contáctanos por WhatsApp y te ayudamos.
              </p>
              <a 
                href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola!%20Quiero%20consultar%20sobre%20un%20env%C3%ADo...`}
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
      </div>
    </Layout>
  );
}