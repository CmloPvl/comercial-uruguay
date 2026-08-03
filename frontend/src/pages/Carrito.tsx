// 📁 frontend/src/pages/Carrito.tsx

/**
 * 📌 PÁGINA: CARRITO
 * 
 * Página del carrito de compras.
 * Conecta la lógica (useCarrito) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 */

import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Button } from "../components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCarrito } from "../hooks/useCarrito";

export default function Carrito() {
  // =============================================
  // 🧠 LÓGICA (extraída a useCarrito)
  // =============================================
  const {
    items,
    totalItems,
    totalPrice,
    loading,
    user,
    deliveryOption,
    setDeliveryOption,
    clearCart,
    updateQuantity, // ✅ EXTRAER
    removeItem,     // ✅ EXTRAER
    handleWhatsApp,
  } = useCarrito();

  // =============================================
  // 🔄 ESTADO DE CARGA (SKELETON)
  // =============================================
  if (loading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
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
    );
  }

  // =============================================
  // 📭 CARRITO VACÍO
  // =============================================
  if (items.length === 0) {
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
                    Carrito
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold text-[#303030]">Tu carrito está vacío</h2>
          <p className="text-[#6A757C] mt-2">Agrega productos desde la tienda</p>
          <Link
            to="/productos"
            className="mt-6 bg-[#7D5FFF] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#603060] transition"
          >
            Ir a la tienda
          </Link>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout>
      {/* Breadcrumb */}
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
                  Carrito
                </BreadcrumbPage>
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
                <h1 className="text-3xl font-bold text-[#603060]">🛒 Mi Carrito</h1>
                {user?.fullName && (
                  <p className="text-sm text-[#6A757C] mt-1">
                    👋 Hola, {user.fullName}
                  </p>
                )}
              </div>
              <Badge className="bg-[#00D2D3] text-white text-lg px-4 py-1">
                {totalItems} productos
              </Badge>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity} // ✅ PASAR
                  onRemoveItem={removeItem}         // ✅ PASAR
                />
              ))}
            </div>

            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white"
                onClick={clearCart}
              >
                🗑️ Vaciar carrito
              </Button>
              <Link to="/productos">
                <Button
                  variant="outline"
                  className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white"
                >
                  ➕ Seguir comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Resumen */}
          <div className="lg:w-80 flex-shrink-0">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              deliveryOption={deliveryOption}
              onDeliveryChange={setDeliveryOption}
              onWhatsApp={handleWhatsApp}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}