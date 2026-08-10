// 📁 frontend/src/hooks/useCrearPublicacion.ts

/**
 * 📌 HOOK PERSONALIZADO: useCrearPublicacion
 * 
 * Encapsula toda la lógica de la página de creación de publicaciones:
 * - Carga de categorías
 * - Manejo del formulario (cambios, validación, envío)
 * - Subida y gestión de imágenes
 * - Estados de carga, error y datos
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * - Validación de formulario
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
  const [images, setImages] = useState<string[]>([]);

  // =============================================
  // 🎯 ESTADOS DEL FORMULARIO
  // =============================================
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    sku: "",
    categoriaId: "",
    precio: "",
    stock: "",
    variantes: "",
    etiquetas: "",
    fechaPublicacion: "",
    destacar: false,
    enOferta: false,
    descuento: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

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
  // 📝 MANEJAR CAMBIOS DEL FORMULARIO
  // =============================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // =============================================
  // 📝 MANEJAR CAMBIOS DE SELECT
  // =============================================
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // =============================================
  // ✅ VALIDAR FORMULARIO
  // =============================================
  const validate = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre del producto es obligatorio";
    }
    if (formData.descripcion.length < 20) {
      newErrors.descripcion = "La descripción debe tener al menos 20 caracteres";
    }
    if (!formData.sku.trim()) {
      newErrors.sku = "El SKU es obligatorio";
    }
    if (!formData.categoriaId) {
      newErrors.categoriaId = "Debes seleccionar una categoría";
    }
    if (!formData.precio || Number(formData.precio) <= 0) {
      newErrors.precio = "El precio debe ser mayor a 0";
    }
    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = "El stock debe ser un número mayor o igual a 0";
    }
    if (formData.enOferta && (!formData.descuento || Number(formData.descuento) <= 0)) {
      newErrors.descuento = "Debes indicar un descuento válido";
    }

    return newErrors;
  };

  // =============================================
  // 🖼️ MANEJAR SUBIDA DE IMÁGENES
  // =============================================
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((f) => f.name);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  // =============================================
  // 🗑️ ELIMINAR IMAGEN
  // =============================================
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // =============================================
  // 🚀 ENVIAR FORMULARIO
  // =============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Mostrar toast con el primer error
      const firstError = Object.values(newErrors)[0];
      toast.error(`❌ ${firstError}`, {
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
      setLoading(true);

      const tags = formData.etiquetas
        ? formData.etiquetas.split(",").map((tag) => tag.trim()).filter(Boolean)
        : [];
      const variants = formData.variantes
        ? formData.variantes.split(",").map((v) => v.trim()).filter(Boolean)
        : [];

      const productData = {
        name: formData.nombre,
        description: formData.descripcion,
        sku: formData.sku,
        categoryId: formData.categoriaId,
        price: Number(formData.precio),
        stock: Number(formData.stock),
        images: images.length > 0 ? images : ["https://via.placeholder.com/300x300?text=Sin+Imagen"],
        isOnSale: formData.enOferta,
        discount: formData.enOferta ? Number(formData.descuento) : 0,
        isActive: true,
        tags: tags,
        variants: variants,
      };

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
    formData,
    errors,
    images,

    // 📤 Funciones
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleImageUpload,
    removeImage,
    loadCategories,
  };
}