// 📁 frontend/src/hooks/useAdminUsuarios.ts

/**
 * 📌 HOOK PERSONALIZADO: useAdminUsuarios
 * 
 * Encapsula toda la lógica de la página de administración de usuarios:
 * - Carga de usuarios
 * - Búsqueda de usuarios
 * - Cambio de rol (CLIENTE ↔ ADMIN)
 * - Activación/desactivación de usuarios
 * - Eliminación de usuarios
 * - Paginación
 * - Estados de carga, error y datos
 * - Estados para control de modales (AlertDialog de shadcn/ui)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts
 * - Modales de confirmación con shadcn/ui
 * 
 * @returns {Object} - Estados y funciones de admin usuarios
 */

import { useState, useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { userService, type User } from '../services/userService';

// 📊 Roles disponibles
export const USER_ROLES = [
  { value: 'CLIENTE', label: 'Cliente', color: 'bg-[#00D2D3] text-white' },
  { value: 'ADMIN', label: 'Administrador', color: 'bg-[#7D5FFF] text-white' },
];

export function useAdminUsuarios() {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // =============================================
  // 🎯 ESTADOS PARA MODALES (shadcn/ui AlertDialog)
  // =============================================
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toggleDialogOpen, setToggleDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<'CLIENTE' | 'ADMIN'>('CLIENTE');

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================

  // Filtrar usuarios por búsqueda
  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const term = searchTerm.toLowerCase().trim();
    return users.filter(
      (u) =>
        u.fullName.toLowerCase().includes(term) ||
        u.email.toLowerCase().includes(term) ||
        u.phone?.toLowerCase().includes(term) ||
        u.role.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  // Paginación
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Contadores
  const totalUsers = users.length;
  const activeCount = users.filter((u) => u.isActive).length;
  const inactiveCount = users.filter((u) => !u.isActive).length;
  const adminCount = users.filter((u) => u.role === 'ADMIN').length;
  const clienteCount = users.filter((u) => u.role === 'CLIENTE').length;

  // =============================================
  // 🔄 CARGAR USUARIOS
  // =============================================
  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers(currentPage, itemsPerPage, searchTerm);
      setUsers(data.data || []);
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar usuarios';
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
    } finally {
      setLoading(false);
    }
  };

  // =============================================
  // 🔍 MANEJAR BÚSQUEDA
  // =============================================
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Resetear a primera página al buscar
  };

  // =============================================
  // 📄 MANEJAR PAGINACIÓN
  // =============================================
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // =============================================
  // 🎯 ABRIR MODAL DE CAMBIO DE ROL
  // =============================================
  const openRoleDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role === 'ADMIN' ? 'CLIENTE' : 'ADMIN');
    setRoleDialogOpen(true);
  };

  // =============================================
  // ✅ CONFIRMAR CAMBIO DE ROL
  // =============================================
  const confirmRoleChange = async () => {
    if (!selectedUser) return;

    try {
      await userService.updateUserRole(selectedUser.id, newRole);
      toast.success(`✅ Rol de "${selectedUser.fullName}" actualizado a ${newRole}`, {
        icon: '🔄',
        style: {
          border: '2px solid #00D2D3',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
      await loadUsers();
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cambiar rol';
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
    } finally {
      setRoleDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // =============================================
  // 🗑️ ABRIR MODAL DE ELIMINAR
  // =============================================
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogOpen(true);
  };

  // =============================================
  // 🗑️ CONFIRMAR ELIMINAR
  // =============================================
  const confirmDelete = async () => {
    if (!selectedUser) return;

    try {
      await userService.deleteUser(selectedUser.id);
      toast.success(`✅ "${selectedUser.fullName}" eliminado correctamente`, {
        icon: '🗑️',
        style: {
          border: '2px solid #00D2D3',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
      await loadUsers();
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar usuario';
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
    } finally {
      setDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // =============================================
  // 🔄 ABRIR MODAL DE ACTIVAR/DESACTIVAR
  // =============================================
  const openToggleDialog = (user: User) => {
    setSelectedUser(user);
    setToggleDialogOpen(true);
  };

  // =============================================
  // ✅ CONFIRMAR ACTIVAR/DESACTIVAR
  // =============================================
  const confirmToggle = async () => {
    if (!selectedUser) return;

    try {
      await userService.toggleUserActive(selectedUser.id);
      const action = selectedUser.isActive ? 'desactivado' : 'activado';
      toast.success(`✅ "${selectedUser.fullName}" ${action} correctamente`, {
        icon: selectedUser.isActive ? '⏸️' : '▶️',
        style: {
          border: '2px solid #00D2D3',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
      await loadUsers();
    } catch (err: any) {
      const errorMessage = err.message || 'Error al cambiar estado';
      toast.error(`❌ ${errorMessage}`, {
        style: {
          border: '2px solid #FF6B81',
          padding: '16px',
          backgroundColor: '#FAF9E2',
          color: '#303030',
        },
      });
    } finally {
      setToggleDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // =============================================
  // ❌ CERRAR MODALES (sin ejecutar acción)
  // =============================================
  const closeDialogs = () => {
    setRoleDialogOpen(false);
    setDeleteDialogOpen(false);
    setToggleDialogOpen(false);
    setSelectedUser(null);
  };

  // =============================================
  // 🚀 EFECTOS
  // =============================================
  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // 📦 Datos
    users,
    filteredUsers,
    paginatedUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    itemsPerPage,

    // 📊 Contadores
    totalUsers,
    activeCount,
    inactiveCount,
    adminCount,
    clienteCount,

    // 📤 Funciones
    loadUsers,
    handleSearch,
    handlePageChange,

    // 🎯 Funciones de modales
    openRoleDialog,
    openDeleteDialog,
    openToggleDialog,
    confirmRoleChange,
    confirmDelete,
    confirmToggle,
    closeDialogs,

    // 🎯 Estados de modales
    roleDialogOpen,
    deleteDialogOpen,
    toggleDialogOpen,
    selectedUser,
    newRole,
    setNewRole,

    // 📊 Constantes
    USER_ROLES,
  };
}