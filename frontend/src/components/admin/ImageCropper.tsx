// 📁 frontend/src/components/admin/ImageCropper.tsx

/**
 * 📌 COMPONENTE: ImageCropper
 * 
 * Modal para recortar imágenes antes de guardarlas.
 * Usa react-easy-crop para el editor visual.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Lógica extraída a useImageCropper (SoC)
 * - Mobile-first (padding, alturas y tipografía responsive)
 * - Modal accesible (cierra con Escape)
 * - Paleta de colores consistente
 * 
 * 🆕 Zoom permite alejar (min 0.5x)
 * 🆕 Fondo blanco sólido en el modal
 * 🆕 Vista previa con Canvas (imagen recortada real)
 */

import { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useImageCropper } from "../../hooks/useImageCropper";
import type { CropData } from "../../services/productService";

// =============================================
// 📋 INTERFAZ DE PROPS
// =============================================

interface ImageCropperProps {
  imageUrl: string;
  onSave: (cropData: CropData) => void;
  onCancel: () => void;
}

// =============================================
// 🎯 FUNCIÓN: RECORTAR IMAGEN CON CANVAS
// =============================================
/**
 * Toma la imagen original y el área de recorte (en píxeles)
 * y devuelve una URL de datos (base64) con la imagen recortada.
 */
async function getCroppedImg(
  imageUrl: string,
  cropArea: { x: number; y: number; width: number; height: number }
): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageUrl;

    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        reject(new Error("No se pudo crear el contexto del canvas"));
        return;
      }

      canvas.width = cropArea.width;
      canvas.height = cropArea.height;

      ctx.drawImage(
        image,
        cropArea.x,
        cropArea.y,
        cropArea.width,
        cropArea.height,
        0,
        0,
        cropArea.width,
        cropArea.height
      );

      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };

    image.onerror = () => {
      reject(new Error("Error al cargar la imagen"));
    };
  });
}

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export function ImageCropper({ imageUrl, onSave, onCancel }: ImageCropperProps) {
  const {
    crop,
    zoom,
    aspect,
    croppedArea,
    setCrop,
    setZoom,
    setAspect,
    handleCropComplete,
    handleSave,
    aspectRatios,
  } = useImageCropper({ onSave, onCancel });

  // =============================================
  // 🆕 ESTADO: VISTA PREVIA REAL (Canvas)
  // =============================================
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);

  // =============================================
  // 🆕 EFECTO: GENERAR VISTA PREVIA CUANDO CAMBIA EL CROP
  // =============================================
  useEffect(() => {
    if (!croppedArea || aspect === 0) {
      setPreviewUrl(null);
      return;
    }

    let isMounted = true;
    setPreviewLoading(true);

    getCroppedImg(imageUrl, croppedArea)
      .then((url) => {
        if (isMounted) {
          setPreviewUrl(url);
          setPreviewLoading(false);
        }
      })
      .catch((err) => {
        console.error("❌ Error al generar vista previa:", err);
        if (isMounted) {
          setPreviewLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [croppedArea, imageUrl, aspect]);

  // =============================================
  // ALTURA DINÁMICA DEL CROPPER
  // =============================================
  const cropperHeight =
    aspect === 3 / 4
      ? "h-[350px] sm:h-[450px]"
      : aspect === 16 / 9
      ? "h-[220px] sm:h-[300px]"
      : "h-[300px] sm:h-[400px]";

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-3 sm:p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Editor de recorte de imagen"
    >
      <Card
        className="w-full max-w-2xl border-2 border-[#7D5FFF] shadow-2xl max-h-[90vh] flex flex-col bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-3 sm:p-6 overflow-y-auto flex-1 bg-white">
          {/* HEADER */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-[#603060] flex items-center gap-2">
              ✂️ Ajustar imagen
            </h2>
            <button
              type="button"
              onClick={onCancel}
              className="text-xl sm:text-2xl text-[#6A757C] hover:text-[#FF6B81] transition hover:scale-110"
              aria-label="Cerrar editor"
            >
              ✕
            </button>
          </div>

          {/* SELECTOR DE PROPORCIÓN */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio.value}
                type="button"
                onClick={() => setAspect(ratio.value)}
                className={`
                  px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all
                  ${aspect === ratio.value
                    ? "bg-gradient-to-r from-[#7D5FFF] to-[#603060] text-white shadow-md"
                    : "bg-[#FAF9E2] text-[#603060] border border-[#7D5FFF]/30 hover:border-[#7D5FFF]"
                  }
                `}
                aria-pressed={aspect === ratio.value}
              >
                {ratio.label}
              </button>
            ))}
          </div>

          {/* EDITOR DE RECORTE */}
          <div className={`relative w-full ${cropperHeight} bg-black rounded-xl overflow-hidden mb-3 sm:mb-4`}>
            {aspect === 0 ? (
              <img
                src={imageUrl}
                alt="Imagen original"
                className="w-full h-full object-contain"
              />
            ) : (
              <Cropper
                image={imageUrl}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={handleCropComplete}
                showGrid={true}
                restrictPosition={false}
              />
            )}
          </div>

          {/* CONTROLES DE ZOOM (🆕 permite alejar) */}
          {aspect !== 0 && (
            <div className="mb-3 sm:mb-4">
              <label className="text-xs sm:text-sm font-semibold text-[#303030] mb-1.5 sm:mb-2 block">
                🔍 Zoom
              </label>
              <input
                type="range"
                min="0.5"      // 🆕 Permite alejar
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#7D5FFF]"
                aria-label="Nivel de zoom"
              />
              <div className="flex justify-between text-[10px] sm:text-xs text-[#6A757C] mt-1">
                <span>0.5x</span>
                <span>{zoom.toFixed(1)}x</span>
                <span>3x</span>
              </div>
            </div>
          )}

          {/* VISTA PREVIA (🆕 con Canvas) */}
          {croppedArea && aspect !== 0 && (
            <div className="mb-3 sm:mb-4">
              <p className="text-xs sm:text-sm font-semibold text-[#303030] mb-1.5 sm:mb-2">
                👁️ Vista previa
              </p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 border-[#00D2D3] bg-[#FAF9E2] flex items-center justify-center">
                  {previewLoading ? (
                    <span className="text-[10px] text-[#6A757C]">...</span>
                  ) : previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Vista previa"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-[#6A757C]">Sin vista</span>
                  )}
                </div>
                <Badge className="bg-[#00D2D3] text-white text-[10px] sm:text-xs">
                  {aspect === 1 ? "Cuadrado" : aspect === 16 / 9 ? "Horizontal" : "Vertical"}
                </Badge>
              </div>
            </div>
          )}

          {/* BOTONES */}
          <div className="flex gap-2 sm:gap-3">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-2 border-[#6A757C] text-[#6A757C] hover:bg-[#6A757C] hover:text-white font-bold py-2 sm:py-2.5 rounded-xl transition-all text-sm sm:text-base"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-2 sm:py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-sm sm:text-base"
            >
              ✅ Guardar recorte
            </Button>
          </div>

          {/* INFO */}
          <p className="text-[10px] sm:text-xs text-[#6A757C] text-center mt-2 sm:mt-3">
            💡 Arrastra la imagen para ajustar el recorte. Usa el zoom para acercar o alejar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}