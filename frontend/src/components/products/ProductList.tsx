// 📁 frontend/src/components/products/ProductList.tsx

/**
 * 📌 PRODUCT LIST
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Es un "wrapper" (envoltorio) que recibe las props y las pasa directamente a ProductGrid.
 * 
 * ✅ ¿Por qué existe este componente?
 * - Por si en el futuro queremos cambiar la forma de mostrar la lista
 *   (ej: de grid a lista, o agregar paginación, ordenamiento, etc.)
 * - Mantiene la separación de responsabilidades:
 *   ProductList maneja la "lista", ProductGrid maneja el "grid"
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe datos y funciones por props
 * - No tiene lógica propia (es un "puente")
 * - Fácil de modificar en el futuro
 * 
 * @param {Object} props
 * @param {Product[]} props.products - Lista de productos a mostrar
 * @param {Set<string>} [props.favorites] - Set con IDs de productos favoritos
 * @param {Function} [props.onToggleFavorite] - Función para agregar/eliminar favoritos
 * @param {Function} [props.onAddToCart] - Función para agregar al carrito
 * @returns {JSX.Element} - Componente ProductGrid con las props pasadas
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
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export default function ProductList({
  products,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: ProductListProps) {
  // ✅ Simplemente pasa todas las props a ProductGrid
  // 🔄 Si en el futuro necesitamos transformar los datos, este es el lugar
  return (
    <ProductGrid
      products={products}
      favorites={favorites}
      onToggleFavorite={onToggleFavorite}
      onAddToCart={onAddToCart}
    />
  );
}