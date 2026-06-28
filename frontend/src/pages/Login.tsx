import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Layout from "../components/layout/Layout"
import { Button } from "../components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Card, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Badge } from "../components/ui/badge"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }
    
    try {
      login(email, password)
      navigate("/perfil")
    } catch (error: any) {
      setError(error.message || "Credenciales incorrectas")
    }
  }

  return (
    <Layout>
      {/* ====== BREADCRUMB SHADCN ====== */}
      <div className="bg-[#F0F0C0] py-3 px-4 border-b-2 border-[#7D5FFF]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#7D5FFF]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#7D5FFF] font-bold">
                  Iniciar Sesión
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== CONTENIDO ====== */}
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gradient-to-br from-[#F0F0C0] via-[#F0C0F0] to-[#90C090]/20">
        <Card className="max-w-md w-full border-2 border-[#7D5FFF] shadow-2xl">
          <CardContent className="p-8">
            
            {/* Header */}
            <div className="text-center mb-8">
              <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-4 py-1 rounded-full">
                🔐 Acceso
              </Badge>
              <h1 className="text-4xl font-extrabold text-[#603060]">Iniciar Sesión</h1>
              <p className="text-gray-500 mt-2">Ingresá tus datos para continuar comprando.</p>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-[#FF6B81]/20 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#7D5FFF]">📧</span> Correo electrónico
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FF6B81] focus:border-[#FF6B81]"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#FF6B81]">🔒</span> Contraseña
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#00D2D3] focus:border-[#00D2D3]"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-[#303030] cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 accent-[#90C090]" />
                  Recordarme
                </label>
                <Link to="/recuperar" className="text-sm text-[#00D2D3] hover:text-[#603060] font-medium hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                🔐 Ingresar
              </Button>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-400 font-medium">O continúa con</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Redes sociales */}
            <div className="flex gap-4">
              <button className="flex-1 bg-[#FF6B81]/10 hover:bg-[#FF6B81]/20 border-2 border-[#FF6B81] text-[#FF6B81] font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <span className="text-xl">🟣</span> Google
              </button>
              <button className="flex-1 bg-[#00D2D3]/10 hover:bg-[#00D2D3]/20 border-2 border-[#00D2D3] text-[#00D2D3] font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <span className="text-xl">🔵</span> Facebook
              </button>
            </div>

            {/* Registro */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                ¿No tenés cuenta?{" "}
                <Link to="/registro" className="text-[#7D5FFF] font-bold hover:text-[#603060] hover:underline transition-colors">
                  Regístrate →
                </Link>
              </p>
            </div>

            {/* Volver */}
            <div className="text-center mt-4">
              <Link to="/" className="text-sm text-gray-400 hover:text-[#7D5FFF] transition-colors">
                ← Volver a la tienda
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}