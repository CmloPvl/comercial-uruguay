// 📁 frontend/src/components/layout/NavbarMobile.tsx

/**
 * 📌 NAVBAR MOBILE
 * 
 * COMPONENTE DE DISEÑO
 * 
 * Menú lateral (Sheet) para dispositivos móviles.
 * Contiene: logo, buscador, navegación principal, usuario y admin.
 * 
 * ✅ Buenas prácticas:
 * - Componente aislado y reutilizable
 * - Recibe todas las props necesarias
 * - Fácil de mantener
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Estado del menú
 * @param {Function} props.onOpenChange - Función para abrir/cerrar
 * @param {string} props.searchQuery - Texto de búsqueda
 * @param {Function} props.setSearchQuery - Actualiza la búsqueda
 * @param {Function} props.handleSearch - Maneja el envío de búsqueda
 * @param {User} props.user - Datos del usuario
 * @param {Function} props.logout - Cerrar sesión
 * @param {number} props.totalItems - Total de items en carrito
 * @param {string} props.randomColor - Color del avatar
 * @param {Function} props.getInitials - Obtener iniciales
 * @param {Function} props.onClose - Cerrar el menú
 */

import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../../components/ui/sheet";
import { Button } from "../../components/ui/button";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import Logo from "../common/Logo";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Home,
  Package,
  Tag,
  Users,
  Phone,
  Star,
  Menu,
} from "lucide-react";

interface NavbarMobileProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
  user: {
    fullName: string;
    email: string;
    role: string;
  } | null;
  logout: () => void;
  totalItems: number;
  randomColor: string;
  getInitials: (name: string) => string;
  onClose: () => void;
}

export function NavbarMobile({
  isOpen,
  onOpenChange,
  searchQuery,
  setSearchQuery,
  handleSearch,
  user,
  logout,
  totalItems,
  randomColor,
  getInitials,
  onClose,
}: NavbarMobileProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition hover:scale-105 h-9 w-9 sm:h-10 sm:w-10"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-[85vw] max-w-sm bg-white border-r-4 border-[#7D5FFF] p-0">
        <div className="flex flex-col h-full">
          {/* 🔹 Header: Logo + título + cerrar */}
          <div className="flex items-center justify-between p-4 border-b border-[#7D5FFF]/30 bg-gradient-to-r from-[#F0F0C0]/40 to-[#F0C0F0]/40">
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-auto" />
              <span className="text-lg font-bold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
                
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-[#603060] hover:bg-[#603060]/10 hover:scale-105 h-8 w-8"
            >
              
            </Button>
          </div>

          {/* 🔹 Buscador */}
          <div className="p-4 border-b border-gray-100">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full bg-[#F0F0C0] text-[#303030] placeholder-[#6A757C] border-2 border-[#7D5FFF] focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition text-sm"
              />
              <Search className="absolute right-3 top-2.5 text-[#6A757C] w-4 h-4" />
            </form>
          </div>

          {/* 🔹 Navegación */}
          <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
            <NavItemMobile to="/" icon={<Home className="w-5 h-5" />} label="Inicio" onClick={onClose} />
            <NavItemMobile to="/productos" icon={<Package className="w-5 h-5" />} label="Tienda" onClick={onClose} />
            <NavItemMobile to="/ofertas" icon={<Tag className="w-5 h-5" />} label="Ofertas" onClick={onClose} />
            <NavItemMobile to="/nosotros" icon={<Users className="w-5 h-5" />} label="Nosotros" onClick={onClose} />
            <NavItemMobile to="/contacto" icon={<Phone className="w-5 h-5" />} label="Contacto" onClick={onClose} />

            <div className="pt-2 border-t border-gray-100 mt-2 space-y-0.5">
              <NavItemMobile to="/favoritos" icon={<Heart className="w-5 h-5" />} label="Favoritos" onClick={onClose} />
              <NavItemMobile to="/carrito" icon={<ShoppingCart className="w-5 h-5" />} label={`Carrito (${totalItems})`} onClick={onClose} />
            </div>

            <div className="pt-2 border-t border-gray-100 mt-2 space-y-0.5">
              {user ? (
                <>
                  {/* Datos del usuario */}
                  <div className="flex items-center gap-3 px-3 py-2.5 bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-xl mb-1">
                    <Avatar className="h-10 w-10 ring-2 ring-[#7D5FFF]">
                      <AvatarFallback className={`${randomColor} text-white font-bold text-sm`}>
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-[#603060] text-sm truncate">{user.fullName}</p>
                      <p className="text-xs text-[#6A757C] truncate">{user.email}</p>
                      <p className="text-xs text-[#7D5FFF] font-medium">
                        {user.role === "ADMIN" ? "👑 Administrador" : "🛒 Cliente"}
                      </p>
                    </div>
                  </div>

                  <NavItemMobile to="/perfil" icon={<User className="w-5 h-5" />} label="Mi Perfil" onClick={onClose} />
                  <NavItemMobile to="/mis-pedidos" icon={<Package className="w-5 h-5" />} label="Mis Pedidos" onClick={onClose} />

                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-semibold text-sm"
                  >
                    <LogOut className="w-5 h-5" /> Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <NavItemMobile to="/login" icon={<User className="w-5 h-5" />} label="Iniciar Sesión" onClick={onClose} />
                  <NavItemMobile to="/registro" icon={<Star className="w-5 h-5" />} label="Registrarse" onClick={onClose} />
                </>
              )}
            </div>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// =============================================
// 🧩 COMPONENTE SECUNDARIO: NavItemMobile
// =============================================

interface NavItemMobileProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function NavItemMobile({ to, icon, label, onClick }: NavItemMobileProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-50 hover:text-[#7D5FFF] transition font-medium text-[#303030] text-sm"
    >
      <span className="text-[#7D5FFF]">{icon}</span>
      <span>{label}</span>
    </Link>
  );
}