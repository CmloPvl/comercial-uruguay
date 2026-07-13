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
import { Badge } from "../components/ui/badge"
import { productService, type Product } from "../services/productService"
import { favoriteService } from "../services/favoriteService"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import ProductList from "../components/products/ProductList"
import ProductFilters from "../components/products/ProductFilters"

// Categorías con colores
const categories = [
  { id: "cabello", name: "Cabello", icon: "💇", color: "hover:bg-[#FF6B81]/20 hover:border-[#FF6B81]" },
  { id: "juguetes", name: "Juguetes", icon: "🧸", color: "hover:bg-[#C06060]/20 hover:border-[#C06060]" },
  { id: "cumpleanos", name: "Cumpleaños", icon: "🎂", color: "hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { id: "hogar", name: "Hogar", icon: "🏠", color: "hover:bg-[#7D5FFF]/20 hover:border-[#7D5FFF]" },
  { id: "melamina", name: "Melamina", icon: "🍽️", color: "hover:bg-[#FF9F43]/20 hover:border-[#FF9F43]" },
  { id: "temporada", name: "Temporada", icon: "🍂", color: "hover:bg-[#603060]/20 hover:border-[#C06060]" },
]

export default function Productos() {
  const [productos, setProductos] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()
  const { addItemById } = useCart()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // =============================================
  // CARGAR PRODUCTOS
  // =============================================
  useEffect(() => {
    loadProducts()
    if (user) {
      loadFavorites()
    }
  }, [])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts()
      setProductos(data?.products || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  const loadFavorites = async () => {
    try {
      const favs = await favoriteService.getFavorites()
      setFavorites(new Set(favs.map(f => f.product.id)))
    } catch (error) {
      console.error("Error al cargar favoritos:", error)
    }
  }

  // =============================================
  // MANEJAR FAVORITOS
  // =============================================
  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      alert("Inicia sesión para guardar favoritos")
      return
    }

    try {
      if (favorites.has(productId)) {
        await favoriteService.removeFavorite(productId)
        setFavorites(prev => {
          const newSet = new Set(prev)
          newSet.delete(productId)
          return newSet
        })
      } else {
        await favoriteService.addFavorite(productId)
        setFavorites(prev => new Set([...prev, productId]))
      }
    } catch (err: any) {
      alert("Error: " + err.message)
    }
  }

  // =============================================
  // MANEJAR CARRITO
  // =============================================
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

  // =============================================
  // FILTRAR PRODUCTOS
  // =============================================
  const filteredProducts = productos.filter(p => {
    const matchesCategory = !selectedCategory || p.category?.name === selectedCategory
    const minPrice = priceRange.min !== "" ? Number(priceRange.min) : 0
    const maxPrice = priceRange.max !== "" ? Number(priceRange.max) : Infinity
    const matchesPrice = p.price >= minPrice && p.price <= maxPrice
    return matchesCategory && matchesPrice
  })

  // =============================================
  // MANEJAR FILTROS
  // =============================================
  const handlePriceChange = (min: string, max: string) => {
    setPriceRange({ min, max })
  }

  const handleClearFilters = () => {
    setSelectedCategory("")
    setPriceRange({ min: "", max: "" })
  }

  // =============================================
  // ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando productos...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // =============================================
  // ERROR
  // =============================================
  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-[#303030]">Error al cargar productos</h2>
          <p className="text-gray-500 mt-2">{error}</p>
          <button
            onClick={loadProducts}
            className="mt-4 bg-[#7D5FFF] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#603060] transition"
          >
            Reintentar
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* ====== BREADCRUMB ====== */}
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
                <BreadcrumbPage className="text-[#FF6B81] font-bold">
                  Tienda
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== BANNER ====== */}
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

      {/* ====== CONTENIDO ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* ====== FILTROS (Desktop) ====== */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={handlePriceChange}
              onClearFilters={handleClearFilters}
            />
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
              </div>
            </div>

            <ProductList
              products={filteredProducts}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </div>

      {/* ====== FILTROS MÓVIL ====== */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-80 h-full p-6 overflow-y-auto shadow-2xl">
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