import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "../components/layout/Layout"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { productService, type Product } from "../services/productService"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"

export default function Ofertas() {
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
      // Filtrar solo productos en oferta
      const saleProducts = data?.products?.filter((p: Product) => p.isOnSale === true) || []
      setProducts(saleProducts)
    } catch (err: any) {
      setError(err.message || "Error al cargar ofertas")
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

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7D5FFF] mx-auto"></div>
            <p className="text-gray-500 mt-4">Cargando ofertas...</p>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* ====== BANNER ====== */}
      <div className="bg-gradient-to-r from-[#FF6B81] via-[#FFD93D] to-[#FF6B81] py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="bg-[#603060] text-white mb-3 px-4 py-1 rounded-full">
            🔥 Ofertas Especiales
          </Badge>
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#303030]">
            🔥 OFERTAS IMPERDIBLES
          </h1>
          <p className="text-[#303030]/80 mt-2 text-lg">
            Aprovecha los mejores descuentos en productos seleccionados.
          </p>
        </div>
      </div>

      {/* ====== PRODUCTOS EN OFERTA ====== */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-[#303030]">No hay ofertas disponibles</h3>
            <p className="text-gray-500 mt-2">Vuelve pronto para encontrar nuevas ofertas.</p>
            <Link to="/productos" className="mt-4 inline-block text-[#7D5FFF] hover:underline">
              Ver todos los productos →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const finalPrice = product.isOnSale && product.discount > 0
                ? product.price * (1 - product.discount / 100)
                : product.price
              const hasImage = product.images && Array.isArray(product.images) && product.images.length > 0
              const isOutOfStock = product.stock === 0

              return (
                <Card key={product.id} className="border-2 border-[#FF6B81] hover:border-[#FFD93D] transition-all hover:shadow-xl group">
                  <CardContent className="p-4">
                    {/* Badge de oferta */}
                    <div className="relative">
                      {product.isOnSale && product.discount > 0 && (
                        <Badge className="absolute top-2 left-2 bg-[#FF6B81] text-white font-bold px-3 py-1.5 rounded-full animate-pulse z-10">
                          🔥 -{product.discount}%
                        </Badge>
                      )}
                    </div>

                    {/* Imagen */}
                    <Link to={`/producto/${product.id}`}>
                      <div className="aspect-square bg-gradient-to-br from-[#F0F0C0]/30 to-[#F0C0F0]/30 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                        {hasImage ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <span className="text-6xl">📦</span>
                        )}
                      </div>
                    </Link>

                    {/* Categoría */}
                    {product.category && (
                      <Badge className="bg-[#00D2D3]/10 text-[#00D2D3] hover:bg-[#00D2D3]/20 mb-2">
                        {product.category.name}
                      </Badge>
                    )}

                    {/* Nombre */}
                    <Link to={`/producto/${product.id}`}>
                      <h3 className="font-bold text-[#303030] hover:text-[#7D5FFF] transition-colors line-clamp-2 min-h-[48px]">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Precio */}
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        {product.isOnSale && product.discount > 0 && (
                          <span className="text-sm text-gray-400 line-through mr-2">
                            ${product.price.toLocaleString('es-CL')}
                          </span>
                        )}
                        <span className="text-xl font-extrabold text-[#FF6B81]">
                          ${Math.round(finalPrice).toLocaleString('es-CL')}
                        </span>
                      </div>
                      <Badge className="bg-[#FFD93D] text-[#303030]">
                        🔥 Oferta
                      </Badge>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-2 mt-3">
                      <Button
                        onClick={() => handleAddToCart(product.id)}
                        disabled={isOutOfStock}
                        className="flex-1 bg-gradient-to-r from-[#FF6B81] to-[#FFD93D] hover:from-[#FFD93D] hover:to-[#FF6B81] text-[#303030] font-bold text-sm py-2 rounded-lg shadow-md hover:shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isOutOfStock ? "Sin Stock" : "🛒 Agregar"}
                      </Button>
                      <Link to={`/producto/${product.id}`}>
                        <Button variant="outline" className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white font-bold text-sm py-2 px-4 rounded-lg transition-all hover:scale-[1.02]">
                          👁️
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </Layout>
  )
}