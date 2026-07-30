/**
 * 📌 PÁGINA DE LOGIN
 * 
 * Diseño mejorado con la paleta de colores completa.
 * ✅ Más colores, más vibrante, más profesional.
 * ✅ Animaciones sutiles y efectos modernos.
 * ✅ Feedback visual con toasts y estados.
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
import { Separator } from "../../components/ui/separator";
import { useLogin } from "../../hooks/useLogin";
import { Eye, EyeOff, Sparkles, LogIn, ArrowLeft, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function Login() {
  const { 
    register, 
    handleSubmit, 
    errors, 
    error, 
    isSubmitting, 
    remember, 
    setRemember,
    getValues
  } = useLogin();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleRememberChange = (checked: boolean) => {
    setRemember(checked);
    if (checked) {
      const email = getValues("email");
      if (email) {
        localStorage.setItem("rememberedEmail", email);
        toast.success("📧 Email guardado", {
          icon: "🔖",
          style: {
            border: "2px solid #7D5FFF",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      }
    } else {
      localStorage.removeItem("rememberedEmail");
      toast("🗑️ Email olvidado", {
        icon: "👋",
        style: {
          border: "2px solid #FF9F43",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  };

  return (
    <Layout>
      {/* =============================================
      🍞 BREADCRUMB con colores variados
      ============================================= */}
      <div className="bg-gradient-to-r from-[#FFD93D]/40 via-[#F0C0F0]/40 to-[#00D2D3]/30 py-3 px-4 border-b-2 border-[#7D5FFF]">
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
                  🔐 Iniciar Sesión
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
        
        {/* 🎨 Formas decorativas flotantes (más colores) */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#FF6B81]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#7D5FFF]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00D2D3]/10 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#FF9F43]/20 rounded-full blur-3xl animate-pulse delay-1500"></div>
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-[#90C090]/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-[#603060]/15 rounded-full blur-3xl"></div>

        {/* 🃏 TARJETA DE LOGIN con efecto glass */}
        <Card className="max-w-md w-full border-2 border-[#7D5FFF]/40 shadow-2xl hover:shadow-[#7D5FFF]/30 transition-all duration-500 backdrop-blur-sm bg-white/90 relative overflow-hidden">
          
          {/* 🎨 Borde decorativo superior con gradiente de 5 colores */}
          {/* 🎨 Borde decorativo superior - Gradiente de 3 colores contrastantes */}
<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD93D] via-[#7D5FFF] to-[#FF6B81]"></div>
          
          <CardContent className="p-8 relative z-10">
            
            {/* =============================================
            📌 HEADER
            ============================================= */}
            <div className="text-center mb-8">
              <div className="flex justify-center mb-3">
                <Badge className="bg-gradient-to-r from-[#FFD93D] via-[#FF9F43] to-[#7D5FFF] text-[#303030] px-4 py-1.5 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  <ShieldCheck className="inline mr-1 w-4 h-4 text-[#603060]" /> Acceso Seguro
                </Badge>
              </div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] bg-clip-text text-transparent">
                Iniciar Sesión
              </h1>
              <p className="text-[#6A757C] mt-2 flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4 text-[#FFD93D]" />
                Ingresa tus datos para continuar comprando
                <Sparkles className="w-4 h-4 text-[#00D2D3]" />
              </p>
            </div>

            {/* =============================================
            ❌ ERROR GENERAL
            ============================================= */}
            {error && (
              <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* =============================================
            📝 FORMULARIO
            ============================================= */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* 📧 CAMPO: Correo electrónico */}
              <div className="space-y-1">
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

              {/* 🔒 CAMPO: Contraseña */}
              <div className="space-y-1">
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
              </div>

              {/* =============================================
              🔘 RECORDARME + OLVIDÉ CONTRASEÑA
              ============================================= */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={remember}
                    onCheckedChange={handleRememberChange}
                    className="border-[#7D5FFF] data-[state=checked]:bg-[#7D5FFF] transition-colors"
                  />
                  <label htmlFor="remember" className="text-sm text-[#303030] cursor-pointer hover:text-[#603060] transition-colors">
                    Recordarme
                  </label>
                </div>
                <Link 
                  to="/recuperar" 
                  className="text-sm text-[#00D2D3] hover:text-[#603060] font-medium hover:underline transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              {/* =============================================
              🚀 BOTÓN DE ENVÍO
              ============================================= */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#FFD93D] via-[#FF9F43] to-[#7D5FFF] hover:from-[#7D5FFF] hover:via-[#603060] hover:to-[#FFD93D] text-[#303030] hover:text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-[#603060]">⏳</span> Cargando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn size={20} className="text-[#603060] group-hover:text-white transition-colors" /> Ingresar
                  </span>
                )}
              </Button>
            </form>

            {/* =============================================
            ➗ SEPARADOR
            ============================================= */}
            <div className="flex items-center gap-4 my-6">
              <Separator className="flex-1" />
              <span className="text-sm text-[#6A757C]">¿No tienes cuenta?</span>
              <Separator className="flex-1" />
            </div>

            {/* =============================================
            📝 ENLACE A REGISTRO
            ============================================= */}
            <div className="text-center">
              <Link
                to="/registro"
                className="text-[#7D5FFF] font-bold hover:text-[#603060] hover:underline transition-colors text-lg"
              >
                Crear una cuenta nueva →
              </Link>
              <p className="text-xs text-[#6A757C] mt-1">Regístrate y empieza a comprar</p>
            </div>

            {/* =============================================
            🔙 VOLVER A LA TIENDA
            ============================================= */}
            <div className="text-center mt-6">
              <Link 
                to="/" 
                className="text-sm text-[#6A757C] hover:text-[#7D5FFF] transition-colors inline-flex items-center gap-1"
              >
                <ArrowLeft size={16} /> Volver a la tienda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}