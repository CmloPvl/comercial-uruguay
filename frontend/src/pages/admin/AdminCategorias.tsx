// 📁 frontend/src/pages/admin/AdminCategorias.tsx

/**
 * 📌 PÁGINA: ADMIN CATEGORÍAS
 * 
 * Panel de administración de categorías.
 * Conecta la lógica (useAdminCategorias) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Modales de confirmación con AlertDialog de shadcn/ui
 * - Breadcrumb para navegación
 * - Tooltips en botones de acciones
 * - Buscador de categorías
 * - Contador de categorías
 * - Botón para volver al Dashboard
 */

import { Link } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle as AlertDialogTitleComponent,
} from "../../components/ui/alert-dialog";
import { useAdminCategorias } from "../../hooks/useAdminCategorias";
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

export default function AdminCategorias() {
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useAdminCategorias)
  // =============================================
  const {
    categories,
    filteredCategories,
    loading,
    error,
    totalCategories,
    searchTerm,
    handleSearch,
    loadCategories,
    isDialogOpen,
    editingCategory,
    formData,
    setFormData,
    openCreateDialog,
    handleEdit,
    handleSubmit,
    deleteDialogOpen,
    categoryToDelete,
    deleteEmoji,
    openDeleteDialog,
    confirmDelete,
    closeDialogs,
  } = useAdminCategorias();

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
                No tienes permisos para gestionar categorías.
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
  // 🔄 ESTADO DE CARGA (con Skeleton shadcn)
  // =============================================
  if (loading) {
    return (
      <Layout title="Gestionar Categorías">
        {/* Breadcrumb skeleton */}
        <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          {/* Grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="border-2 border-[#00D2D3]/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <Skeleton className="h-6 w-32" />
                      </div>
                      <Skeleton className="h-4 w-40 mt-2" />
                      <Skeleton className="h-4 w-20 mt-2" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded" />
                      <Skeleton className="h-8 w-8 rounded" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout title="Gestionar Categorías">
      {/* =============================================
      📍 BREADCRUMB
      ============================================= */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
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
                <BreadcrumbPage className="text-[#00D2D3] font-bold">
                  Gestionar Categorías
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-2">
                📂 Gestionar Categorías
                <Badge className="bg-[#00D2D3] text-white text-sm ml-2">
                  {totalCategories}
                </Badge>
              </h1>
            </div>
            <p className="text-[#6A757C] mt-1">
              Administra las categorías de tu tienda
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin">
              <Button
                variant="outline"
                className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
              >
                ← Volver al Dashboard
              </Button>
            </Link>
            <Button
              onClick={openCreateDialog}
              className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              ➕ Nueva Categoría
            </Button>
          </div>
        </div>

        {/* =============================================
        🔍 BUSCADOR
        ============================================= */}
        <div className="mb-4">
          <Input
            placeholder="🔍 Buscar categorías por nombre o descripción..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="max-w-md border-[#7D5FFF] focus:border-[#603060]"
          />
        </div>

        {/* =============================================
        ❌ ERROR
        ============================================= */}
        {error && (
          <div className="bg-[#FF6B81]/10 border-2 border-[#FF6B81] text-[#FF6B81] px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
            <span className="text-xl">⚠️</span>
            <span className="font-medium">{error}</span>
            <button
              onClick={loadCategories}
              className="ml-auto text-[#FF6B81] hover:text-[#603060] font-bold underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* =============================================
        📦 LISTA DE CATEGORÍAS
        ============================================= */}
        {categories.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-16 text-center">
              <div className="text-7xl mb-4">📂</div>
              <h3 className="text-2xl font-bold text-[#603060] mb-2">No hay categorías</h3>
              <p className="text-[#6A757C] mb-6">
                Crea tu primera categoría para comenzar a organizar tus productos.
              </p>
              <Button
                onClick={openCreateDialog}
                className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                ➕ Crear primera categoría
              </Button>
            </CardContent>
          </Card>
        ) : filteredCategories.length === 0 ? (
          <Card className="border-2 border-[#FFD93D] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">🔍</p>
              <p className="text-[#6A757C] font-medium">
                No hay categorías que coincidan con "{searchTerm}"
              </p>
              <button
                onClick={() => handleSearch("")}
                className="mt-4 text-[#7D5FFF] hover:underline font-medium"
              >
                Limpiar búsqueda →
              </button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCategories.map((category, index) => {
              const color = categoryColors[index % categoryColors.length];
              return (
                <Card
                  key={category.id}
                  className={`border-2 ${color.bg} shadow-md hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                            {category.icon || '📦'}
                          </span>
                          <div>
                            <h3 className="text-lg font-bold text-[#303030] group-hover:text-[#7D5FFF] transition-colors">
                              {category.name}
                            </h3>
                            {category.description && (
                              <p className="text-sm text-[#6A757C] mt-0.5">{category.description}</p>
                            )}
                          </div>
                        </div>
                        <Badge className="mt-2 bg-[#00D2D3]/10 text-[#00D2D3] border border-[#00D2D3]/20 text-xs">
                          ID: {category.id}
                        </Badge>
                      </div>
                      <div className="flex gap-2 ml-4">
                        {/* Editar */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition-all hover:scale-105"
                                onClick={() => handleEdit(category)}
                              >
                                ✏️
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Editar categoría</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Eliminar */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white transition-all hover:scale-105"
                                onClick={() => openDeleteDialog(category.id)}
                              >
                                🗑️
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Eliminar categoría</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* =============================================
      ✏️ DIÁLOGO DE CREAR/EDITAR CATEGORÍA
      ============================================= */}
      <Dialog open={isDialogOpen} onOpenChange={closeDialogs}>
        <DialogContent className="sm:max-w-md bg-white rounded-2xl border-2 border-[#7D5FFF] shadow-2xl p-0 overflow-hidden">
          <div className="bg-gradient-to-r from-[#603060] to-[#7D5FFF] px-6 py-4">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                {editingCategory ? '✏️ Editar Categoría' : '✨ Nueva Categoría'}
              </DialogTitle>
            </DialogHeader>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#7D5FFF]">📌</span> Nombre *
              </Label>
              <Input
                type="text"
                placeholder="Ej: Electrónica"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
                required
              />
            </div>
            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#00D2D3]">📝</span> Descripción
              </Label>
              <Input
                type="text"
                placeholder="Ej: Productos electrónicos y tecnología"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
              />
            </div>
            <div>
              <Label className="text-sm font-bold text-[#303030] flex items-center gap-2">
                <span className="text-[#FFD93D]">🎨</span> Icono (emojis)
              </Label>
              <Input
                type="text"
                placeholder="Ej: 💻, 📱, 🎮"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
              />
              <p className="text-xs text-[#6A757C] mt-1.5">💡 Usa un emoji para representar la categoría</p>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                {editingCategory ? '💾 Actualizar' : '✨ Crear'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="border-2 border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-[1.02]"
                onClick={closeDialogs}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* =============================================
      🗑️ MODAL DE ELIMINAR (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent className="max-w-md border-2 border-[#FFD93D] shadow-2xl rounded-2xl">
          <AlertDialogHeader>
            <div className="text-center">
              <div className="text-6xl mb-3 animate-bounce">{deleteEmoji}</div>
              <AlertDialogTitleComponent className="text-2xl font-bold text-[#603060]">
                ¿Eliminar esta categoría?
              </AlertDialogTitleComponent>
              <AlertDialogDescription className="text-[#6A757C] mt-2">
                <span className="font-bold text-[#FF6B81]">
                  {categories.find((c) => c.id === categoryToDelete)?.name}
                </span>{' '}
                dejará de existir, pero los productos que la usaban se quedarán sin categoría.
                <br />
                <br />
                <span className="text-sm text-[#6A757C]">
                  💡 Puedes reasignarlos a otra categoría después.
                </span>
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
            <AlertDialogCancel className="border-2 border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white font-bold py-3 rounded-xl transition-all hover:scale-[1.02] flex-1">
              😊 Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] flex-1"
            >
              🗑️ Sí, eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}