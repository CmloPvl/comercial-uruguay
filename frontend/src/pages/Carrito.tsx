import { useState } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/layout/Layout"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { Button } from "../components/ui/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import { Badge } from "../components/ui/badge"
import { Skeleton } from "../components/ui/skeleton"  // ✅ NUEVO
import CartItem from "../components/cart/CartItem"
import CartSummary from "../components/cart/CartSummary"
import { empresaConfig } from "../config/empresa"

export default function Carrito() {
  const { items, totalItems, totalPrice, clearCart, loading } = useCart()  // ✅ Agregado loading
  const { user } = useAuth()
  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro")

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    const productList = items.map((item, index) => {
      const subtotal = item.price * item.quantity
      return `${index + 1}. ${item.name} (x${item.quantity}) - $${item.price.toLocaleString()} c/u → $${subtotal.toLocaleString()}`
    }).join("\n")

    const message = `¡Hola ${empresaConfig.nombre}! 👋

Quiero hacer el siguiente pedido:

📦 **Mi Pedido**
${"─".repeat(50)}
${productList}
${"─".repeat(50)}
**Subtotal:** $${totalPrice.toLocaleString()}

👤 **Datos del cliente:**
Nombre: ${user?.fullName || "Cliente"}
Teléfono: ${user?.phone || "No especificado"}

📍 **Opción de entrega:** ${deliveryOption === "retiro" ? "Retiro en tienda" : "Envío a domicilio"}

¿Podrían confirmar disponibilidad y coordinar? ¡Gracias! 🙌`

    return encodeURIComponent(message)
  }

  const handleWhatsApp = () => {
    const message = generateWhatsAppMessage()
    window.open(`https://wa.me/${empresaConfig.whatsapp}?text=${message}`, "_blank")
  }

  // =============================================
  // ESTADO DE CARGA (SKELETON)
  // =============================================
  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Skeleton de la lista de productos */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-24" />
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-4 p-4 border rounded-lg">
                    <Skeleton className="w-24 h-24 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Skeleton del resumen */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="border-2 border-[#7D5FFF] rounded-lg p-6 space-y-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  // =============================================
  // CARRITO VACÍO
  // =============================================
  if (items.length === 0) {
    return (
      <Layout>
        <div className="bg-[#FFD93D]/20 py-3 px-4 border-b-2 border-[#00D2D3]">
          <div className="max-w-6xl mx-auto">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-[#00D2D3]" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#00D2D3] font-bold">Carrito</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-[#303030]">Tu carrito está vacío</h2>
          <p className="text-gray-500 mt-2">Agrega productos desde la tienda</p>
          <Link to="/productos" className="mt-6 bg-[#7D5FFF] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#603060] transition">
            Ir a la tienda
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#FFD93D]/20 py-3 px-4 border-b-2 border-[#00D2D3]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00D2D3]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">Carrito</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Lista de productos */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-[#603060]">
                  🛒 Mi Carrito
                </h1>
                {user?.fullName && (
                  <p className="text-sm text-gray-500 mt-1">
                    👋 Hola, {user.fullName}
                  </p>
                )}
              </div>
              <Badge className="bg-[#00D2D3] text-white text-lg px-4 py-1">
                {totalItems} productos
              </Badge>
            </div>

            <div className="space-y-4">
              {items.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white" onClick={clearCart}>
                🗑️ Vaciar carrito
              </Button>
              <Link to="/productos">
                <Button variant="outline" className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white">
                  ➕ Seguir comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Resumen - usando CartSummary */}
          <CartSummary
            totalItems={totalItems}
            totalPrice={totalPrice}
            deliveryOption={deliveryOption}
            onDeliveryChange={setDeliveryOption}
            onWhatsApp={handleWhatsApp}
          />
        </div>
      </div>
    </Layout>
  )
}