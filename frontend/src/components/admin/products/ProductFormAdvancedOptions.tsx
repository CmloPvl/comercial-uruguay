// 📁 frontend/src/components/admin/ProductFormAdvancedOptions.tsx

/**
 * 📌 PRODUCT FORM ADVANCED OPTIONS
 * 
 * Opciones avanzadas del formulario de productos.
 * Contiene: Destacar, En oferta, Descuento.
 */

import { Input } from "../../ui/input";
import { FormField } from "../../ui/form-field";
import { Card, CardContent } from "../../ui/card";

interface ProductFormAdvancedOptionsProps {
  destacar: boolean;
  enOferta: boolean;
  descuento: string;
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProductFormAdvancedOptions({
  destacar,
  enOferta,
  descuento,
  errors,
  handleChange,
}: ProductFormAdvancedOptionsProps) {
  return (
    <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
      <CardContent className="p-6">
        <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
          <span className="text-[#FF9F43]">⚙️</span> Opciones Avanzadas
        </h2>

        <div className="space-y-4">
          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors group">
            <input
              type="checkbox"
              name="destacar"
              checked={destacar}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7D5FFF] rounded"
            />
            <span className="text-[#303030] group-hover:text-[#7D5FFF] transition-colors">
              ⭐ Destacar producto en la página principal
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer hover:text-[#7D5FFF] transition-colors group">
            <input
              type="checkbox"
              name="enOferta"
              checked={enOferta}
              onChange={handleChange}
              className="w-4 h-4 accent-[#7D5FFF] rounded"
            />
            <span className="text-[#303030] group-hover:text-[#7D5FFF] transition-colors">
              🔥 Producto en oferta
            </span>
          </label>

          {enOferta && (
            <div className="animate-in fade-in duration-200">
              <FormField
                label="Descuento (%)"
                error={errors.descuento}
                helpText="💡 Porcentaje de descuento (ej: 15)"
              >
                <Input
                  type="number"
                  name="descuento"
                  value={descuento}
                  onChange={handleChange}
                  placeholder="15"
                  className={`mt-1.5 border-2 ${errors.descuento ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                  min="0"
                  max="100"
                />
              </FormField>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}