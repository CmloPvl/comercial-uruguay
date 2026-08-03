// 📁 frontend/src/components/layout/NavbarGuestMenu.tsx

/**
 * 📌 NAVBAR GUEST MENU
 * 
 * COMPONENTE DE DISEÑO
 * 
 * Muestra el menú para usuarios no autenticados.
 * Incluye: Iniciar Sesión y Registrarse.
 * 
 * ✅ Buenas prácticas:
 * - Componente aislado y reutilizable
 * - Recibe todas las props necesarias
 * - Fácil de mantener
 */

import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Button } from "../../components/ui/button";
import { User, Star } from "lucide-react";

export function NavbarGuestMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition text-sm font-medium flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-full hover:scale-105 h-8 sm:h-9"
        >
          <User className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="hidden xs:inline text-xs sm:text-sm">Mi Cuenta</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44 sm:w-48 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1">
        <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/login" className="text-[#303030] hover:text-[#7D5FFF] font-medium py-2.5">
            <User className="w-4 h-4 mr-2" /> Iniciar Sesión
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg text-sm">
          <Link to="/registro" className="text-[#303030] hover:text-[#00D2D3] font-medium py-2.5">
            <Star className="w-4 h-4 mr-2" /> Crear Cuenta
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}