import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Registro from "./pages/auth/Registro"
import RecuperarContrasena from "./pages/auth/RecuperarContrasena"
import Perfil from "./pages/Perfil"
import Productos from "./pages/Productos"
import ProductoDetalle from "./pages/ProductoDetalle"
import CrearPublicacion from "./pages/admin/CrearPublicacion"
import Carrito from "./pages/Carrito"
import Terminos from './pages/Terminos'
import Privacidad from './pages/Privacidad'
import NotFound from './pages/NotFound'
import Favoritos from './pages/Favoritos'
import AdminDashboard from './pages/admin/Dashboard'
import MisPedidos from './pages/MisPedidos'
import ProtectedRoute from './components/common/ProtectedRoute'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import Envios from './pages/Envios'
import RetiroTienda from './pages/RetiroTienda'
import Ofertas from './pages/Ofertas'  // ✅ NUEVO

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ====== PÁGINAS PÚBLICAS ====== */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/ofertas" element={<Ofertas />} />  {/* ✅ NUEVO */}
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/envios" element={<Envios />} />
        <Route path="/retiro" element={<RetiroTienda />} />
        
        {/* ====== PÁGINAS PROTEGIDAS (requieren autenticación) ====== */}
        <Route path="/perfil" element={
          <ProtectedRoute>
            <Perfil />
          </ProtectedRoute>
        } />
        <Route path="/carrito" element={
          <ProtectedRoute>
            <Carrito />
          </ProtectedRoute>
        } />
        <Route path="/favoritos" element={
          <ProtectedRoute>
            <Favoritos />
          </ProtectedRoute>
        } />
        <Route path="/mis-pedidos" element={
          <ProtectedRoute>
            <MisPedidos />
          </ProtectedRoute>
        } />
        
        {/* ====== PÁGINAS DE ADMINISTRACIÓN (requieren autenticación + ADMIN) ====== */}
        <Route path="/crear-publicacion" element={
          <ProtectedRoute requireAdmin>
            <CrearPublicacion />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* ====== 404 - SIEMPRE AL FINAL ====== */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App