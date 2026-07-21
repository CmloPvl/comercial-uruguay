import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Skeleton } from "../../components/ui/skeleton";
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
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { categoryService, type Category } from "../../services/categoryService";
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

// 🎨 Emojis para el diálogo de eliminación
const deleteEmojis = ['😢', '😅', '🤔', '😊', '✨'];

export default function AdminCategorias() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [deleteEmoji] = useState(() => deleteEmojis[Math.floor(Math.random() * deleteEmojis.length)]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (error) {
      toast.error("Error al cargar categorías");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error("El nombre de la categoría es obligatorio");
      return;
    }

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, {
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
        });
        toast.success("✅ Categoría actualizada");
        setIsDialogOpen(false);
      } else {
        await categoryService.createCategory({
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
        });
        toast.success("✅ Categoría creada");
        setIsDialogOpen(false);
      }
      
      setEditingCategory(null);
      setFormData({ name: "", description: "", icon: "" });
      loadCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al guardar categoría");
    }
  };

  const openDeleteDialog = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!categoryToDelete) return;
    
    try {
      await categoryService.deleteCategory(categoryToDelete);
      toast.success("🗑️ Categoría eliminada");
      loadCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al eliminar categoría");
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
    });
    setIsDialogOpen(true);
  };

  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", icon: "" });
    setIsDialogOpen(true);
  };

  // Verificar si es admin
  if (user?.role !== "ADMIN") {
    return (
      <Layout>
        <div className="min-h-[70vh] flex items-center justify-center">
          <Card className="max-w-md w-full border-2 border-[#FF6B81] shadow-2xl">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-4">🚫</div>
              <h2 className="text-2xl font-bold text-[#603060] mb-2">Acceso Denegado</h2>
              <p className="text-gray-500">No tienes permisos para gestionar categorías.</p>
              <Link to="/" className="mt-4 inline-block text-[#7D5FFF] hover:underline">Volver al inicio</Link>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // ESTADO DE CARGA (SKELETON)
  // =============================================
  if (loading) {
    return (
      <Layout title="Gestionar Categorías">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>
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

  return (
    <Layout title="Gestionar Categorías">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-3">
              📂 Gestionar Categorías
              <Badge className="bg-[#00D2D3] text-white text-sm">
                {categories.length}
              </Badge>
            </h1>
            <p className="text-gray-500 mt-1">Administra las categorías de tu tienda</p>
          </div>
          <Button 
            onClick={openCreateDialog}
            className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 px-6 py-3 rounded-xl"
          >
            ➕ Nueva Categoría
          </Button>
        </div>

        {/* Lista de categorías */}
        {categories.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-16 text-center">
              <div className="text-7xl mb-4">📂</div>
              <h3 className="text-2xl font-bold text-[#603060] mb-2">No hay categorías</h3>
              <p className="text-gray-500 mb-6">Crea tu primera categoría para comenzar a organizar tus productos.</p>
              <Button 
                onClick={openCreateDialog}
                className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                ➕ Crear primera categoría
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category, index) => {
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
                              <p className="text-sm text-gray-500 mt-0.5">{category.description}</p>
                            )}
                          </div>
                        </div>
                        <Badge className="mt-2 bg-[#00D2D3]/10 text-[#00D2D3] border border-[#00D2D3]/20 text-xs">
                          ID: {category.id}
                        </Badge>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition-all hover:scale-105"
                          onClick={() => handleEdit(category)}
                        >
                          ✏️
                        </Button>
                        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white transition-all hover:scale-105"
                              onClick={() => openDeleteDialog(category.id)}
                            >
                              🗑️
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="max-w-md border-2 border-[#FFD93D] shadow-2xl rounded-2xl">
                            <AlertDialogHeader>
                              <div className="text-center">
                                <div className="text-6xl mb-3 animate-bounce">{deleteEmoji}</div>
                                <AlertDialogTitleComponent className="text-2xl font-bold text-[#603060]">
                                  ¿Eliminar esta categoría?
                                </AlertDialogTitleComponent>
                                <AlertDialogDescription className="text-gray-600 mt-2">
                                  <span className="font-bold text-[#FF6B81]">{categories.find(c => c.id === categoryToDelete)?.name}</span>{' '}
                                  dejará de existir, pero los productos que la usaban se quedarán sin categoría.
                                  <br />
                                  <br />
                                  <span className="text-sm text-gray-400">💡 Puedes reasignarlos a otra categoría después.</span>
                                </AlertDialogDescription>
                              </div>
                            </AlertDialogHeader>
                            <AlertDialogFooter className="flex flex-col sm:flex-row gap-3 mt-4">
                              <AlertDialogCancel className="border-2 border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white font-bold py-3 rounded-xl transition-all hover:scale-105 flex-1">
                                😊 Cancelar
                              </AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={confirmDelete}
                                className="bg-gradient-to-r from-[#FF6B81] to-[#FF9F43] hover:from-[#FF9F43] hover:to-[#FF6B81] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 flex-1"
                              >
                                🗑️ Sí, eliminar
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Dialog para crear/editar categoría */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <p className="text-xs text-gray-400 mt-1.5">💡 Usa un emoji para representar la categoría</p>
              </div>
              <div className="flex gap-3 pt-2">
                <Button 
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  {editingCategory ? '💾 Actualizar' : '✨ Crear'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="border-2 border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold py-3 px-6 rounded-xl transition-all hover:scale-105"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancelar
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}