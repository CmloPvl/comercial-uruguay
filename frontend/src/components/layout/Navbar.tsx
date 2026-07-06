import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
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
import { Button } from "../ui/button"

export default function Navbar() {
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const avatarColors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
  ]
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)]

  return (
    <nav className="bg-gradient-to-r from-[#603060] via-[#7D5FFF] to-[#00D2D3] text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          
          {/* ====== LOGO + MENÚ HAMBURGUESA ====== */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex-shrink-0">
              <Logo className="h-12 w-auto" />
            </Link>

            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition p-2">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 bg-white border-r-4 border-[#7D5FFF]">
                {/* ... contenido del menú ... */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 py-4 border-b border-[#7D5FFF]/30">
                    <Logo className="h-12 w-auto" />
                  </div>
                  <nav className="flex-1 py-6 space-y-2">
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#7D5FFF] transition font-medium text-lg">
                      🏠 Inicio
                    </Link>
                    <Link to="/productos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#FF6B81] transition font-medium text-lg">
                      🛍️ Tienda
                    </Link>
                    <Link to="/ofertas" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#00D2D3] transition font-medium text-lg">
                      🔥 Ofertas
                    </Link>
                    <Link to="/nosotros" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#603060] transition font-medium text-lg">
                      👥 Nosotros
                    </Link>
                    <Link to="/contacto" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#FF9F43] transition font-medium text-lg">
                      📞 Contacto
                    </Link>
                    <div className="pt-4 border-t border-[#7D5FFF]/30">
                      <input
                        type="text"
                        placeholder="🔍 Buscar..."
                        className="w-full px-4 py-3 rounded-full bg-[#F0F0C0] text-[#303030] placeholder-gray-500 border-2 border-[#7D5FFF] focus:outline-none focus:ring-2 focus:ring-[#FF6B81] transition text-lg"
                      />
                    </div>
                    <div className="pt-4 border-t border-[#7D5FFF]/30 space-y-2">
                      <Link to="/favoritos" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#FF6B81] transition font-medium text-lg">
                        ❤️ Favoritos
                      </Link>
                      <Link to="/carrito" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#F0F0C0] hover:text-[#00D2D3] transition font-medium text-lg">
                        🛒 Carrito ({totalItems})
                      </Link>
                    </div>
                  </nav>
                  <div className="py-4 border-t border-[#7D5FFF]/30 space-y-2">
                    {user ? (
                      <>
                        <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-lg">
                          <Avatar className="h-12 w-12 ring-2 ring-[#7D5FFF]">
                            <AvatarFallback className={`${randomColor} text-white font-bold text-lg`}>
                              {user.fullName?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-[#603060] text-lg">{user.fullName}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </div>
                        <Link to="/perfil" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#7D5FFF]/10 transition text-[#303030] hover:text-[#7D5FFF] font-medium text-lg">
                          👤 Mi Perfil
                        </Link>
                        <button
                          onClick={() => { logout(); setIsMenuOpen(false) }}
                          className="w-full text-left px-4 py-3 rounded-lg text-[#FF6B81] hover:bg-[#FF6B81]/10 transition font-bold text-lg"
                        >
                          🚪 Cerrar Sesión
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#7D5FFF]/10 transition text-[#303030] hover:text-[#7D5FFF] font-medium text-lg">
                          🔐 Iniciar Sesión
                        </Link>
                        <Link to="/registro" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 rounded-lg hover:bg-[#00D2D3]/10 transition text-[#303030] hover:text-[#00D2D3] font-medium text-lg">
                          📝 Registrarse
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* ====== BUSCADOR ====== */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Buscar productos..."
                className="w-full px-5 py-3 rounded-full bg-white/10 text-white placeholder-white/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all backdrop-blur-sm text-lg"
              />
              <span className="absolute right-4 top-3.5 text-white/40 group-hover:text-[#FFD93D] transition text-xl">🔍</span>
            </div>
          </div>

          {/* ====== ACCIONES ====== */}
          <div className="flex items-center gap-5 md:gap-8">
            
            <Link to="/favoritos" className="hidden md:flex items-center gap-2 text-white/80 hover:text-[#FFD93D] transition text-base font-medium">
              ❤️ <span className="hidden lg:inline text-lg">Favoritos</span>
            </Link>

            <Link to="/carrito" className="flex items-center gap-2 text-white/80 hover:text-[#FFD93D] transition text-base font-medium relative">
              🛒 <span className="hidden md:inline text-lg">Carrito</span>
              <span className="absolute -top-2 -right-5 bg-[#FF6B81] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                {totalItems}
              </span>
            </Link>

            {/* ====== DROPDOWN DE USUARIO ====== */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className={`${randomColor} text-white font-bold text-base`}>
                        {user.fullName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline text-white/80 hover:text-white text-base font-medium">
                      {user.fullName?.split(" ")[0]}
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white">
                  <DropdownMenuLabel className="font-normal bg-gradient-to-r from-[#F0F0C0] to-[#F0C0F0] rounded-t-xl">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-bold text-[#603060]">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/30" />
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer">
                    <Link to="/perfil" className="text-[#303030] hover:text-[#7D5FFF]">👤 Mi Perfil</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer">
                    <Link to="/mis-pedidos" className="text-[#303030] hover:text-[#00D2D3]">📦 Mis Pedidos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#FF6B81]/10 cursor-pointer">
                    <Link to="/favoritos" className="text-[#303030] hover:text-[#FF6B81]">❤️ Favoritos</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#7D5FFF]/30" />
                  <DropdownMenuItem onClick={logout} className="hover:bg-[#FF6B81]/10 cursor-pointer text-[#FF6B81] font-bold">
                    🚪 Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* ====== DROPDOWN DE ACCESO (Fondo blanco) ====== */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-white/10 hover:text-[#FFD93D] transition text-lg font-medium p-2">
                    👤 Acceder
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 border-2 border-[#7D5FFF] shadow-xl rounded-xl bg-white">
                  <DropdownMenuItem asChild className="hover:bg-[#7D5FFF]/10 cursor-pointer">
                    <Link to="/login" className="text-[#303030] hover:text-[#7D5FFF] font-medium text-base py-3">
                      🔐 Iniciar Sesión
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="hover:bg-[#00D2D3]/10 cursor-pointer">
                    <Link to="/registro" className="text-[#303030] hover:text-[#00D2D3] font-medium text-base py-3">
                      📝 Registrarse
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