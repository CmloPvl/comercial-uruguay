// 📁 frontend/src/components/layout/AdminLayout.tsx

/**
 * 📌 ADMIN LAYOUT
 * 
 * Layout específico para el panel de administración.
 * 
 * ✅ Características:
 * - Protege las rutas admin (solo usuarios con rol ADMIN)
 * - Redirige a /login si no está autenticado
 * - Redirige a / si es CLIENTE (no admin)
 * - AdminNavbar fijo en la parte superior
 * - Títulos con sufijo "- Admin"
 * - Scroll suave al cambiar de página
 * - Sin Footer (el admin no necesita verlo)
 * - Mobile first con padding responsivo
 * 
 * 🎯 Uso:
 * - Dashboard.tsx
 * - AdminProductos.tsx
 * - AdminCategorias.tsx
 * - Pedidos.tsx
 * - Usuarios.tsx
 * - CrearPublicacion.tsx
 * - EditarPublicacion.tsx
 * 
 * 📱 Mobile First:
 * - Padding: px-4 (mobile) → sm:px-6 (tablet) → lg:px-8 (desktop)
 * - Contenido centrado y con límite de ancho
 */

import { type ReactNode, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AdminNavbar from "./AdminNavbar";
import LoadingSpinner from "../common/LoadingSpinner";

interface AdminLayoutProps {
  /** Contenido de la página */
  children: ReactNode;
  /** Título de la página (se muestra en la pestaña) */
  title?: string;
}

export default function AdminLayout({
  children,
  title,
}: AdminLayoutProps) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // =============================================
  // 🔐 PROTECCIÓN DE RUTAS
  // =============================================
  useEffect(() => {
    // ✅ Si no está cargando y no hay usuario → redirigir a login
    if (!loading && !user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    // ✅ Si hay usuario pero NO es ADMIN → redirigir a /
    if (!loading && user && user.role !== "ADMIN") {
      navigate("/");
      return;
    }
  }, [user, loading, navigate, location]);

  // =============================================
  // 📝 ACTUALIZAR TÍTULO DE LA PÁGINA
  // =============================================
  useEffect(() => {
    if (title) {
      document.title = `${title} | Comercial Uruguay - Admin`;
    } else {
      const defaultTitles: Record<string, string> = {
        '/admin': 'Dashboard',
        '/admin/dashboard': 'Dashboard',
        '/admin/productos': 'Productos',
        '/admin/categorias': 'Categorías',
        '/admin/pedidos': 'Pedidos',
        '/admin/usuarios': 'Usuarios',
        '/crear-publicacion': 'Crear Producto',
      };
      document.title = `${defaultTitles[location.pathname] || 'Admin'} | Comercial Uruguay - Admin`;
    }
  }, [location, title]);

  // =============================================
  // 🔄 SCROLL SUAVE AL INICIO
  // =============================================
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // =============================================
  // ⏳ ESTADO DE CARGA
  // =============================================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FAF9E2] to-[#F0F0C0]/30">
        <LoadingSpinner />
      </div>
    );
  }

  // ❌ Si no hay usuario o no es admin, no renderizar nada (el useEffect redirige)
  if (!user || user.role !== "ADMIN") {
    return null;
  }

  // =============================================
  // 🖥️ RENDER PRINCIPAL
  // =============================================
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#FAF9E2] to-[#F0F0C0]/30 overflow-x-hidden">
      
      {/* 🧭 Navbar de administración (sticky) */}
      <AdminNavbar />

      {/* 📄 Contenido principal - Mobile First */}
      <main className="flex-grow w-full max-w-full">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
          {children}
        </div>
      </main>

      {/* ✅ Footer removido - El admin no necesita verlo */}
    </div>
  );
}