// 📁 frontend/src/pages/Ofertas.tsx

/**
 * 📌 PÁGINA: OFERTAS
 * 
 * Muestra solo los productos que tienen isOnSale = true.
 * 
 * ✅ Mejoras aplicadas:
 * - Usa ProductCard reutilizable (sin duplicar card)
 * - Toasts del helper (no más alert())
 * - Stock 0 → "Stock por WhatsApp" (no bloquea agregar)
 * - Muestra pack promocional
 * - Fix de categoría (category_name)
 * 
 * 🆕 Usa useOfertas (lógica extraída)
 */

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { Badge } from "../components/ui/badge";
import ProductCard from "../components/products/ProductCard";
import { productService, type Product } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  cartErrors,
  authErrors,
  productErrors,
} from "../utils/errorMessages";

export default function Ofertas() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { addItemById } = useCart();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getProducts();
      const saleProducts = data?.filter((p: Product) => p.isOnSale === true) || [];
      setProducts(saleProducts);
    } catch (err: any) {
      const errorMessage = err.message || productErrors.notFound;
      setError(errorMessage);
      showErrorToastWithFallback(err, productErrors.notFound);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId: string, productName: string) => {
    if (!user) {
      showErrorToastWithFallback(new Error(authErrors.loginRequired), authErrors.loginRequired);
      return;
    }

    try {
      await addItemById(productId, 1);
      showSuccessToast(`${productName} ${successMessages.addedToCart}`);
    } catch (err: any) {
      showErrorToastWithFallback(err, cartErrors.addFailed);
    }
  };

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
    );
  }

  return (
    <Layout>
      {/* BANNER */}
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

      {/* PRODUCTOS EN OFERTA */}
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
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product.id, product.name)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}