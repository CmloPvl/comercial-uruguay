// 📁 frontend/src/components/products/ProductList.tsx

/**
 * 📌 PRODUCT LIST
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Es un "wrapper" (envoltorio) que recibe las props y las pasa a ProductGrid.
 * Además, maneja el estado vacío (sin productos).
 * 
 * ✅ ¿Por qué existe este componente?
 * - Maneja el estado vacío (sin productos)
 * - Por si en el futuro queremos cambiar la forma de mostrar la lista
 *   (ej: de grid a lista, o agregar paginación, ordenamiento, etc.)
 * - Mantiene la separación de responsabilidades:
 *   ProductList maneja la "lista", ProductGrid maneja el "grid"
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - Maneja estado vacío
 * - Fácil de modificar en el futuro
 * - Accesible con aria-label
 * 
 * @param {Object} props
 * @param {Product[]} props.products - Lista de productos a mostrar
 * @param {Set<string>} [props.favorites] - Set con IDs de productos favoritos
 * @param {Function} [props.onToggleFavorite] - Función para agregar/eliminar favoritos
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @param {string} [props.emptyMessage] - Mensaje cuando no hay productos
 * @returns {JSX.Element} - Componente ProductGrid o mensaje vacío
 */

import ProductGrid from "./ProductGrid";
import type { Product } from "../../services/productService";

// =============================================
// 📌 INTERFAZ DE PROPS
// =============================================

interface ProductListProps {
  /** Lista de productos a mostrar */
  products: Product[];
  /** Set con los IDs de productos favoritos del usuario */
  favorites?: Set<string>;
  /** Función para agregar o eliminar un producto de favoritos */
  onToggleFavorite?: (productId: string) => void;
  /** Función para agregar un producto al carrito */
  onAddToCart?: (productId: string) => void;
  /** Mensaje cuando no hay productos (default: "No se encontraron productos") */
  emptyMessage?: string;
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function ProductList({
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
  emptyMessage = "No se encontraron productos",
}: ProductListProps) {
  // =============================================
  // 📭 ESTADO VACÍO
  // =============================================
  if (products.length === 0) {
    return (
      <div 
        className="text-center py-16"
        aria-label="Sin productos"
      >
        <p className="text-6xl mb-4">🔍</p>
        <p className="text-xl font-bold text-[#603060] mb-2">
          {emptyMessage}
        </p>
        <p className="text-[#6A757C] text-sm">
          Intenta cambiar los filtros o la búsqueda
        </p>
      </div>
    );
  }

  // =============================================
  // 🛍️ GRID DE PRODUCTOS
  // =============================================
  return (
    <ProductGrid
      products={products}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  );
}