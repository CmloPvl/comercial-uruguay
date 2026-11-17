// 📁 frontend/src/hooks/useImageCropper.ts

/**
 * 📌 HOOK PERSONALIZADO: useImageCropper
 * 
 * Encapsula toda la lógica del editor de recorte de imágenes:
 * - Estados (crop, zoom, aspect, croppedArea)
 * - Callbacks (onCropComplete, handleSave, handleEscape)
 * - Constantes (ASPECT_RATIOS)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño (SoC)
 * - Reutilizable en cualquier editor de recorte
 * - Fácil de testear
 * - Callback onSave tipado
 * 
 * 🆕 Hook nuevo (separado de ImageCropper.tsx)
 * 🔧 CropData ahora se importa desde productService (única fuente de verdad)
 * 🔧 Fix: si aspect === 0 (Original), se envía un crop vacío (no se guarda el recorte)
 */

import { useState, useCallback, useEffect } from "react";
import type { Area } from "react-easy-crop";
import type { CropData } from "../services/productService";

// =============================================
// 📋 TIPOS
// =============================================

/**
 * Props del hook
 */
interface UseImageCropperProps {
  /** Función que se ejecuta al guardar (devuelve las coordenadas) */
  onSave: (cropData: CropData) => void;
  /** Función para cerrar sin guardar */
  onCancel: () => void;
}

// =============================================
// 📐 PROPORCIONES DISPONIBLES
// =============================================

export const ASPECT_RATIOS = [
  { label: "Cuadrado (1:1)", value: 1 },
  { label: "Horizontal (16:9)", value: 16 / 9 },
  { label: "Vertical (3:4)", value: 3 / 4 },
  { label: "Original", value: 0 },  // 0 = sin recorte
] as const;

// =============================================
// 🎯 HOOK PRINCIPAL
// =============================================

export function useImageCropper({ onSave, onCancel }: UseImageCropperProps) {
  // =============================================
  // 🎯 ESTADOS
  // =============================================
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState<number>(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  // =============================================
  // ⌨️ CERRAR CON ESCAPE
  // =============================================
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onCancel]);

  // =============================================
  // 📸 CALLBACK: CUANDO SE COMPLETA EL RECORTE
  // =============================================
  const handleCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  // =============================================
  // 💾 GUARDAR RECORTE
  // 🔧 Fix: si aspect === 0 (Original), enviar crop vacío
  // =============================================
  const handleSave = useCallback(() => {
    // 🆕 Si es "Original" (aspect === 0), enviar crop vacío (sin recorte)
    if (aspect === 0) {
      onSave({ x: 0, y: 0, width: 0, height: 0, zoom: 1, aspect: 0 });
      return;
    }

    if (!croppedArea) return;

    onSave({
      x: croppedArea.x,
      y: croppedArea.y,
      width: croppedArea.width,
      height: croppedArea.height,
      zoom,
      aspect,
    });
  }, [croppedArea, zoom, aspect, onSave]);

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================
  return {
    // Estados
    crop,
    zoom,
    aspect,
    croppedArea,

    // Setters
    setCrop,
    setZoom,
    setAspect,

    // Callbacks
    handleCropComplete,
    handleSave,

    // Constantes
    aspectRatios: ASPECT_RATIOS,
  };
}