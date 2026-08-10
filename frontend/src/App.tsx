// 📁 frontend/src/App.tsx

/**
 * 📌 APP - RUTAS PRINCIPALES
 * 
 * Configuración de todas las rutas de la aplicación.
 * 
 * ✅ Estructura:
 * - Rutas públicas (acceso sin autenticación)
 * - Rutas protegidas (requieren inicio de sesión)
 * - Rutas de administración (requieren rol ADMIN)
 * - Ruta 404 (NotFound)
 * 
 * ✅ Buenas prácticas:
 * - Separación clara de rutas por tipo
 * - Protección de rutas con ProtectedRoute
 * - Toaster global para notificaciones
 * - Comentarios explicativos por sección
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

// =============================================
// 📄 PÁGINAS PÚBLICAS
// =============================================
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Ofertas from "./pages/Ofertas";
import Terminos from './pages/Terminos';
import Privacidad from './pages/Privacidad';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import RetiroTienda from './pages/RetiroTienda';
import EnviosYRetiros from "./pages/EnviosYRetiros";
import NotFound from './pages/NotFound';

// =============================================
// 🔐 PÁGINAS DE AUTENTICACIÓN
// =============================================
import Login from "./pages/auth/Login";
import Registro from "./pages/auth/Registro";
import RecuperarContrasena from "./pages/auth/RecuperarContrasena";
import ResetPassword from "./pages/auth/ResetPassword";

// =============================================
// 👤 PÁGINAS DE USUARIO (requieren autenticación)
// =============================================
import Perfil from "./pages/Perfil";
import Carrito from "./pages/Carrito";
import Favoritos from "./pages/Favoritos";
import MisPedidos from './pages/MisPedidos';

// =============================================
// 👑 PÁGINAS DE ADMINISTRACIÓN (requieren rol ADMIN)
// =============================================
import AdminDashboard from './pages/admin/Dashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminPedidos from './pages/admin/Pedidos';
import AdminUsuarios from './pages/admin/Usuarios'; // ✅ NUEVA RUTA
import CrearPublicacion from "./pages/admin/CrearPublicacion";
import EditarPublicacion from "./pages/admin/EditarPublicacion";

// =============================================
// 🛡️ COMPONENTES DE PROTECCIÓN
// =============================================
import ProtectedRoute from './components/common/ProtectedRoute';

// =============================================
// 🚀 APP
// =============================================
function App() {
  return (
    <BrowserRouter>
      {/* =============================================
      🔔 TOASTER - Notificaciones globales
      ============================================= */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4ade80',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* =============================================
      🗺️ RUTAS
      ============================================= */}
      <Routes>
        {/* =============================================
        📄 RUTAS PÚBLICAS
        ============================================= */}
        
        {/* Página principal */}
        <Route path="/" element={<Home />} />
        
        {/* Autenticación */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/recuperar" element={<RecuperarContrasena />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Tienda */}
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/ofertas" element={<Ofertas />} />
        
        {/* Información */}
        <Route path="/terminos" element={<Terminos />} />
        <Route path="/privacidad" element={<Privacidad />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/retiro" element={<RetiroTienda />} />
        <Route path="/envios-y-retiros" element={<EnviosYRetiros />} />

        {/* =============================================
        👤 RUTAS PROTEGIDAS (requieren autenticación)
        ============================================= */}
        
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

        {/* =============================================
        👑 RUTAS DE ADMINISTRACIÓN (requieren rol ADMIN)
        ============================================= */}
        
        {/* 📊 Dashboard - Panel principal del administrador */}
        <Route path="/admin" element={
          <ProtectedRoute requireAdmin>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        
        {/* 📦 Productos - Gestión de productos */}
        <Route path="/admin/productos" element={
          <ProtectedRoute requireAdmin>
            <AdminProductos />
          </ProtectedRoute>
        } />
        
        {/* ✏️ Editar Producto - Formulario de edición */}
        <Route path="/admin/productos/:id/editar" element={
          <ProtectedRoute requireAdmin>
            <EditarPublicacion />
          </ProtectedRoute>
        } />
        
        {/* 📂 Categorías - Gestión de categorías */}
        <Route path="/admin/categorias" element={
          <ProtectedRoute requireAdmin>
            <AdminCategorias />
          </ProtectedRoute>
        } />
        
        {/* 📦 Pedidos - Gestión de pedidos */}
        <Route path="/admin/pedidos" element={
          <ProtectedRoute requireAdmin>
            <AdminPedidos />
          </ProtectedRoute>
        } />
        
        {/* 👥 Usuarios - Gestión de usuarios ✅ NUEVA RUTA */}
        <Route path="/admin/usuarios" element={
          <ProtectedRoute requireAdmin>
            <AdminUsuarios />
          </ProtectedRoute>
        } />
        
        {/* ✨ Crear Publicación - Crear nuevo producto */}
        <Route path="/crear-publicacion" element={
          <ProtectedRoute requireAdmin>
            <CrearPublicacion />
          </ProtectedRoute>
        } />

        {/* =============================================
        ❌ RUTA 404 - No encontrada
        ============================================= */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;