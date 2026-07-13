import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FaStore, FaMapMarkerAlt, FaClock, FaWhatsapp } from "react-icons/fa";
import { empresaConfig } from "../config/empresa";

export default function RetiroTienda() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1 rounded-full">
          🏪 Retiro en tienda
        </Badge>
        <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
          🏪 Retiro en Tienda
        </h1>
        <p className="text-gray-500 mb-8">
          Ven a buscar tu pedido directamente en nuestro local.
        </p>

        <div className="space-y-6">
          <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-[#FF6B81]" />
                Dirección del local
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                <strong>{empresaConfig.direccion}</strong>
              </p>
              <p className="text-gray-500 mt-1">
                Valparaíso, Chile
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaClock className="text-[#00D2D3]" />
                Horario de atención
              </h2>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Lunes a Viernes:</strong> {empresaConfig.horario.lunesViernes}</li>
                <li><strong>Sábado:</strong> {empresaConfig.horario.sabado}</li>
                <li><strong>Domingo:</strong> {empresaConfig.horario.domingo}</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaStore className="text-[#FF6B81]" />
                ¿Cómo funciona el retiro?
              </h2>
              <ol className="list-decimal pl-6 space-y-2 text-gray-600">
                <li>Realiza tu pedido y selecciona <strong>"Retiro en tienda"</strong> al finalizar la compra.</li>
                <li>Recibirás un mensaje de confirmación cuando tu pedido esté listo.</li>
                <li>Ven a nuestro local con tu <strong>cédula de identidad</strong> y el <strong>número de pedido</strong>.</li>
                <li>Revisa tu pedido en el momento del retiro.</li>
              </ol>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#25D366]/30 shadow-lg bg-[#25D366]/5">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaWhatsapp className="text-[#25D366]" />
                ¿Tienes dudas?
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Contáctanos por WhatsApp para coordinar tu retiro o resolver cualquier duda.
              </p>
              <a 
                href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola!%20Quiero%20consultar%20sobre%20mi%20pedido%20para%20retiro...`}
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