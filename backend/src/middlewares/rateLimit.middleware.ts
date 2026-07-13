import rateLimit from 'express-rate-limit';

// =============================================
// Limitar intentos de login
// =============================================
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Máximo 5 intentos
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true, // Devuelve información de rate limit en los headers
  legacyHeaders: false, // Desactiva los headers antiguos
});

// =============================================
// Limit general para la API
// =============================================
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo 100 peticiones por IP
  message: {
    success: false,
    message: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});