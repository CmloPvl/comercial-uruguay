// 📁 frontend/src/hooks/useCrearPublicacion.ts

/**
 * 📌 HOOK PERSONALIZADO: useCrearPublicacion
 * 
 * Encapsula toda la lógica de la página de creación de publicaciones:
 * - Carga de categorías
 * - Envío de producto (recibe datos de ProductForm)
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * 
 * @returns {Object} - Estados y funciones para crear publicaciones
 */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { productService } from "../services/productService";
import { categoryService, type Category } from "../services/categoryService";

export function useCrearPublicacion() {
  const navigate = useNavigate();

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

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
  // 🚀 ENVIAR FORMULARIO
  // =============================================
  const handleSubmit = async (productData: any) => {
    console.log('📸 [useCrearPublicacion] ===== INICIO =====');
    console.log('📸 [useCrearPublicacion] productData.images recibido:', productData.images);
    console.log('📸 [useCrearPublicacion] productData.images[0]:', productData.images?.[0]); // ✅ NUEVO
    console.log('📸 [useCrearPublicacion] typeof productData.images[0]:', typeof productData.images?.[0]); // ✅ NUEVO
    console.log('📸 [useCrearPublicacion] productData.images length:', productData.images?.length); // ✅ NUEVO
    console.log('📸 [useCrearPublicacion] ===== FIN =====');
    
    try {
      setLoading(true);

      await productService.createProduct(productData);

      toast.success("✅ Producto publicado exitosamente", {
        icon: "🚀",
        style: {
          border: "2px solid #00D2D3",
          padding: "16px",
          backgroundColor: "#FAF9E2",
          color: "#303030",
        },
      });

      navigate("/admin/productos");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "❌ Error al publicar producto", {
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
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadCategories();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    loading,
    categories,
    loadingCategories,

    // 📤 Funciones
    handleSubmit,
    loadCategories,
  };
}