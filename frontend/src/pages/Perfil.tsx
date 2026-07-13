import { useState, useEffect } from "react"
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
import { Badge } from "../components/ui/badge"
import { userService } from "../services/userService"
import { orderService, type Order } from "../services/orderService"

// =============================================
// UTILIDADES
// =============================================
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-[#7D5FFF]", "bg-[#FF6B81]", "bg-[#00D2D3]", 
    "bg-[#FFD93D]", "bg-[#FF9F43]", "bg-[#90C090]",
    "bg-[#603060]", "bg-[#C06060]"
  ]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length]
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const getOrderStatus = (status: string) => {
  const statusMap: Record<string, { label: string; className: string; icon: string }> = {
    'RECIBIDO': { label: 'Recibido', className: 'bg-[#FF6B81] text-white', icon: '📩' },
    'REVISION': { label: 'En Revisión', className: 'bg-[#FF9F43] text-white', icon: '🔍' },
    'CONFIRMADO': { label: 'Confirmado', className: 'bg-[#FFD93D] text-[#303030]', icon: '✅' },
    'ENVIADO': { label: 'Enviado', className: 'bg-[#00D2D3] text-white', icon: '📦' },
    'ENTREGADO': { label: 'Entregado', className: 'bg-[#90C090] text-white', icon: '🏠' },
    'CANCELADO': { label: 'Cancelado', className: 'bg-gray-400 text-white', icon: '❌' },
  }
  return statusMap[status] || { label: status, className: 'bg-gray-400 text-white', icon: '📋' }
}

// =============================================
// COMPONENTES DE PESTAÑAS
// =============================================

