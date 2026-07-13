import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { FaStore, FaTruck, FaUsers, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { empresaConfig } from "../config/empresa";

export default function Nosotros() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Badge className="bg-[#7D5FFF] text-white mb-4 px-4 py-1 rounded-full">
          👥 Nosotros
        </Badge>
        <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
          Sobre {empresaConfig.nombre}
        </h1>
        <p className="text-gray-500 mb-8">
          Conoce nuestra historia, misión y los valores que nos guían.
        </p>

        <div className="space-y-6">
          {/* Historia */}
          <Card className="border-2 border-[#7D5FFF]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaStore className="text-[#7D5FFF]" />
                Nuestra Historia
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>{empresaConfig.nombre}</strong> nació hace más de 10 años en el corazón de Valparaíso, 
                con el sueño de ofrecer productos de calidad a precios justos. 
                Comenzamos como un pequeño local familiar y hoy somos un referente en la región.
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                Nuestra pasión por el servicio y la cercanía con nuestros clientes nos ha permitido 
                crecer y expandir nuestro catálogo a más de 1000 productos.
              </p>
            </CardContent>
          </Card>

          {/* Misión y Visión */}
          <Card className="border-2 border-[#00D2D3]/30 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                    <FaStar className="text-[#FFD93D]" />
                    Misión
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ofrecer productos de calidad que mejoren la vida de nuestros clientes, 
                    con un servicio cercano y confiable que nos distinga en la comunidad.
                  </p>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                    <FaTruck className="text-[#00D2D3]" />
                    Visión
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Ser el comercio de referencia en Valparaíso y la Quinta Región, 
                    reconocido por nuestra calidad, servicio y compromiso con la comunidad.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Valores */}
          <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaUsers className="text-[#FF6B81]" />
                Nuestros Valores
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#F0F0C0]/30 p-4 rounded-xl border border-[#FFD93D]/30">
                  <h3 className="font-bold text-[#603060]">🤝 Confianza</h3>
                  <p className="text-sm text-gray-600">Construimos relaciones basadas en la honestidad.</p>
                </div>
                <div className="bg-[#F0C0F0]/30 p-4 rounded-xl border border-[#7D5FFF]/30">
                  <h3 className="font-bold text-[#603060]">⭐ Calidad</h3>
                  <p className="text-sm text-gray-600">Seleccionamos los mejores productos para ti.</p>
                </div>
                <div className="bg-[#D4F0D4]/30 p-4 rounded-xl border border-[#90C090]/30">
                  <h3 className="font-bold text-[#603060]">💚 Cercanía</h3>
                  <p className="text-sm text-gray-600">Trato personalizado y atención que importa.</p>
                </div>
                <div className="bg-[#FFE0D4]/30 p-4 rounded-xl border border-[#FF9F43]/30">
                  <h3 className="font-bold text-[#603060]">🚀 Compromiso</h3>
                  <p className="text-sm text-gray-600">Trabajamos para superar tus expectativas.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ubicación */}
          <Card className="border-2 border-[#FF6B81]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2 mb-3">
                <FaMapMarkerAlt className="text-[#FF6B81]" />
                Visítanos
              </h2>
              <p className="text-gray-600 leading-relaxed">
                <strong>Dirección:</strong> {empresaConfig.direccion}
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                <strong>Horario:</strong> Lun-Vie {empresaConfig.horario.lunesViernes} | Sáb {empresaConfig.horario.sabado}
              </p>
              <p className="text-gray-600 leading-relaxed mt-2">
                <strong>Teléfono:</strong> {empresaConfig.telefono}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}