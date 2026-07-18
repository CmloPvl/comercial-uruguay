import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import type { Product } from "../../services/adminService";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: any) => Promise<void>;
  loading: boolean;
  title: string;
  submitText: string;
}

export default function ProductForm({
  product,
  onSubmit,
  loading,
  title,
  submitText,
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
    if (formData.enOferta && (!formData.descuento || Number(formData.descuento) <= 0)) {
      newErrors.descuento = "Debes indicar un descuento válido";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const tags = formData.etiquetas ? formData.etiquetas.split(",").map(tag => tag.trim()).filter(Boolean) : [];
    const variants = formData.variantes ? formData.variantes.split(",").map(v => v.trim()).filter(Boolean) : [];

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
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(f => f.name);
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ✅ Título visible (corregido) */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-[#603060]">{title}</h1>
        <p className="text-gray-500">Completa los datos del producto.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* ====== COLUMNA IZQUIERDA ====== */}
        <div className="lg:w-2/3 space-y-6">
          <Card className="border-2 border-[#7D5FFF]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4">📝 Información Básica</h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#7D5FFF]">📌</span> Nombre del producto *
                  </Label>
                  <Input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`mt-1 border-2 ${errors.nombre ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                    placeholder="Burbujero de Juguete con Luces"
                  />
                  {errors.nombre && <p className="text-[#FF6B81] text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#00D2D3]">📝</span> Descripción del producto *
                  </Label>
                  <Textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    rows={4}
                    className={`mt-1 border-2 ${errors.descripcion ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                    placeholder="Divertido burbujero manual con luces LED integradas..."
                  />
                  {errors.descripcion && <p className="text-[#FF6B81] text-sm mt-1">{errors.descripcion}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF9F43]">🔖</span> SKU (Código interno) *
                  </Label>
                  <Input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleChange}
                    className={`mt-1 border-2 ${errors.sku ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                    placeholder="JUG-2026-042"
                  />
                  {errors.sku && <p className="text-[#FF6B81] text-sm mt-1">{errors.sku}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#603060]">📂</span> Categoría *
                  </Label>
                  <Select
                    value={formData.categoriaId}
                    onValueChange={(value) => handleSelectChange("categoriaId", value)}
                  >
                    <SelectTrigger className={`w-full border-2 ${errors.categoriaId ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D] bg-white`}>
                      <SelectValue placeholder="Seleccionar categoría..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg">
                      <SelectItem value="1" className="hover:bg-[#F0F0C0] cursor-pointer">💇 Cabello</SelectItem>
                      <SelectItem value="2" className="hover:bg-[#F0F0C0] cursor-pointer">🧸 Juguetes y Cumpleaños</SelectItem>
                      <SelectItem value="3" className="hover:bg-[#F0F0C0] cursor-pointer">🏠 Hogar</SelectItem>
                      <SelectItem value="4" className="hover:bg-[#F0F0C0] cursor-pointer">🍽️ Melamina</SelectItem>
                      <SelectItem value="5" className="hover:bg-[#F0F0C0] cursor-pointer">🍂 Temporada</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.categoriaId && <p className="text-[#FF6B81] text-sm mt-1">{errors.categoriaId}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF6B81]">🏷️</span> Etiquetas / Tags <span className="text-gray-400 font-normal">(Opcional)</span>
                  </Label>
                  <Input
                    type="text"
                    name="etiquetas"
                    value={formData.etiquetas}
                    onChange={handleChange}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                    placeholder="juguete, cumpleaños, regalo, luces, infantil"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ====== COLUMNA DERECHA ====== */}
        <div className="lg:w-1/3 space-y-6">
          <Card className="border-2 border-[#7D5FFF]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4">📸 Imagen del Producto</h2>
              
              <div className="border-2 border-dashed border-[#7D5FFF] rounded-lg p-6 text-center">
                <div className="text-5xl mb-2">📷</div>
                <p className="text-gray-500 text-sm">Haz clic para subir una imagen</p>
                <p className="text-xs text-gray-400">(JPG, PNG, WEBP - Máx 2MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="mt-3 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#7D5FFF] file:text-white hover:file:bg-[#603060]"
                />
              </div>

              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-[#303030] mb-2">Imágenes subidas:</p>
                  <div className="flex flex-wrap gap-2">
                    {images.map((img, index) => (
                      <div key={index} className="bg-[#F0F0C0] px-3 py-1 rounded-lg flex items-center gap-2 border border-[#7D5FFF]">
                        <span className="text-sm">{img}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="text-[#FF6B81] hover:text-[#FF6B81]/80"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-[#7D5FFF]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4">💰 Precio y Stock</h2>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FFD93D]">💲</span> Precio de venta *
                  </Label>
                  <Input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className={`mt-1 border-2 ${errors.precio ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                    placeholder="1500"
                  />
                  {errors.precio && <p className="text-[#FF6B81] text-sm mt-1">{errors.precio}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#00D2D3]">📦</span> Stock disponible *
                  </Label>
                  <Input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className={`mt-1 border-2 ${errors.stock ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                    placeholder="25"
                  />
                  {errors.stock && <p className="text-[#FF6B81] text-sm mt-1">{errors.stock}</p>}
                </div>

                <div>
                  <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                    <span className="text-[#FF6B81]">🔢</span> Variantes / Colores <span className="text-gray-400 font-normal">(Opcional)</span>
                  </Label>
                  <Input
                    type="text"
                    name="variantes"
                    value={formData.variantes}
                    onChange={handleChange}
                    className="mt-1 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D]"
                    placeholder="Azul, Rosado, Verde"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#7D5FFF]">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-[#603060] mb-4">⚙️ Opciones Avanzadas</h2>
              
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="destacar"
                    checked={formData.destacar}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#7D5FFF]"
                  />
                  <span className="text-[#303030]">Destacar producto en la página principal</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="enOferta"
                    checked={formData.enOferta}
                    onChange={handleChange}
                    className="w-4 h-4 accent-[#7D5FFF]"
                  />
                  <span className="text-[#303030]">Producto en oferta</span>
                </label>

                {formData.enOferta && (
                  <div>
                    <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                      <span className="text-[#FF6B81]">🔻</span> Descuento (%)
                    </Label>
                    <Input
                      type="number"
                      name="descuento"
                      value={formData.descuento}
                      onChange={handleChange}
                      className={`mt-1 border-2 ${errors.descuento ? 'border-[#FF6B81]' : 'border-[#7D5FFF]'} focus:ring-2 focus:ring-[#FFD93D]`}
                      placeholder="15"
                    />
                    {errors.descuento && <p className="text-[#FF6B81] text-sm mt-1">{errors.descuento}</p>}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ====== ACCIONES ====== */}
      <Card className="mt-8 border-2 border-[#7D5FFF]">
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold px-8 py-3 text-lg rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Guardando..." : submitText}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold px-8 py-3 text-lg rounded-xl"
              onClick={() => navigate("/admin/productos")}
            >
              ✖ Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}