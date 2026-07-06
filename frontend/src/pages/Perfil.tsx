// src/pages/Perfil.tsx
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
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
import { Avatar, AvatarFallback } from "../components/ui/avatar"

export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("datos")
  const [formData, setFormData] = useState({
    nombre: user?.fullName || "María Pérez",
    email: user?.email || "maria.perez@correo.com",
    telefono: "+56 9 1234 5678",
    fechaNacimiento: "15 / 06 / 1990",
    documento: "12.345.678-9"
  })

  const [passwordData, setPasswordData] = useState({
    actual: "",
    nueva: "",
    confirmar: ""
  })

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-[#303030]">No has iniciado sesión</h2>
          <Link to="/login" className="mt-4 bg-[#7D5FFF] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#603060] transition">
            Ir a Login
          </Link>
        </div>
      </Layout>
    )
  }

  const handleSave = () => {
    console.log("Guardando datos:", formData)
    alert("✅ Datos guardados correctamente")
  }

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordData.nueva !== passwordData.confirmar) {
      alert("❌ Las contraseñas no coinciden")
      return
    }
    if (passwordData.nueva.length < 8) {
      alert("❌ La contraseña debe tener al menos 8 caracteres")
      return
    }
    console.log("Contraseña actualizada")
    alert("✅ Contraseña actualizada correctamente")
    setPasswordData({ actual: "", nueva: "", confirmar: "" })
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
                  Mi Perfil
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== PERFIL ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* ====== SIDEBAR ====== */}
          <div className="md:w-64 flex-shrink-0">
            <Card className="border-2 border-[#7D5FFF] sticky top-4">
              <CardContent className="p-6">
                {/* Avatar */}
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto">
                    <AvatarFallback className="bg-gradient-to-br from-[#7D5FFF] to-[#603060] text-white text-3xl font-bold">
                      {user.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-[#303030] mt-2">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                {/* Navegación */}
                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("datos")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeTab === "datos" 
                        ? 'bg-[#7D5FFF] text-white font-bold' 
                        : 'hover:bg-[#F0F0C0] text-[#303030]'
                    }`}
                  >
                    📋 Mis datos
                  </button>
                  <button
                    onClick={() => setActiveTab("pedidos")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition ${
                      activeTab === "pedidos" 
                        ? 'bg-[#00D2D3] text-white font-bold' 
                        : 'hover:bg-[#F0F0C0] text-[#303030]'
                    }`}
                  >
                    📦 Mis pedidos
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F0F0C0] text-[#303030] transition">
                    📍 Direcciones
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F0F0C0] text-[#303030] transition">
                    💳 Métodos de pago
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F0F0C0] text-[#303030] transition">
                    🔐 Seguridad
                  </button>
                  <button className="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F0F0C0] text-[#303030] transition">
                    🔔 Notificaciones
                  </button>
                  <div className="border-t border-gray-200 my-2"></div>
                  <button
                    onClick={() => { logout(); navigate("/") }}
                    className="w-full text-left px-3 py-2 rounded-lg text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-bold"
                  >
                    🚪 Cerrar sesión
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* ====== CONTENIDO PRINCIPAL ====== */}
          <div className="flex-1">
            {activeTab === "datos" && (
              <>
                {/* Datos personales */}
                <Card className="border-2 border-[#7D5FFF]">
                  <CardContent className="p-6">
                    <h2 className="text-2xl font-bold text-[#603060] mb-2">📋 Datos Personales</h2>
                    <p className="text-gray-500 text-sm mb-6">Actualmente tu información de contacto</p>

                    {/* Avatar con cambio de foto */}
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="w-16 h-16">
                        <AvatarFallback className="bg-gradient-to-br from-[#7D5FFF] to-[#603060] text-white text-2xl font-bold">
                          {user.fullName?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-[#303030]">{user.fullName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                        <button className="text-sm text-[#7D5FFF] hover:underline">Cambiar foto</button>
                      </div>
                    </div>

                    {/* Formulario */}
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#7D5FFF]">👤</span> Nombre
                        </Label>
                        <Input
                          type="text"
                          value={formData.nombre}
                          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                          className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#00D2D3]">📧</span> Correo electrónico
                        </Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#FF9F43]">📱</span> Teléfono
                        </Label>
                        <Input
                          type="tel"
                          value={formData.telefono}
                          onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                          className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#FF6B81]">📅</span> Fecha de nacimiento
                        </Label>
                        <Input
                          type="text"
                          value={formData.fechaNacimiento}
                          onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                          className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#603060]">🪪</span> Documento (RUT/CI) <span className="text-gray-400 font-normal">(Opcional)</span>
                        </Label>
                        <Input
                          type="text"
                          value={formData.documento}
                          onChange={(e) => setFormData({ ...formData, documento: e.target.value })}
                          className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button onClick={handleSave} className="bg-[#7D5FFF] hover:bg-[#603060] text-white font-bold px-6">
                          💾 Guardar cambios
                        </Button>
                        <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white">
                          ✖ Cancelar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cambiar contraseña */}
                <Card className="border-2 border-[#FF6B81] mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#303030] mb-4">🔐 Cambiar contraseña</h3>
                    
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#FF6B81]">🔒</span> Contraseña actual
                        </Label>
                        <Input
                          type="password"
                          value={passwordData.actual}
                          onChange={(e) => setPasswordData({ ...passwordData, actual: e.target.value })}
                          className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                          placeholder="••••••••"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#00D2D3]">🔒</span> Nueva contraseña
                        </Label>
                        <Input
                          type="password"
                          value={passwordData.nueva}
                          onChange={(e) => setPasswordData({ ...passwordData, nueva: e.target.value })}
                          className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                          placeholder="••••••••"
                        />
                        <p className="text-xs text-gray-400 mt-1">ℹ️ Mínimo 8 caracteres, una mayúscula y un número</p>
                      </div>

                      <div>
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#90C090]">🔒</span> Confirmar nueva contraseña
                        </Label>
                        <Input
                          type="password"
                          value={passwordData.confirmar}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmar: e.target.value })}
                          className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                          placeholder="••••••••"
                        />
                      </div>

                      <Button type="submit" className="bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold">
                        🔄 Actualizar contraseña
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </>
            )}

            {activeTab === "pedidos" && (
              <Card className="border-2 border-[#7D5FFF]">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-[#603060] mb-2">📦 Mis Pedidos</h2>
                  <p className="text-gray-500 text-sm mb-6">Historial de tus compras</p>

                  <div className="space-y-4">
                    {[
                      { id: "#000231", date: "12 jun 2026", products: 3, total: 3450, status: "Entregado", statusIcon: "✅", statusColor: "text-[#90C090]" },
                      { id: "#000214", date: "28 may 2026", products: 1, total: 890, status: "En camino", statusIcon: "📦", statusColor: "text-[#00D2D3]" },
                    ].map((pedido) => (
                      <Card key={pedido.id} className="border-2 border-gray-200 hover:border-[#7D5FFF] transition">
                        <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                          <div>
                            <p className="font-bold text-[#303030]">Pedido {pedido.id}</p>
                            <p className="text-sm text-gray-500">{pedido.products} productos · {pedido.date}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-2 sm:mt-0">
                            <p className="font-bold text-[#7D5FFF]">${pedido.total.toLocaleString()}</p>
                            <p className={`font-medium ${pedido.statusColor}`}>{pedido.statusIcon} {pedido.status}</p>
                            <Button variant="outline" className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white text-sm">
                              Ver detalles
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center mt-6">
                    <Link to="/pedidos" className="text-[#00D2D3] font-bold hover:text-[#603060] transition">
                      Ver todos mis pedidos →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}