import { useState, useEffect } from "react"
import Layout from "../components/layout/Layout"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import Hero from "../components/home/Hero"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { productService, type Product } from "../services/productService"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"

// Categorías con colores variados
const categories = [
  { name: "Cabello", icon: "💇", color: "border-[#FF6B81] hover:bg-[#FF6B81]/10 hover:border-[#FF6B81]" },
  { name: "Juguetes", icon: "🧸", color: "border-[#00D2D3] hover:bg-[#00D2D3]/10 hover:border-[#00D2D3]" },
  { name: "Cumpleaños", icon: "🎂", color: "border-[#FFD93D] hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { name: "Hogar", icon: "🏠", color: "border-[#7D5FFF] hover:bg-[#7D5FFF]/10 hover:border-[#7D5FFF]" },
  { name: "Melamina", icon: "🍽️", color: "border-[#FF9F43] hover:bg-[#FF9F43]/10 hover:border-[#FF9F43]" },
  { name: "Temporada", icon: "🍂", color: "border-[#603060] hover:bg-[#603060]/10 hover:border-[#603060]" },
]

// Beneficios
const benefits = [
  { icon: "💰", title: "Buenos Precios", description: "Los mejores precios del mercado", color: "border-[#FFD93D] hover:shadow-[#FFD93D]/30" },
  { icon: "📦", title: "Amplio Catálogo", description: "Encuentra todo lo que necesitas", color: "border-[#00D2D3] hover:shadow-[#00D2D3]/30" },
  { icon: "🤝", title: "Atención Cercana", description: "Trato personalizado y confiable", color: "border-[#FF6B81] hover:shadow-[#FF6B81]/30" },
  { icon: "📍", title: "Ubicación Céntrica", description: "Fácil acceso en el centro de Valpo", color: "border-[#7D5FFF] hover:shadow-[#7D5FFF]/30" },
]

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const { addItemById } = useCart()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setProducts(data?.products || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async (productId: string) => {
    if (!user) {
      alert("Inicia sesión para agregar al carrito")
      return
    }

    try {
      await addItemById(productId, 1)
      alert("✅ Producto agregado al carrito")
    } catch (err: any) {
      alert("❌ " + err.message)
    }
  }

  // Tomar primeros 6 productos para destacados
  const featuredProducts = products.slice(0, 6)

  return (
    <Layout>
      {/* ====== HERO ====== */}
      <Hero />

      {/* ====== CATEGORÍAS DESTACADAS ====== */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#FFD93D]/20 via-[#F0C030]/10 to-[#FF9F43]/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-[#7D5FFF] text-white mb-2 px-4 py-1 rounded-full">📂 Categorías</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
              🛍️ EXPLORA POR CATEGORÍA
            </h2>
            <p className="text-gray-500 mt-2">Encuentra lo que buscas en nuestras categorías</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                to={`/productos?categoria=${cat.name}`}
                key={cat.name}
                className={`bg-white p-4 rounded-xl border-2 ${cat.color} shadow-md hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer group`}
              >
                <div className="text-5xl mb-2 group-hover:scale-110 transition">{cat.icon}</div>
                <p className="font-bold text-[#303030] text-sm group-hover:text-[#7D5FFF] transition">{cat.name}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/productos" className="text-[#7D5FFF] font-bold hover:underline hover:text-[#603060] transition text-lg">
              Ver todas las categorías →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== PRODUCTOS DESTACADOS ====== */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-[#00D2D3] text-white mb-2 px-4 py-1 rounded-full">⭐ Destacados</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
              ⭐ PRODUCTOS DESTACADOS
            </h2>
            <p className="text-gray-500 mt-2">Los productos más populares del momento</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
              <p className="text-gray-500 mt-4">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-[#FF6B81]">Error al cargar productos</p>
              <button onClick={loadProducts} className="mt-2 text-[#7D5FFF] hover:underline">
                Reintentar
              </button>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay productos disponibles.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {featuredProducts.map((product) => {
                const finalPrice = product.isOnSale && product.discount > 0
                  ? product.price * (1 - product.discount / 100)
                  : product.price
                const hasImage = product.images && Array.isArray(product.images) && product.images.length > 0

                return (
                  <Card key={product.id} className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
                    <CardContent className="p-4">
                      <Link to={`/producto/${product.id}`}>
                        <div className="relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition">
                          {hasImage ? (
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          ) : (
                            "📦"
                          )}
                          {product.isOnSale && product.discount > 0 && (
                            <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-2 py-1 rounded-full animate-pulse">
                              🔥 -{product.discount}%
                            </Badge>
                          )}
                        </div>
                      </Link>
                      <Link to={`/producto/${product.id}`}>
                        <h3 className="font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition line-clamp-1">
                          {product.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        {product.isOnSale && product.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price.toLocaleString('es-CL')}
                          </span>
                        )}
                        <p className={`font-bold text-xl ${product.isOnSale ? 'text-[#FF6B81]' : 'text-[#7D5FFF]'}`}>
                          ${Math.round(finalPrice).toLocaleString('es-CL')}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        className="w-full mt-3 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold transition-all shadow-md hover:shadow-lg"
                      >
                        🛒 Agregar
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/productos" className="text-[#FF6B81] font-bold hover:underline hover:text-[#7D5FFF] transition text-lg">
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ====== BENEFICIOS ====== */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#00D2D3]/10 via-[#F0C0F0]/10 to-[#FFD93D]/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <Badge className="bg-[#FFD93D] text-[#303030] mb-2 px-4 py-1 rounded-full">✨ Beneficios</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060]">
              ✨ ¿POR QUÉ ELEGIRNOS?
            </h2>
            <p className="text-gray-500 mt-2">Descubre por qué somos tu mejor opción</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className={`border-2 ${benefit.color} hover:shadow-xl transition-all hover:-translate-y-1`}>
                <CardContent className="p-6 text-center">
                  <div className="text-5xl mb-3 animate-bounce">{benefit.icon}</div>
                  <h3 className="font-bold text-[#303030] text-lg">{benefit.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

 {/* ====== UBICACIÓN Y MAPA ====== */}
<section className="py-16 px-4 bg-gradient-to-br from-background/50 via-light-lavender/30 to-pale-lemon/40">
  <div className="max-w-4xl mx-auto text-center">
    <Badge className="bg-purple-electric text-white mb-4 px-4 py-1 rounded-full font-bold">
      📍 Ubicación
    </Badge>
    <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-2">📍 ENCUÉNTRANOS</h2>
    <p className="text-lg text-charcoal/70 mb-6">Uruguay 660 esquina Colón, Valparaíso</p>

    {/* Mapa - Único contenido relevante */}
    <Card className="border-2 border-cyan/30 shadow-lg hover:shadow-xl transition-shadow bg-white/80 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="h-64 md:h-80 rounded-xl flex flex-col items-center justify-center text-charcoal/40 text-sm border-2 border-dashed border-purple-electric/30 bg-background/20">
          <span className="text-5xl mb-3">🗺️</span>
          <span className="text-primary font-medium">Google Maps</span>
          <span className="text-xs text-charcoal/40 mt-1">Próximamente disponible</span>
        </div>
      </CardContent>
    </Card>

    {/* Mini badges de referencia rápida */}
    <div className="flex flex-wrap justify-center gap-3 mt-6">
      <Badge className="bg-cyan/10 text-cyan border border-cyan/30 px-3 py-1.5 text-xs">
        🕐 Lun-Vie 10:00-18:30, Sab 10:00 a 15:00 horas
      </Badge>
      <Badge className="bg-yellow-bright/10 text-charcoal border border-yellow-bright/30 px-3 py-1.5 text-xs">
        🏪 Retiro en tienda
      </Badge>
      <Badge className="bg-mint-green/10 text-mint-green border border-mint-green/30 px-3 py-1.5 text-xs">
        🚚 Envíos a regiones
      </Badge>
    </div>
  </div>
</section>
    </Layout>
  )
}