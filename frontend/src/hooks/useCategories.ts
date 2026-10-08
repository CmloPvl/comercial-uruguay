// 📁 frontend/src/hooks/useCategories.ts

/**
 * 📌 HOOK PERSONALIZADO: useCategories
 * 
 * Hook genérico para leer categorías desde la API.
 * Reutilizable en toda la app:
 * - Hero (descripción dinámica)
 * - CategoriesSection (sección de categorías)
 * - Productos (filtros)
 * - AdminProductos (selector)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en toda la app
 * - Fácil de testear
 * - Manejo de errores con toasts centralizados
 * - Datos derivados (texto plano, iconos, colores)
 * - Los iconos vienen de la BD (admin los asigna)
 * 
 * @returns {Object} - Categorías, loading, error y funciones
 */

import { useState, useEffect, useMemo } from "react";
import { categoryService, type Category } from "../services/categoryService";
import { 
  getCategoryColor, 
  getCategoryIcon 
} from "../utils/categoryUtils";
import { showErrorToastWithFallback } from "../utils/errorMessages";

// =============================================
// 🎯 HOOK PRINCIPAL
// =============================================

export function useCategories() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🔄 CARGAR CATEGORÍAS
  // =============================================
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      const errorMessage = "Error al cargar categorías";
      setError(errorMessage);
      showErrorToastWithFallback(err, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================

  /** Texto plano con los nombres de las categorías (ej: "Hogar, Cumpleaños, Juguetes") */
  const categoriesText = useMemo(
    () => categories.map((c) => c.name).join(", "),
    [categories]
  );

  /** Categorías con iconos (de la BD) y colores asignados */
  const categoriesWithIcons = useMemo(
    () =>
      categories.map((cat, index) => ({
        ...cat,
        icon: getCategoryIcon(cat.icon), // ✅ Solo usa el de la BD
        color: getCategoryColor(index),
      })),
    [categories]
  );

  // =============================================
  // 🚀 EFECTO: CARGAR AL INICIO
  // =============================================
  useEffect(() => {
    loadCategories();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    categories,
    categoriesText,
    categoriesWithIcons,
    loading,
    error,
    loadCategories,
  };
}