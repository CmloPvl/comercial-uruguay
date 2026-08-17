
// 📁 frontend/src/utils/categoryUtils.ts

/**
 * 📌 UTILIDADES DE CATEGORÍAS
 * 
 * Colores e iconos reutilizables para categorías en toda la app.
 * 
 * ✅ Buenas prácticas:
 * - Un solo lugar para mantener colores e iconos
 * - Reutilizable en toda la app
 * - Fácil de mantener y actualizar
 * 
 * 🎯 Uso:
 * - CrearPublicacion.tsx
 * - EditarPublicacion.tsx
 * - AdminCategorias.tsx
 * - ProductForm.tsx
 */

// 🎨 Colores de la paleta para categorías
export const categoryColors = [
  { bg: "bg-[#FF6B81]/10 border-[#FF6B81]/30 hover:border-[#FF6B81]" },
  { bg: "bg-[#00D2D3]/10 border-[#00D2D3]/30 hover:border-[#00D2D3]" },
  { bg: "bg-[#FFD93D]/10 border-[#FFD93D]/30 hover:border-[#FFD93D]" },
  { bg: "bg-[#7D5FFF]/10 border-[#7D5FFF]/30 hover:border-[#7D5FFF]" },
  { bg: "bg-[#FF9F43]/10 border-[#FF9F43]/30 hover:border-[#FF9F43]" },
  { bg: "bg-[#603060]/10 border-[#603060]/30 hover:border-[#603060]" },
];

// 🎨 Iconos por defecto para categorías
export const defaultIcons: Record<string, string> = {
  'Cabello': '💇',
  'Juguetes y Cumpleaños': '🧸',
  'Cumpleaños': '🎂',
  'Hogar': '🏠',
  'Melamina': '🍽️',
  'Temporada': '🍂',
  'Electrónica': '💻',
  'Ropa': '👕',
  'Deportes': '⚽',
};

/**
 * Obtiene el color de una categoría según su índice
 * @param {number} index - Índice de la categoría
 * @returns {Object} - Objeto con clases CSS del color
 */
export const getCategoryColor = (index: number) => {
  return categoryColors[index % categoryColors.length];
};

/**
 * Obtiene el icono de una categoría por su nombre
 * @param {string} name - Nombre de la categoría
 * @param {string} customIcon - Icono personalizado (opcional)
 * @returns {string} - Icono de la categoría
 */
export const getCategoryIcon = (name: string, customIcon?: string) => {
  return customIcon || defaultIcons[name] || '📦';
};
