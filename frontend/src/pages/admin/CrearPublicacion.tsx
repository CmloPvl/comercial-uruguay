// 📁 frontend/src/pages/admin/CrearPublicacion.tsx

/**
 * 📌 PÁGINA: CREAR PUBLICACIÓN
 * 
 * Panel de creación de nuevos productos.
 * Conecta la lógica (useCrearPublicacion) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Validación de formulario
 * - Breadcrumb para navegación
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import { useCrearPublicacion } from "../../hooks/useCrearPublicacion";
import { useAuth } from "../../context/AuthContext";

// 🎨 Colores de la paleta para categorías
const categoryColors = [
  { bg: "bg-[#FF6B81]/10 border-[#FF6B81]/30 hover:border-[#FF6B81]" },
  { bg: "bg-[#00D2D3]/10 border-[#00D2D3]/30 hover:border-[#00D2D3]" },
  { bg: "bg-[#FFD93D]/10 border-[#FFD93D]/30 hover:border-[#FFD93D]" },
  { bg: "bg-[#7D5FFF]/10 border-[#7D5FFF]/30 hover:border-[#7D5FFF]" },
  { bg: "bg-[#FF9F43]/10 border-[#FF9F43]/30 hover:border-[#FF9F43]" },
  { bg: "bg-[#603060]/10 border-[#603060]/30 hover:border-[#603060]" },
];

// 🎨 Iconos por defecto para categorías
const defaultIcons: Record<string, string> = {
  Cabello: "💇",
  "Juguetes y Cumpleaños": "🧸",
  Cumpleaños: "🎂",
  Hogar: "🏠",
  Melamina: "🍽️",
  Temporada: "🍂",
  Electrónica: "💻",
  Ropa: "👕",
  Deportes: "⚽",
};

export default function CrearPublicacion() {
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useCrearPublicacion)
  // =============================================
  const {
    loading,
    categories,
    loadingCategories,
    formData,
    errors,
    images,
    handleChange,
    handleSelectChange,
    handleSubmit,
    handleImageUpload,
    removeImage,
  } = useCrearPublicacion();

  // =============================================
  // 🔒 ACCESO DENEGADO (No ADMIN)
  // =============================================
  if (user?.role !== "ADMIN") {
    return (
      <Layout title="Acceso Denegado">
        <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
          <Card className="max-w-md w-full border-2 border-[#FF6B81] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">
                Acceso Denegado
              </h2>
              <p className="text-[#6A757C] mb-6">
                No tienes permisos para crear publicaciones.
                <br />
                Esta sección es solo para administradores.
              </p>
              <Link to="/">
                <Button className="w-full bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🏠 Volver al Inicio
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🔄 ESTADO DE CARGA (Skeleton)
  // =============================================
  if (loadingCategories) {
    return (
      <Layout title="Crear Publicación">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3 space-y-6">
              <Card className="border-2 border-[#7D5FFF]">
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-48 mb-4" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i}>
                        <Skeleton className="h-4 w-32 mb-1.5" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="lg:w-1/3 space-y-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-2 border-[#7D5FFF]">
                  <CardContent className="p-6">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="space-y-4">
                      <Skeleton className="h-10 w-full" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout title="Crear Publicación">
      {/* =============================================
      📍 BREADCRUMB
      ============================================= */}
      <div className="bg-gradient-to-r from-[#FFD93D]/20 via-[#F0F0C0]/30 to-[#F0C0F0]/20 py-3 px-4 border-b-2 border-[#7D5FFF]">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="text-[#603060] hover:text-[#00D2D3]">
                  Inicio
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin" className="text-[#603060] hover:text-[#00D2D3]">
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/productos" className="text-[#603060] hover:text-[#00D2D3]">
                  Gestionar Productos
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-[#7D5FFF]" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Crear Nuevo Producto
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* =============================================
      📦 CONTENIDO PRINCIPAL
      ============================================= */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] text-white px-4 py-1.5 rounded-full">
              📝 Administración
            </Badge>
            <Badge className="bg-[#FFD93D] text-[#303030] px-3 py-1 rounded-full">
              {categories.length} categorías
            </Badge>
          </div>
          <h1 className="text-3xl font-extrabold text-[#603060] mt-3 flex items-center gap-3">
            ✨ Nuevo Producto
            <span className="text-sm font-normal text-[#6A757C]">
              | Publica un nuevo producto en la tienda
            </span>
          </h1>
          <p className="text-[#6A757C] mt-1">
            Completa los datos del producto para publicarlo en la tienda.
          </p>
        </div>

        {/* Errores globales */}
        {Object.keys(errors).length > 0 && (
          <Card className="border-2 border-[#FF6B81] bg-[#FF6B81]/10 mb-6 shadow-lg">
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

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* =============================================
            📝 COLUMNA IZQUIERDA - INFORMACIÓN BÁSICA
            ============================================= */}
            <div className="lg:w-2/3 space-y-6">
              <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                    <span className="text-[#7D5FFF]">📝</span> Información Básica
                  </h2>

                  <div className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#7D5FFF]">📌</span> Nombre del producto *
                      </Label>
                      <Input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`mt-1.5 border-2 ${
                          errors.nombre ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                        } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                        placeholder="Burbujero de Juguete con Luces"
                      />
                      {errors.nombre && (
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.nombre}</p>
                      )}
                      <p className="text-xs text-[#6A757C] mt-1">
                        💡 Ej: Burbujero de Juguete con Luces
                      </p>
                    </div>

                    {/* Descripción */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#00D2D3]">📝</span> Descripción del producto *
                      </Label>
                      <Textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        rows={4}
                        className={`mt-1.5 border-2 ${
                          errors.descripcion ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                        } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                        placeholder="Divertido burbujero manual con luces LED integradas..."
                      />
                      {errors.descripcion && (
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">
                          {errors.descripcion}
                        </p>
                      )}
                      <p className="text-xs text-[#6A757C] mt-1">
                        💡 Mínimo 20 caracteres
                      </p>
                    </div>

                    {/* SKU */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#FF9F43]">🔖</span> SKU (Código interno) *
                      </Label>
                      <Input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleChange}
                        className={`mt-1.5 border-2 ${
                          errors.sku ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                        } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                        placeholder="JUG-2026-042"
                      />
                      {errors.sku && (
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.sku}</p>
                      )}
                      <p className="text-xs text-[#6A757C] mt-1">
                        💡 Código único para identificar el producto
                      </p>
                    </div>

                    {/* Categoría */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#603060]">📂</span> Categoría *
                      </Label>
                      <Select
                        value={formData.categoriaId}
                        onValueChange={(value) => handleSelectChange("categoriaId", value)}
                      >
                        <SelectTrigger
                          className={`w-full border-2 ${
                            errors.categoriaId ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                          } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] bg-white rounded-xl`}
                        >
                          <SelectValue placeholder="Seleccionar categoría..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
                          {categories.map((category, index) => {
                            const color = categoryColors[index % categoryColors.length];
                            const icon = category.icon || defaultIcons[category.name] || "📦";
                            return (
                              <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                                className={`hover:bg-[#F0F0C0] cursor-pointer rounded-lg ${color.bg}`}
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
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">
                          {errors.categoriaId}
                        </p>
                      )}
                    </div>

                    {/* Etiquetas */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#FF6B81]">🏷️</span> Etiquetas / Tags{" "}
                        <span className="text-[#6A757C] font-normal">(Opcional)</span>
                      </Label>
                      <Input
                        type="text"
                        name="etiquetas"
                        value={formData.etiquetas}
                        onChange={handleChange}
                        className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                        placeholder="juguete, cumpleaños, regalo, luces, infantil"
                      />
                      <p className="text-xs text-[#6A757C] mt-1">💡 Separa por comas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* =============================================
            📸 COLUMNA DERECHA - IMAGEN, PRECIO Y OPCIONES
            ============================================= */}
            <div className="lg:w-1/3 space-y-6">
              {/* Imagen */}
              <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                    <span className="text-[#FFD93D]">📸</span> Imagen del Producto
                  </h2>

                  <div className="border-2 border-dashed border-[#7D5FFF] rounded-xl p-6 text-center hover:border-[#FFD93D] transition-all bg-[#F0F0C0]/10">
                    <div className="text-5xl mb-2">📷</div>
                    <p className="text-[#6A757C] text-sm">Haz clic para subir una imagen</p>
                    <p className="text-xs text-[#6A757C]">(JPG, PNG, WEBP - Máx 2MB)</p>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="mt-3 w-full text-sm text-[#6A757C] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#7D5FFF] file:text-white hover:file:bg-[#603060] transition-all cursor-pointer"
                    />
                  </div>

                  {images.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-[#303030] mb-2">Imágenes subidas:</p>
                      <div className="flex flex-wrap gap-2">
                        {images.map((img, index) => (
                          <div
                            key={index}
                            className="bg-[#F0F0C0] px-3 py-1 rounded-lg flex items-center gap-2 border border-[#7D5FFF]"
                          >
                            <span className="text-sm">{img}</span>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="text-[#FF6B81] hover:text-[#FF6B81]/80 transition-colors"
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

              {/* Precio y Stock */}
              <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
                    <span className="text-[#00D2D3]">💰</span> Precio y Stock
                  </h2>

                  <div className="space-y-4">
                    {/* Precio */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#FFD93D]">💲</span> Precio de venta *
                      </Label>
                      <Input
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={handleChange}
                        className={`mt-1.5 border-2 ${
                          errors.precio ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                        } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                        placeholder="1500"
                      />
                      {errors.precio && (
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.precio}</p>
                      )}
                      <p className="text-xs text-[#6A757C] mt-1">💡 Precio en pesos chilenos (CLP)</p>
                    </div>

                    {/* Stock */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#00D2D3]">📦</span> Stock disponible *
                      </Label>
                      <Input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className={`mt-1.5 border-2 ${
                          errors.stock ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                        } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                        placeholder="25"
                      />
                      {errors.stock && (
                        <p className="text-[#FF6B81] text-sm mt-1 font-medium">{errors.stock}</p>
                      )}
                      <p className="text-xs text-[#6A757C] mt-1">
                        💡 Número de unidades disponibles
                      </p>
                    </div>

                    {/* Variantes */}
                    <div>
                      <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                        <span className="text-[#FF6B81]">🔢</span> Variantes / Colores{" "}
                        <span className="text-[#6A757C] font-normal">(Opcional)</span>
                      </Label>
                      <Input
                        type="text"
                        name="variantes"
                        value={formData.variantes}
                        onChange={handleChange}
                        className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                        placeholder="Azul, Rosado, Verde"
                      />
                      <p className="text-xs text-[#6A757C] mt-1">💡 Separa por comas</p>
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
                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors">
                      <input
                        type="checkbox"
                        name="destacar"
                        checked={formData.destacar}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#7D5FFF] rounded"
                      />
                      <span className="text-[#303030]">⭐ Destacar producto en la página principal</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors">
                      <input
                        type="checkbox"
                        name="enOferta"
                        checked={formData.enOferta}
                        onChange={handleChange}
                        className="w-4 h-4 accent-[#7D5FFF] rounded"
                      />
                      <span className="text-[#303030]">🔥 Producto en oferta</span>
                    </label>

                    {formData.enOferta && (
                      <div className="animate-in fade-in duration-200">
                        <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                          <span className="text-[#FF6B81]">🔻</span> Descuento (%)
                        </Label>
                        <Input
                          type="number"
                          name="descuento"
                          value={formData.descuento}
                          onChange={handleChange}
                          className={`mt-1.5 border-2 ${
                            errors.descuento ? "border-[#FF6B81]" : "border-[#7D5FFF]"
                          } focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                          placeholder="15"
                        />
                        {errors.descuento && (
                          <p className="text-[#FF6B81] text-sm mt-1 font-medium">
                            {errors.descuento}
                          </p>
                        )}
                        <p className="text-xs text-[#6A757C] mt-1">
                          💡 Porcentaje de descuento (ej: 15)
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* =============================================
          ⚡ ACCIONES
          ============================================= */}
          <Card className="mt-8 border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold px-8 py-3.5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span> Publicando...
                    </>
                  ) : (
                    "🚀 Publicar producto"
                  )}
                </Button>
                <Link to="/admin/productos">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-2 border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold px-8 py-3.5 text-lg rounded-xl transition-all hover:scale-105"
                  >
                    ✖ Cancelar
                  </Button>
                </Link>
              </div>
              <div className="mt-4 text-sm text-[#6A757C] flex items-center gap-2">
                <span>ℹ️</span> Al publicar, el producto será visible en la tienda.
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </Layout>
  );
}