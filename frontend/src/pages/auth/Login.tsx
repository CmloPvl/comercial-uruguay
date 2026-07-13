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
import { Checkbox } from "../../components/ui/checkbox";
import { Separator } from "../../components/ui/separator";
import { useLogin } from "../../hooks/useLogin";

export default function Login() {
  const { register, handleSubmit, errors, error, isSubmitting, remember, setRemember } = useLogin();

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
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  🔐 Iniciar Sesión
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
                🔐 Acceso Seguro
              </Badge>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
                Iniciar Sesión
              </h1>
              <p className="text-gray-500 mt-2">Ingresa tus datos para continuar comprando.</p>
            </div>

            {/* Error general */}
            {error && (
              <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#7D5FFF] text-lg">📧</span> Correo electrónico
                </Label>
                <Input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className={`mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all ${
                    errors.email ? "border-[#FF6B81]" : ""
                  }`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[#FF6B81] text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#FF6B81] text-lg">🔒</span> Contraseña
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className={`mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all ${
                    errors.password ? "border-[#FF6B81]" : ""
                  }`}
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-[#FF6B81] text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={(checked) => {
                      setRemember(checked as boolean);
                      if (!checked) {
                        localStorage.removeItem("rememberedEmail");
                      }
                    }}
                    className="border-[#7D5FFF] data-[state=checked]:bg-[#7D5FFF]"
                  />
                  <label htmlFor="remember" className="text-sm text-[#303030] cursor-pointer">
                    Recordarme
                  </label>
                </div>
                <Link to="/recuperar" className="text-sm text-[#00D2D3] hover:text-[#603060] font-medium hover:underline transition-colors">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Cargando..." : "🔐 Ingresar"}
              </Button>
            </form>

            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-gray-500">¿No tienes cuenta?</span>
              <Separator className="flex-1" />
            </div>

            <div className="text-center">
              <Link
                to="/registro"
                className="text-[#7D5FFF] font-bold hover:text-[#603060] hover:underline transition-colors text-lg"
              >
                Crear una cuenta nueva →
              </Link>
              <p className="text-xs text-gray-400 mt-1">Regístrate y empieza a comprar</p>
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