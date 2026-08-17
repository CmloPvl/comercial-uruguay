// 📁 frontend/src/components/admin/ProductFormActions.tsx

/**
 * 📌 PRODUCT FORM ACTIONS
 * 
 * Botones de acción del formulario de productos.
 * Muestra botones de envío y cancelación.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Reutilizable en formularios de productos
 * - Props para personalizar
 */

import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { useNavigate } from "react-router-dom";

interface ProductFormActionsProps {
  /** Estado de carga del formulario */
  loading: boolean;
  /** Texto del botón de envío */
  submitText: string;
  /** Ruta para cancelar (por defecto /admin/productos) */
  cancelPath?: string;
}

export function ProductFormActions({
  loading,
  submitText,
  cancelPath = "/admin/productos",
}: ProductFormActionsProps) {
  const navigate = useNavigate();

  return (
    <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-wrap gap-4">
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold px-8 py-3.5 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span> Guardando...
              </>
            ) : (
              submitText
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="border-2 border-[#FF6B81] text-[#FF6B81] hover:bg-[#FF6B81] hover:text-white font-bold px-8 py-3.5 text-lg rounded-xl transition-all hover:scale-105"
            onClick={() => navigate(cancelPath)}
          >
            ✖ Cancelar
          </Button>
        </div>
        <div className="mt-4 text-sm text-[#6A757C] flex items-center gap-2">
          <span>ℹ️</span> Los cambios se guardarán automáticamente.
        </div>
      </CardContent>
    </Card>
  );
}