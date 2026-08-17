// 📁 frontend/src/components/common/AppBreadcrumb.tsx

/**
 * 📌 APP BREADCRUMB
 * 
 * Componente reutilizable para breadcrumbs en toda la app.
 * Usa shadcn/ui por dentro con estilos consistentes.
 * 
 * ✅ Buenas prácticas:
 * - Reutilizable en toda la app
 * - Estilos configurables (variant)
 * - Usa shadcn/ui por dentro
 * - Un solo lugar para mantener estilos
 * - Soporta admin, tienda y default
 * 
 * 🎯 Uso:
 * - Páginas admin (Dashboard, Productos, Categorías, etc.)
 * - Páginas tienda (Productos, ProductoDetalle)
 * 
 * @example
 * // Admin
 * <AppBreadcrumb 
 *   variant="admin"
 *   items={[
 *     { label: "Inicio", href: "/" },
 *     { label: "Dashboard", href: "/admin" },
 *     { label: "Gestionar Productos" },
 *   ]}
 * />
 * 
 * @example
 * // Tienda
 * <AppBreadcrumb 
 *   variant="store"
 *   items={[
 *     { label: "Inicio", href: "/" },
 *     { label: "Tienda" },
 *   ]}
 * />
 */

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  /** Texto del breadcrumb */
  label: string;
  /** URL del enlace (si no tiene, es la página actual) */
  href?: string;
}

interface AppBreadcrumbProps {
  /** Items del breadcrumb (el último es la página actual) */
  items: BreadcrumbItem[];
  /** Variante de estilo: 'admin' | 'store' | 'default' */
  variant?: 'admin' | 'store' | 'default';
  /** Clase adicional para el contenedor */
  className?: string;
}

export function AppBreadcrumb({ 
  items, 
  variant = 'default',
  className 
}: AppBreadcrumbProps) {
  
  // Estilos según la variante
  const getStyles = () => {
    switch (variant) {
      case 'admin':
        return {
          container: "bg-gradient-to-r from-[#FFD93D]/20 via-[#F0F0C0]/30 to-[#F0C0F0]/20 py-3 px-4 border-b-2 border-[#7D5FFF]",
          link: "text-[#603060] hover:text-[#00D2D3]",
          separator: "text-[#7D5FFF]",
          page: "text-[#00D2D3] font-bold",
        };
      case 'store':
        return {
          container: "bg-[#FF6B81]/10 py-3 px-4 border-b-2 border-[#FF6B81]",
          link: "text-[#603060] hover:text-[#00D2D3]",
          separator: "text-[#7D5FFF]",
          page: "text-[#00D2D3] font-bold",
        };
      default:
        return {
          container: "py-2 px-4 border-b border-gray-100",
          link: "text-gray-600 hover:text-[#603060]",
          separator: "text-gray-400",
          page: "text-[#603060] font-medium",
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={cn(styles.container, className)}>
      <div className="max-w-7xl mx-auto">
        <Breadcrumb>
          <BreadcrumbList>
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              return (
                <div key={index} className="flex items-center gap-1.5">
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className={styles.page}>
                        {item.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink 
                        href={item.href} 
                        className={styles.link}
                      >
                        {item.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator className={styles.separator} />}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
}