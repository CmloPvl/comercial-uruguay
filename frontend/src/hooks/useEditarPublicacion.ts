// 📁 frontend/src/hooks/useEditarPublicacion.ts

/**
 * 📌 HOOK PERSONALIZADO: useEditarPublicacion
 * 
 * Encapsula toda la lógica de la página de edición de publicaciones:
 * - Carga del producto a editar
 * - Carga de categorías
 * - Actualización del producto
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @param {string} id - ID del producto a editar
 * @returns {Object} - Estados y funciones para editar publicaciones
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { productService } from "../services/productService";
import { categoryService, type Category } from "../services/categoryService";

export function useEditarPublicacion(id: string) {
  const navigate = useNavigate();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

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
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar el producto";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
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
  // 🔄 CARGAR CATEGORÍAS
  // =============================================
  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("❌ Error al cargar categorías", {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setLoadingCategories(false);
    }
  };

  // =============================================
  // 💾 ACTUALIZAR PRODUCTO
  // =============================================
  const handleSubmit = async (productData: any) => {
    try {
      setSubmitting(true);
      await productService.updateProduct(id, productData);
      toast.success("✅ Producto actualizado exitosamente", {
        icon: "💾",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
      navigate("/admin/productos");
    } catch (err: any) {
      const errorMessage = err.message || "Error al actualizar el producto";
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: "2px solid #FF6B81",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });
    } finally {
      setSubmitting(false);
    }
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    if (id) {
      loadProduct();
      loadCategories();
    }
  }, [id]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    product,
    loading,
    loadingCategories,
    submitting,
    error,
    categories,

    // 📤 Funciones
    loadProduct,
    loadCategories,
    handleSubmit,
  };
}