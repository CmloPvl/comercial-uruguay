// 📁 frontend/src/pages/auth/Registro.tsx

/**
 * 📌 PÁGINA DE REGISTRO
 * 
 * Diseño mejorado con la paleta de colores completa.
 * ✅ Más colores, más vibrante, más profesional.
 * ✅ Animaciones sutiles y efectos modernos.
 * ✅ Feedback visual con toasts y estados.
 * ✅ Separación de lógica (useRegister) y diseño (Registro).
 * ✅ Mensajes de éxito/error SOLO con toasts (no en la UI).
 */

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
import { Eye, EyeOff, Sparkles, UserPlus, Gift, ArrowLeft, CheckCircle } from "lucide-react";

export default function Registro() {
  // =============================================
  // 🧠 LÓGICA (extraída a useRegister)
  // =============================================
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    watch,
  } = useRegister();

  // =============================================
  // 🎨 ESTADO LOCAL: Mostrar/Ocultar contraseñas
  // =============================================
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ✅ Validación en vivo con watch
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  // ✅ Manejar términos (sin toast en UI, solo actualiza el formulario)
  const handleTermsChange = (checked: boolean) => {
    register("termsAccepted").onChange({
      target: { name: "termsAccepted", value: checked }
    });
  };

  return (
    <Layout>
      {/* =============================================
      🍞 BREADCRUMB con colores variados
      ============================================= */}
      <div className="bg-gradient-to-r from-[#FFD93D]/30 via-[#F0C0F0]/30 to-[#00D2D3]/20 py-3 px-4 border-b-2 border-[#7D5FFF]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3] transition-colors font-medium">
                  🏠 Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  ✨ Registro
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* =============================================
      🎯 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 relative overflow-hidden bg-gradient-to-br from-[#FFD93D]/15 via-[#F0C0F0]/20 to-[#00D2D3]/10">
        
        {/* 🎨 Formas decorativas flotantes */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B81]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#7D5FFF]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D2D3]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#FF9F43]/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-[#90C090]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#603060]/15 rounded-full blur-3xl"></div>

        {/* 🃏 TARJETA DE REGISTRO */}
        <Card className="max-w-md w-full border-2 border-[#7D5FFF]/40 shadow-2xl hover:shadow-[#7D5FFF]/30 transition-all duration-500 backdrop-blur-sm bg-white/90 relative overflow-hidden">
          
          {/* 🎨 Borde decorativo superior */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD93D] via-[#7D5FFF] to-[#FF6B81]"></div>
          
          <CardContent className="p-8 relative z-10">
            
            {/* =============================================
            📌 HEADER
            ============================================= */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Badge className="bg-gradient-to-r from-[#FFD93D] via-[#FF9F43] to-[#7D5FFF] text-[#303030] px-4 py-1.5 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  <Gift className="inline mr-1 w-4 h-4 text-[#603060]" /> ¡Bienvenido a Comercial Uruguay!
                </Badge>
              </div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] bg-clip-text text-transparent">
                Crear Cuenta
              </h1>
              <p className="text-[#6A757C] mt-2 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-[#FFD93D]" />
                Regístrate y empieza a comprar
                <Sparkles className="w-4 h-4 text-[#00D2D3]" />
              </p>
            </div>

            {/* ✅ Mensajes de éxito/error SOLO con toasts (no en UI) */}

            {/* =============================================
            📝 FORMULARIO
            ============================================= */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* 👤 Nombre completo */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#7D5FFF] text-lg">👤</span> Nombre completo
                </Label>
                <Input
                  type="text"
                  placeholder="Nombre y Apellido"
                  className={`mt-1 border-2 ${errors.fullName ? 'border-[#FF6B81]' : 'border-[#7D5FFF]/50'} focus:ring-4 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D] transition-all rounded-xl hover:border-[#7D5FFF]`}
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* 📧 Correo electrónico */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#00D2D3] text-lg">📧</span> Correo electrónico
                </Label>
                <Input
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className={`mt-1 border-2 ${errors.email ? 'border-[#FF6B81]' : 'border-[#00D2D3]/50'} focus:ring-4 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D] transition-all rounded-xl hover:border-[#00D2D3]`}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* 📱 Teléfono (opcional) */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#FF9F43] text-lg">📱</span> Teléfono <span className="text-[#6A757C] font-normal">(opcional)</span>
                </Label>
                <Input
                  type="tel"
                  placeholder="+569 1234 5678"
                  className={`mt-1 border-2 ${errors.phone ? 'border-[#FF6B81]' : 'border-[#FF9F43]/50'} focus:ring-4 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D] transition-all rounded-xl hover:border-[#FF9F43]`}
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* 🔒 Contraseña */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#603060] text-lg">🔒</span> Contraseña
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`mt-1 border-2 ${errors.password ? 'border-[#FF6B81]' : 'border-[#603060]/50'} focus:ring-4 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D] transition-all rounded-xl hover:border-[#603060]`}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A757C] hover:text-[#603060] transition-colors"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.password.message}
                  </p>
                )}
                <p className="text-xs text-[#6A757C] mt-1 flex items-center gap-1">
                  <span className="text-[#FF9F43]">💡</span> Mínimo 8 caracteres. Sugerencia: usa mayúsculas y números.
                </p>
              </div>

              {/* 🔒 Confirmar contraseña */}
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#90C090] text-lg">🔒</span> Confirmar contraseña
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`mt-1 border-2 ${errors.confirmPassword ? 'border-[#FF6B81]' : 'border-[#90C090]/50'} focus:ring-4 focus:ring-[#FFD93D]/50 focus:border-[#FFD93D] transition-all rounded-xl hover:border-[#90C090]`}
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A757C] hover:text-[#603060] transition-colors"
                    aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
                {confirmPassword && (
                  <p className={`text-sm mt-1 flex items-center gap-1 ${isPasswordMatch ? 'text-[#90C090]' : 'text-[#FF6B81]'}`}>
                    {isPasswordMatch ? (
                      <><CheckCircle size={16} className="text-[#90C090]" /> Las contraseñas coinciden</>
                    ) : (
                      <>❌ Las contraseñas no coinciden</>
                    )}
                  </p>
                )}
              </div>

              {/* 📋 Términos */}
              <div className="flex items-start gap-3 bg-gradient-to-r from-[#F0F0C0]/20 via-[#F0C0F0]/20 to-[#A9D5F7]/20 p-3 rounded-xl border border-[#7D5FFF]/20">
                <Checkbox
                  id="terms"
                  onCheckedChange={handleTermsChange}
                  className="mt-1 border-[#7D5FFF] data-[state=checked]:bg-[#7D5FFF] transition-colors"
                />
                <div>
                  <label htmlFor="terms" className="text-sm text-[#303030] cursor-pointer">
                    Acepto los{" "}
                    <Link to="/terminos" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline transition-colors">
                      Términos y Condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link to="/privacidad" className="text-[#FF6B81] hover:text-[#603060] font-medium hover:underline transition-colors">
                      Política de Privacidad
                    </Link>
                  </label>
                  {errors.termsAccepted && (
                    <p className="text-[#FF6B81] text-sm mt-1 font-medium animate-in fade-in slide-in-from-top-1">
                      {errors.termsAccepted.message}
                    </p>
                  )}
                </div>
              </div>

              {/* 🚀 Botón submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FFD93D] via-[#FF9F43] to-[#7D5FFF] hover:from-[#7D5FFF] hover:via-[#603060] hover:to-[#FFD93D] text-[#303030] hover:text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-[#603060]">⏳</span> Registrando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <UserPlus size={20} className="text-[#603060] group-hover:text-white transition-colors" /> Crear Cuenta
                  </span>
                )}
              </Button>
            </form>

            {/* =============================================
            🔗 ENLACE A LOGIN
            ============================================= */}
            <div className="text-center mt-6">
              <p className="text-[#6A757C]">
                ¿Ya tienes cuenta?{" "}
                <Link to="/login" className="text-[#7D5FFF] font-bold hover:text-[#603060] hover:underline transition-colors">
                  Iniciar sesión →
                </Link>
              </p>
            </div>

            {/* =============================================
            🔙 VOLVER A LA TIENDA
            ============================================= */}
            <div className="text-center mt-4">
              <Link to="/" className="text-sm text-[#6A757C] hover:text-[#7D5FFF] transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={16} /> Volver a la tienda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}