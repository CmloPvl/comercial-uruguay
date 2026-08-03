// 📁 frontend/src/utils/perfilUtils.ts

/**
 * 📌 UTILIDADES DE PERFIL
 * 
 * Funciones auxiliares para la página de Perfil:
 * - getInitials: Obtiene iniciales del nombre
 * - getAvatarColor: Genera un color aleatorio para el avatar
 * - formatDate: Formatea fechas en español
 * - getOrderStatus: Obtiene el estado del pedido con su color e icono
 * 
 * ✅ Buenas prácticas:
 * - Funciones puras (sin efectos secundarios)
 * - Reutilizables en toda la aplicación
 * - Fácil de testear
 */

/**
 * getInitials: Obtiene las iniciales de un nombre
 * @param {string} name - Nombre completo
 * @returns {string} - Iniciales (ej: "CR")
 */
export const getInitials = (name: string): string => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

/**
 * getAvatarColor: Genera un color aleatorio para el avatar
 * @param {string} name - Nombre para generar el hash
 * @returns {string} - Clase de color de Tailwind
 */
export const getAvatarColor = (name: string): string => {
  const colors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
    "bg-[#90C090]",
    "bg-[#603060]",
    "bg-[#C06060]",
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

/**
 * formatDate: Formatea una fecha en español
 * @param {string} dateString - Fecha en formato ISO
 * @returns {string} - Fecha formateada (ej: "22/07/2024")
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return "Fecha no disponible";
  return new Date(dateString).toLocaleDateString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

/**
 * getOrderStatus: Obtiene el estado de un pedido con su color e icono
 * @param {string} status - Estado del pedido
 * @returns {Object} - { label, className, icon }
 */
export const getOrderStatus = (status: string): { label: string; className: string; icon: string } => {
  const statusMap: Record<string, { label: string; className: string; icon: string }> = {
    RECIBIDO: { label: "Recibido", className: "bg-[#FF6B81] text-white", icon: "📩" },
    REVISION: { label: "En Revisión", className: "bg-[#FF9F43] text-white", icon: "🔍" },
    CONFIRMADO: { label: "Confirmado", className: "bg-[#FFD93D] text-[#303030]", icon: "✅" },
    ENVIADO: { label: "Enviado", className: "bg-[#00D2D3] text-white", icon: "📦" },
    ENTREGADO: { label: "Entregado", className: "bg-[#90C090] text-white", icon: "🏠" },
    CANCELADO: { label: "Cancelado", className: "bg-gray-400 text-white", icon: "❌" },
  };
  return statusMap[status] || { label: status, className: "bg-gray-400 text-white", icon: "📋" };
};