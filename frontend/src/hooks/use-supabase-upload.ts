// 📁 frontend/src/hooks/use-supabase-upload.ts

/**
 * 📌 HOOK PERSONALIZADO: useSupabaseUpload
 * 
 * Hook para subir archivos a Supabase Storage.
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica de subida
 * - Reutilizable en toda la app
 * - Manejo de errores con toasts
 * - Callbacks para éxito y error
 * - Generación de URLs públicas
 * 
 * 🎯 Uso:
 * - ImageUploader.tsx
 * - CrearPublicacion.tsx
 * - EditarPublicacion.tsx
 */

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone, type FileError, type FileRejection, type FileWithPath } from 'react-dropzone';
import { supabase as defaultSupabase } from '@/lib/supabase';

// =============================================
// 📋 INTERFACES
// =============================================

interface FileWithPreview extends FileWithPath {
  preview?: string;
  errors: readonly FileError[];
  publicUrl?: string; // ✅ URL pública del archivo subido
}

interface UploadResponse {
  name: string;
  message?: string;
  publicUrl?: string;
}

type UseSupabaseUploadOptions = {
  /** Cliente de Supabase (opcional, usa el default si no se proporciona) */
  supabase?: any;
  /** Nombre del bucket en Supabase Storage */
  bucketName: string;
  /** Carpeta dentro del bucket (opcional) */
  path?: string;
  /** Tipos MIME permitidos (ej: 'image/*') */
  allowedMimeTypes?: string[];
  /** Tamaño máximo de archivo en bytes */
  maxFileSize?: number;
  /** Número máximo de archivos */
  maxFiles?: number;
  /** Cache-Control en segundos (default: 3600) */
  cacheControl?: number;
  /** Sobrescribir archivo si existe (default: false) */
  upsert?: boolean;
  /** Callback cuando se completan las subidas */
  onUploadComplete?: (files: any[]) => void;
  /** Callback cuando hay error en una subida */
  onUploadError?: (file: any, error: any) => void;
};

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>;

// =============================================
// 🧠 HOOK PRINCIPAL
// =============================================

const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  const {
    supabase = defaultSupabase,
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
    onUploadComplete,
    onUploadError,
  } = options;

  // =============================================
  // 🎯 ESTADOS
  // =============================================

  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ name: string; message: string }[]>([]);
  const [successes, setSuccesses] = useState<string[]>([]);

  // =============================================
  // 📊 DATOS DERIVADOS
  // =============================================

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false;
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true;
    }
    return false;
  }, [errors.length, successes.length, files.length]);

  // =============================================
  // 📤 MANEJAR DROP (selección de archivos)
  // =============================================

  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _event: any
    ) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          const fileWithPreview = file as unknown as FileWithPreview;
          fileWithPreview.preview = URL.createObjectURL(file);
          fileWithPreview.errors = [];
          return fileWithPreview;
        });

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        const fileWithPreview = file as unknown as FileWithPreview;
        fileWithPreview.preview = URL.createObjectURL(file);
        fileWithPreview.errors = errors;
        return fileWithPreview;
      });

      const newFiles = [...files, ...validFiles, ...invalidFiles];
      setFiles(newFiles);
    },
    [files]
  );

  // =============================================
  // 📥 PROPS DEL DROPZONE
  // =============================================

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  });

  // =============================================
  // 🚀 SUBIR ARCHIVOS A SUPABASE
  // =============================================

  const onUpload = useCallback(async () => {
    setLoading(true);

    // 📌 Identificar archivos con errores para re-intentar
    const filesWithErrors = errors.map((x) => x.name);
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files;

    // 📤 Subir cada archivo a Supabase
    const responses: UploadResponse[] = await Promise.all(
      filesToUpload.map(async (file) => {
        const filePath = !!path ? `${path}/${file.name}` : file.name;
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          });

        if (error) {
          return { name: file.name, message: error.message };
        } else {
          // ✅ Obtener la URL pública del archivo subido
          const { data: publicUrlData } = supabase.storage
            .from(bucketName)
            .getPublicUrl(filePath);
          const publicUrl = publicUrlData?.publicUrl;

          return {
            name: file.name,
            message: undefined,
            publicUrl: publicUrl,
          };
        }
      })
    );

    // 📋 Procesar respuestas - separar errores y éxitos
    const responseErrors = responses
      .filter((x): x is { name: string; message: string } => x.message !== undefined)
      .map((x) => ({ name: x.name, message: x.message }));

    setErrors(responseErrors);

    const responseSuccesses = responses.filter((x) => x.message === undefined);
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)])
    );
    setSuccesses(newSuccesses);

    // ✅ Ejecutar callback de éxito con archivos y URLs
    if (responseSuccesses.length > 0 && onUploadComplete) {
      const uploadedFiles = files
        .filter((f) => responseSuccesses.some((s) => s.name === f.name))
        .map((f) => {
          // ✅ Buscar la URL pública de la respuesta
          const response = responses.find((r) => r.name === f.name);
          return {
            ...f,
            publicUrl: response?.publicUrl,
          };
        });
      onUploadComplete(uploadedFiles);
    }

    // ❌ Ejecutar callback de error
    if (responseErrors.length > 0 && onUploadError) {
      responseErrors.forEach((err) => {
        const file = files.find((f) => f.name === err.name);
        if (file) {
          onUploadError(file, err.message);
        }
      });
    }

    setLoading(false);
  }, [files, path, bucketName, errors, successes, supabase, onUploadComplete, onUploadError]);

  // =============================================
  // 🔄 EFECTO: LIMPIAR ERRORES AL ELIMINAR ARCHIVOS
  // =============================================

  useEffect(() => {
    if (files.length === 0) {
      setErrors([]);
    }

    if (files.length <= maxFiles) {
      let changed = false;
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files');
          changed = true;
        }
        return file;
      });
      if (changed) {
        setFiles(newFiles);
      }
    }
  }, [files.length, setFiles, maxFiles]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  };
};

export { useSupabaseUpload, type UseSupabaseUploadOptions, type UseSupabaseUploadReturn };