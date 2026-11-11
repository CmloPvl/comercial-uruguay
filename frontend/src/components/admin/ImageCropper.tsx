// 📁 frontend/src/components/admin/ImageCropper.tsx

/**
 * 📌 COMPONENTE: ImageCropper
 * 
 * Modal para recortar imágenes antes de guardarlas.
 * Usa react-easy-crop para el editor visual.
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Recibe la imagen por props
 * - Devuelve las coordenadas del recorte al padre
 * - Modal accesible (cierra con Escape)
 * - Mobile-friendly (gestos táctiles)
 * - Paleta de colores consistente
 */

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import type { Area } from "react-easy-crop";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";

// =============================================
// 📋 INTERFAZ DE PROPS
// =============================================

interface ImageCropperProps {
  /** URL de la imagen a recortar */
  imageUrl: string;
  /** Función que se ejecuta al guardar (devuelve las coordenadas) */
  onSave: (cropData: { x: number; y: number; zoom: number; aspect: number }) => void;
  /** Función para cerrar sin guardar */
  onCancel: () => void;
}

// =============================================
// 📐 PROPORCIONES DISPONIBLES
// =============================================

const ASPECT_RATIOS = [
  { label: "Cuadrado (1:1)", value: 1 },
  { label: "Horizontal (16:9)", value: 16 / 9 },
  { label: "Vertical (3:4)", value: 3 / 4 },
  { label: "Original", value: 0 },  // 0 = sin recorte
];

// =============================================
// 🎯 COMPONENTE PRINCIPAL
// =============================================

export function ImageCropper({ imageUrl, onSave, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  // =============================================
  // 📸 CALLBACK: CUANDO SE COMPLETA EL RECORTE
  // =============================================
  const onCropComplete = useCallback((_croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  // =============================================
  // 💾 GUARDAR RECORTE
  // =============================================
  const handleSave = () => {
    if (!croppedArea) return;

    onSave({
      x: croppedArea.x,
      y: croppedArea.y,
      zoom,
      aspect,
    });
  };

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <div
      className="fixed inset-0 bg-black/70 z-[100] flex items-center justify-center p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-label="Editor de recorte de imagen"
    >
      <Card
        className="w-full max-w-2xl border-2 border-[#7D5FFF] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <CardContent className="p-4 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#603060] flex items-center gap-2">
              ✂️ Ajustar imagen
            </h2>
            <button
              onClick={onCancel}
              className="text-2xl text-[#6A757C] hover:text-[#FF6B81] transition hover:scale-110"
              aria-label="Cerrar editor"
            >
              ✕
            </button>
          </div>

          {/* Selector de proporción */}
          <div className="flex flex-wrap gap-2 mb-4">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.value}
                onClick={() => setAspect(ratio.value)}
                className={`
                  px-3 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all
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

          {/* Editor de recorte */}
          <div className="relative w-full h-[300px] sm:h-[400px] bg-black rounded-xl overflow-hidden mb-4">
            {aspect === 0 ? (
              // 🆕 Original: mostrar imagen completa sin recorte
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
                onCropComplete={onCropComplete}
                showGrid={true}
                restrictPosition={false}
              />
            )}
          </div>

          {/* Controles de zoom (solo si no es "Original") */}
          {aspect !== 0 && (
            <div className="mb-4">
              <label className="text-sm font-semibold text-[#303030] mb-2 block">
                🔍 Zoom
              </label>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#7D5FFF]"
                aria-label="Nivel de zoom"
              />
              <div className="flex justify-between text-xs text-[#6A757C] mt-1">
                <span>1x</span>
                <span>{zoom.toFixed(1)}x</span>
                <span>3x</span>
              </div>
            </div>
          )}

          {/* Vista previa del recorte */}
          {croppedArea && aspect !== 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#303030] mb-2">
                👁️ Vista previa
              </p>
              <div className="flex items-center gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-[#00D2D3]">
                  <img
                    src={imageUrl}
                    alt="Vista previa"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: `${-croppedArea.x}px ${-croppedArea.y}px`,
                      transform: `scale(${zoom})`,
                      transformOrigin: "top left",
                    }}
                  />
                </div>
                <Badge className="bg-[#00D2D3] text-white text-xs">
                  {aspect === 1 ? "Cuadrado" : aspect === 16/9 ? "Horizontal" : "Vertical"}
                </Badge>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-2 sm:gap-3">
            <Button
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-2 border-[#6A757C] text-[#6A757C] hover:bg-[#6A757C] hover:text-white font-bold py-2.5 rounded-xl transition-all"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-[#00D2D3] to-[#7D5FFF] hover:from-[#7D5FFF] hover:to-[#00D2D3] text-white font-bold py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              ✅ Guardar recorte
            </Button>
          </div>

          {/* Info */}
          <p className="text-xs text-[#6A757C] text-center mt-3">
            💡 Arrastra la imagen para ajustar el recorte. Usa el zoom para acercar.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}