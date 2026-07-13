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
import { Checkbox } from "../../components/ui/checkbox";
import { useRegister } from "../../hooks/useRegister";
import { Eye, EyeOff } from "lucide-react";

export default function Registro() {
  const {
    register,
    handleSubmit,
    errors,
    error,
    isSubmitting,
    watch,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Validación en vivo con watch
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  return (
    <Layout>
      {/* ====== BREADCRUMB ====== */}
      <div className="bg-[#FFD93D]/20 py-3 px-4 border-b-2 border-[#00D2D3]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00D2D3]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Registro
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0F0C0] to-[#00D2D3]/10">
        <Card className="max-w-md w-full border-2 border-[#00D2D3] shadow-2xl">
          <CardContent className="p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-4 py-1 rounded-full">
                ✨ Registro
              </Badge>
              <h1 className="text-4xl font-extrabold text-[#603060]">Crear Cuenta</h1>
              <p className="text-gray-500 mt-2">Regístrate para comprar más rápido y seguir tus pedidos.</p>
            </div>

            {/* Error general */}
            {error && (
              <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nombre completo */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#7D5FFF]">👤</span> Nombre completo
                </Label>
                <Input
                  type="text"
                  placeholder="Nombre y Apellido"
                  className={`mt-1 border-2 ${errors.fullName ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.fullName.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#00D2D3]">📧</span> Correo electrónico
                </Label>
                <Input
                  type="email"
                  placeholder="Correo electrónico"
                  className={`mt-1 border-2 ${errors.email ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.email.message}</p>
                )}
              </div>

              {/* Teléfono (opcional) */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#FF9F43]">📱</span> Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                </Label>
                <Input
                  type="tel"
                  placeholder="Número de teléfono"
                  className={`mt-1 border-2 ${errors.phone ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.phone.message}</p>
                )}
              </div>

              {/* Contraseña */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#603060]">🔒</span> Contraseña
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`mt-1 border-2 ${errors.password ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#603060] transition"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.password.message}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  ℹ️ Mínimo 8 caracteres. Sugerencia: usa mayúsculas y números para mayor seguridad.
                </p>
              </div>

              {/* Confirmar contraseña */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#90C090]">🔒</span> Confirmar contraseña
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`mt-1 border-2 ${errors.confirmPassword ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#603060] transition"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.confirmPassword.message}</p>
                )}
                {/* ✅ Validación en vivo con watch */}
                {confirmPassword && (
                  <p className={`text-sm mt-1 ${isPasswordMatch ? 'text-[#90C090]' : 'text-[#FF6B81]'}`}>
                    {isPasswordMatch ? '✅ Las contraseñas coinciden' : '❌ Las contraseñas no coinciden'}
                  </p>
                )}
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3">
                <Checkbox
                  id="terms"
                  onCheckedChange={(checked) => {
                    register("termsAccepted").onChange({
                      target: {
                        name: "termsAccepted",
                        value: checked,
                      },
                    });
                  }}
                  className="mt-1 border-[#00D2D3] data-[state=checked]:bg-[#00D2D3]"
                />
                <div>
                  <label htmlFor="terms" className="text-sm text-[#303030] cursor-pointer">
                    Acepto los{" "}
                    <Link to="/terminos" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline">
                      Términos y Condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link to="/privacidad" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline">
                      Política de Privacidad
                    </Link>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Botón submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Registrando..." : "✨ Crear Cuenta"}
              </Button>
            </form>

            {/* Login */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-[#00D2D3] font-bold hover:text-[#603060] hover:underline transition-colors">
                  Iniciar sesión →
                </Link>
              </p>
            </div>

            {/* Volver */}
            <div className="text-center mt-4">
              <Link to="/" className="text-sm text-gray-400 hover:text-[#00D2D3] transition-colors">
                ← Volver a la tienda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}