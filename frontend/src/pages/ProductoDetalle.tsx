import { useState, useEffect } from "react"
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
import { productService } from "../services/productService"
import { useCart } from "../context/CartContext"
import { useAuth } from "../context/AuthContext"
import { favoriteService } from "../services/favoriteService"

export default function ProductoDetalle() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const { addItem } = useCart()  // ✅ Cambiado de addToCart a addItem
  const { user } = useAuth()

  useEffect(() => {
    if (id) {
      loadProduct()
    }
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await productService.getProductById(id!)
      setProduct(data)
      
      // Verificar si está en favoritos
      if (user) {
        const fav = await favoriteService.isFavorite(id!)
        setIsFavorite(fav)
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar el producto")
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!user) {
      alert("Inicia sesión para agregar productos al carrito")
      return
    }
    
    try {
      setAddingToCart(true)
      // ✅ Usando addItem en lugar de addToCart
      addItem({
        id: product.id,
        name: product.name,
        price: finalPrice,
        image: product.images?.[0],
        stock: product.stock,
        isOnSale: product.isOnSale,
        discount: product.discount,
      }, quantity)
      alert("✅ Producto agregado al carrito")
    } catch (err: any) {
      alert("❌ " + err.message)
    } finally {
      setAddingToCart(false)
    }
  }

  const handleToggleFavorite = async () => {
    if (!user) {
      alert("Inicia sesión para guardar favoritos")
      return
    }

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(product.id)
        setIsFavorite(false)
      } else {
        await favoriteService.addFavorite(product.id)
        setIsFavorite(true)
      }
    } catch (err: any) {
      alert("❌ " + err.message)
    }
  }

  // =============================================
  // ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando producto...</p>
          </div>
        </div>
      </Layout>
    )
  }

  // =============================================
  // ERROR
  // =============================================
  if (error || !product) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center py-12 px-4">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-[#303030]">Producto no encontrado</h2>
          <p className="text-gray-500 mt-2">{error || "El producto que buscas no existe."}</p>
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
      {/* ====== BREADCRUMB ====== */}
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
              {product.images?.[0] ? (
                <img src={product.images[0]} alt={product.name} className="w-full h-full object-contain" />
              ) : (
                "📦"
              )}
            </div>
          </div>

          {/* ====== COLUMNA DERECHA: INFORMACIÓN ====== */}
          <div className="lg:w-1/2 space-y-6">
            <Badge className="bg-[#00D2D3] text-white">
              {product.category?.name || 'Sin categoría'}
            </Badge>

            <h1 className="text-3xl font-extrabold text-[#303030]">{product.name}</h1>
            <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>

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
              <Button 
                onClick={handleAddToCart}
                disabled={isOutOfStock || addingToCart}
                className="w-full bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-3 text-lg rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addingToCart ? "Agregando..." : isOutOfStock ? "Sin Stock" : "🛒 Agregar al Carrito"}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={handleToggleFavorite}
                className={`w-full font-bold py-3 text-lg rounded-xl transition-all ${
                  isFavorite 
                    ? 'border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10' 
                    : 'border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81]/10'
                }`}
              >
                {isFavorite ? '♥ Quitar de favoritos' : '♡ Guardar en favoritos'}
              </Button>
            </div>
          </div>
        </div>

        {/* ====== DESCRIPCIÓN ====== */}
        <div className="mt-12 border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-[#603060] mb-4">📋 Detalles del Artículo</h2>
          
          <Card className="bg-[#F0F0C0]/30 border border-[#00D2D3]/30">
            <CardContent className="p-6">
              <p className="text-[#303030] leading-relaxed">{product.description || 'Sin descripción disponible'}</p>
            </CardContent>
          </Card>
        </div>

        {/* ====== BOTÓN DE VOLVER ====== */}
        <div className="mt-8 text-center">
          <Link to="/productos">
            <Button variant="outline" className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white">
              ← Ver más productos
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}