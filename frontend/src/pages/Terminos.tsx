import Layout from "../components/layout/Layout";
import { Card, CardContent } from "../components/ui/card";
import { empresaConfig } from "../config/empresa";

export default function Terminos() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-12 px-4">
        <Card className="border-2 border-[#00D2D3] shadow-2xl">
          <CardContent className="p-8">
            <h1 className="text-3xl font-extrabold text-[#603060] mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-gray-500 mb-6 text-sm">
              Última actualización: {new Date().toLocaleDateString('es-CL')}
            </p>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">1. Identificación del Titular</h2>
                <p>
                  <strong>{empresaConfig.nombre}</strong>, con domicilio en {empresaConfig.direccion}, 
                  {empresaConfig.comuna}, {empresaConfig.region}, Chile, es el titular del sitio web comercialuruguay.cl.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">2. Aceptación de los Términos</h2>
                <p>
                  Al registrarte y utilizar nuestro sitio web, aceptas estos Términos y Condiciones 
                  en su totalidad. Si no estás de acuerdo con alguno de estos términos, no debes 
                  utilizar nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">3. Productos y Servicios</h2>
                <p>
                  {empresaConfig.nombre} ofrece productos de alta calidad en las categorías de 
                  tecnología, electrodomésticos y artículos para el hogar. Los precios y la disponibilidad 
                  de los productos están sujetos a cambios sin previo aviso.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>La imagen del producto puede no ser exacta al producto real</li>
                  <li>Los precios están expresados en pesos chilenos (CLP) e incluyen IVA</li>
                  <li>La disponibilidad está sujeta a stock real en bodega</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">4. Precios y Formas de Pago</h2>
                <p>
                  Todos los precios publicados en nuestro sitio web son en pesos chilenos (CLP) 
                  e incluyen el Impuesto al Valor Agregado (IVA).
                </p>
                <p className="mt-2">
                  Aceptamos los siguientes medios de pago:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Tarjetas de crédito y débito (Visa, Mastercard, etc.)</li>
                  <li>Transferencia bancaria directa</li>
                  <li>WebPay (pago en línea)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">5. Política de Devoluciones</h2>
                <p>
                  Los clientes disponen de un plazo máximo de 10 días corridos desde la recepción 
                  del producto para solicitar su devolución, siempre que el producto se encuentre 
                  en perfectas condiciones y en su embalaje original.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Productos dañados o defectuosos: devolución 100% garantizada</li>
                  <li>Productos con problemas de funcionamiento: revisión técnica</li>
                  <li>Cambio de producto por falla: sin costo adicional</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">6. Propiedad Intelectual</h2>
                <p>
                  Todos los contenidos de este sitio web, incluyendo textos, imágenes, logotipos, 
                  diseños y código fuente, son propiedad de {empresaConfig.nombre} y están protegidos 
                  por las leyes de propiedad intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">7. Responsabilidades</h2>
                <p>
                  {empresaConfig.nombre} no se responsabiliza por el mal uso de los productos adquiridos 
                  a través de nuestro sitio web, ni por daños indirectos o pérdidas económicas 
                  derivadas del uso de nuestros servicios.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">8. Modificaciones</h2>
                <p>
                  Nos reservamos el derecho de actualizar estos Términos y Condiciones en cualquier 
                  momento. Los cambios entrarán en vigencia a partir de su publicación en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">9. Legislación Aplicable</h2>
                <p>
                  Estos Términos y Condiciones se rigen por las leyes de la República de Chile. 
                  Cualquier controversia será resuelta por los tribunales ordinarios de justicia 
                  de {empresaConfig.comuna}.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#603060] mb-2">10. Contacto</h2>
                <p>
                  Para consultas o reclamos sobre estos Términos y Condiciones, contáctanos en:
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