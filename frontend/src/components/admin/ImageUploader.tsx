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
 * - Imagen principal marcada (⭐)
 * - Reordenamiento con drag & drop (HTML5 nativo)
 * - Reordenamiento con botones ← → (mobile)
 * 
 * 🆕 Drag & drop nativo para reordenar (desktop)
 * 🆕 Botones ← → para reordenar (mobile)
 * 🆕 Badge "Principal" en la primera imagen
 */

import { useEffect, useState } from 'react'
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
  // 🎯 ESTADO LOCAL (para drag & drop)
  // =============================================
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

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
  // 🗑️ ELIMINAR IMAGEN
  // =============================================
  const removeImage = (index: number) => {
    const newImages = existingImages.filter((_, i) => i !== index)
    onImagesChange(newImages)
    showSuccessToast('Imagen eliminada')
  }

  // =============================================
  // 🔀 MOVER IMAGEN (← → botones)
  // =============================================
  /**
   * Mueve una imagen a la posición anterior o siguiente.
   * Usado en mobile (drag & drop no funciona bien en touch).
   */
  const moveImage = (index: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= existingImages.length) return

    const newImages = [...existingImages]
    const [moved] = newImages.splice(index, 1)
    newImages.splice(newIndex, 0, moved)
    onImagesChange(newImages)
  }

  // =============================================
  // 🖱️ DRAG & DROP (desktop)
  // =============================================
  const handleDragStart = (index: number) => {
    setDraggedIndex(index)
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    const newImages = [...existingImages]
    const [moved] = newImages.splice(draggedIndex, 1)
    newImages.splice(dropIndex, 0, moved)
    onImagesChange(newImages)

    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
  }

  // =============================================
  // 📊 CONTADOR
  // =============================================
  const totalImages = existingImages.length + uploadProps.files.length;
  const isAtMax = totalImages >= maxFiles;

  // =============================================
  // 🖥️ RENDER
  // =============================================
  return (
    <div className="space-y-4">
      {/* =============================================
      📌 LABEL CON CONTADOR
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
      📤 DROPZONE
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
      📸 IMÁGENES EXISTENTES (reordenables)
      ============================================= */}
      {existingImages.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-[#303030] flex items-center gap-2">
              📸 Imágenes actuales
              <span className="text-xs font-normal text-[#6A757C]">
                ({existingImages.length} {existingImages.length === 1 ? 'imagen' : 'imágenes'})
              </span>
            </p>
            <p className="text-xs text-[#6A757C]">
              💡 Arrastra o usa ← → para reordenar
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {existingImages.map((url: string, index: number) => {
              const isFirst = index === 0
              const isDragged = draggedIndex === index
              const isDragOver = dragOverIndex === index

              return (
                <div
                  key={`${url}-${index}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`
                    relative group border-2 rounded-lg overflow-hidden transition-all
                    ${isFirst ? 'border-[#FFD93D]' : 'border-[#7D5FFF]'}
                    ${isDragged ? 'opacity-40 scale-95' : 'opacity-100'}
                    ${isDragOver ? 'border-[#00D2D3] scale-105 shadow-lg' : ''}
                    hover:border-[#FF6B81]
                  `}
                >
                  <img
                    src={url}
                    alt={`Imagen ${index + 1}`}
                    className="w-24 h-24 object-cover pointer-events-none"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        'https://via.placeholder.com/96x96?text=❌'
                    }}
                  />

                  {/* Badge "Principal" en la primera imagen */}
                  {isFirst && (
                    <div className="absolute top-1 left-1 bg-[#FFD93D] text-[#303030] text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      ⭐ Principal
                    </div>
                  )}

                  {/* Número de orden */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center py-0.5">
                    #{index + 1}
                  </div>

                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-[#FF6B81] text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-[#603060] transition-all hover:scale-110 shadow-md z-10"
                    title="Eliminar imagen"
                  >
                    ✕
                  </button>

                  {/* Botones ← → para reordenar (mobile) */}
                  <div className="absolute inset-x-0 bottom-6 flex justify-between px-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'left')}
                      disabled={index === 0}
                      className="bg-black/60 hover:bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover a la izquierda"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'right')}
                      disabled={index === existingImages.length - 1}
                      className="bg-black/60 hover:bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Mover a la derecha"
                    >
                      →
                    </button>
                  </div>
                </div>
              )
            })}
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