import Layout from "../components/layout/Layout"
import { Button } from "../components/ui/button"
import { Link } from "react-router-dom"
import Hero from "../components/home/Hero"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

// Datos de ejemplo para productos destacados
const featuredProducts = [
  { id: 1, name: "Bufanda de Lana", price: 12990, image: "🧣", isOnSale: true, discount: 15 },
  { id: 2, name: "Guantes de Cuero", price: 8500, image: "🧤", isOnSale: false },
  { id: 3, name: "Gorro de Invierno", price: 25000, image: "🧢", isOnSale: true, discount: 20 },
  { id: 4, name: "Set de Peinado", price: 3200, image: "💇", isOnSale: false },
  { id: 5, name: "Juego de Mesa", price: 45000, image: "🎲", isOnSale: false },
  { id: 6, name: "Bolsa de Regalo", price: 6800, image: "🎁", isOnSale: true, discount: 10 },
]

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
              <div
                key={cat.name}
                className={`bg-white p-4 rounded-xl border-2 ${cat.color} shadow-md hover:shadow-xl transition-all hover:-translate-y-2 cursor-pointer group`}
              >
                <div className="text-5xl mb-2 group-hover:scale-110 transition">{cat.icon}</div>
                <p className="font-bold text-[#303030] text-sm group-hover:text-[#7D5FFF] transition">{cat.name}</p>
              </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="border-2 border-[#00D2D3] hover:border-[#7D5FFF] transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden group">
                <CardContent className="p-4">
                  <div className="relative bg-gradient-to-br from-[#FFD93D]/20 to-[#FF6B81]/20 h-40 rounded-lg flex items-center justify-center text-6xl group-hover:scale-105 transition">
                    {product.image}
                    {product.isOnSale && (
                      <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-2 py-1 rounded-full animate-pulse">
                        🔥 -{product.discount}%
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-bold text-lg mt-3 text-[#303030] group-hover:text-[#7D5FFF] transition">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {product.isOnSale && (
                      <span className="text-sm text-gray-400 line-through">
                        ${(product.price * 1.2).toLocaleString()}
                      </span>
                    )}
                    <p className={`font-bold text-xl ${product.isOnSale ? 'text-[#FF6B81]' : 'text-[#7D5FFF]'}`}>
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <Button className="w-full mt-3 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold transition-all shadow-md hover:shadow-lg">
                    🛒 Agregar
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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

      {/* ====== UBICACIÓN ====== */}
      <section className="py-16 px-4 bg-gradient-to-br from-[#FFD93D] via-[#F0C030] to-[#FF9F43] text-[#303030]">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#7D5FFF] text-white mb-4 px-4 py-1 rounded-full">📍 Ubicación</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#603060] mb-2">📍 ENCUÉNTRANOS</h2>
          <p className="text-lg text-[#303030]/80">Uruguay 660 esquina Colón, Valparaíso</p>
          <Card className="bg-white/30 backdrop-blur-sm border-2 border-[#7D5FFF] shadow-xl my-6">
            <CardContent className="p-6">
              <div className="h-48 rounded-xl flex items-center justify-center text-[#303030]/60 text-sm border-2 border-dashed border-[#7D5FFF] bg-white/20">
                🗺️ [ Google Maps ]
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="bg-white/30 backdrop-blur-sm border-2 border-[#00D2D3] hover:shadow-[#00D2D3]/30 transition-shadow">
              <CardContent className="p-3 flex items-center justify-center gap-2 font-medium">
                <span className="text-2xl">🕐</span> Lun-Sáb 09:00 - 19:00 hrs
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur-sm border-2 border-[#FF6B81] hover:shadow-[#FF6B81]/30 transition-shadow">
              <CardContent className="p-3 flex items-center justify-center gap-2 font-medium">
                <span className="text-2xl">📱</span> +56 9 1234 5678
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur-sm border-2 border-[#00D2D3] hover:shadow-[#00D2D3]/30 transition-shadow">
              <CardContent className="p-3 flex items-center justify-center gap-2 font-medium">
                <span className="text-2xl">📞</span> 32 123 4567
              </CardContent>
            </Card>
            <Card className="bg-white/30 backdrop-blur-sm border-2 border-[#FF6B81] hover:shadow-[#FF6B81]/30 transition-shadow">
              <CardContent className="p-3 flex items-center justify-center gap-2 font-medium">
                <span className="text-2xl">✉️</span> comercialuruguay@gmail.com
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  )
}