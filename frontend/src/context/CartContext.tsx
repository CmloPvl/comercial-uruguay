// 📁 frontend/src/context/CartContext.tsx

/**
 * 📌 CONTEXTO DEL CARRITO
 * 
 * Estado global del carrito de compras.
 * 
 * ✅ Responsabilidades:
 * - Mantener los items del carrito en memoria
 * - Sincronizar con el backend (CRUD)
 * - Calcular totales (items y precio)
 * - Proveer funciones a toda la app
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Sincronización con backend
 * - Fallback local (sin autenticación)
 * - Comentarios explicativos
 * 
 * 🆕 Soporte para packs promocionales:
 *   - Cada item incluye packPrice, packQuantity, packApplied, subtotal
 *   - El subtotal viene calculado del backend (con packs aplicados)
 *   - totalPrice suma los subtotales (no recalcula)
 */

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { cartService, type CartItem as ApiCartItem } from "../services/cartService"
import { useAuth } from "./AuthContext"

// =============================================
// 📋 INTERFACES
// =============================================

/**
 * Item del carrito en el frontend (formato local)
 * Es una versión "aplanada" del CartItem de la API
 */
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
  packPrice?: number | null          // 🆕 Precio del pack
  packQuantity?: number | null       // 🆕 Cantidad del pack
  packApplied?: boolean              // 🆕 ¿Se aplicó el pack?
  subtotal?: number                  // 🆕 Subtotal calculado (con packs)
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

// =============================================
// 🎯 PROVIDER
// =============================================

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  // =============================================
  // 🔄 CARGAR CARRITO AL INICIAR
  // =============================================
  useEffect(() => {
    if (isAuthenticated) {
      refreshCart()
    } else {
      setItems([])
    }
  }, [isAuthenticated])

  /**
   * 🔄 REFRESCAR CARRITO
   * 
   * Trae el carrito del backend y lo convierte al formato local.
   * 🆕 Incluye packPrice, packQuantity, packApplied, subtotal.
   */
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
        // 🆕 Campos de pack
        packPrice: item.packPrice ?? null,
        packQuantity: item.packQuantity ?? null,
        packApplied: item.packApplied ?? false,
        subtotal: item.subtotal,
      }))
      setItems(cartItems)
    } catch (error) {
      console.error("Error al cargar carrito:", error)
    } finally {
      setLoading(false)
    }
  }

  // =============================================
  // ➕ AGREGAR PRODUCTO
  // =============================================
  /**
   * Agrega un producto al carrito.
   * - Si está autenticado: guarda en el backend y refresca
   * - Si no: guarda en memoria (fallback)
   */
  const addItem = async (product: Omit<CartItem, "quantity">, quantity: number = 1) => {
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

    // Fallback: modo local
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
  // ➕ AGREGAR PRODUCTO POR ID
  // =============================================
  /**
   * Agrega un producto por su ID (usado en ProductoDetalle).
   * Requiere autenticación.
   */
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
  // 🗑️ ELIMINAR PRODUCTO
  // =============================================
  /**
   * Elimina un producto del carrito.
   * - Si está autenticado: elimina en backend y refresca
   * - Si no: elimina en memoria
   */
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
  // ✏️ ACTUALIZAR CANTIDAD
  // =============================================
  /**
   * Actualiza la cantidad de un producto.
   * - Si quantity <= 0: elimina el producto
   * - Si está autenticado: actualiza en backend y refresca
   * - Si no: actualiza en memoria
   */
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
  // 🗑️ VACIAR CARRITO
  // =============================================
  /**
   * Elimina todos los items del carrito.
   * - Si está autenticado: vacía en backend y refresca
   * - Si no: vacía en memoria
   */
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
  // 🧮 CALCULAR TOTALES
  // =============================================
  // Total de items (suma de cantidades)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  
  // 🆕 Total de precio: usa subtotal (calculado con packs en backend)
  // Si no hay subtotal (fallback local), calcula price × quantity
  const totalPrice = items.reduce((sum, item) => {
    const itemSubtotal = item.subtotal ?? (item.price * item.quantity)
    return sum + itemSubtotal
  }, 0)

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

// =============================================
// 🎣 HOOK: useCart
// =============================================

/**
 * Hook para acceder al contexto del carrito.
 * Lanza error si se usa fuera del CartProvider.
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider")
  }
  return context
}