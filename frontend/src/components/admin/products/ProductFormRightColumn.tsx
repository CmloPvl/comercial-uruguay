// 📁 frontend/src/components/admin/ProductFormRightColumn.tsx

/**
 * 📌 PRODUCT FORM RIGHT COLUMN
 * 
 * Columna derecha del formulario de productos.
 * Contiene: Imagen, Precio, Stock, Variantes, Pack, Opciones Avanzadas.
 * 
 * 🆕 Agregado bloque de pack promocional
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
    packQuantity: string;  // 🆕
    packPrice: string;     // 🆕
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
            maxFileSize={10}
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

      {/* 🆕 Pack Promocional */}
      <Card className="border-2 border-[#FFD93D] shadow-lg hover:shadow-xl transition-shadow bg-[#FFD93D]/5">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-[#603060] mb-2 flex items-center gap-2">
            <span className="text-[#FF9F43]">🎁</span> Pack Promocional
          </h2>
          <p className="text-xs text-[#6A757C] mb-4">
            Opcional. Ej: "3 por $1000"
          </p>

          <div className="space-y-4">
            <FormField
              label="Cantidad del pack"
              error={errors.packQuantity}
              helpText="💡 Cuántas unidades incluye"
            >
              <Input
                type="number"
                name="packQuantity"
                value={formData.packQuantity}
                onChange={handleChange}
                placeholder="3"
                className={`mt-1.5 border-2 ${errors.packQuantity ? "border-[#FF6B81]" : "border-[#FFD93D]"} focus:ring-2 focus:ring-[#FF9F43] focus:border-[#FF9F43] transition-all rounded-xl`}
                min="1"
              />
            </FormField>

            <FormField
              label="Precio del pack (CLP)"
              error={errors.packPrice}
              helpText="💡 Precio total del pack"
            >
              <Input
                type="number"
                name="packPrice"
                value={formData.packPrice}
                onChange={handleChange}
                placeholder="1000"
                className={`mt-1.5 border-2 ${errors.packPrice ? "border-[#FF6B81]" : "border-[#FFD93D]"} focus:ring-2 focus:ring-[#FF9F43] focus:border-[#FF9F43] transition-all rounded-xl`}
                min="0"
              />
            </FormField>

            {/* Preview del pack */}
            {formData.packQuantity && formData.packPrice && (
              <div className="bg-[#FFD93D]/20 border border-[#FFD93D] rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-[#603060]">
                  🎁 {formData.packQuantity} por ${Number(formData.packPrice).toLocaleString("es-CL")}
                </p>
              </div>
            )}
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