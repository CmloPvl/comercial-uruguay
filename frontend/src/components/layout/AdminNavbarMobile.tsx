// 📁 frontend/src/components/layout/AdminNavbarMobile.tsx

/**
 * 📌 ADMIN NAVBAR MOBILE
 * 
 * Navbar completo para dispositivos móviles (celulares).
 * 
 * ✅ Características:
 * - Barra superior con acciones rápidas (Crear Producto, Crear Categoría)
 * - Botón hamburguesa para menú lateral
 * - Avatar con dropdown de usuario
 * - Drawer con buscador (SearchBar reutilizable)
 * - Mobile first
 * - Paleta de colores consistente
 * - Drawer sin espacio innecesario
 * - Sin botón X redundante (cierre con overlay)
 */

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ClipboardList,
  Users,
  Home,
  LogOut,
  PlusCircle,
  Menu,
  X,
  User,
  Settings,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { SearchBar } from "../common/SearchBar";
import { useNavbar } from "../../hooks/useNavbar";

export default function AdminNavbarMobile() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery, handleSearch } = useNavbar();

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/productos", label: "Productos", icon: Package },
    { path: "/admin/categorias", label: "Categorías", icon: FolderTree },
    { path: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
    { path: "/admin/usuarios", label: "Usuarios", icon: Users },
  ];

  return (
    <>
      {/* Barra superior */}
      <nav className="bg-gradient-to-r from-[#7D5FFF] to-[#603060] text-white shadow-2xl sticky top-0 z-50 md:hidden">
        <div className="max-w-7xl mx-auto px-3">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Abrir menú de administración"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white/80" />
              ) : (
                <Menu className="w-5 h-5 text-white/80" />
              )}
            </button>

            <div className="flex items-center gap-1.5">
              <Link
                to="/crear-publicacion"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5 text-white/70" />
                <span>Producto</span>
              </Link>
              <Link
                to="/admin/categorias"
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-all"
              >
                <FolderTree className="w-3.5 h-3.5 text-white/70" />
                <span>Categoría</span>
              </Link>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center text-white hover:bg-white/10 transition-colors px-1 py-1 rounded-xl"
                  aria-label="Abrir menú de usuario"
                >
                  <Avatar className="h-8 w-8 border-2 border-[#FFD93D]">
                    <AvatarFallback className="bg-[#00D2D3] text-white text-xs font-bold">
                      {user?.fullName ? getInitials(user.fullName) : "A"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl rounded-xl border border-[#7D5FFF]/20">
                <DropdownMenuLabel className="flex flex-col">
                  <span className="font-semibold text-[#303030]">{user?.fullName}</span>
                  <span className="text-xs text-[#6A757C]">{user?.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-[#F0F0C0]">
                  <Link to="/perfil" className="flex items-center gap-2 text-[#303030]">
                    <User className="w-4 h-4 text-[#7D5FFF]" />
                    <span>Mi Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-[#F0F0C0]">
                  <Link to="/admin" className="flex items-center gap-2 text-[#303030]">
                    <Settings className="w-4 h-4 text-[#7D5FFF]" />
                    <span>Panel Admin</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="cursor-pointer hover:bg-[#FF6B81]/10 text-[#FF6B81]"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-gradient-to-b from-[#7D5FFF] to-[#603060] shadow-2xl z-50 md:hidden
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
    {/* Header del drawer con buscador */}
<div className="px-4 pt-4 pb-3">
  <SearchBar
    value={searchQuery}
    onChange={setSearchQuery}
    onSubmit={(e) => {
      handleSearch(e);
      setIsOpen(false);
    }}
    variant="menu"
    placeholder="Buscar..."
  />
</div>

        {/* Enlaces del menú */}
        <div className="px-4 py-2 space-y-1 overflow-y-auto h-[calc(100%-100px)]">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleLinkClick}
              className={`
                relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${
                  isActive(item.path)
                    ? "bg-white/20 text-white shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }
              `}
            >
              {isActive(item.path) && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#FFD93D] rounded-r-full" />
              )}
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          ))}

          <div className="border-t border-white/20 my-3" />

          <Link
            to="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-white/10 text-white hover:bg-white/20"
          >
            <Home className="w-5 h-5" />
            <span>Ir a la Tienda</span>
          </Link>

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-all text-[#FF6B81] hover:bg-[#FF6B81]/20 mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Cerrar sesión</span>
          </button>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-xs text-white/30">v1.2.0-beta.1</span>
          </div>
        </div>
      </div>
    </>
  );
}