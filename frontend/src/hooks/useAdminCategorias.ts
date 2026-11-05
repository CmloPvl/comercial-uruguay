// 📁 frontend/src/hooks/useAdminCategorias.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminCategorias
 * 
 * Encapsula toda la lógica de la página de administración de categorías:
 * - Carga de categorías
 * - Creación de categorías
 * - Edición de categorías
 * - Eliminación de categorías (con modal de confirmación)
 * - Búsqueda de categorías por nombre
 * - Estados de carga, error y datos
 * - Estados para control de modales (Dialog y AlertDialog de shadcn/ui)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts (helper centralizado)
 * - Modales de confirmación con shadcn/ui
 * 
 * 🆕 Toasts migrados al helper (errorMessages.ts)
 * 
 * @returns {Object} - Estados y funciones de admin categorías
 */

import { useState, useEffect, useMemo } from "react";
// 🆕 Migrado: ya no se usa toast directo
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  categoryErrors,
} from "../utils/errorMessages";
import { categoryService, type Category } from "../services/categoryService";

// 🎨 Emojis para el diálogo de eliminación
const deleteEmojis = ['😢', '😅', '🤔', '😊', '✨'];

export function useAdminCategorias() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // =============================================
  // 🎯 ESTADOS PARA BÚSQUEDA
  // =============================================
  const [searchTerm, setSearchTerm] = useState("");

  // =============================================
  // 🎯 ESTADOS PARA MODALES
  // =============================================
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "",
  });

  // =============================================
  // 🎯 ESTADOS PARA ALERTDIALOG (ELIMINAR)
  // =============================================
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [deleteEmoji] = useState(() => deleteEmojis[Math.floor(Math.random() * deleteEmojis.length)]);

  // =============================================
  // 📊 CATEGORÍAS FILTRADAS (búsqueda)
  // =============================================
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return categories;
    }
    const term = searchTerm.toLowerCase().trim();
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(term) ||
        c.description?.toLowerCase().includes(term)
    );
  }, [categories, searchTerm]);

  // =============================================
  // 🔄 CARGAR CATEGORÍAS
  // =============================================
  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err: any) {
      const errorMessage = err.message || "Error al cargar categorías";
      setError(errorMessage);
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, categoryErrors.notFound);
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🔍 MANEJAR BÚSQUEDA
  // =============================================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  // =============================================
  // ➕ ABRIR DIÁLOGO DE CREAR CATEGORÍA
  // =============================================
  const openCreateDialog = () => {
    setEditingCategory(null);
    setFormData({ name: "", description: "", icon: "" });
    setIsDialogOpen(true);
  };

  // =============================================
  // ✏️ ABRIR DIÁLOGO DE EDITAR CATEGORÍA
  // =============================================
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || "",
      icon: category.icon || "",
    });
    setIsDialogOpen(true);
  };

  // =============================================
  // 🗑️ ABRIR MODAL DE ELIMINAR
  // =============================================
  const openDeleteDialog = (id: string) => {
    setCategoryToDelete(id);
    setDeleteDialogOpen(true);
  };

  // =============================================
  // 💾 GUARDAR CATEGORÍA (CREAR O ACTUALIZAR)
  // =============================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      // 🆕 Toast migrado al helper (mensaje directo, no hay error de axios)
      showErrorToastWithFallback(
        new Error(categoryErrors.nameRequired),
        categoryErrors.nameRequired
      );
      return;
    }

    try {
      if (editingCategory) {
        await categoryService.updateCategory(editingCategory.id, {
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
        });
        // 🆕 Toast migrado al helper
        showSuccessToast(
          `${formData.name} ${successMessages.categoryUpdated}`
        );
      } else {
        await categoryService.createCategory({
          name: formData.name,
          description: formData.description,
          icon: formData.icon,
        });
        // 🆕 Toast migrado al helper
        showSuccessToast(
          `${formData.name} ${successMessages.categoryCreated}`
        );
      }

      setIsDialogOpen(false);
      setEditingCategory(null);
      setFormData({ name: "", description: "", icon: "" });
      await loadCategories();
    } catch (err: any) {
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, categoryErrors.saveFailed);
    }
  };

  // =============================================
  // 🗑️ CONFIRMAR ELIMINAR
  // =============================================
  const confirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await categoryService.deleteCategory(categoryToDelete);
      // 🆕 Toast migrado al helper
      showSuccessToast(successMessages.categoryDeleted);
      await loadCategories();
    } catch (err: any) {
      // 🆕 Toast migrado al helper
      showErrorToastWithFallback(err, categoryErrors.deleteFailed);
    } finally {
      setDeleteDialogOpen(false);
      setCategoryToDelete(null);
    }
  };

  // =============================================
  // ❌ CERRAR MODALES (sin ejecutar acción)
  // =============================================
  const closeDialogs = () => {
    setIsDialogOpen(false);
    setDeleteDialogOpen(false);
    setEditingCategory(null);
    setCategoryToDelete(null);
    setFormData({ name: "", description: "", icon: "" });
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
    categories,
    filteredCategories,
    loading,
    error,

    // 📊 Contador
    totalCategories: categories.length,

    // 🔍 Búsqueda
    searchTerm,
    handleSearch,

    // 📤 Funciones principales
    loadCategories,

    // ➕ Crear / Editar
    isDialogOpen,
    editingCategory,
    formData,
    setFormData,
    openCreateDialog,
    handleEdit,
    handleSubmit,

    // 🗑️ Eliminar
    deleteDialogOpen,
    categoryToDelete,
    deleteEmoji,
    openDeleteDialog,
    confirmDelete,

    // ❌ Cerrar modales
    closeDialogs,
  };
}