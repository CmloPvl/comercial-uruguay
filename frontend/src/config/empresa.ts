// 📁 frontend/src/config/empresa.ts

/**
 * 📌 CONFIGURACIÓN DE LA EMPRESA
 * 
 * Centraliza toda la información del negocio:
 * - Datos de contacto
 * - Redes sociales (URL + color)
 * - Horarios de atención (simple + detallado)
 * - Beneficios
 * - Ubicación (con coordenadas)
 * - Descripción
 * 
 * ✅ Buenas prácticas:
 * - Un solo lugar para toda la información del negocio
 * - Colores de redes centralizados
 * - Horarios en formato simple y detallado
 * - Beneficios centralizados
 * - Coordenadas para Google Maps
 * - Fácil de mantener y actualizar
 */

export const empresaConfig = {
  // =============================================
  // 📌 INFORMACIÓN BÁSICA
  // =============================================
  nombre: 'Comercial Uruguay',
  descripcion: 'Todo lo que necesitas en un solo lugar. Más de 10 años en Valparaíso ofreciendo productos de calidad y atención cercana.',

  // =============================================
  // 📞 CONTACTO
  // =============================================
  telefono: '+56975303324',
  telefonoFijo: null,
  email: 'comercialuruguayvalpo@gmail.com',
  whatsapp: '56975303324',

  // =============================================
  // 📍 UBICACIÓN (CON COORDENADAS)
  // =============================================
  direccion: 'Uruguay 660, Valparaíso',
  comuna: 'Valparaíso',
  region: 'Quinta Región',
  coordenadas: {
    lat: -33.050056152572076,
    lng: -71.6086098469181,
  },
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=-33.050056152572076,-71.6086098469181',

  // =============================================
  // 🌐 REDES SOCIALES (URL + COLOR)
  // =============================================
  social: {
    facebook: {
      url: 'https://www.facebook.com/ComercialUruguay',
      color: '#1877F2',
      label: 'Facebook',
    },
    instagram: {
      url: 'https://www.instagram.com/comercial.uruguay_valpo',
      color: '#E4405F',
      label: 'Instagram',
    },
    tiktok: {
      url: 'https://www.tiktok.com/@comercial.uruguay',
      color: '#000000',
      label: 'TikTok',
    },
    whatsapp: {
      url: 'https://wa.me/56975303324',
      color: '#25D366',
      label: 'WhatsApp',
    },
  },

  // =============================================
  // 🕐 HORARIOS
  // =============================================
  horario: {
    // Formato simple (para mostrar en el Hero)
    lunesViernes: '9:00 - 18:30 hrs',
    sabado: '10:00 - 15:00 hrs',
    domingo: 'Cerrado',

    // Formato detallado (para tablas)
    detalle: [
      { dia: 'Lunes', horario: '9:00 - 18:30' },
      { dia: 'Martes', horario: '9:00 - 18:30' },
      { dia: 'Miércoles', horario: '9:00 - 18:30' },
      { dia: 'Jueves', horario: '9:00 - 18:30' },
      { dia: 'Viernes', horario: '9:00 - 18:30' },
      { dia: 'Sábado', horario: '10:00 - 15:00' },
      { dia: 'Domingo', horario: 'Cerrado' },
    ],
  },

  // =============================================
  // ✨ BENEFICIOS
  // =============================================
  benefits: [
    {
      icon: "💰",
      title: "Buenos Precios",
      description: "Los mejores precios del mercado",
      color: "border-[#FFD93D] hover:shadow-[#FFD93D]/30",
    },
    {
      icon: "📦",
      title: "Amplio Catálogo",
      description: "Encuentra todo lo que necesitas",
      color: "border-[#00D2D3] hover:shadow-[#00D2D3]/30",
    },
    {
      icon: "🤝",
      title: "Atención Cercana",
      description: "Trato personalizado y confiable",
      color: "border-[#FF6B81] hover:shadow-[#FF6B81]/30",
    },
    {
      icon: "📍",
      title: "Ubicación Céntrica",
      description: "Fácil acceso en el centro de Valpo",
      color: "border-[#7D5FFF] hover:shadow-[#7D5FFF]/30",
    },
  ],

  // =============================================
  // 📅 AÑO ACTUAL
  // =============================================
  año: new Date().getFullYear(),
};