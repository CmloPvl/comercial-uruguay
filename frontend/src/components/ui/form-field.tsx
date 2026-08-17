// 📁 frontend/src/components/ui/FormField.tsx

/**
 * 📌 FORM FIELD
 * 
 * Componente reutilizable para campos de formulario.
 * Wrapper que combina Label, Input/children, errores y texto de ayuda.
 * 
 * ✅ Buenas prácticas:
 * - Reutilizable en toda la app
 * - Manejo consistente de errores
 * - Texto de ayuda opcional
 * - Campo requerido opcional
 * - Paleta de colores consistente
 * - Accesibilidad (aria-describedby, htmlFor)
 * 
 * 🎯 Uso:
 * - CrearPublicacion.tsx
 * - EditarPublicacion.tsx
 * - Login.tsx
 * - Registro.tsx
 * - Perfil.tsx
 * - RecuperarContrasena.tsx
 * - Contacto.tsx
 * 
 * @example
 * <FormField
 *   label="Nombre del producto"
 *   required
 *   error={errors.nombre}
 *   helpText="💡 Ej: Burbujero de Juguete con Luces"
 * >
 *   <Input
 *     name="nombre"
 *     value={formData.nombre}
 *     onChange={handleChange}
 *     placeholder="Ingresa el nombre..."
 *   />
 * </FormField>
 */

import type { ReactNode } from "react";
import { Label } from "./label";

interface FormFieldProps {
  /** Texto del label */
  label: string;
  /** Indica si el campo es obligatorio */
  required?: boolean;
  /** Mensaje de error (si existe) */
  error?: string;
  /** Texto de ayuda (opcional) */
  helpText?: string;
  /** Contenido del campo (Input, Textarea, Select, etc.) */
  children: ReactNode;
  /** Clase adicional para el contenedor */
  className?: string;
  /** ID del campo (para accesibilidad) */
  id?: string;
}

export function FormField({
  label,
  required = false,
  error,
  helpText,
  children,
  className = "",
  id,
}: FormFieldProps) {
  // Generar ID único si no se proporciona
  const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Label */}
      <Label 
        htmlFor={fieldId}
        className="text-sm font-bold text-[#303030] flex items-center gap-2"
      >
        {label}
        {required && <span className="text-[#FF6B81] text-base">*</span>}
      </Label>

      {/* Campo */}
      <div className="relative">
        {children}
      </div>

      {/* Texto de ayuda */}
      {helpText && (
        <p className="text-xs text-[#6A757C] mt-1">
          {helpText}
        </p>
      )}

      {/* Mensaje de error */}
      {error && (
        <p className="text-[#FF6B81] text-sm font-medium mt-1">
          {error}
        </p>
      )}
    </div>
  );
}