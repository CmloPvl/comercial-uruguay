// 📁 frontend/src/components/admin/ImageUploader.tsx

/**
 * 📌 COMPONENTE: ImageUploader
 * 
 * Componente reutilizable para subir imágenes a Supabase Storage.
 * 
 * ✅ Buenas prácticas:
 * - Separación de lógica y UI
 * - Reutilizable en Crear/Editar Publicación
 * - Props para configurar desde fuera
 * - Manejo de estados de carga
 * - Toasts de éxito/error (helper centralizado)
 * - Paleta de colores consistente
 * 
 * 🆕 Toasts de éxito/error
 * 🆕 Limpiar dropzone después de subir
 * 🆕 Contador incluye pendientes
 * 🆕 Fix: emoji duplicado en el label
 */

import { useEffect } from 'react'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import { supabase, PRODUCTS_BUCKET } from '@/lib/supabase'
import {
  showSuccessToast,
  showErrorToastWithFallback,
} from '@/utils/errorMessages'

interface ImageUploaderProps {
  /** URLs de imágenes existentes (para editar) */
  existingImages?: string[]
  /** Callback cuando se suben imágenes */
  onImagesChange: (urls: string[]) => void
  /** Número máximo de imágenes */
  maxFiles?: number
  /** Tamaño máximo en MB */
  maxFileSize?: number
  /** Label del componente */
  label?: string
}

export function ImageUploader({
  existingImages = [],
  onImagesChange,
  maxFiles = 5,
  maxFileSize = 10,
  label = '📸 Imágenes del Producto',
}: ImageUploaderProps) {
  // =============================================
  // 📤 CONFIGURAR EL DROPZONE
  // =============================================
  const uploadProps = useSupabaseUpload({
    supabase: supabase,
    bucketName: PRODUCTS_BUCKET,
    path: 'productos',
    maxFiles,
    maxFileSize: maxFileSize * 1024 * 1024,
    allowedMimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/svg+xml',
    ],
    upsert: true,
    onUploadComplete: (files: any) => {
      if (!files || !Array.isArray(files)) {
        console.error('❌ [ImageUploader] files no es un array válido:', files);
        return;
      }
      
      const validFiles = files.filter((f: any) => f && f.publicUrl);
      
      if (validFiles.length === 0) {
        console.warn('⚠️ [ImageUploader] No hay archivos válidos para subir');
        return;
      }
      
      const urls = validFiles.map((f: any) => f.publicUrl);
      const allUrls = [...existingImages, ...urls];
      
      onImagesChange(allUrls);
      
      showSuccessToast(
        `${validFiles.length} ${validFiles.length === 1 ? 'imagen subida' : 'imágenes subidas'} correctamente`
      );
    },
    onUploadError: (file: any, error: any) => {
      console.error('❌ Error al subir imagen:', file?.name, error);
      
      showErrorToastWithFallback(
        error,
        `Error al subir ${file?.name || 'la imagen'}`
      );
    },
  })

  // =============================================
  // 🔄 LIMPIAR DROPZONE DESPUÉS DE SUBIR
  // =============================================
  useEffect(() => {
    if (uploadProps.isSuccess && uploadProps.files.length > 0) {
      const timer = setTimeout(() => {
        uploadProps.setFiles([]);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [uploadProps.isSuccess]);

  // =============================================
  // 🗑️ ELIMINAR IMAGEN EXISTENTE
  // =============================================
  const removeImage = (index: number) => {
    const newImages = existingImages.filter((_, i) => i !== index)
    onImagesChange(newImages)
    showSuccessToast('Imagen eliminada')
  }

  // =============================================
  // 📊 CONTADOR (incluye pendientes)
  // =============================================
  const totalImages = existingImages.length + uploadProps.files.length;
  const isAtMax = totalImages >= maxFiles;

  // =============================================
  // 🖥️ RENDER
  // =============================================
  return (
    <div className="space-y-4">
      {/* =============================================
      📌 LABEL CON CONTADOR (sin emoji duplicado)
      ============================================= */}
      <h2 className="text-xl font-bold text-[#603060] mb-4 flex items-center gap-2">
        {label}
        <span className={`text-sm font-normal ml-2 ${
          isAtMax ? 'text-[#FF6B81] font-bold' : 'text-[#6A757C]'
        }`}>
          ({totalImages}/{maxFiles})
        </span>
      </h2>

      {/* =============================================
      ⚠️ AVISO SI ESTÁ AL MÁXIMO
      ============================================= */}
      {isAtMax && (
        <div className="bg-[#FFD93D]/20 border-2 border-[#FFD93D] rounded-lg p-3 text-sm text-[#603060]">
          ⚠️ Has alcanzado el máximo de {maxFiles} imágenes. Elimina alguna para subir más.
        </div>
      )}

      {/* =============================================
      📤 DROPZONE (solo si no está al máximo)
      ============================================= */}
      {!isAtMax && (
        <div className="border-2 border-dashed border-[#7D5FFF] rounded-xl p-6 text-center hover:border-[#FFD93D] transition-all bg-[#F0F0C0]/10">
          <Dropzone {...uploadProps}>
            <DropzoneEmptyState className="text-[#6A757C]" />
            <DropzoneContent />
          </Dropzone>
        </div>
      )}

      {/* =============================================
      📸 IMÁGENES EXISTENTES
      ============================================= */}
      {existingImages.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-[#303030] mb-2 flex items-center gap-2">
            📸 Imágenes actuales
            <span className="text-xs font-normal text-[#6A757C]">
              ({existingImages.length} {existingImages.length === 1 ? 'imagen' : 'imágenes'})
            </span>
          </p>
          <div className="flex flex-wrap gap-3">
            {existingImages.map((url: string, index: number) => (
              <div
                key={index}
                className="relative group border-2 border-[#7D5FFF] rounded-lg overflow-hidden hover:border-[#FF6B81] transition-all"
              >
                <img
                  src={url}
                  alt={`Imagen ${index + 1}`}
                  className="w-24 h-24 object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src =
                      'https://via.placeholder.com/96x96?text=❌'
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-[#FF6B81] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-[#603060] transition-all hover:scale-110 shadow-md"
                  title="Eliminar imagen"
                >
                  ✕
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =============================================
      ℹ️ INFO ADICIONAL
      ============================================= */}
      <p className="text-xs text-[#6A757C] mt-2">
        💡 Formatos permitidos: JPG, PNG, WEBP, GIF, SVG
        <br />
        Tamaño máximo: {maxFileSize}MB por imagen
        <br />
        Máximo {maxFiles} imágenes por producto
      </p>
    </div>
  )
}