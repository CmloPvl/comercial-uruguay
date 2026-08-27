// 📁 frontend/src/components/layout/NavbarUserMenu.tsx

/**
 * 📌 NAVBAR USER MENU
 * 
 * COMPONENTE DE DISEÑO
 * 
 * Muestra el menú desplegable del usuario autenticado.
 * Incluye: perfil, pedidos, favoritos, panel admin (si es admin) y cerrar sesión.
 * 
 * ✅ Buenas prácticas:
 * - Componente aislado y reutilizable
 * - Atributos ARIA para accesibilidad
 * - Redirección a página anterior después de acciones
 * - Cierre automático del menú al hacer clic
 * - Fácil de testear
 * 
 * @param {Object} props
 * @param {User} props.user - Datos del usuario
 * @param {Function} props.logout - Función para cerrar sesión
 * @param {string} props.randomColor - Color del avatar
 * @param {Function} props.getInitials - Función para obtener iniciales
 * @param {Function} props.onClose - Función para cerrar el menú (mobile)
 */

import { Link, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { User, Package, Heart, LogOut, LayoutDashboard } from "lucide-react";

interface NavbarUserMenuProps {
  user: {
    fullName: string;
    email: string;
    role: string;
  };
  logout: () => void;
  randomColor: string;
  getInitials: (name: string) => string;
  onClose?: () => void;
}

export function NavbarUserMenu({ 
  user, 
  logout, 
  randomColor, 
  getInitials, 
  onClose 
}: NavbarUserMenuProps) {
  const location = useLocation();
  const isAdmin = user.role === "ADMIN";

  return (
    <DropdownMenu>
      {/* 🔹 Botón que abre el menú (Avatar + nombre) */}
      <DropdownMenuTrigger asChild>
        <div 
          className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition hover:scale-105"
          aria-label="Abrir menú de usuario"
          role="button"
          tabIndex={0}
        >
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 ring-2 ring-white/50 hover:ring-[#FFD93D] transition-all">
            <AvatarFallback className={`${randomColor} text-white font-bold text-xs sm:text-sm`}>
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
          <span className="hidden lg:inline text-white/90 text-sm font-medium">
            {user.fullName?.split(" ")[0]}
          </span>
        </div>
      </DropdownMenuTrigger>

      {/* 🔹 Contenido del menú desplegable */}
      <DropdownMenuContent 
        align="end" 
        className="w-52 sm:w-56 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1"
        onSelect={() => onClose?.()}
      >
        
        {/* 📌 Header: Datos del usuario */}
        <DropdownMenuLabel className="font-normal bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-lg p-3">
          <div className="flex flex-col space-y-0.5">
            <p className="text-sm font-bold text-[#603060]">{user.fullName}</p>
            <p className="text-xs text-[#6A757C] truncate">{user.email}</p>
            {isAdmin ? (
              <Link 
                to="/admin" 
                state={{ from: location.pathname }}
                className="text-xs text-[#7D5FFF] font-medium hover:underline flex items-center gap-1"
                onClick={onClose}
              >
                <LayoutDashboard className="w-3 h-3" /> 👑 Administrador → Ir al panel
              </Link>
            ) : (
              <p className="text-xs text-[#7D5FFF] font-medium">🛒 Cliente</p>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />

        {/* 👤 Mi Perfil */}
        <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg text-sm">
          <Link 
            to="/perfil" 
            state={{ from: location.pathname }}
            className="text-[#303030] hover:text-[#7D5FFF]"
            onClick={onClose}
          >
            <User className="w-4 h-4 mr-2" /> Mi Perfil
          </Link>
        </DropdownMenuItem>

        {/* 📦 Mis Pedidos */}
        <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg text-sm">
          <Link 
            to="/mis-pedidos" 
            state={{ from: location.pathname }}
            className="text-[#303030] hover:text-[#00D2D3]"
            onClick={onClose}
          >
            <Package className="w-4 h-4 mr-2" /> Mis Pedidos
          </Link>
        </DropdownMenuItem>

        {/* ❤️ Favoritos */}
        <DropdownMenuItem asChild className="hover:bg-[#FF6B81]/10 cursor-pointer rounded-lg text-sm">
          <Link 
            to="/favoritos" 
            state={{ from: location.pathname }}
            className="text-[#303030] hover:text-[#FF6B81]"
            onClick={onClose}
          >
            <Heart className="w-4 h-4 mr-2" /> Favoritos
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />

        {/* 🚪 Cerrar Sesión */}
        <DropdownMenuItem
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className="hover:bg-[#FF6B81]/10 cursor-pointer text-[#FF6B81] font-semibold rounded-lg text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}