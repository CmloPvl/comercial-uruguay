// 📁 frontend/src/components/layout/Navbar.tsx

/**
 * 📌 NAVBAR — COMPONENTE DE DISEÑO
 * 
 * Este componente SOLO se encarga de la interfaz de usuario (UI).
 * Toda la lógica (autenticación, carrito, menú, búsqueda) está en el hook useNavbar.
 */

import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { Search, Heart, ShoppingCart } from "lucide-react";

// ✅ Importar el hook que contiene toda la lógica
import { useNavbar } from "../../hooks/useNavbar";

// ✅ Importar los subcomponentes
import { NavbarAdminMenu } from "./NavbarAdminMenu";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarGuestMenu } from "./NavbarGuestMenu";
import { NavbarMobile } from "./NavbarMobile";

export default function Navbar() {
  const {
    user,
    logout,
    totalItems,
    isMenuOpen,
    setIsMenuOpen,
    searchQuery,
    setSearchQuery,
    handleSearch,
    randomColor,
    getInitials,
  } = useNavbar();

  return (
    <nav className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* ====== LOGO + MENÚ MÓVIL ====== */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Logo Desktop */}
            <Link to="/" className="hidden md:block flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-10 w-auto md:h-14 lg:h-16" />
            </Link>

            {/* 📌 Menú Móvil (Sheet) */}
            <NavbarMobile
              isOpen={isMenuOpen}
              onOpenChange={setIsMenuOpen}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              user={user}
              logout={logout}
              totalItems={totalItems}
              randomColor={randomColor}
              getInitials={getInitials}
              onClose={() => setIsMenuOpen(false)}
            />

            {/* Logo Mobile - DESPUÉS de la hamburguesa */}
            <Link to="/" className="md:hidden flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-8 w-auto" />
            </Link>
          </div>

          {/* ====== BUSCADOR (Desktop) ====== */}
          <div className="hidden md:flex flex-1 max-w-md lg:max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-5 py-2.5 rounded-full bg-white/15 text-white placeholder-white/70 border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all backdrop-blur-sm text-sm"
              />
              <Search className="absolute right-4 top-2.5 text-white/50 group-hover:text-[#FFD93D] transition w-5 h-5" />
            </form>
          </div>

          {/* ====== ACCIONES ====== */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            
            {/* ❤️ FAVORITOS - Visible en todos los tamaños */}
            <Link
              to="/favoritos"
              className="flex items-center gap-1 text-white/80 hover:text-[#FFD93D] transition text-sm font-medium hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>

            {/* 🛒 CARRITO */}
            <Link
              to="/carrito"
              className="flex items-center gap-1 text-white/80 hover:text-[#FFD93D] transition text-sm font-medium hover:scale-105 relative"
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden lg:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 sm:-top-2 sm:-right-3 bg-[#FF6B81] text-white text-[10px] sm:text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shadow-md">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* 👤 MENÚ DE USUARIO */}
            {user ? (
              <>
                <NavbarAdminMenu userRole={user.role} />
                <NavbarUserMenu
                  user={user}
                  logout={logout}
                  randomColor={randomColor}
                  getInitials={getInitials}
                />
              </>
            ) : (
              <NavbarGuestMenu />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}