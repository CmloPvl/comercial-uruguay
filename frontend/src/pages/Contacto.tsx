import { useState } from "react";
import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import { empresaConfig } from "../config/empresa";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    mensaje: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnviando(true);
    // TODO: Conectar con backend
    setTimeout(() => {
      setEnviando(false);
      setExito(true);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Badge className="bg-[#FFD93D] text-[#303030] mb-4 px-4 py-1 rounded-full">
          📞 Contacto
        </Badge>
        <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
          Contáctanos
        </h1>
        <p className="text-gray-500 mb-8">
          ¿Tienes preguntas, sugerencias o necesitas ayuda? Estamos aquí para ti.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario */}
          <Card className="border-2 border-[#7D5FFF]/30 shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4">📝 Envíanos un mensaje</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label className="text-sm font-bold text-[#303030]">Nombre completo</Label>
                  <Input
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-[#303030]">Correo electrónico</Label>
                  <Input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                    required
                  />
                </div>
                <div>
                  <Label className="text-sm font-bold text-[#303030]">Mensaje</Label>
                  <Textarea
                    placeholder="Escribe tu mensaje aquí..."
                    rows={4}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={enviando}
                  className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? "Enviando..." : "📩 Enviar mensaje"}
                </Button>
                {exito && (
                  <p className="text-[#90C090] font-medium text-center">
                    ✅ ¡Mensaje enviado con éxito! Te responderemos pronto.
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Información de contacto */}
          <div className="space-y-4">
            <Card className="border-2 border-[#00D2D3]/30 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#603060] mb-4">📍 Información</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaMapMarkerAlt className="text-[#FF6B81] text-lg" />
                    <span>{empresaConfig.direccion}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaPhone className="text-[#FFD93D] text-lg" />
                    <a href={`tel:${empresaConfig.telefono}`} className="hover:text-[#603060] transition">
                      {empresaConfig.telefono}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaEnvelope className="text-[#7D5FFF] text-lg" />
                    <a href={`mailto:${empresaConfig.email}`} className="hover:text-[#603060] transition">
                      {empresaConfig.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <FaWhatsapp className="text-[#25D366] text-lg" />
                    <a 
                      href={`https://wa.me/${empresaConfig.whatsapp}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-[#25D366] transition"
                    >
                      {empresaConfig.telefono}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#FFD93D]/50 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-lg font-bold text-[#603060] mb-4">🕐 Horario de atención</h2>
                <div className="space-y-1 text-gray-600">
                  <p><strong>Lunes a Viernes:</strong> {empresaConfig.horario.lunesViernes}</p>
                  <p><strong>Sábado:</strong> {empresaConfig.horario.sabado}</p>
                  <p><strong>Domingo:</strong> {empresaConfig.horario.domingo}</p>
                </div>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${empresaConfig.whatsapp}?text=Hola!%20Quiero%20contactarme%20con%20${empresaConfig.nombre}...`}
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full bg-[#25D366] hover:bg-[#25D366]/80 text-white font-bold py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-center"
            >
              <FaWhatsapp className="inline mr-2 text-xl" />
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}