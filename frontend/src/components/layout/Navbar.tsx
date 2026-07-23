import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import Logo from "../common/Logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  LogOut,
  Settings,
  Home,
  Package,
  Tag,
  Users,
  Phone,
  Star,
  Menu,
  X,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const avatarColors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
  ];
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* ====== LOGO + MENÚ HAMBURGUESA ====== */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Logo visible solo en desktop */}
            <Link to="/" className="hidden md:block flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-10 w-auto md:h-14 lg:h-16" />
            </Link>

            {/* Logo pequeño para mobile */}
            <Link to="/" className="md:hidden flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-8 w-auto" />
            </Link>

            {/* Menú hamburguesa */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
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
                  {/* Header del menú mobile */}
                  <div className="flex items-center justify-between p-4 border-b border-[#7D5FFF]/30 bg-gradient-to-r from-[#F0F0C0]/40 to-[#F0C0F0]/40">
                    <div className="flex items-center gap-3">
                      <Logo className="h-10 w-auto" />
                      <span className="text-lg font-bold bg-gradient-to-r from-[#603060] to-[#7D5FFF] bg-clip-text text-transparent">
                        Comercial Uruguay
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[#603060] hover:bg-[#603060]/10 hover:scale-105 h-8 w-8"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Buscador en menú mobile */}
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

                  {/* Navegación mobile */}
                  <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-0.5">
                    <NavItemMobile to="/" icon={<Home className="w-5 h-5" />} label="Inicio" onClick={() => setIsMenuOpen(false)} />
                    <NavItemMobile to="/productos" icon={<Package className="w-5 h-5" />} label="Tienda" onClick={() => setIsMenuOpen(false)} />
                    <NavItemMobile to="/ofertas" icon={<Tag className="w-5 h-5" />} label="Ofertas" onClick={() => setIsMenuOpen(false)} />
                    <NavItemMobile to="/nosotros" icon={<Users className="w-5 h-5" />} label="Nosotros" onClick={() => setIsMenuOpen(false)} />
                    <NavItemMobile to="/contacto" icon={<Phone className="w-5 h-5" />} label="Contacto" onClick={() => setIsMenuOpen(false)} />

                    <div className="pt-2 border-t border-gray-100 mt-2 space-y-0.5">
                      <NavItemMobile to="/favoritos" icon={<Heart className="w-5 h-5" />} label="Favoritos" onClick={() => setIsMenuOpen(false)} />
                      <NavItemMobile to="/carrito" icon={<ShoppingCart className="w-5 h-5" />} label={`Carrito (${totalItems})`} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    <div className="pt-2 border-t border-gray-100 mt-2 space-y-0.5">
                      {user ? (
                        <>
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
                          <NavItemMobile to="/perfil" icon={<User className="w-5 h-5" />} label="Mi Perfil" onClick={() => setIsMenuOpen(false)} />
                          <NavItemMobile to="/mis-pedidos" icon={<Package className="w-5 h-5" />} label="Mis Pedidos" onClick={() => setIsMenuOpen(false)} />
                          <button
                            onClick={() => {
                              logout();
                              setIsMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-semibold text-sm"
                          >
                            <LogOut className="w-5 h-5" /> Cerrar Sesión
                          </button>
                        </>
                      ) : (
                        <>
                          <NavItemMobile to="/login" icon={<User className="w-5 h-5" />} label="Iniciar Sesión" onClick={() => setIsMenuOpen(false)} />
                          <NavItemMobile to="/registro" icon={<Star className="w-5 h-5" />} label="Registrarse" onClick={() => setIsMenuOpen(false)} />
                        </>
                      )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
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
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
            {/* Favoritos - solo desktop */}
            <Link
              to="/favoritos"
              className="hidden sm:flex items-center gap-1 text-white/80 hover:text-[#FFD93D] transition text-sm font-medium hover:scale-105"
            >
              <Heart className="w-5 h-5" />
              <span className="hidden lg:inline">Favoritos</span>
            </Link>

            {/* Carrito */}
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

            {/* Usuario / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:opacity-80 transition hover:scale-105">
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
                <DropdownMenuContent align="end" className="w-52 sm:w-56 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1">
                  <DropdownMenuLabel className="font-normal bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-lg p-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-bold text-[#603060]">{user.fullName}</p>
                      <p className="text-xs text-[#6A757C] truncate">{user.email}</p>
                      <p className="text-xs text-[#7D5FFF] font-medium">
                        {user.role === "ADMIN" ? "👑 Administrador" : "🛒 Cliente"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg text-sm">
                    <Link to="/perfil" className="text-[#303030] hover:text-[#7D5FFF]">
                      <User className="w-4 h-4 mr-2" /> Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg text-sm">
                    <Link to="/mis-pedidos" className="text-[#303030] hover:text-[#00D2D3]">
                      <Package className="w-4 h-4 mr-2" /> Mis Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#FF6B81]/10 cursor-pointer rounded-lg text-sm">
                    <Link to="/favoritos" className="text-[#303030] hover:text-[#FF6B81]">
                      <Heart className="w-4 h-4 mr-2" /> Favoritos
                    </Link>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                      <DropdownMenuItem asChild className="hover:bg-[#FFD93D]/20 cursor-pointer rounded-lg text-sm">
                        <Link to="/admin" className="text-[#603060] hover:text-[#7D5FFF] font-medium">
                          <Settings className="w-4 h-4 mr-2" /> Panel Admin
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                  <DropdownMenuItem
                    onClick={logout}
                    className="hover:bg-[#FF6B81]/10 cursor-pointer text-[#FF6B81] font-semibold rounded-lg text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" /> Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

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