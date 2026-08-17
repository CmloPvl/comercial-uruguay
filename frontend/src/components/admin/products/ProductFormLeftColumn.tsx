// 📁 frontend/src/components/admin/ProductFormLeftColumn.tsx

/**
 * 📌 PRODUCT FORM LEFT COLUMN
 * 
 * Columna izquierda del formulario de productos.
 * Contiene: Nombre, Descripción, SKU, Categoría, Etiquetas.
 */

import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { FormField } from "../../ui/form-field";
import { Card, CardContent } from "../../ui/card";
import type { Category } from "../../../services/categoryService";
import { getCategoryIcon } from "../../../utils/categoryUtils";

interface ProductFormLeftColumnProps {
  formData: {
    nombre: string;
    descripcion: string;
    sku: string;
    categoriaId: string;
    etiquetas: string;
  };
  errors: Record<string, string>;
  categories: Category[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
}

export function ProductFormLeftColumn({
  formData,
  errors,
  categories,
  handleChange,
  handleSelectChange,
}: ProductFormLeftColumnProps) {
  return (
    <div className="lg:w-2/3 space-y-6">
      <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
            <span className="text-[#7D5FFF]">📝</span> Información Básica
          </h2>

          <div className="space-y-4">
            {/* Nombre */}
            <FormField
              label="Nombre del producto"
              required
              error={errors.nombre}
              helpText="💡 Ej: Burbujero de Juguete con Luces"
            >
              <Input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Burbujero de Juguete con Luces"
                className={`mt-1.5 border-2 ${errors.nombre ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
              />
            </FormField>

            {/* Descripción */}
            <FormField
              label="Descripción del producto"
              required
              error={errors.descripcion}
              helpText="💡 Mínimo 20 caracteres"
            >
              <Textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                placeholder="Divertido burbujero manual con luces LED integradas..."
                className={`mt-1.5 border-2 ${errors.descripcion ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
              />
            </FormField>

            {/* SKU */}
            <FormField
              label="SKU (Código interno)"
              required
              error={errors.sku}
              helpText="💡 Código único para identificar el producto"
            >
              <Input
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="JUG-2026-042"
                className={`mt-1.5 border-2 ${errors.sku ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
              />
            </FormField>

            {/* Categoría */}
            <FormField
              label="Categoría"
              required
              error={errors.categoriaId}
            >
              <Select
                value={formData.categoriaId}
                onValueChange={(value) => handleSelectChange("categoriaId", value)}
              >
                <SelectTrigger
                  className={`w-full border-2 ${errors.categoriaId ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] bg-white rounded-xl`}
                >
                  <SelectValue placeholder="Seleccionar categoría..." />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-[#7D5FFF] shadow-lg rounded-xl">
                  {categories.map((category) => {
                    const icon = getCategoryIcon(category.name, category.icon);
                    return (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                        className="hover:bg-[#F0F0C0] cursor-pointer rounded-lg transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>{icon}</span>
                          <span>{category.name}</span>
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </FormField>

            {/* Etiquetas */}
            <FormField
              label="Etiquetas / Tags"
              helpText="💡 Separa por comas"
            >
              <Input
                name="etiquetas"
                value={formData.etiquetas}
                onChange={handleChange}
                placeholder="juguete, cumpleaños, regalo, luces, infantil"
                className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}