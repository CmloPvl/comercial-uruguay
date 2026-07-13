import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cartService, type CartItem as ApiCartItem } from "../services/cartService"
import { useAuth } from "./AuthContext"

export interface CartItem {
  id: number | string
  name: string
  price: number
  image?: string
  quantity: number
  stock: number
  isOnSale?: boolean
  discount?: number
  productId?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (product: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>
  addItemById: (productId: string, quantity: number) => Promise<void>
  removeItem: (id: number | string) => Promise<void>
  updateQuantity: (id: number | string, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  totalItems: number
  totalPrice: number
  loading: boolean
  refreshCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()  // ✅ user eliminado
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  // =============================================
  // CARGAR CARRITO DESDE EL BACKEND AL INICIAR
  // =============================================
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart()
    } else {
      setItems([])
    }
  }, [isAuthenticated])

  const refreshCart = async () => {
    if (!isAuthenticated) return

    try {
      setLoading(true)
      const data = await cartService.getCart()
      // Convertir respuesta de API al formato local
      const cartItems: CartItem[] = data.items.map((item: ApiCartItem) => ({
        id: item.productId,
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        stock: item.stock || 999,
        isOnSale: item.isOnSale || false,
        discount: item.discount || 0,
      }))
      setItems(cartItems)
    } catch (error) {
      console.error("Error al cargar carrito:", error)
    } finally {
      setLoading(false)
    }
  }

  // =============================================
  // AGREGAR PRODUCTO (local + API)
  // =============================================
  const addItem = async (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
    // Si está autenticado, guardar en el backend
    if (isAuthenticated && product.productId) {
      try {
        setLoading(true)
        await cartService.addItem(product.productId, quantity)
        await refreshCart()
        return
      } catch (error) {
        console.error("Error al agregar al carrito:", error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    // Fallback: modo local (sin conexión o sin autenticación)
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  // =============================================
  // AGREGAR PRODUCTO POR ID (para ProductoDetalle)
  // =============================================
  const addItemById = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      throw new Error("Debes iniciar sesión para agregar productos al carrito")
    }

    try {
      setLoading(true)
      await cartService.addItem(productId, quantity)
      await refreshCart()
    } catch (error) {
      console.error("Error al agregar al carrito:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // =============================================
  // ELIMINAR PRODUCTO
  // =============================================
  const removeItem = async (id: number | string) => {
    const productId = typeof id === 'string' ? id : id.toString()

    if (isAuthenticated) {
      try {
        setLoading(true)
        await cartService.removeItem(productId)
        await refreshCart()
        return
      } catch (error) {
        console.error("Error al eliminar del carrito:", error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    // Modo local
    setItems(prev => prev.filter(item => item.id !== id))
  }

  // =============================================
  // ACTUALIZAR CANTIDAD
  // =============================================
  const updateQuantity = async (id: number | string, quantity: number) => {
    if (quantity <= 0) {
      await removeItem(id)
      return
    }

    const productId = typeof id === 'string' ? id : id.toString()

    if (isAuthenticated) {
      try {
        setLoading(true)
        await cartService.updateQuantity(productId, quantity)
        await refreshCart()
        return
      } catch (error) {
        console.error("Error al actualizar cantidad:", error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    // Modo local
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  // =============================================
  // VACIAR CARRITO
  // =============================================
  const clearCart = async () => {
    if (isAuthenticated) {
      try {
        setLoading(true)
        await cartService.clearCart()
        await refreshCart()
        return
      } catch (error) {
        console.error("Error al vaciar carrito:", error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    setItems([])
  }

  // =============================================
  // CALCULAR TOTALES
  // =============================================
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        addItemById,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        loading,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}