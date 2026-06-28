// src/pages/ProductoDetalle.tsx
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
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
import { Badge } from "../components/ui/badge"
import { Card, CardContent } from "../components/ui/card"

// Datos de ejemplo (simulando una API)
const productosData = [
  { id: 1, name: "Bufanda de Lana", price: 12990, description: "Bufanda de lana 100% natural, ideal para el invierno.", sku: "BUF-2026-001", stock: 25, images: ["🧣"], category: "Temporada", isOnSale: true, discount: 15, specifications: { material: "Lana 100%", color: "Gris" } },
  { id: 2, name: "Guantes de Cuero", price: 8500, description: "Guantes de cuero genuino, perfectos para el frío.", sku: "GUA-2026-002", stock: 8, images: ["🧤"], category: "Temporada", isOnSale: false, discount: 0, specifications: { material: "Cuero", color: "Negro" } },
  { id: 3, name: "Gorro de Invierno", price: 25000, description: "Gorro de lana con forro polar, súper calentito.", sku: "GOR-2026-003", stock: 0, images: ["🧢"], category: "Temporada", isOnSale: true, discount: 20, specifications: { material: "Lana", color: "Azul" } },
  { id: 4, name: "Set de Peinado", price: 3200, description: "Set completo de peinado con cepillo y peine.", sku: "SET-2026-004", stock: 15, images: ["💇"], category: "Cabello", isOnSale: false, discount: 0, specifications: { material: "Plástico", color: "Rosado" } },
  { id: 5, name: "Juego de Mesa", price: 45000, description: "Juego de mesa completo para toda la familia.", sku: "JUE-2026-005", stock: 3, images: ["🎲"], category: "Juguetes", isOnSale: false, discount: 0, specifications: { material: "Cartón", color: "Multicolor" } },
  { id: 6, name: "Bolsa de Regalo", price: 6800, description: "Bolsa de regalo con diseño exclusivo.", sku: "BOL-2026-006", stock: 20, images: ["🎁"], category: "Cumpleaños", isOnSale: true, discount: 10, specifications: { material: "Papel", color: "Dorado" } },
]

