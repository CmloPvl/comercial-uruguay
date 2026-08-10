// 📁 frontend/src/pages/admin/Usuarios.tsx

/**
 * 📌 PÁGINA: ADMIN USUARIOS
 * 
 * Panel de administración de usuarios.
 * Conecta la lógica (useAdminUsuarios) con el diseño (componentes UI).
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y diseño
 * - Componentes reutilizables
 * - Código limpio y fácil de leer
 * - Toasts para feedback
 * - Skeleton de shadcn/ui para carga
 * - Breadcrumb para navegación
 * - Tooltips en botones de acciones
 * - Buscador de usuarios
 * - Paginación
 * - Modales de confirmación (AlertDialog)
 * - Contadores de usuarios
 * - Botón para volver al Dashboard
 */

import { Link } from 'react-router-dom';
import Layout from '../../components/layout/Layout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Skeleton } from '../../components/ui/skeleton';
import { Input } from '../../components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../../components/ui/breadcrumb';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../../components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { useAdminUsuarios } from '../../hooks/useAdminUsuarios';
import { useAuth } from '../../context/AuthContext';

// =============================================
// 🎯 SKELETON DE LA TABLA
// =============================================
const TableSkeleton = () => (
  <div className="space-y-3">
    {/* Encabezados */}
    <div className="flex gap-4 pb-2 border-b border-gray-200">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-32 ml-auto" />
    </div>

    {/* Filas */}
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 py-2 border-b border-gray-100">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-20" />
        <div className="flex gap-2 ml-auto">
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
          <Skeleton className="h-8 w-8 rounded" />
        </div>
      </div>
    ))}
  </div>
);

