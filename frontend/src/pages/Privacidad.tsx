import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { empresaConfig } from "../config/empresa";

export default function Privacidad() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="border-2 border-[#00D2D3] shadow-2xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
              Política de Privacidad
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
              Última actualización: {new Date().toLocaleDateString('es-CL')}
            </p>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">1. Responsable del Tratamiento de Datos</h2>
                <p>
                  <strong>{empresaConfig.nombre}</strong>, con domicilio en {empresaConfig.direccion}, 
                  {empresaConfig.comuna}, {empresaConfig.region}, Chile, es el responsable del 
                  tratamiento de tus datos personales.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">2. Datos que Recopilamos</h2>
                <p>Para brindarte nuestros servicios, recopilamos la siguiente información:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Datos de identificación:</strong> Nombre completo, correo electrónico, teléfono</li>
                  <li><strong>Datos de envío:</strong> Dirección de entrega</li>
                  <li><strong>Datos de pago:</strong> Información de transacciones (no almacenamos datos de tarjetas)</li>
                  <li><strong>Datos de navegación:</strong> Cookies, IP, tipo de dispositivo, páginas visitadas</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">3. Finalidad del Tratamiento</h2>
                <p>Utilizamos tus datos personales para:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Procesar tus pedidos y gestionar envíos</li>
                  <li>Enviarte información sobre el estado de tu pedido</li>
                  <li>Enviarte promociones y novedades (previo consentimiento)</li>
                  <li>Mejorar nuestros servicios y experiencia de usuario</li>
                  <li>Cumplir con obligaciones legales (facturación, garantías)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">4. Base Legal</h2>
                <p>
                  El tratamiento de tus datos personales se basa en:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>La ejecución de un contrato (compra de productos)</li>
                  <li>Tu consentimiento explícito (marketing y promociones)</li>
                  <li>Obligaciones legales (facturación y garantías)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">5. Conservación de Datos</h2>
                <p>
                  Conservamos tus datos personales durante el tiempo necesario para cumplir con 
                  los fines descritos, incluyendo plazos legales de prescripción y conservación 
                  de facturas.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">6. Compartición de Datos</h2>
                <p>
                  No compartimos tus datos personales con terceros, excepto:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Empresas de logística (para el envío de productos)</li>
                  <li>Plataformas de pago (para procesar transacciones)</li>
                  <li>Autoridades competentes (por obligación legal)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">7. Derechos del Usuario</h2>
                <p>
                  Como titular de datos personales, tienes derecho a:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Acceso:</strong> Saber qué datos tenemos de ti</li>
                  <li><strong>Rectificación:</strong> Corregir datos incorrectos</li>
                  <li><strong>Cancelación:</strong> Solicitar la eliminación de tus datos</li>
                  <li><strong>Oposición:</strong> Oponerte al tratamiento de tus datos</li>
                  <li><strong>Portabilidad:</strong> Recibir tus datos en formato estructurado</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">8. Seguridad de los Datos</h2>
                <p>
                  Implementamos medidas técnicas y organizativas para proteger tus datos 
                  personales contra accesos no autorizados, pérdida o destrucción:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Encriptación de contraseñas (bcrypt)</li>
                  <li>Cifrado SSL/TLS para todas las comunicaciones</li>
                  <li>Acceso restringido a los datos</li>
                  <li>Monitoreo y auditoría de seguridad</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">9. Cookies</h2>
                <p>
                  Utilizamos cookies para mejorar tu experiencia de navegación. Puedes 
                  configurar tu navegador para rechazar cookies, pero esto puede afectar 
                  la funcionalidad del sitio.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">10. Contacto</h2>
                <p>
                  Si tienes preguntas sobre esta Política de Privacidad o deseas ejercer 
                  tus derechos, contáctanos en:
                </p>
                <p className="mt-2">
                  📧 <strong>{empresaConfig.email}</strong>
                  <br />
                  📱 <strong>{empresaConfig.telefono}</strong>
                  <br />
                  📍 <strong>{empresaConfig.direccion}</strong>
                </p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}