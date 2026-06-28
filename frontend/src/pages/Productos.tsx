// src/pages/Productos.tsx
import { useState, useEffect } from "react"
import Layout from "../components/layout/Layout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb"
import ProductList from "../components/products/ProductList"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"

// Datos de ejemplo (simulando una API)
const productosData = [
  { id: 1, name: "Bufanda de Lana", price: 12990, image: "🧣", isOnSale: true, discount: 15, stock: 25 },
  { id: 2, name: "Guantes de Cuero", price: 8500, image: "🧤", isOnSale: false, discount: 0, stock: 8 },
  { id: 3, name: "Gorro de Invierno", price: 25000, image: "🧢", isOnSale: true, discount: 20, stock: 0 },
  { id: 4, name: "Set de Peinado", price: 3200, image: "💇", isOnSale: false, discount: 0, stock: 15 },
  { id: 5, name: "Juego de Mesa", price: 45000, image: "🎲", isOnSale: false, discount: 0, stock: 3 },
  { id: 6, name: "Bolsa de Regalo", price: 6800, image: "🎁", isOnSale: true, discount: 10, stock: 20 },
]

// Categorías con colores (más rosado)
const categories = [
  { id: "cabello", name: "Cabello", icon: "💇", color: "hover:bg-[#FF6B81]/20 hover:border-[#FF6B81]" },
  { id: "juguetes", name: "Juguetes", icon: "🧸", color: "hover:bg-[#C06060]/20 hover:border-[#C06060]" },
  { id: "cumpleanos", name: "Cumpleaños", icon: "🎂", color: "hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { id: "hogar", name: "Hogar", icon: "🏠", color: "hover:bg-[#7D5FFF]/20 hover:border-[#7D5FFF]" },
  { id: "melamina", name: "Melamina", icon: "🍽️", color: "hover:bg-[#FF9F43]/20 hover:border-[#FF9F43]" },
  { id: "temporada", name: "Temporada", icon: "🍂", color: "hover:bg-[#603060]/20 hover:border-[#C06060]" },
]

export default function Productos() {
  const [productos, setProductos] = useState<typeof productosData>([])
  const [cargando, setCargando] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductos(productosData)
      setCargando(false)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const filteredProducts = productos.filter(p => {
    const matchesCategory = !selectedCategory || p.name.includes(selectedCategory)
    const matchesPrice = p.price >= priceRange.min && p.price <= priceRange.max
    return matchesCategory && matchesPrice
  })

  if (cargando) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4 animate-bounce">⏳</div>
            <p className="text-xl font-bold text-[#FF6B81] animate-pulse">Cargando productos...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* ====== BREADCRUMB SHADCN ====== */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#FF6B81]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#FF6B81]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/productos" className="text-[#603060] hover:text-[#FF6B81]">
                  Tienda
                </BreadcrumbLink>
              </BreadcrumbItem>
              {selectedCategory && (
                <>
                  <BreadcrumbSeparator className="text-[#FF6B81]" />
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-[#FF6B81] font-bold">
                      {selectedCategory}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== BANNER MEJORADO ====== */}
      <div className="bg-gradient-to-r from-[#603060] via-[#C06060] to-[#FF6B81] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-4 py-1 rounded-full">
            🛍️ Tienda
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold">🏪 Tienda Comercial Uruguay</h1>
          <p className="text-white/80 mt-2">Encuentra miles de productos para tu hogar y familia.</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 border-2 ${
                  selectedCategory === cat.name
                    ? 'bg-[#FFD93D] text-[#303030] border-[#FFD93D]'
                    : 'bg-white/10 text-white border-white/20 hover:border-white/50'
                } ${cat.color}`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ====== LAYOUT PRINCIPAL ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* ====== FILTROS (Desktop) ====== */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl border-2 border-[#FF6B81] shadow-lg sticky top-4">
              <h3 className="font-bold text-lg text-[#603060] mb-4 flex items-center gap-2">
                <span>📂</span> Filtros
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#303030] mb-2">Categorías</h4>
                  {categories.map(cat => (
                    <label key={cat.id} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition">
                      <input
                        type="checkbox"
                        checked={selectedCategory === cat.name}
                        onChange={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                        className="accent-[#FF6B81] w-4 h-4"
                      />
                      <span className="text-sm">{cat.icon} {cat.name}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <h4 className="font-semibold text-[#303030] mb-2 flex items-center gap-2">
                    <span>💰</span> Rango de Precio
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81]"
                      placeholder="Min"
                    />
                    <input
                      type="number"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className="w-1/2 px-2 py-1 border-2 border-[#FF6B81] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81]"
                      placeholder="Max"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[#303030] mb-2 flex items-center gap-2">
                    <span>📦</span> Disponibilidad
                  </h4>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#00D2D3] transition">
                    <input type="checkbox" className="accent-[#00D2D3] w-4 h-4" />
                    <span className="text-sm">Solo Ofertas</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-[#90C090] transition">
                    <input type="checkbox" className="accent-[#90C090] w-4 h-4" />
                    <span className="text-sm">Stock Inmediato</span>
                  </label>
                </div>

                <button
                  onClick={() => { setSelectedCategory(""); setPriceRange({ min: 0, max: 50000 }); }}
                  className="w-full bg-gradient-to-r from-[#FF6B81] to-[#C06060] hover:from-[#C06060] hover:to-[#FF6B81] text-white font-bold py-2.5 rounded-lg transition-all hover:scale-[1.02]"
                >
                  🧹 Limpiar Filtros
                </button>
              </div>
            </div>
          </div>

          {/* ====== PRODUCTOS ====== */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <p className="text-[#303030] font-medium flex items-center gap-2">
                <span className="text-[#FF6B81] font-bold">{filteredProducts.length}</span>
                productos encontrados
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden bg-[#FF6B81] hover:bg-[#C06060] text-white px-4 py-2 rounded-lg font-bold transition"
                >
                  ⚙️ Filtrar
                </button>
                <select className="border-2 border-[#FF6B81] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B81] bg-white">
                  <option>⭐ Destacados</option>
                  <option>⬆️ Menor Precio</option>
                  <option>⬇️ Mayor Precio</option>
                  <option>🆕 Más Nuevos</option>
                </select>
              </div>
            </div>

            {(selectedCategory || priceRange.min > 0 || priceRange.max < 50000) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategory && (
                  <span className="bg-[#FF6B81]/20 text-[#FF6B81] px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-[#FF6B81]/30">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("")} className="hover:text-[#C06060] transition">✕</button>
                  </span>
                )}
                <button
                  onClick={() => { setSelectedCategory(""); setPriceRange({ min: 0, max: 50000 }); }}
                  className="text-[#C06060] text-sm font-medium hover:underline transition"
                >
                  🧹 Limpiar todo
                </button>
              </div>
            )}

            <ProductList products={filteredProducts} />

            {filteredProducts.length > 0 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white">
                  ‹
                </Button>
                <Button className="bg-[#FF6B81] text-white hover:bg-[#C06060]">1</Button>
                <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white">
                  2
                </Button>
                <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white">
                  3
                </Button>
                <Button variant="outline" className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white">
                  ›
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ====== FILTROS MÓVIL ====== */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto animate-slide-in shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2">
                <span>📂</span> Filtros
              </h2>
              <button onClick={() => setShowFilters(false)} className="text-2xl hover:text-[#FF6B81] transition">✕</button>
            </div>

            <div className="space-y-4">
              {categories.map(cat => (
                <label key={cat.id} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition">
                  <input type="checkbox" className="accent-[#FF6B81] w-4 h-4" />
                  <span>{cat.icon} {cat.name}</span>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full bg-gradient-to-r from-[#FF6B81] to-[#C06060] hover:from-[#C06060] hover:to-[#FF6B81] text-white font-bold py-3 rounded-lg mt-6 transition-all hover:scale-[1.02]"
            >
              ✅ Aplicar filtros
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}