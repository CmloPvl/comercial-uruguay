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
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import CartItem from "../components/cart/CartItem"

export default function Carrito() {
  const { items, totalItems, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro")

  // Generar mensaje para WhatsApp
  const generateWhatsAppMessage = () => {
    const productList = items.map((item, index) => {
      const subtotal = item.price * item.quantity
      return `${index + 1}. ${item.name} (x${item.quantity}) - $${item.price.toLocaleString()} c/u → $${subtotal.toLocaleString()}`
    }).join("\n")

    const message = `¡Hola Comercial Uruguay! 👋

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
    window.open(`https://wa.me/56912345678?text=${message}`, "_blank")
  }

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
              <h1 className="text-3xl font-bold text-[#603060]">🛒 Mi Carrito</h1>
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

          {/* Resumen */}
          <div className="lg:w-80 flex-shrink-0">
            <Card className="border-2 border-[#7D5FFF] sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-[#603060] mb-4">📋 Resumen</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#303030]">Subtotal ({totalItems} productos)</span>
                    <span className="font-bold text-[#7D5FFF]">${totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-[#303030]">Total</span>
                      <span className="text-[#603060]">${totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Opción de entrega */}
                <div className="mt-4 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="retiro"
                      checked={deliveryOption === "retiro"}
                      onChange={() => setDeliveryOption("retiro")}
                      className="accent-[#7D5FFF]"
                    />
                    <span className="text-sm text-[#303030]">🏪 Retiro en tienda</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="delivery"
                      value="envio"
                      checked={deliveryOption === "envio"}
                      onChange={() => setDeliveryOption("envio")}
                      className="accent-[#7D5FFF]"
                    />
                    <span className="text-sm text-[#303030]">📦 Envío a domicilio</span>
                  </label>
                </div>

                <Button
                  onClick={handleWhatsApp}
                  className="w-full mt-6 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  💬 Enviar pedido por WhatsApp
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">
                  El pedido se enviará para confirmar disponibilidad
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  )
}