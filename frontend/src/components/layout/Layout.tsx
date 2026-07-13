import { type ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showNavbar?: boolean;
  showFooter?: boolean;
}

export default function Layout({ 
  children, 
  title, 
  description, 
  showNavbar = true, 
  showFooter = true 
}: LayoutProps) {
  const location = useLocation();

  // Actualizar título de la página dinámicamente
  useEffect(() => {
    if (title) {
      document.title = `${title} | Comercial Uruguay`;
    } else {
      const defaultTitles: Record<string, string> = {
        '/': 'Inicio',
        '/login': 'Iniciar Sesión',
        '/registro': 'Registro',
        '/perfil': 'Mi Perfil',
        '/productos': 'Productos',
        '/carrito': 'Carrito',
        '/favoritos': 'Mis Favoritos',
        '/terminos': 'Términos y Condiciones',
        '/privacidad': 'Política de Privacidad',
        '/crear-publicacion': 'Crear Publicación',
      };
      document.title = `${defaultTitles[location.pathname] || 'Comercial Uruguay'} | Comercial Uruguay`;
    }

    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }
  }, [location, title, description]);

  // Scroll al inicio al cambiar de página
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
}