export default function AdminUsuarios() {
  const { user } = useAuth();

  // =============================================
  // 🧠 LÓGICA (extraída a useAdminUsuarios)
  // =============================================
  const {
    paginatedUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    totalUsers,
    activeCount,
    inactiveCount,
    adminCount,
    clienteCount,
    handleSearch,
    handlePageChange,
    loadUsers,
    openRoleDialog,
    openDeleteDialog,
    openToggleDialog,
    confirmRoleChange,
    confirmDelete,
    confirmToggle,
    closeDialogs,
    roleDialogOpen,
    deleteDialogOpen,
    toggleDialogOpen,
    selectedUser,
    newRole,
    setNewRole,
    USER_ROLES,
  } = useAdminUsuarios();

  // =============================================
  // 🔒 ACCESO DENEGADO (No ADMIN)
  // =============================================
  if (user?.role !== 'ADMIN') {
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
                No tienes permisos para gestionar usuarios.
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
      <Layout title="Gestionar Usuarios">
        {/* Breadcrumb skeleton */}
        <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
          <div className="max-w-7xl mx-auto">
            <Skeleton className="h-5 w-64" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <Skeleton className="h-9 w-64" />
              <Skeleton className="h-4 w-32 mt-2" />
            </div>
            <Skeleton className="h-10 w-40 rounded-xl" />
          </div>

          {/* Buscador skeleton */}
          <Skeleton className="h-10 w-64 mb-4" />

          {/* Tabla skeleton */}
          <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
            <CardContent className="p-4">
              <TableSkeleton />
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <Layout title="Gestionar Usuarios">
      {/* =============================================
      📍 BREADCRUMB
      ============================================= */}
      <div className="bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]">
        <div className="max-w-7xl mx-auto">
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
                  Gestionar Usuarios
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* =============================================
        📌 HEADER
        ============================================= */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <div className="flex items-center flex-wrap gap-3">
              <h1 className="text-3xl font-extrabold text-[#603060] flex items-center gap-2">
                👥 Gestionar Usuarios
                <Badge className="bg-[#00D2D3] text-white text-sm ml-2">
                  {totalUsers} usuarios
                </Badge>
              </h1>
              <div className="flex gap-2">
                <Badge className="bg-[#90C090] text-white text-sm">
                  ✅ {activeCount} activos
                </Badge>
                <Badge className="bg-[#6A757C] text-white text-sm">
                  ⏸️ {inactiveCount} inactivos
                </Badge>
                <Badge className="bg-[#7D5FFF] text-white text-sm">
                  👑 {adminCount} admin
                </Badge>
                <Badge className="bg-[#00D2D3] text-white text-sm">
                  👤 {clienteCount} clientes
                </Badge>
              </div>
            </div>
            <p className="text-[#6A757C] mt-1">
              Administra los usuarios registrados en la tienda
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
          </div>
        </div>

        {/* =============================================
        🔍 BUSCADOR
        ============================================= */}
        <div className="mb-4">
          <Input
            placeholder="🔍 Buscar por nombre, email, teléfono o rol..."
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
              onClick={loadUsers}
              className="ml-auto text-[#FF6B81] hover:text-[#603060] font-bold underline"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* =============================================
        📦 LISTA DE USUARIOS
        ============================================= */}
        {paginatedUsers.length === 0 ? (
          <Card className="border-2 border-[#00D2D3] shadow-lg">
            <CardContent className="p-12 text-center">
              <p className="text-4xl mb-3">👥</p>
              <p className="text-[#6A757C] font-medium">
                {searchTerm ? `No hay usuarios que coincidan con "${searchTerm}"` : 'No hay usuarios registrados'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="mt-4 text-[#7D5FFF] hover:underline font-medium"
                >
                  Limpiar búsqueda →
                </button>
              )}
            </CardContent>
          </Card>
        ) : (
          <>
            <Card className="border-2 border-[#00D2D3] shadow-lg overflow-x-auto">
              <CardContent className="p-0">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200 bg-gradient-to-r from-[#F0F0C0]/30 to-[#F0C0F0]/30">
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Nombre</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Email</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Teléfono</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Rol</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Estado</th>
                      <th className="text-left py-3 px-4 font-bold text-[#603060]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                        <td className="py-3 px-4 font-medium text-[#303030]">{user.fullName}</td>
                        <td className="py-3 px-4 text-[#6A757C]">{user.email}</td>
                        <td className="py-3 px-4 text-[#6A757C]">{user.phone || '—'}</td>
                        <td className="py-3 px-4">
                          <Badge className={user.role === 'ADMIN' ? 'bg-[#7D5FFF] text-white' : 'bg-[#00D2D3] text-white'}>
                            {user.role === 'ADMIN' ? '👑 Admin' : '👤 Cliente'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={user.isActive ? 'bg-[#90C090] text-white' : 'bg-[#6A757C] text-white'}>
                            {user.isActive ? '✅ Activo' : '⏸️ Inactivo'}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-2">
                            {/* Cambiar Rol */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="border-[#7D5FFF] text-[#7D5FFF] hover:bg-[#7D5FFF] hover:text-white transition"
                                    onClick={() => openRoleDialog(user)}
                                  >
                                    🔄
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Cambiar rol</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            {/* Activar/Desactivar */}
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className={
                                      user.isActive
                                        ? 'border-[#FF9F43] text-[#FF9F43] hover:bg-[#FF9F43] hover:text-white transition'
                                        : 'border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white transition'
                                    }
                                    onClick={() => openToggleDialog(user)}
                                  >
                                    {user.isActive ? '⏸️' : '▶️'}
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{user.isActive ? 'Desactivar usuario' : 'Activar usuario'}</p>
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
                                    className="border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white transition"
                                    onClick={() => openDeleteDialog(user)}
                                  >
                                    🗑️
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Eliminar usuario</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>

            {/* =============================================
            📄 PAGINACIÓN
            ============================================= */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
                <span className="text-sm text-[#6A757C]">
                  Mostrando {paginatedUsers.length} de {totalUsers} usuarios
                  {searchTerm && ` (filtrados de ${totalUsers} totales)`}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
                  >
                    Anterior
                  </Button>
                  <span className="flex items-center px-3 text-sm text-[#6A757C]">
                    Página {currentPage} de {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-[#603060] text-[#603060] hover:bg-[#603060] hover:text-white transition"
                  >
                    Siguiente
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* =============================================
      🔄 MODAL DE CAMBIO DE ROL (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={roleDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent className="border-2 border-[#7D5FFF]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#603060] flex items-center gap-2">
              <span className="text-2xl">🔄</span> Cambiar Rol de Usuario
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              Usuario: <strong className="text-[#303030]">{selectedUser?.fullName}</strong>
              <br />
              Email: <strong className="text-[#303030]">{selectedUser?.email}</strong>
              <br />
              <br />
              <span className="text-sm">
                Rol actual:{' '}
                <Badge className={selectedUser?.role === 'ADMIN' ? 'bg-[#7D5FFF] text-white' : 'bg-[#00D2D3] text-white'}>
                  {selectedUser?.role === 'ADMIN' ? '👑 Admin' : '👤 Cliente'}
                </Badge>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="py-4">
            <label className="text-sm font-bold text-[#303030] flex items-center gap-2">
              <span className="text-[#00D2D3]">📌</span> Nuevo rol
            </label>
            <Select value={newRole} onValueChange={(value) => setNewRole(value as 'CLIENTE' | 'ADMIN')}>
              <SelectTrigger className="w-full border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] bg-white rounded-xl mt-1.5">
                <SelectValue placeholder="Seleccionar nuevo rol..." />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
                {USER_ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    <span className="flex items-center gap-2">
                      <span className={`inline-block w-2 h-2 rounded-full ${role.color.split(' ')[0]}`}></span>
                      {role.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmRoleChange}
              className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] hover:from-[#603060] hover:to-[#7D5FFF] text-white"
            >
              ✅ Cambiar Rol
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* =============================================
      🗑️ MODAL DE ELIMINAR (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent className="border-2 border-[#FF6B81]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#FF6B81] flex items-center gap-2">
              <span className="text-2xl">⚠️</span> ¿Eliminar usuario?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              ¿Estás seguro de que quieres eliminar a{' '}
              <strong className="text-[#303030]">"{selectedUser?.fullName}"</strong>?
              <br />
              <span className="text-[#FF6B81] font-medium">
                Esta acción no se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-[#FF6B81] hover:bg-[#603060] text-white"
            >
              🗑️ Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* =============================================
      🔄 MODAL DE ACTIVAR/DESACTIVAR (AlertDialog shadcn)
      ============================================= */}
      <AlertDialog open={toggleDialogOpen} onOpenChange={closeDialogs}>
        <AlertDialogContent
          className={`border-2 ${selectedUser?.isActive ? 'border-[#FF9F43]' : 'border-[#00D2D3]'}`}
        >
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`flex items-center gap-2 ${
                selectedUser?.isActive ? 'text-[#FF9F43]' : 'text-[#00D2D3]'
              }`}
            >
              <span className="text-2xl">🔄</span>
              {selectedUser?.isActive ? 'Desactivar' : 'Activar'} usuario?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[#6A757C]">
              ¿Quieres{' '}
              <strong>{selectedUser?.isActive ? 'desactivar' : 'activar'}</strong> al usuario{' '}
              <strong className="text-[#303030]">"{selectedUser?.fullName}"</strong>?
              <br />
              <span className="text-[#6A757C] text-sm">
                {selectedUser?.isActive
                  ? 'El usuario ya no podrá iniciar sesión ni hacer pedidos.'
                  : 'El usuario podrá iniciar sesión y hacer pedidos nuevamente.'}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-[#6A757C] text-[#6A757C] hover:bg-gray-100">
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmToggle}
              className={
                selectedUser?.isActive
                  ? 'bg-[#FF9F43] hover:bg-[#603060] text-white'
                  : 'bg-[#00D2D3] hover:bg-[#603060] text-white'
              }
            >
              {selectedUser?.isActive ? '⏸️ Desactivar' : '▶️ Activar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
}