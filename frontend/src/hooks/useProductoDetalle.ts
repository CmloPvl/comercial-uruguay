// 📁 frontend/src/hooks/useProductoDetalle.ts

/**
 * 📌 HOOK PERSONALIZADO: useProductoDetalle
 * 
 * Encapsula toda la lógica de la página de detalle de producto:
 * - Carga del producto por ID
 * - Verificación de favoritos
 * - Agregar al carrito
 * - Agregar/eliminar favoritos
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @param {string} id - ID del producto
 * @returns {Object} - Estados y funciones del detalle de producto
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { productService } from "../services/productService";
import { favoriteService } from "../services/favoriteService";

export function useProductoDetalle(id: string | undefined) {
  const { user } = useAuth();
  const { addItem } = useCart();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================
  const finalPrice = product?.isOnSale && product?.discount > 0
    ? product.price * (1 - product.discount / 100)
    : product?.price || 0;

  const isOutOfStock = product?.stock === 0;

  // =============================================
  // 🔄 CARGAR PRODUCTO
  // =============================================
  const loadProduct = async () => {
    if (!id) {
      setError("ID de producto no proporcionado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProductById(id);
      setProduct(data);

      // Verificar si está en favoritos
      if (user) {
        const fav = await favoriteService.isFavorite(id);
        setIsFavorite(fav);
      }
    } catch (err: any) {
      setError(err.message || "Error al cargar el producto");
      toast.error(`❌ ${err.message || "Error al cargar el producto"}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🛒 AGREGAR AL CARRITO
  // =============================================
  const handleAddToCart = async () => {
    if (!user) {
      toast.error("❌ Inicia sesión para agregar productos al carrito", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      return;
    }

    try {
      setAddingToCart(true);
      addItem(
        {
          id: product.id,
          name: product.name,
          price: finalPrice,
          image: product.images?.[0],
          stock: product.stock,
          isOnSale: product.isOnSale,
          discount: product.discount,
        },
        quantity
      );
      toast.success(`✅ "${product.name}" agregado al carrito`, {
        icon: "🛒",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } catch (err: any) {
      toast.error(`❌ ${err.message || "Error al agregar al carrito"}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setAddingToCart(false);
    }
  };

  // =============================================
  // ⭐ AGREGAR/ELIMINAR FAVORITO
  // =============================================
  const handleToggleFavorite = async () => {
    if (!user) {
      toast.error("❌ Inicia sesión para guardar favoritos", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      return;
    }

    try {
      if (isFavorite) {
        await favoriteService.removeFavorite(product.id);
        setIsFavorite(false);
        toast.success("✅ Eliminado de favoritos", {
          icon: "💔",
          style: {
            border: "2px solid #FF9F43",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      } else {
        await favoriteService.addFavorite(product.id);
        setIsFavorite(true);
        toast.success("✅ Agregado a favoritos", {
          icon: "❤️",
          style: {
            border: "2px solid #FF6B81",
            padding: "16px",
            backgroundColor: "#FAF9E2",
            color: "#303030",
          },
        });
      }
    } catch (err: any) {
      toast.error(`❌ ${err.message || "Error al actualizar favoritos"}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    }
  };

  // =============================================
  // 📦 MANEJAR CANTIDAD
  // =============================================
  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(product?.stock || 1, prev + 1));
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadProduct();
  }, [id, user]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    product,
    loading,
    error,
    quantity,
    isFavorite,
    addingToCart,
    finalPrice,
    isOutOfStock,

    // 📤 Funciones
    loadProduct,
    handleAddToCart,
    handleToggleFavorite,
    increaseQuantity,
    decreaseQuantity,
    setQuantity,
  };
}