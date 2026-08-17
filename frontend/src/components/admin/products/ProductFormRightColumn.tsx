// 📁 frontend/src/components/admin/ProductFormRightColumn.tsx

/**
 * 📌 PRODUCT FORM RIGHT COLUMN
 * 
 * Columna derecha del formulario de productos.
 * Contiene: Imagen, Precio, Stock, Variantes, Opciones Avanzadas.
 */

import { Input } from "../../ui/input";
import { FormField } from "../../ui/form-field";
import { Card, CardContent } from "../../ui/card";
import { ImageUploader } from "../ImageUploader";
import { ProductFormAdvancedOptions } from "../products/ProductFormAdvancedOptions";

interface ProductFormRightColumnProps {
  images: string[];
  setImages: (images: string[]) => void;
  formData: {
    precio: string;
    stock: string;
    variantes: string;
    destacar: boolean;
    enOferta: boolean;
    descuento: string;
  };
  errors: Record<string, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ProductFormRightColumn({
  images,
  setImages,
  formData,
  errors,
  handleChange,
}: ProductFormRightColumnProps) {
  return (
    <div className="lg:w-1/3 space-y-6">
      {/* Imagen - ImageUploader */}
      <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <ImageUploader
            existingImages={images}
            onImagesChange={setImages}
            maxFiles={5}
            maxFileSize={5}
          />
        </CardContent>
      </Card>

      {/* Precio y Stock */}
      <Card className="border-2 border-[#7D5FFF] shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
            <span className="text-[#00D2D3]">💰</span> Precio y Stock
          </h2>

          <div className="space-y-4">
            <FormField
              label="Precio de venta"
              required
              error={errors.precio}
              helpText="💡 Precio en pesos chilenos (CLP)"
            >
              <Input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                placeholder="1500"
                className={`mt-1.5 border-2 ${errors.precio ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                step="0.01"
                min="0"
              />
            </FormField>

            <FormField
              label="Stock disponible"
              required
              error={errors.stock}
              helpText="💡 Número de unidades disponibles"
            >
              <Input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="25"
                className={`mt-1.5 border-2 ${errors.stock ? "border-[#FF6B81]" : "border-[#7D5FFF]"} focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl`}
                min="0"
              />
            </FormField>

            <FormField
              label="Variantes / Colores"
              helpText="💡 Separa por comas"
            >
              <Input
                name="variantes"
                value={formData.variantes}
                onChange={handleChange}
                placeholder="Azul, Rosado, Verde"
                className="mt-1.5 border-2 border-[#7D5FFF] focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all rounded-xl"
              />
            </FormField>
          </div>
        </CardContent>
      </Card>

      {/* Opciones Avanzadas */}
      <ProductFormAdvancedOptions
        destacar={formData.destacar}
        enOferta={formData.enOferta}
        descuento={formData.descuento}
        errors={errors}
        handleChange={handleChange}
      />
    </div>
  );
}