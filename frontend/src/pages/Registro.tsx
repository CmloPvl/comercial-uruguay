import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
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
import { useAuth } from "../context/AuthContext"

export default function Registro() {
  const { register } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    aceptaTerminos: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre completo es obligatorio"
    }
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es obligatorio"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Ingresa un correo válido"
    }
    if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }
    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = "Debes aceptar los términos y condiciones"
    }
    
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    try {
      register({
        name: formData.nombre,
        fullName: formData.nombre,
        email: formData.email,
        role: "CLIENTE",
        password: formData.password,
      })
      alert("✅ Usuario registrado exitosamente")
      navigate("/login")
    } catch (error: any) {
      alert("❌ " + error.message)
    }
  }

  return (
    <Layout>
      {/* ====== BREADCRUMB SHADCN ====== */}
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

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#7D5FFF]">👤</span> Nombre completo
                </Label>
                <Input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`mt-1 border-2 ${errors.nombre ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  placeholder="Marta Pérez"
                />
                {errors.nombre && <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.nombre}</p>}
              </div>

              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#00D2D3]">📧</span> Correo electrónico
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 border-2 ${errors.email ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  placeholder="marta.perez@email.com"
                />
                {errors.email && <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.email}</p>}
              </div>

              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#FF9F43]">📱</span> Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
                </Label>
                <Input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="mt-1 border-2 border-[#00D2D3] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#603060]">🔒</span> Contraseña
                </Label>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`mt-1 border-2 ${errors.password ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.password}</p>}
                <p className="text-xs text-gray-400 mt-1">ℹ️ Mínimo 8 caracteres, una mayúscula y un número</p>
              </div>

              <div>
                <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                  <span className="text-[#90C090]">🔒</span> Confirmar contraseña
                </Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`mt-1 border-2 ${errors.confirmPassword ? 'border-[#FF6B81]' : 'border-[#00D2D3]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D]`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.confirmPassword}</p>}
              </div>

              {/* Términos */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  checked={formData.aceptaTerminos}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 accent-[#00D2D3]"
                />
                <div>
                  <label className="text-sm text-[#303030] cursor-pointer">
                    Acepto los <a href="#" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-[#00D2D3] hover:text-[#603060] font-medium hover:underline">Política de Privacidad</a>
                  </label>
                  {errors.aceptaTerminos && <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.aceptaTerminos}</p>}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#FFD93D] to-[#F0C030] hover:from-[#F0C030] hover:to-[#FFD93D] text-[#303030] font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                ✨ Crear Cuenta
              </Button>
            </form>

            {/* Divisor */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-sm text-gray-400 font-medium">O regístrate con</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Redes sociales */}
            <div className="flex gap-4">
              <button className="flex-1 bg-[#00D2D3]/10 hover:bg-[#00D2D3]/20 border-2 border-[#00D2D3] text-[#00D2D3] font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <span className="text-xl">🟣</span> Google
              </button>
              <button className="flex-1 bg-[#FFD93D]/20 hover:bg-[#FFD93D]/30 border-2 border-[#FFD93D] text-[#303030] font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2">
                <span className="text-xl">🔵</span> Facebook
              </button>
            </div>

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
  )
}