// 📁 frontend/src/components/admin/ProductFormHeader.tsx

/**
 * 📌 PRODUCT FORM HEADER
 * 
 * Header del formulario de productos.
 * Muestra título, descripción y badges.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Reutilizable en formularios de productos
 * - Props para personalizar
 */

import { Badge } from "../../ui/badge";

interface ProductFormHeaderProps {
  /** Título del formulario */
  title: string;
  /** Descripción del formulario */
  description?: string;
  /** Número de categorías (opcional) */
  categoriesCount?: number;
  /** Badge adicional (opcional) */
  badge?: string;
  /** Badge color (opcional) */
  badgeColor?: string;
}

export function ProductFormHeader({
  title,
  description = "Completa los datos del producto.",
  categoriesCount,
  badge,
  badgeColor = "bg-gradient-to-r from-[#7D5FFF] to-[#603060]",
}: ProductFormHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        {badge && (
          <Badge className={`${badgeColor} text-white px-4 py-1.5 rounded-full`}>
            {badge}
          </Badge>
        )}
        {categoriesCount !== undefined && (
          <Badge className="bg-[#FFD93D] text-[#303030] px-3 py-1 rounded-full">
            {categoriesCount} categorías
          </Badge>
        )}
      </div>
      <h1 className="text-3xl font-extrabold text-[#603060] mt-3">
        {title}
      </h1>
      <p className="text-[#6A757C] mt-1">{description}</p>
    </div>
  );
}