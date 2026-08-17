// 📁 frontend/src/components/admin/ProductFormSkeleton.tsx

/**
 * 📌 PRODUCT FORM SKELETON
 * 
 * Esqueleto de carga para el formulario de productos.
 * Muestra una estructura visual similar al formulario real.
 * 
 * ✅ Buenas prácticas:
 * - Reutilizable en Crear y Editar Publicación
 * - Usa Skeleton de shadcn/ui
 * - Mantiene la misma estructura que el formulario real
 * - Mejora la experiencia de usuario durante la carga
 * 
 * 🎯 Uso:
 * - CrearPublicacion.tsx (cuando loadingCategories es true)
 * - EditarPublicacion.tsx (cuando loadingCategories es true)
 */

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function ProductFormSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="mb-8">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Form skeleton */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Columna izquierda */}
        <div className="lg:w-2/3 space-y-6">
          <Card className="border-2 border-[#7D5FFF]">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-48 mb-4" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-1.5">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-xl" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Columna derecha */}
        <div className="lg:w-1/3 space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-2 border-[#7D5FFF]">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-40 mb-4" />
                <div className="space-y-4">
                  <Skeleton className="h-10 w-full rounded-xl" />
                  <Skeleton className="h-10 w-full rounded-xl" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}