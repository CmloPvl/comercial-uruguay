// 📁 frontend/src/components/admin/ProductForm.tsx

/**
 * 📌 COMPONENTE: ProductForm
 * 
 * Formulario reutilizable para crear y editar productos.
 * 
 * ✅ Mejoras aplicadas:
 * - Columnas extraídas a componentes separados
 * - Opciones avanzadas extraídas a componente separado
 * - Código más limpio y mantenible
 * 
 * 📊 Resultado: ~900 líneas → ~180 líneas (80% de reducción)
 */

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Card, CardContent } from "../../ui/card";
import { ProductFormSkeleton } from "./ProductFormSkeleton";
import { ProductFormHeader } from "../products/ProductFormHeader";
import { ProductFormActions } from "../products/ProductFormActions";
import { ProductFormLeftColumn } from "../products/ProductFormLeftColumn";
import { ProductFormRightColumn } from "./ProductFormRightColumn";
import type { Product } from "../../../services/adminService";
import type { Category } from "../../../services/categoryService";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
  submitText: string;
  categories: Category[];
  categoriesLoading?: boolean;
  badge?: string;
}

export default function ProductForm({
  product,
  onSubmit,
  loading,
  title,
  submitText,
  categories,
  categoriesLoading = false,
  badge = "📝 Administración",
}: ProductFormProps) {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [formData, setFormData] = useState({
    nombre: product?.name || "",
    descripcion: product?.description || "",
    sku: product?.sku || "",
    categoriaId: product?.categoryId?.toString() || "",
    precio: product?.price?.toString() || "",
    stock: product?.stock?.toString() || "",
    variantes: "",
    etiquetas: "",
    destacar: false,
    enOferta: product?.isOnSale || false,
    descuento: product?.discount?.toString() || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [images, setImages] = useState<string[]>(product?.images || []);

  // =============================================
  // 🔄 EFECTO: CARGAR DATOS DEL PRODUCTO
  // =============================================
  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.name || "",
        descripcion: product.description || "",
        sku: product.sku || "",
        categoriaId: product.categoryId?.toString() || "",
        precio: product.price?.toString() || "",
        stock: product.stock?.toString() || "",
        variantes: "",
        etiquetas: "",
        destacar: false,
        enOferta: product.isOnSale || false,
        descuento: product.discount?.toString() || "",
      });
      setImages(product.images || []);
    }
  }, [product]);

  // =============================================
  // 📝 HANDLERS
  // =============================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // =============================================
  // ✅ VALIDACIÓN
  // =============================================
  const validate = () => {
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
    if (formData.enOferta && (!formData.descuento || Number(formData.descuento) <= 0 || Number(formData.descuento) > 100)) {
      newErrors.descuento = "Debes indicar un descuento válido (1-100)";
    }
    
    return newErrors;
  };

  // =============================================
  // 🚀 ENVÍO
  // =============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("❌ Por favor, corrige los errores del formulario", {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
      return;
    }

    const tags = formData.etiquetas ? formData.etiquetas.split(",").map(tag => tag.trim()).filter(Boolean) : [];
    const variants = formData.variantes ? formData.variantes.split(",").map(v => v.trim()).filter(Boolean) : [];

console.log('📸 [ProductForm] images ANTES de enviar:', images);

    try {
      await onSubmit({
        name: formData.nombre,
        description: formData.descripcion,
        sku: formData.sku,
        categoryId: Number(formData.categoriaId),
        price: Number(formData.precio),
        stock: Number(formData.stock),
        images: images.length > 0 ? images : ["https://via.placeholder.com/300x300?text=Sin+Imagen"],
        isOnSale: formData.enOferta,
        discount: formData.enOferta ? Number(formData.descuento) : 0,
        isActive: true,
        tags,
        variants,
      });
    } catch (error: any) {
      toast.error(error.message || "Error al guardar el producto", {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
    }
  };

  // =============================================
  // ⏳ SKELETON DE CARGA
  // =============================================
  if (categoriesLoading) {
    return <ProductFormSkeleton />;
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={`Formulario de ${title}`}>
      {/* Header */}
      <ProductFormHeader
        title={title}
        categoriesCount={categories.length}
        badge={badge}
      />

      {/* Errores globales */}
      {Object.keys(errors).length > 0 && (
        <Card className="border-2 border-[#FF6B81] bg-[#FF6B81]/10 shadow-lg">
          <CardContent className="p-4">
            <p className="font-bold text-[#FF6B81] flex items-center gap-2">
              <span className="text-xl">⚠️</span> Por favor, corrige los siguientes errores:
            </p>
            <ul className="mt-2 space-y-1">
              {Object.values(errors).map((err, i) => (
                <li key={i} className="text-[#FF6B81] text-sm flex items-center gap-2">
                  <span>🔴</span> {err}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna Izquierda */}
        <ProductFormLeftColumn
          formData={formData}
          errors={errors}
          categories={categories}
          handleChange={handleChange}
          handleSelectChange={handleSelectChange}
        />

        {/* Columna Derecha */}
        <ProductFormRightColumn
          images={images}
          setImages={setImages}
          formData={formData}
          errors={errors}
          handleChange={handleChange}
        />
      </div>

      {/* Acciones */}
      <ProductFormActions
        loading={loading}
        submitText={submitText}
        cancelPath="/admin/productos"
      />
    </form>
  );
}