function DatosPersonalesTab({ 
  user, 
  formData, 
  setFormData, 
  handleSave, 
  loading, 
  success, 
  error 
}: any) {
  return (
    <>
      {success && (
        <div className="bg-[#90C090]/10 border-2 border-[#90C090] text-[#90C090] px-4 py-3 rounded-xl mb-4 flex items-center gap-2 animate-in fade-in duration-300">
          <span className="text-xl">✅</span>
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-4 flex items-center gap-2 animate-in fade-in duration-300">
          <span className="text-xl">⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#603060]">📋 Datos Personales</h2>
              <p className="text-gray-500 text-sm">Actualiza tu información de contacto</p>
            </div>
            <Badge className="bg-[#7D5FFF] text-white px-3 py-1">
              {user?.role || "CLIENTE"}
            </Badge>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 ring-2 ring-[#7D5FFF]/30">
              <AvatarFallback className={`${getAvatarColor(user?.fullName || "User")} text-white text-2xl font-bold`}>
                {getInitials(user?.fullName || "Usuario")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-[#303030]">{user?.fullName}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-xs text-[#7D5FFF] font-medium">
                Miembro desde {user?.createdAt ? formatDate(user.createdAt) : "2024"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#7D5FFF]">👤</span> Nombre completo
              </Label>
              <Input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                placeholder="Tu nombre completo"
              />
            </div>

            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#00D2D3]">📧</span> Correo electrónico
              </Label>
              <Input
                type="email"
                value={formData.email}
                disabled
                className="mt-1 border-2 border-gray-300 bg-gray-50 cursor-not-allowed"
              />
              <p className="text-xs text-gray-400 mt-1">ℹ️ El correo no se puede modificar</p>
            </div>

            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#FF9F43]">📱</span> Teléfono
              </Label>
              <Input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                placeholder="+56 9 1234 5678"
              />
            </div>

            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#603060]">📍</span> Dirección
              </Label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                placeholder="Tu dirección"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={loading}
                className="bg-[#7D5FFF] hover:bg-[#603060] text-white font-bold px-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Guardando..." : "💾 Guardar cambios"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

function SeguridadTab({ 
  passwordData, 
  setPasswordData, 
  handlePasswordChange, 
  loading, 
  success, 
  error 
}: any) {
  return (
    <>
      {success && (
        <div className="bg-[#90C090]/10 border-2 border-[#90C090] text-[#90C090] px-4 py-3 rounded-xl mb-4 flex items-center gap-2 animate-in fade-in duration-300">
          <span className="text-xl">✅</span>
          <span className="font-medium">{success}</span>
        </div>
      )}
      {error && (
        <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-4 flex items-center gap-2 animate-in fade-in duration-300">
          <span className="text-xl">⚠️</span>
          <span className="font-medium">{error}</span>
        </div>
      )}

      <Card className="border-2 border-[#FF6B81] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#603060]">🔐 Seguridad</h2>
            <p className="text-gray-500 text-sm">Cambia tu contraseña para mantener tu cuenta segura</p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#FF6B81]">🔒</span> Contraseña actual
              </Label>
              <Input
                type="password"
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#00D2D3]">🔒</span> Nueva contraseña
              </Label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                placeholder="••••••••"
                required
              />
              <p className="text-xs text-gray-400 mt-1">ℹ️ Mínimo 8 caracteres, una mayúscula y un número</p>
            </div>

            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#90C090]">🔒</span> Confirmar nueva contraseña
              </Label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="mt-1 border-2 border-gray-300 focus:ring-2 focus:ring-[#7D5FFF]"
                placeholder="••••••••"
                required
              />
            </div>

            <Button 
              type="submit" 
              disabled={loading}
              className="bg-[#FF6B81] hover:bg-[#FF6B81]/80 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Actualizando..." : "🔄 Actualizar contraseña"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  )
}

function PedidosTab({ orders, navigate }: { orders: Order[]; navigate: any }) {
  const totalProducts = orders.reduce((acc, order) => acc + (order.items?.length || 0), 0)

  return (
    <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#603060]">📦 Mis Pedidos</h2>
            <p className="text-gray-500 text-sm">Historial de tus compras</p>
          </div>
          {orders.length > 0 && (
            <Badge className="bg-[#00D2D3] text-white">
              {orders.length} pedidos · {totalProducts} productos
            </Badge>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-500 font-medium text-lg">No tienes pedidos aún</p>
            <p className="text-sm text-gray-400 mt-1">Realiza tu primera compra en la tienda.</p>
            <Link to="/productos" className="mt-4 inline-block text-[#7D5FFF] hover:underline font-medium">
              Ir a la tienda →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const status = getOrderStatus(order.status)
              return (
                <Card key={order.id} className="border-2 border-gray-200 hover:border-[#7D5FFF] transition-all hover:shadow-md">
                  <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-bold text-[#603060]">{order.orderNumber}</p>
                        <Badge className={status.className}>
                          {status.icon} {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {order.items?.length || 0} productos · {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <p className="font-bold text-[#7D5FFF] text-lg">
                        ${order.total.toLocaleString('es-CL')}
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white text-sm"
                        onClick={() => navigate(`/pedido/${order.id}`)}
                      >
                        Ver detalles →
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// =============================================
// COMPONENTE PRINCIPAL
// =============================================
export default function Perfil() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [activeTab, setActiveTab] = useState("datos")
  const [orders, setOrders] = useState<Order[]>([])
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Cargar perfil y pedidos
  useEffect(() => {
    if (user) {
      loadProfile()
      loadOrders()
    }
  }, [user])

  const loadProfile = async () => {
    try {
      setLoadingProfile(true)
      const profile = await userService.getProfile()
      setFormData({
        fullName: profile.fullName || user?.fullName || "",
        email: profile.email || user?.email || "",
        phone: profile.phone || user?.phone || "",
        address: profile.address || user?.address || "",
      })
    } catch (error) {
      console.error("Error al cargar perfil:", error)
    } finally {
      setLoadingProfile(false)
    }
  }

  const loadOrders = async () => {
    try {
      const data = await orderService.getOrders()
      setOrders(data || [])
    } catch (error) {
      console.error("Error al cargar pedidos:", error)
    }
  }

  const handleSave = async () => {
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const updatedUser = await userService.updateProfile({
        fullName: formData.fullName,
        phone: formData.phone,
        address: formData.address,
      })
      
      setSuccess("✅ Datos actualizados correctamente")
      
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        const userData = JSON.parse(storedUser)
        userData.fullName = updatedUser.fullName
        userData.phone = updatedUser.phone
        userData.address = updatedUser.address
        localStorage.setItem("user", JSON.stringify(userData))
      }
      
      setFormData({
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        phone: updatedUser.phone || "",
        address: updatedUser.address || "",
      })
      
      setTimeout(() => window.location.reload(), 1500)
    } catch (err: any) {
      setError(err.message || "Error al actualizar los datos")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("❌ Las contraseñas no coinciden")
      return
    }
    if (passwordData.newPassword.length < 8) {
      setError("❌ La contraseña debe tener al menos 8 caracteres")
      return
    }

    setLoading(true)
    try {
      await userService.updatePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
      setSuccess("✅ Contraseña actualizada correctamente")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err: any) {
      setError(err.message || "Error al actualizar la contraseña")
    } finally {
      setLoading(false)
    }
  }

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

  if (loadingProfile) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando tu perfil...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
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

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* ====== SIDEBAR ====== */}
          <div className="md:w-64 flex-shrink-0">
            <Card className="border-2 border-[#7D5FFF] shadow-lg sticky top-4">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Avatar className="w-20 h-20 mx-auto ring-4 ring-[#7D5FFF]/20">
                    <AvatarFallback className={`${getAvatarColor(user.fullName || "User")} text-white text-3xl font-bold`}>
                      {getInitials(user.fullName || "Usuario")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-[#303030] mt-2">{user.fullName}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>

                <nav className="space-y-1">
                  <button
                    onClick={() => setActiveTab("datos")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === "datos" 
                        ? 'bg-[#7D5FFF] text-white font-bold shadow-md' 
                        : 'hover:bg-[#F0F0C0] text-[#303030]'
                    }`}
                  >
                    📋 Mis datos
                  </button>
                  <button
                    onClick={() => setActiveTab("seguridad")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === "seguridad" 
                        ? 'bg-[#FF6B81] text-white font-bold shadow-md' 
                        : 'hover:bg-[#F0F0C0] text-[#303030]'
                    }`}
                  >
                    🔐 Seguridad
                  </button>
                  <button
                    onClick={() => setActiveTab("pedidos")}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 ${
                      activeTab === "pedidos" 
                        ? 'bg-[#00D2D3] text-white font-bold shadow-md' 
                        : 'hover:bg-[#F0F0C0] text-[#303030]'
                    }`}
                  >
                    📦 Mis pedidos ({orders.length})
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
              <DatosPersonalesTab 
                user={user}
                formData={formData}
                setFormData={setFormData}
                handleSave={handleSave}
                loading={loading}
                success={success}
                error={error}
              />
            )}

            {activeTab === "seguridad" && (
              <SeguridadTab 
                passwordData={passwordData}
                setPasswordData={setPasswordData}
                handlePasswordChange={handlePasswordChange}
                loading={loading}
                success={success}
                error={error}
              />
            )}

            {activeTab === "pedidos" && (
              <PedidosTab orders={orders} navigate={navigate} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}