export default function ProductoDetalle() {
  const { id } = useParams<{ id: string }>()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState("Azul")

  const product = productosData.find(p => p.id === Number(id))

  if (!product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-[#303030]">Producto no encontrado</h2>
          <Link to="/productos" className="mt-4 text-[#7D5FFF] hover:underline">
            ← Volver a la tienda
          </Link>
        </div>
      </Layout>
    )
  }

  const finalPrice = product.isOnSale && product.discount > 0 
    ? product.price * (1 - product.discount / 100) 
    : product.price

  const isOutOfStock = product.stock === 0

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
                <BreadcrumbLink href="/productos" className="text-[#603060] hover:text-[#00D2D3]">
                  Tienda
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00D2D3]" />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/productos?categoria=${product.category}`} className="text-[#603060] hover:text-[#00D2D3]">
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#00D2D3]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  {product.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== DETALLE ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* ====== COLUMNA IZQUIERDA: IMAGEN ====== */}
          <div className="lg:w-1/2">
            <Link to="/productos" className="text-[#00D2D3] hover:text-[#603060] inline-block mb-4 font-medium">
              ← Volver a la Tienda
            </Link>
            
            <div className="bg-gradient-to-br from-[#FFD93D]/20 to-[#00D2D3]/20 rounded-2xl p-8 flex items-center justify-center text-8xl h-96 border-2 border-[#00D2D3]">
              {product.images?.[0] || "📦"}
            </div>
            
            <div className="flex gap-3 mt-4">
              {[1, 2, 3, 4].map((_, index) => (
                <div 
                  key={index} 
                  className="w-16 h-16 bg-[#F0F0C0]/50 rounded-lg border-2 border-[#00D2D3] flex items-center justify-center text-2xl cursor-pointer hover:border-[#FFD93D] transition"
                >
                  {product.images?.[0] || "📦"}
                </div>
              ))}
            </div>
          </div>

          {/* ====== COLUMNA DERECHA: INFORMACIÓN ====== */}
          <div className="lg:w-1/2 space-y-6">
            <Badge className="bg-[#00D2D3] text-white">{product.category}</Badge>

            <h1 className="text-3xl font-extrabold text-[#303030]">{product.name}</h1>
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>

            <div>
              {product.isOnSale && product.discount > 0 && (
                <span className="text-lg text-gray-400 line-through mr-2">
                  ${product.price.toLocaleString()}
                </span>
              )}
              <span className={`text-3xl font-bold ${product.isOnSale ? 'text-[#FF6B81]' : 'text-[#7D5FFF]'}`}>
                ${Math.round(finalPrice).toLocaleString()} CLP
              </span>
              {product.isOnSale && product.discount > 0 && (
                <Badge className="bg-[#FF6B81] text-white ml-2">
                  -{product.discount}%
                </Badge>
              )}
            </div>

            <div className={`p-3 rounded-xl ${isOutOfStock ? 'bg-[#FF6B81]/10 border-[#FF6B81]' : 'bg-[#00D2D3]/10 border-[#00D2D3]'} border-2`}>
              <p className={`font-bold ${isOutOfStock ? 'text-[#FF6B81]' : 'text-[#00D2D3]'}`}>
                {isOutOfStock ? '❌ Sin Stock' : `✅ ${product.stock} unidades disponibles`}
              </p>
            </div>

            <div>
              <p className="font-semibold text-[#303030] mb-2">🎨 Variante / Color:</p>
              <div className="flex gap-2">
                {["Azul", "Rosado", "Verde"].map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-full border-2 transition-all ${
                      selectedColor === color 
                        ? 'bg-[#7D5FFF] text-white border-[#7D5FFF]' 
                        : 'border-gray-300 hover:border-[#7D5FFF]'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold text-[#303030] mb-2">🔢 Cantidad:</p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border-2 border-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition flex items-center justify-center text-xl font-bold"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="w-10 h-10 rounded-full border-2 border-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition flex items-center justify-center text-xl font-bold"
                  disabled={isOutOfStock}
                >
                  +
                </button>
                <span className="text-sm text-gray-500">({product.stock} disponibles)</span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200">
              <Button className="w-full bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-3 text-lg rounded-xl shadow-lg transition-all">
                💬 Consultar por WhatsApp
              </Button>
              
              <Button variant="outline" className="w-full border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold py-3 text-lg rounded-xl transition-all">
                ♥ Guardar en favoritos
              </Button>
            </div>
          </div>
        </div>

        {/* ====== DESCRIPCIÓN Y ESPECIFICACIONES ====== */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-[#603060] mb-4">📋 Detalles del Artículo</h2>
          
          <Card className="bg-[#F0F0C0]/30 border border-[#00D2D3]/30">
            <CardContent className="p-6">
              <p className="text-[#303030] leading-relaxed">{product.description}</p>
            </CardContent>
          </Card>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-2 border-[#00D2D3]">
              <CardContent className="p-4">
                <p className="font-bold text-[#303030]">📐 Dimensiones</p>
                <p className="text-gray-600">15 cm x 10 cm x 8 cm</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#FF6B81]">
              <CardContent className="p-4">
                <p className="font-bold text-[#303030]">🎨 Material</p>
                <p className="text-gray-600">Plástico resistente sin BPA</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#FFD93D]">
              <CardContent className="p-4">
                <p className="font-bold text-[#303030]">🔋 Batería</p>
                <p className="text-gray-600">Incluye pilas AA (x2)</p>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#7D5FFF]">
              <CardContent className="p-4">
                <p className="font-bold text-[#303030]">⚠️ Edad recomendada</p>
                <p className="text-gray-600">Mayor a 3 años</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ====== UBICACIÓN ====== */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-[#603060] mb-4">📍 Retira en nuestra tienda física</h2>
          
          <div className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white rounded-2xl p-6">
            <p className="text-lg font-bold">Uruguay 660, esquina Colón, Valparaíso</p>
            <div className="bg-white/20 h-40 rounded-xl flex items-center justify-center text-white/60 text-sm my-4">
              [ Mapa - Google Maps ]
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <p>🕐 Lun-Sáb 09:00 - 19:00 hrs</p>
              <p>📱 +56 9 1234 5678</p>
            </div>
            <p className="mt-2 text-sm text-white/80">ℹ️ Ven a nuestro local con el nombre del producto para adquirirlo.</p>
          </div>
        </div>

        {/* ====== PRODUCTOS RELACIONADOS ====== */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-[#603060] mb-4">🔄 Productos que podrían interesarte</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {productosData.filter(p => p.id !== product.id).slice(0, 4).map(related => (
              <Link 
                key={related.id}
                to={`/producto/${related.id}`}
                className="bg-white p-4 rounded-xl border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:-translate-y-1 text-center"
              >
                <div className="text-4xl mb-2">{related.images?.[0] || "📦"}</div>
                <h4 className="font-bold text-sm text-[#303030] line-clamp-1">{related.name}</h4>
                <p className="text-[#7D5FFF] font-bold text-sm">${related.price.toLocaleString()}</p>
                <Button variant="outline" className="w-full mt-2 text-xs border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white">
                  Ver
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}