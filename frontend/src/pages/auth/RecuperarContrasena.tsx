import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Button } from "../../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { authService } from "../../services/api";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Por favor, ingresa tu correo electrónico");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await authService.recoverPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Error al enviar el correo de recuperación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* ====== BREADCRUMB ====== */}
      <div className="bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] py-3 px-4 border-b-2 border-[#7D5FFF]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  🏠 Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/login" className="text-[#603060] hover:text-[#00D2D3]">
                  Iniciar Sesión
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  🔐 Recuperar Contraseña
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0C0F0]/30 to-[#00D2D3]/10">
        <Card className="max-w-md w-full border-2 border-[#7D5FFF] shadow-2xl hover:shadow-[#7D5FFF]/30 transition-shadow duration-300">
          <CardContent className="p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-gradient-to-r from-[#FFD93D] to-[#F0C030] text-[#303030] mb-3 px-4 py-1.5 rounded-full font-bold">
                🔐 Recuperar Contraseña
              </Badge>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
                ¿Olvidaste tu contraseña?
              </h1>
              <p className="text-gray-500 mt-2">
                Ingresa tu correo y te enviaremos un enlace para restablecerla.
              </p>
            </div>

            {/* Mensaje de éxito */}
            {success && (
              <div className="bg-[#90C090]/10 border-2 border-[#90C090] text-[#90C090] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">✅</span>
                <span className="font-medium">
                  Te hemos enviado un correo con instrucciones para restablecer tu contraseña.
                </span>
              </div>
            )}

            {/* Error general */}
            {error && (
              <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Formulario */}
            {!success && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#7D5FFF] text-lg">📧</span> Correo electrónico
                  </Label>
                  <Input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Enviando..." : "📩 Enviar enlace de recuperación"}
                </Button>
              </form>
            )}

            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">¿Ya recordaste?</span>
              <Separator className="flex-1" />
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="text-[#7D5FFF] font-bold hover:text-[#603060] hover:underline transition-colors text-lg"
              >
                Volver a Iniciar Sesión →
              </Link>
              <p className="text-xs text-gray-400 mt-1">Ingresa con tu correo y contraseña</p>
            </div>

            <div className="text-center mt-6">
              <Link to="/" className="text-sm text-gray-400 hover:text-[#7D5FFF] transition-colors">
                ← Volver a la tienda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}