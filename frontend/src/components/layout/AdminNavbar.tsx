// 📁 frontend/src/components/layout/AdminNavbar.tsx

/**
 * 📌 ADMIN NAVBAR
 * 
 * Barra de navegación para el panel de administración.
 * 
 * ✅ Características:
 * - Menú horizontal con todos los enlaces (Dashboard, Productos, Categorías, Pedidos, Usuarios)
 * - Botón "Tienda" para volver al sitio público
 * - Dropdown de usuario con perfil y cerrar sesión
 * - Mobile se maneja en AdminNavbarMobile.tsx
 * - Paleta de colores consistente
 * - Responsive
 * - Accesible con aria-label
 * 
 * 🎯 Paleta de colores:
 * - Fondo: Gradient #7D5FFF → #603060
 * - Activo: #7D5FFF (morado suave) / #00D2D3 (cian sutil)
 * - Hover: sutil (bg-white/10)
 * - Texto: #FFFFFF (Blanco)
 */

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
import Logo from "../common/Logo";
import AdminNavbarMobile from "./AdminNavbarMobile";

export default function AdminNavbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/productos", label: "Productos", icon: Package },
    { path: "/admin/categorias", label: "Categorías", icon: FolderTree },
    { path: "/admin/pedidos", label: "Pedidos", icon: ClipboardList },
    { path: "/admin/usuarios", label: "Usuarios", icon: Users },
    { path: "/crear-publicacion", label: "Nuevo", icon: PlusCircle },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <>
      {/* ✅ Mobile: AdminNavbarMobile maneja todo */}
      <AdminNavbarMobile />

      {/* ✅ Desktop + Tablet: Navbar horizontal */}
      <nav className="hidden md:block bg-gradient-to-r from-[#7D5FFF] to-[#603060] text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            
            {/* ====== IZQUIERDA ====== */}
            <div className="flex items-center gap-4">
              <Link to="/admin" className="hover:opacity-80 transition-opacity">
                <Logo className="h-14 w-auto" />
              </Link>
            </div>

            {/* ====== CENTRO: Menú ====== */}
            <div className="flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive(item.path)
                        ? "bg-white/20 text-white shadow-md scale-105"
                        : "text-white/80 hover:text-white hover:bg-white/10 hover:scale-105"
                    }
                  `}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* ====== DERECHA ====== */}
            <div className="flex items-center gap-3">
              {/* 🏠 Tienda */}
              <Link
                to="/"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 bg-white/15 text-white hover:bg-white/25 hover:scale-105"
                title="Ver la tienda como cliente"
                aria-label="Ir a la tienda"
              >
                <Home className="w-4 h-4" />
                <span>Tienda</span>
              </Link>

              {/* 👤 Dropdown de Usuario */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 text-white hover:bg-white/20 transition-colors px-3 py-2 rounded-xl"
                    aria-label="Abrir menú de usuario"
                  >
                    <Avatar className="h-10 w-10 border-2 border-[#FFD93D]">
                      <AvatarFallback className="bg-[#00D2D3] text-white text-sm font-bold">
                        {user?.fullName ? getInitials(user.fullName) : "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-sm font-medium text-white/90">
                      {user?.fullName?.split(" ")[0] || "Admin"}
                    </span>
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
        </div>
      </nav>
    </>
  );
}