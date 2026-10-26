// 📁 frontend/src/components/products/ProductGrid.tsx

/**
 * 📌 PRODUCT GRID
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Muestra una cuadrícula (grid) de productos usando ProductCard.
 * 
 * ✅ Responsabilidades:
 * - Mostrar un grid responsive de productos
 * - Pasar props a cada ProductCard
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica de negocio
 * - Responsive (mobile-first)
 * - Accesible con aria-label
 * 
 * @param {Object} props
 * @param {Product[]} props.products - Lista de productos a mostrar
 * @param {Set<string>} [props.favorites] - Set con IDs de productos favoritos
 * @param {Function} [props.onToggleFavorite] - Función para agregar/eliminar favoritos
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @returns {JSX.Element} - Grid de productos
 */

import ProductCard from "./ProductCard";
import type { Product } from "../../services/productService";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface ProductGridProps {
  /** Lista de productos a mostrar */
  products: Product[];
  /** Set con los IDs de productos favoritos del usuario (por defecto: vacío) */
  favorites?: Set<string>;
  /** Función para agregar o eliminar un producto de favoritos */
  onToggleFavorite?: (productId: string) => void;
  /** Función para agregar un producto al carrito */
  onAddToCart?: (productId: string) => void;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function ProductGrid({
  products,
  favorites = new Set(),
  onToggleFavorite,
  onAddToCart,
}: ProductGridProps) {
  // =============================================
  // 📦 RENDERIZADO DEL GRID
  // =============================================

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      aria-label={`Grid de ${products.length} productos`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={
            onToggleFavorite ? () => onToggleFavorite(product.id) : undefined
          }
          onAddToCart={
            onAddToCart ? () => onAddToCart(product.id) : undefined
          }
        />
      ))}
    </div>
  );
}