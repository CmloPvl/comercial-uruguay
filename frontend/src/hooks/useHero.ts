// 📁 frontend/src/hooks/useHero.ts

/**
 * 📌 HOOK PERSONALIZADO: useHero
 * 
 * Encapsula toda la lógica del Hero:
 * - Carga de imágenes del local desde Supabase Storage
 * - Subida de imágenes a Supabase Storage
 * - Eliminación de imágenes de Supabase Storage
 * - Validación de imágenes (tamaño y tipo)
 * - Estado de carga
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes
 * - Fácil de testear
 * - Manejo de errores con toasts centralizados
 * - Mensajes consistentes y controlados
 * - Conexión directa con Supabase Storage
 */

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";
import { showErrorToastWithFallback, showSuccessToast } from "../utils/errorMessages";

// =============================================
// 📦 CONSTANTES
// =============================================

const BUCKET_NAME = "hero";
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

// =============================================
// 📦 TIPOS
// =============================================

interface HeroImage {
  id: string;
  url: string;
  alt: string;
}

// =============================================
// 🎯 HOOK PRINCIPAL
// =============================================

export function useHero() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================
  const { user } = useAuth();
  const isAdmin = user?.role === "ADMIN";

  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [images, setImages] = useState<HeroImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  // =============================================
  // 📸 CARGAR IMÁGENES DESDE SUPABASE
  // =============================================
  const loadImages = async () => {
    try {
      setIsLoading(true);

      const { data, error } = await supabase.storage
        .from(BUCKET_NAME)
        .list();

      if (error) throw error;

      const imageUrls = data
        .filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))
        .map((file) => ({
          id: file.id || file.name,
          url: supabase.storage.from(BUCKET_NAME).getPublicUrl(file.name).data.publicUrl,
          alt: "Local Comercial Uruguay",
        }));

      setImages(imageUrls);
    } catch (error) {
      showErrorToastWithFallback(error, "Error al cargar imágenes del local");
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  // =============================================
  // 📤 SUBIR IMAGEN A SUPABASE
  // =============================================
  const uploadImage = async (file: File) => {
    // ✅ Validar tamaño (2MB)
    if (file.size > MAX_FILE_SIZE) {
      showErrorToastWithFallback(
        new Error("La imagen excede el tamaño máximo de 2MB"),
        "La imagen excede el tamaño máximo de 2MB"
      );
      return;
    }

    // ✅ Validar tipo
    if (!file.type.startsWith("image/")) {
      showErrorToastWithFallback(
        new Error("El archivo no es una imagen válida"),
        "El archivo no es una imagen válida"
      );
      return;
    }

    try {
      setIsUploading(true);

      // ✅ Generar nombre único
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;

      // ✅ Subir a Supabase Storage
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      // ✅ Obtener URL pública
      const url = supabase.storage.from(BUCKET_NAME).getPublicUrl(fileName).data.publicUrl;

      // ✅ Actualizar estado
      const newImage: HeroImage = {
        id: fileName,
        url,
        alt: "Local Comercial Uruguay",
      };
      setImages((prev) => [...prev, newImage]);

      showSuccessToast("Imagen del local agregada");
    } catch (error) {
      showErrorToastWithFallback(error, "Error al subir la imagen");
    } finally {
      setIsUploading(false);
    }
  };

  // =============================================
  // 🗑️ ELIMINAR IMAGEN DE SUPABASE
  // =============================================
  const removeImage = async (imageId: string) => {
    try {
      const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .remove([imageId]);

      if (error) throw error;

      setImages((prev) => prev.filter((img) => img.id !== imageId));
      showSuccessToast("🗑️ Imagen eliminada");
    } catch (error) {
      showErrorToastWithFallback(error, "Error al eliminar la imagen");
    }
  };

  // =============================================
  // 🚀 EFECTO: CARGAR IMÁGENES AL INICIO
  // =============================================
  useEffect(() => {
    loadImages();
  }, []);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    images,
    isLoading,
    isUploading,
    isAdmin,
    loadImages,
    uploadImage,
    removeImage,
  };
}