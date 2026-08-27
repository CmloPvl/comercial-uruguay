// 📁 frontend/src/components/layout/NavbarAdminMenu.tsx

/**
 * 📌 NAVBAR ADMIN MENU
 * 
 * COMPONENTE DE DISEÑO
 * 
 * Muestra un menú desplegable con opciones exclusivas para administradores.
 * Solo se renderiza si el usuario tiene rol ADMIN.
 * 
 * ✅ Buenas prácticas:
 * - Componente aislado y reutilizable
 * - Solo se muestra cuando es necesario (condicional en el padre)
 * - Fácil de mantener y modificar
 * - Usa los mismos estilos que el resto del Navbar
 * 
 * @param {Object} props
 * @param {string} props.userRole - Rol del usuario ('ADMIN' | 'CLIENTE')
 * @returns {JSX.Element | null} - Menú de admin o null si no es admin
 */

import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Button } from "../../ui/button";
import { 
  Settings, 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Tag, 
  PlusCircle 
} from "lucide-react";

interface NavbarAdminMenuProps {
  userRole: string; // 'ADMIN' | 'CLIENTE'
}

export function NavbarAdminMenu({ userRole }: NavbarAdminMenuProps) {
  // 🔒 Si no es ADMIN, no renderiza nada
  if (userRole !== "ADMIN") {
    return null;
  }

  return (
    <DropdownMenu>
      {/* 🔹 Botón que abre el menú */}
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition text-sm font-medium flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full hover:scale-105"
        >
          <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline text-xs sm:text-sm">Admin</span>
        </Button>
      </DropdownMenuTrigger>

      {/* 🔹 Contenido del menú desplegable */}
      <DropdownMenuContent align="end" className="w-44 sm:w-48 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1">
        
        {/* 📊 Dashboard */}
        <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/admin" className="text-[#303030] hover:text-[#7D5FFF] font-medium py-2.5">
            <LayoutDashboard className="w-4 h-4 mr-2" /> Dashboard
          </Link>
        </DropdownMenuItem>

        {/* 📦 Productos */}
        <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/admin/productos" className="text-[#303030] hover:text-[#00D2D3] font-medium py-2.5">
            <Package className="w-4 h-4 mr-2" /> Productos
          </Link>
        </DropdownMenuItem>

        {/* 🛒 Pedidos */}
        <DropdownMenuItem asChild className="hover:bg-[#FF6B81]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/admin/pedidos" className="text-[#303030] hover:text-[#FF6B81] font-medium py-2.5">
            <ShoppingBag className="w-4 h-4 mr-2" /> Pedidos
          </Link>
        </DropdownMenuItem>

        {/* 🏷️ Categorías */}
        <DropdownMenuItem asChild className="hover:bg-[#FFD93D]/20 cursor-pointer rounded-lg text-sm">
          <Link to="/admin/categorias" className="text-[#303030] hover:text-[#FF9F43] font-medium py-2.5">
            <Tag className="w-4 h-4 mr-2" /> Categorías
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />

        {/* ➕ Crear Producto */}
        <DropdownMenuItem asChild className="hover:bg-[#603060]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/crear-publicacion" className="text-[#603060] hover:text-[#7D5FFF] font-medium py-2.5">
            <PlusCircle className="w-4 h-4 mr-2" /> Crear Producto
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}