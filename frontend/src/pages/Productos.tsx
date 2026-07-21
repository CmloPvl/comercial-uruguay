import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import toast from 'react-hot-toast'
import Layout from "../components/layout/Layout"
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
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
import { categoryService, type Category } from "../services/categoryService"
import { favoriteService } from "../services/favoriteService"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import ProductList from "../components/products/ProductList"
import ProductFilters from "../components/products/ProductFilters"

// 🎨 Iconos por defecto para categorías (si no tienen icono en la BD)
const defaultCategoryIcons: Record<string, string> = {
  'Cabello': '💇',
  'Juguetes': '🧸',
  'Cumpleaños': '🎂',
  'Hogar': '🏠',
  'Melamina': '🍽️',
  'Temporada': '🍂',
}

// 🎨 Colores de la nueva paleta para categorías
const categoryColors = [
  { color: "hover:bg-[#FF6B81]/20 hover:border-[#FF6B81]" },
  { color: "hover:bg-[#C06060]/20 hover:border-[#C06060]" },
  { color: "hover:bg-[#FFD93D]/20 hover:border-[#FFD93D]" },
  { color: "hover:bg-[#7D5FFF]/20 hover:border-[#7D5FFF]" },
  { color: "hover:bg-[#FF9F43]/20 hover:border-[#FF9F43]" },
  { color: "hover:bg-[#603060]/20 hover:border-[#603060]" },
]

export default function Productos() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get("search") || ""
  
  const [productos, setProductos] = useState<Product[]>([])
  const [categorias, setCategorias] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [priceRange, setPriceRange] = useState({ min: "", max: "" })
  const [showFilters, setShowFilters] = useState(false)
  const { user } = useAuth()
  const { addItemById } = useCart()
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  // =============================================
  // CARGAR PRODUCTOS Y CATEGORÍAS
  // =============================================
  useEffect(() => {
    loadProducts()
    loadCategories()
    if (user) {
      loadFavorites()
    }
  }, [searchQuery])

  const loadProducts = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProducts({ search: searchQuery })
      setProductos(data || [])
    } catch (err: any) {
      setError(err.message || "Error al cargar productos")
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const data = await categoryService.getCategories()
      setCategorias(data)
    } catch (error) {
      console.error("Error al cargar categorías:", error)
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
  // MANEJAR FAVORITOS (con toast)
  // =============================================
  const handleToggleFavorite = async (productId: string) => {
    if (!user) {
      toast.error("Inicia sesión para guardar favoritos")
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
        toast.success("Producto eliminado de favoritos")
      } else {
        await favoriteService.addFavorite(productId)
        setFavorites(prev => new Set([...prev, productId]))
        toast.success("Producto agregado a favoritos ❤️")
      }
    } catch (err: any) {
      toast.error(err.message || "Error al guardar favoritos")
    }
  }

  // =============================================
  // MANEJAR CARRITO (con toast)
  // =============================================
  const handleAddToCart = async (productId: string) => {
    if (!user) {
      toast.error("Inicia sesión para agregar al carrito")
      return
    }

    try {
      await addItemById(productId, 1)
      toast.success("✅ Producto agregado al carrito")
    } catch (err: any) {
      toast.error(err.message || "Error al agregar al carrito")
    }
  }

// =============================================
// FILTRAR PRODUCTOS
// =============================================
const filteredProducts = productos.filter(p => {
  const matchesCategory = !selectedCategory || p.category_name === selectedCategory
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
    toast.success("Filtros limpiados")
  }

  // =============================================
  // ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <Layout>
        <LoadingSpinner fullScreen text="Cargando productos..." />
      </Layout>
    )
  }

  // =============================================
  // ERROR
  // =============================================
  if (error) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
          <ErrorMessage message={error} onRetry={loadProducts} />
        </div>
      </Layout>
    )
  }

  // =============================================
  // CATEGORÍAS PARA EL BANNER (con íconos)
  // =============================================
  const displayCategories = categorias.length > 0 ? categorias : []
  const categoriesWithIcons = displayCategories.map((cat, index) => ({
    ...cat,
    icon: cat.icon || defaultCategoryIcons[cat.name] || '📦',
    color: categoryColors[index % categoryColors.length].color
  }))

  return (
    <Layout>
      {/* ====== BREADCRUMB ====== */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Tienda
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* ====== BANNER ====== */}
      <div className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#FFD93D] text-[#303030] mb-3 px-4 py-1 rounded-full">
            🛍️ Tienda
          </Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold">🏪 Tienda Comercial Uruguay</h1>
          <p className="text-white/80 mt-2">Encuentra miles de productos para tu hogar y familia.</p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {categoriesWithIcons.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
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
              categories={categoriesWithIcons}
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
              {categoriesWithIcons.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 py-1 cursor-pointer hover:text-[#FF6B81] transition">
                  <input 
                    type="checkbox" 
                    checked={selectedCategory === cat.name}
                    onChange={() => setSelectedCategory(selectedCategory === cat.name ? "" : cat.name)}
                    className="accent-[#FF6B81] w-4 h-4" 
                  />
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