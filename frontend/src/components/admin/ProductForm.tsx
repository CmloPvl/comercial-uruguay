import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import type { Product } from "../../services/adminService";
import type { Category } from "../../services/categoryService";

// 🎨 Iconos por defecto para categorías
const defaultIcons: Record<string, string> = {
  'Cabello': '💇',
  'Juguetes y Cumpleaños': '🧸',
  'Cumpleaños': '🎂',
  'Hogar': '🏠',
  'Melamina': '🍽️',
  'Temporada': '🍂',
  'Electrónica': '💻',
  'Ropa': '👕',
  'Deportes': '⚽',
};

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
  submitText: string;
  categories: Category[];
  categoriesLoading?: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  loading,
  title,
  submitText,
  categories,
  categoriesLoading = false,
}: ProductFormProps) {
  const navigate = useNavigate();
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
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);

  // =============================================
  // CARGAR DATOS DEL PRODUCTO
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
  // HANDLERS
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
  // VALIDACIÓN
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
  // SUBMIT
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
  // MANEJO DE IMÁGENES (CORREGIDO)
  // =============================================
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploadingImages(true);
    const newPreviews: string[] = [];
    const newImageNames: string[] = [];

    for (const file of Array.from(files)) {
      // Validar tamaño (2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`❌ ${file.name} excede el tamaño máximo (2MB)`, {
          style: {
            border: '2px solid #FF6B81',
            padding: '16px',
            backgroundColor: '#FAF9E2',
            color: '#303030',
          },
        });
        continue;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        toast.error(`❌ ${file.name} no es una imagen válida`, {
          style: {
            border: '2px solid #FF6B81',
            padding: '16px',
            backgroundColor: '#FAF9E2',
            color: '#303030',
          },
        });
        continue;
      }

      // ✅ Crear preview - VERSIÓN CORREGIDA
      const reader = new FileReader();
      reader.onload = (event) => {
        const target = event.target as FileReader;
        if (target?.result) {
          const result = target.result as string;
          setImagePreviews(prev => [...prev, result]);
          newPreviews.push(result);
        }
      };
      reader.readAsDataURL(file);
      newImageNames.push(file.name);
    }

    // Esperar a que termine la carga de imágenes
    setTimeout(() => {
      setImages(prev => [...prev, ...newImageNames]);
      setUploadingImages(false);

      if (newImageNames.length > 0) {
        toast.success(`✅ ${newImageNames.length} imagen(es) subidas correctamente`, {
          style: {
            border: '2px solid #00D2D3',
            padding: '16px',
            backgroundColor: '#FAF9E2',
            color: '#303030',
          },
          icon: '🖼️',
        });
      }
    }, 100);
  };

  // ✅ removeImage DEFINIDA ANTES DEL RETURN
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
    toast.success('🗑️ Imagen eliminada', {
      style: {
        border: '2px solid #FF9F43',
        padding: '12px',
        backgroundColor: '#FAF9E2',
        color: '#303030',
      },
      icon: '✅',
    });
  };

  // =============================================
  // SKELETON DE CATEGORÍAS
  // =============================================
  if (categoriesLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3 space-y-6">
            <Card className="border-2 border-[#7D5FFF]">
              <CardContent className="p-6 space-y-4">
                <Skeleton className="h-6 w-48" />
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-1/3 space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-2 border-[#7D5FFF]">
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // =============================================
  // RENDER PRINCIPAL
  // =============================================
  return (
    <form onSubmit={handleSubmit} className="space-y-6" aria-label={`Formulario de ${title}`}>
      {/* ====== HEADER ====== */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#603060]">{title}</h1>
        <p className="text-gray-500">Completa los datos del producto.</p>
      </div>

      {/* ====== ERRORES GLOBALES ====== */}
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
        {/* ====== COLUMNA IZQUIERDA ====== */}
        <div className="lg:w-2/3 space-y-6">
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                <span className="text-[#7D5FFF]">📝</span> Información Básica
              </h2>
              
              <div className="space-y-4">
                {/* Nombre */}
                <div>
                  <Label htmlFor="nombre" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#7D5FFF]">📌</span> Nombre del producto *
                  </Label>
                  <Input
                    id="nombre"
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    aria-describedby={errors.nombre ? "nombre-error" : undefined}
                    className={`mt-1.5 border-2 ${errors.nombre ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                    placeholder="Burbujero de Juguete con Luces"
                  />
                  {errors.nombre && (
                    <p id="nombre-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.nombre}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">💡 Ej: Burbujero de Juguete con Luces</p>
                </div>

                {/* Descripción */}
                <div>
                  <Label htmlFor="descripcion" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#00D2D3]">📝</span> Descripción del producto *
                  </Label>
                  <Textarea
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    aria-describedby={errors.descripcion ? "descripcion-error" : undefined}
                    className={`mt-1.5 border-2 ${errors.descripcion ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                    placeholder="Divertido burbujero manual con luces LED integradas..."
                  />
                  {errors.descripcion && (
                    <p id="descripcion-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.descripcion}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">💡 Mínimo 20 caracteres</p>
                </div>

                {/* SKU */}
                <div>
                  <Label htmlFor="sku" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF9F43]">🔖</span> SKU (Código interno) *
                  </Label>
                  <Input
                    id="sku"
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    aria-describedby={errors.sku ? "sku-error" : undefined}
                    className={`mt-1.5 border-2 ${errors.sku ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                    placeholder="JUG-2026-042"
                  />
                  {errors.sku && (
                    <p id="sku-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.sku}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">💡 Código único para identificar el producto</p>
                </div>

                {/* Categoría */}
                <div>
                  <Label htmlFor="categoriaId" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#603060]">📂</span> Categoría *
                  </Label>
                  <Select
                    value={formData.categoriaId}
                    onValueChange={(value) => handleSelectChange("categoriaId", value)}
                  >
                    <SelectTrigger 
                      id="categoriaId"
                      className={`w-full border-2 ${errors.categoriaId ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] bg-white rounded-xl transition-all`}
                    >
                      <SelectValue placeholder="Seleccionar categoría..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
                      {categories.map((category) => {
                        const icon = category.icon || defaultIcons[category.name] || '📦';
                        return (
                          <SelectItem 
                            key={category.id} 
                            value={category.id.toString()}
                            className="hover:bg-[#F0F0C0] cursor-pointer rounded-lg transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <span>{icon}</span>
                              <span>{category.name}</span>
                            </span>
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  {errors.categoriaId && (
                    <p id="categoriaId-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.categoriaId}
                    </p>
                  )}
                </div>

                {/* Etiquetas */}
                <div>
                  <Label htmlFor="etiquetas" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF6B81]">🏷️</span> Etiquetas / Tags <span className="text-gray-400 font-normal">(Opcional)</span>
                  </Label>
                  <Input
                    id="etiquetas"
                    type="text"
                    name="etiquetas"
                    value={formData.etiquetas}
                    onChange={handleChange}
                    className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                    placeholder="juguete, cumpleaños, regalo, luces, infantil"
                  />
                  <p className="text-xs text-gray-400 mt-1">💡 Separa por comas</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ====== COLUMNA DERECHA ====== */}
        <div className="lg:w-1/3 space-y-6">
          {/* Imagen */}
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                <span className="text-[#FFD93D]">📸</span> Imagen del Producto
              </h2>
              
              <div className="border-2 border-dashed border-[#7D5FFF] rounded-xl p-6 text-center hover:border-[#FFD93D] transition-all bg-[#F0F0C0]/10">
                <div className="text-5xl mb-2">📷</div>
                <p className="text-gray-500 text-sm">Haz clic para subir una imagen</p>
                <p className="text-xs text-gray-400">(JPG, PNG, WEBP - Máx 2MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploadingImages}
                  className="mt-3 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#7D5FFF] file:text-white hover:file:bg-[#603060] transition-all cursor-pointer disabled:opacity-50"
                />
                {uploadingImages && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="animate-spin text-xl">⏳</span>
                    <span className="text-sm text-gray-500">Subiendo imágenes...</span>
                  </div>
                )}
              </div>

              {/* Preview de imágenes */}
              {imagePreviews.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#303030] mb-2">🖼️ Previsualización:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={preview} 
                          alt={`Vista previa ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border-2 border-[#7D5FFF]"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-[#FF6B81] text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                          aria-label="Eliminar imagen"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lista de imágenes subidas */}
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#303030] mb-2">📁 Imágenes subidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {images.map((img, index) => (
                      <Badge key={index} className="bg-[#F0F0C0] text-[#303030] border border-[#7D5FFF] px-3 py-1 flex items-center gap-2">
                        <span className="text-sm truncate max-w-32">{img}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-[#FF6B81] hover:text-[#FF6B81]/80 transition-colors hover:scale-110"
                          aria-label="Eliminar imagen"
                        >
                          ✕
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Precio y Stock */}
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                <span className="text-[#00D2D3]">💰</span> Precio y Stock
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="precio" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FFD93D]">💲</span> Precio de venta *
                  </Label>
                  <Input
                    id="precio"
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    aria-describedby={errors.precio ? "precio-error" : undefined}
                    className={`mt-1.5 border-2 ${errors.precio ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                    placeholder="1500"
                    step="0.01"
                    min="0"
                  />
                  {errors.precio && (
                    <p id="precio-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.precio}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">💡 Precio en pesos chilenos (CLP)</p>
                </div>

                <div>
                  <Label htmlFor="stock" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#00D2D3]">📦</span> Stock disponible *
                  </Label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    aria-describedby={errors.stock ? "stock-error" : undefined}
                    className={`mt-1.5 border-2 ${errors.stock ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                    placeholder="25"
                    min="0"
                  />
                  {errors.stock && (
                    <p id="stock-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                      {errors.stock}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">💡 Número de unidades disponibles</p>
                </div>

                <div>
                  <Label htmlFor="variantes" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF6B81]">🔢</span> Variantes / Colores <span className="text-gray-400 font-normal">(Opcional)</span>
                  </Label>
                  <Input
                    id="variantes"
                    type="text"
                    name="variantes"
                    value={formData.variantes}
                    onChange={handleChange}
                    className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                    placeholder="Azul, Rosado, Verde"
                  />
                  <p className="text-xs text-gray-400 mt-1">💡 Separa por comas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Opciones Avanzadas */}
          <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                <span className="text-[#FF9F43]">⚙️</span> Opciones Avanzadas
              </h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors group">
                  <input
                    type="checkbox"
                    name="destacar"
                    checked={formData.destacar}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#7D5FFF] rounded"
                  />
                  <span className="text-[#303030] group-hover:text-[#7D5FFF] transition-colors">
                    ⭐ Destacar producto en la página principal
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors group">
                  <input
                    type="checkbox"
                    name="enOferta"
                    checked={formData.enOferta}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#7D5FFF] rounded"
                  />
                  <span className="text-[#303030] group-hover:text-[#7D5FFF] transition-colors">
                    🔥 Producto en oferta
                  </span>
                </label>

                {formData.enOferta && (
                  <div className="animate-in fade-in duration-200">
                    <Label htmlFor="descuento" className="text-sm font-bold text-[#303030] flex items-center gap-2">
                      <span className="text-[#FF6B81]">🔻</span> Descuento (%)
                    </Label>
                    <Input
                      id="descuento"
                      type="number"
                      name="descuento"
                      value={formData.descuento}
                      onChange={handleChange}
                      aria-describedby={errors.descuento ? "descuento-error" : undefined}
                      className={`mt-1.5 border-2 ${errors.descuento ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                      placeholder="15"
                      min="0"
                      max="100"
                    />
                    {errors.descuento && (
                      <p id="descuento-error" className="text-[#FF6B81] text-sm mt-1 font-medium">
                        {errors.descuento}
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">💡 Porcentaje de descuento (ej: 15)</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ====== ACCIONES ====== */}
      <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold px-8 py-3.5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin mr-2">⏳</span> Guardando...
                </>
              ) : (
                submitText
              )}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="border-2 border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold px-8 py-3.5 text-lg rounded-xl transition-all hover:scale-105"
              onClick={() => navigate("/admin/productos")}
            >
              ✖ Cancelar
            </Button>
          </div>
          <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
            <span>ℹ️</span> Los cambios se guardarán automáticamente.
          </div>
        </CardContent>
      </Card>
    </form>
  );
}