import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

export default function NotFound() {
  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0F0C0]/30 to-[#00D2D3]/10">
        <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl hover:shadow-[#00D2D3]/30 transition-shadow duration-300">
          <CardContent className="p-8 text-center">
            {/* Icono */}
            <div className="text-8xl mb-6 animate-bounce">🔍</div>
            
            {/* Código de error */}
            <h1 className="text-7xl font-extrabold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
              404
            </h1>
            
            {/* Título */}
            <h2 className="text-2xl font-bold text-[#603060] mt-2">
              Página no encontrada
            </h2>
            
            {/* Descripción */}
            <p className="text-gray-500 mt-4 leading-relaxed">
              Lo sentimos, la página que buscas no existe o ha sido movida.
              <br />
              Puedes volver al inicio o explorar nuestra tienda.
            </p>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link to="/" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🏠 Ir al Inicio
                </Button>
              </Link>
              <Link to="/productos" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🛒 Ver Tienda
                </Button>
              </Link>
            </div>

            {/* Enlace de soporte */}
            <p className="text-sm text-gray-400 mt-6">
              ¿Necesitas ayuda?{" "}
              <Link to="/contacto" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline transition-colors">
                Contáctanos
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}