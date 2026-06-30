import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../ui/button"
import { useState } from "react"
import Logo from "../Logo"
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

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { to: "/", label: "🏠 Home" },
    { to: "/productos", label: "🛍️ Tienda" },
    { to: "/ofertas", label: "🔥 Ofertas" },
    { to: "/nosotros", label: "👥 Nosotros" },
    { to: "/contacto", label: "📞 Contacto" },
  ]

  // Colores variados para el avatar según el usuario
  const avatarColors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
  ]
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]

  return (
    <nav className="bg-gradient-to-r from-[#FFD93D] via-[#F0C030] to-[#FF9F43] text-[#303030] shadow-lg sticky top-0 z-50 border-b-4 border-[#7D5FFF]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* ====== LOGO ====== */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-white p-1.5 rounded-full shadow-md hover:shadow-lg transition hover:ring-2 hover:ring-[#FF6B81]">
              <Logo className="h-10 w-auto" />
            </div>
            <span className="text-xl font-bold text-[#303030] drop-shadow-sm hidden sm:inline">
              Comercial Uruguay
            </span>
          </Link>

          {/* ====== BUSCADOR MEJORADO ====== */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="🔍 Buscar productos..."
                className="w-full px-4 py-2.5 rounded-full bg-white text-[#303030] placeholder-gray-500 border-2 border-[#7D5FFF] focus:outline-none focus:ring-4 focus:ring-[#FF6B81] focus:border-[#FF6B81] transition-all shadow-sm hover:shadow-md"
              />
              <span className="absolute right-3 top-3 text-gray-400 group-hover:text-[#FF6B81] transition">🔍</span>
            </div>
          </div>

          {/* ====== ENLACES (Desktop) ====== */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, index) => {
              const colors = [
                "hover:text-[#7D5FFF]",
                "hover:text-[#FF6B81]",
                "hover:text-[#00D2D3]",
                "hover:text-[#603060]",
                "hover:text-[#FF9F43]",
              ]
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-bold ${colors[index % colors.length]} transition-all hover:scale-110 transform`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* ====== ACCIONES (Desktop) ====== */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Carrito */}
            <Link to="/carrito" className="relative group">
              <span className="text-2xl drop-shadow-md group-hover:scale-110 transition-transform">🛒</span>
              <span className="absolute -top-1 -right-2 bg-[#FF6B81] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md animate-pulse">
                0
              </span>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:ring-4 hover:ring-[#FFD93D] transition-all">
                    <AvatarFallback className={`${randomColor} text-white font-bold text-lg`}>
                      {user.fullName?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-2 border-[#7D5FFF] shadow-xl rounded-xl">
                  <DropdownMenuLabel className="font-normal bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-t-xl">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-[#603060]">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/30" />
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer">
                    <Link to="/perfil" className="text-[#303030] hover:text-[#7D5FFF]">
                      👤 Mi Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer">
                    <Link to="/mis-pedidos" className="text-[#303030] hover:text-[#00D2D3]">
                      📦 Mis Pedidos
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/30" />
                  <DropdownMenuItem 
                    onClick={logout} 
                    className="hover:bg-[#FF6B81]/10 cursor-pointer text-[#FF6B81] font-bold"
                  >
                    🚪 Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button className="bg-[#7D5FFF] hover:bg-[#7D5FFF]/80 hover:scale-105 transform transition-all font-bold shadow-lg hover:shadow-[#7D5FFF]/30 text-white">
                    👤 Iniciar Sesión
                  </Button>
                </Link>
                <Link to="/registro">
                  <Button variant="outline" className="border-2 border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white hover:border-[#00D2D3] font-bold transition-all">
                    Registrarse
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* ====== MENÚ MÓVIL (Sheet) ====== */}
          <div className="md:hidden flex items-center gap-2">
            <Link to="/carrito" className="relative group">
              <span className="text-2xl">🛒</span>
              <span className="absolute -top-1 -right-2 bg-[#FF6B81] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                0
              </span>
            </Link>
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-[#303030] hover:bg-white/20 hover:text-[#7D5FFF] transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-white border-l-4 border-[#7D5FFF]">
                <div className="flex flex-col h-full">
                  {/* Logo */}
                  <div className="flex items-center gap-2 py-4 border-b border-[#7D5FFF]/30">
                    <Logo className="h-8 w-auto" />
                    <span className="text-lg font-bold text-[#603060]">Comercial Uruguay</span>
                  </div>

                  {/* Navegación */}
                  <nav className="flex-1 py-6 space-y-3">
                    {navLinks.map((link, index) => {
                      const colors = [
                        "hover:text-[#7D5FFF]",
                        "hover:text-[#FF6B81]",
                        "hover:text-[#00D2D3]",
                        "hover:text-[#603060]",
                        "hover:text-[#FF9F43]",
                      ]
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setIsMenuOpen(false)}
                          className={`block px-4 py-2 rounded-lg hover:bg-[#F0F0C0] ${colors[index % colors.length]} transition font-medium`}
                        >
                          {link.label}
                        </Link>
                      )
                    })}
                    <div className="pt-4 border-t border-[#7D5FFF]/30">
                      <input
                        type="text"
                        placeholder="🔍 Buscar..."
                        className="w-full px-4 py-2.5 rounded-full bg-[#F0F0C0] text-[#303030] placeholder-gray-500 border-2 border-[#7D5FFF] focus:outline-none focus:ring-2 focus:ring-[#FF6B81] transition"
                      />
                    </div>
                  </nav>

                  {/* Acciones móvil */}
                  <div className="py-4 border-t border-[#7D5FFF]/30 space-y-2">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-lg">
                          <Avatar className="h-10 w-10 ring-2 ring-[#7D5FFF]">
                            <AvatarFallback className={`${randomColor} text-white font-bold`}>
                              {user.fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-[#603060]">{user.fullName}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 rounded-lg hover:bg-[#7D5FFF]/10 transition text-[#303030] hover:text-[#7D5FFF]">
                          👤 Mi Perfil
                        </Link>
                        <button
                          onClick={() => { logout(); setIsMenuOpen(false) }}
                          className="w-full text-left px-4 py-2 rounded-lg text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-bold"
                        >
                          🚪 Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                          <Button className="w-full bg-[#7D5FFF] hover:bg-[#7D5FFF]/80 text-white font-bold shadow-md">
                            👤 Iniciar Sesión
                          </Button>
                        </Link>
                        <Link to="/registro" onClick={() => setIsMenuOpen(false)}>
                          <Button variant="outline" className="w-full border-2 border-[#00D2D3] text-[#00D2D3] hover:bg-[#00D2D3] hover:text-white font-bold">
                            Registrarse
                          </Button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}