// 📁 frontend/src/components/layout/Navbar.tsx

/**
 * 📌 NAVBAR — COMPONENTE DE DISEÑO
 * 
 * Este componente SOLO se encarga de la interfaz de usuario (UI).
 * Toda la lógica (autenticación, carrito, menú, búsqueda) está en el hook useNavbar.
 * 
 * ✅ Mejoras aplicadas:
 * - Buscador reutilizable (SearchBar)
 * - Lupa en móvil que abre el menú
 * - aria-label para accesibilidad
 * - Condicional para NavbarAdminMenu (solo admin)
 * - Estructura limpia y escalable
 */

import { Link } from "react-router-dom";
import Logo from "../common/Logo";
import { Search, Heart, ShoppingCart } from "lucide-react";
import { SearchBar } from "../common/SearchBar";

// ✅ Importar el hook que contiene toda la lógica
import { useNavbar } from "../../hooks/useNavbar";

// ✅ Importar los subcomponentes
import { NavbarAdminMenu } from "./drop-menu/NavbarAdminMenu";
import { NavbarUserMenu } from "./drop-menu/NavbarUserMenu";
import { NavbarGuestMenu } from "./drop-menu/NavbarGuestMenu";
import { NavbarMenu } from "./NavbarMenu";

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

  const isAdmin = user?.role === "ADMIN";

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
            <NavbarMenu
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
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
            variant="navbar"
            placeholder="Buscar productos..."
          />

          {/* ====== ACCIONES ====== */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
            
            {/* 🔍 LUPA - Móvil (abre el menú) */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden text-white hover:text-[#FFD93D] transition hover:scale-105"
              aria-label="Buscar productos"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* ❤️ FAVORITOS - Visible en todos los tamaños */}
            <Link
              to="/favoritos"
              aria-label="Favoritos"
              className="flex items-center gap-1 text-white/80 hover:text-[#FFD93D] transition text-sm font-medium hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>

            {/* 🛒 CARRITO */}
            <Link
              to="/carrito"
              aria-label="Carrito de compras"
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
                {isAdmin && <NavbarAdminMenu userRole={user.role} />}
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