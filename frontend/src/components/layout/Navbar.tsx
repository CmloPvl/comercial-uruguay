import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { useState } from "react"  // ← useEffect eliminado
import Logo from "../common/Logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet"
import { Button } from "../ui/button"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const avatarColors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
  ]
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* ====== LOGO + MENÚ HAMBURGUESA ====== */}
          <div className="flex items-center gap-3">
            {/* Logo PRIMERO */}
            <Link to="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
              <Logo className="h-12 w-auto" />
            </Link>

            {/* Menú hamburguesa DESPUÉS del logo */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition p-2 hover:scale-105"
                >
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white border-r-4 border-[#7D5FFF] p-0">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 p-6 border-b border-[#7D5FFF]/30 bg-gradient-to-r from-[#F0F0C0]/40 to-[#F0C0F0]/40">
                    <Logo className="h-12 w-auto" />
                    <span className="text-xl font-bold text-[#603060]">Comercial Uruguay</span>
                  </div>

                  <div className="p-4 border-b border-gray-100">
                    <form onSubmit={handleSearch} className="relative">
                      <input
                        type="text"
                        placeholder="🔍 Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-5 py-3 rounded-full bg-[#F0F0C0] text-[#303030] placeholder-gray-500 border-2 border-[#7D5FFF] focus:outline-none focus:ring-2 focus:ring-[#FF6B81] transition text-lg"
                      />
                    </form>
                  </div>

                  <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                    <NavItem to="/" icon="🏠" label="Inicio" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/productos" icon="🛍️" label="Tienda" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/ofertas" icon="🔥" label="Ofertas" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/nosotros" icon="👥" label="Nosotros" onClick={() => setIsMenuOpen(false)} />
                    <NavItem to="/contacto" icon="📞" label="Contacto" onClick={() => setIsMenuOpen(false)} />
                    
                    <div className="pt-3 border-t border-gray-100 mt-3 space-y-1">
                      <NavItem to="/favoritos" icon="❤️" label="Favoritos" onClick={() => setIsMenuOpen(false)} />
                      <NavItem to="/carrito" icon="🛒" label={`Carrito (${totalItems})`} onClick={() => setIsMenuOpen(false)} />
                    </div>

                    <div className="pt-3 border-t border-gray-100 mt-3 space-y-1">
                      {user ? (
                        <>
                          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-xl">
                            <Avatar className="h-12 w-12 ring-2 ring-[#7D5FFF]">
                              <AvatarFallback className={`${randomColor} text-white font-bold text-lg`}>
                                {getInitials(user.fullName)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-[#603060] text-base truncate">{user.fullName}</p>
                              <p className="text-sm text-gray-500 truncate">{user.email}</p>
                              <p className="text-xs text-[#7D5FFF] font-medium mt-0.5">
                                {user.role === "ADMIN" ? "👑 Administrador" : "🛒 Cliente"}
                              </p>
                            </div>
                          </div>
                          <NavItem to="/perfil" icon="👤" label="Mi Perfil" onClick={() => setIsMenuOpen(false)} />
                          <NavItem to="/mis-pedidos" icon="📦" label="Mis Pedidos" onClick={() => setIsMenuOpen(false)} />
                          <button
                            onClick={() => { logout(); setIsMenuOpen(false) }}
                            className="w-full text-left px-4 py-3 rounded-xl text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-bold text-base flex items-center gap-3"
                          >
                            <span>🚪</span> Cerrar Sesión
                          </button>
                        </>
                      ) : (
                        <>
                          <NavItem to="/login" icon="🔐" label="Iniciar Sesión" onClick={() => setIsMenuOpen(false)} />
                          <NavItem to="/registro" icon="📝" label="Registrarse" onClick={() => setIsMenuOpen(false)} />
                        </>
                      )}
                    </div>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* ====== BUSCADOR ====== */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-white/15 text-white placeholder-white/70 border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all backdrop-blur-sm text-lg"
              />
              <span className="absolute right-5 top-3 text-white/50 group-hover:text-[#FFD93D] transition text-xl">🔍</span>
            </form>
          </div>

          {/* ====== ACCIONES ====== */}
          <div className="flex items-center gap-3 md:gap-5">
            <Link 
              to="/favoritos" 
              className="flex items-center gap-1.5 text-white/80 hover:text-[#FFD93D] transition text-base font-medium hover:scale-105"
            >
              <span className="text-xl">❤️</span>
              <span className="hidden lg:inline">Favoritos</span>
            </Link>

            <Link 
              to="/carrito" 
              className="flex items-center gap-1.5 text-white/80 hover:text-[#FFD93D] transition text-base font-medium hover:scale-105 relative"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden lg:inline">Carrito</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-[#FF6B81] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition hover:scale-105">
                    <Avatar className="h-10 w-10 ring-2 ring-white/50 hover:ring-[#FFD93D] transition-all">
                      <AvatarFallback className={`${randomColor} text-white font-bold text-base`}>
                        {getInitials(user.fullName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-white/90 text-base font-medium">
                      {user.fullName?.split(" ")[0]}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1">
                  <DropdownMenuLabel className="font-normal bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-lg p-3">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-bold text-[#603060]">{user.fullName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <p className="text-xs text-[#7D5FFF] font-medium mt-0.5">
                        {user.role === "ADMIN" ? "👑 Administrador" : "🛒 Cliente"}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg">
                    <Link to="/perfil" className="text-[#303030] hover:text-[#7D5FFF]">👤 Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg">
                    <Link to="/mis-pedidos" className="text-[#303030] hover:text-[#00D2D3]">📦 Mis Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#FF6B81]/10 cursor-pointer rounded-lg">
                    <Link to="/favoritos" className="text-[#303030] hover:text-[#FF6B81]">❤️ Favoritos</Link>
                  </DropdownMenuItem>
                  {user.role === "ADMIN" && (
                    <>
                      <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                      <DropdownMenuItem asChild className="hover:bg-[#FFD93D]/20 cursor-pointer rounded-lg">
                        <Link to="/admin" className="text-[#603060] hover:text-[#7D5FFF] font-medium">👑 Panel Admin</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/20" />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="hover:bg-[#FF6B81]/10 cursor-pointer text-[#FF6B81] font-bold rounded-lg"
                  >
                    🚪 Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition text-base font-medium flex items-center gap-1.5 px-3 py-2 rounded-full hover:scale-105"
                  >
                    <span className="text-xl">👤</span>
                    <span className="hidden sm:inline">Mi Cuenta</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white p-1">
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer rounded-lg">
                    <Link to="/login" className="text-[#303030] hover:text-[#7D5FFF] font-medium text-base py-3">
                      🔐 Iniciar Sesión
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer rounded-lg">
                    <Link to="/registro" className="text-[#303030] hover:text-[#00D2D3] font-medium text-base py-3">
                      📝 Crear Cuenta
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  to: string
  icon: string
  label: string
  onClick?: () => void
}

function NavItem({ to, icon, label, onClick }: NavItemProps) {
  return (
    <Link 
      to={to} 
      onClick={onClick} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 hover:text-[#7D5FFF] transition font-medium text-[#303030] text-lg"
    >
      <span className="text-2xl">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}