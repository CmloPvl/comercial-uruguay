// 📁 backend/src/server.ts

/**
 * 📌 SERVIDOR - Punto de entrada del backend
 * 
 * Configuración principal del servidor Express:
 * - Middlewares (CORS, Helmet, JSON, Rate Limiting)
 * - Rutas (autenticación, productos, categorías, carrito, pedidos, favoritos, admin, usuarios)
 * - Health check
 * - Inicio del servidor
 * 
 * ✅ Buenas prácticas:
 * - Protección con rate limiting
 * - Configuración de proxy para Render
 * - CORS y Helmet para seguridad
 * - Separación de rutas por módulo
 * 
 * 🆕 Rate limits ajustados:
 *    - apiLimiter: 3000/15min (antes 500 → usuarios normales se bloqueaban)
 *    - loginLimiter: 10/15min (sigue protegiendo fuerza bruta)
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// =============================================
// 📦 IMPORTS DE RUTAS
// =============================================
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import favoriteRoutes from './routes/favorite.routes';
import adminRoutes from './routes/admin.routes';
import userRoutes from './routes/user.routes';

// =============================================
// ⚙️ CONFIGURACIÓN
// =============================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// 🛡️ CONFIGURACIÓN DE PROXY (para Render)
// =============================================
app.set('trust proxy', true);

// =============================================
// 🔒 RATE LIMITING
// =============================================

// Límite general para toda la API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 3000, // 🆕 Subido de 500 a 3000 (usuarios normales no se bloquean)
  message: {
    success: false,
    message: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Límite específico para login (más restrictivo, NO se toca)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Se mantiene para proteger contra fuerza bruta
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// =============================================
// 🧩 MIDDLEWARES GLOBALES
// =============================================
app.use(express.json());
app.use(cors());
app.use(helmet());

// =============================================
// 🔒 RATE LIMITING APLICADO A LAS RUTAS
// =============================================
app.use('/api', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// =============================================
// 🗺️ RUTAS DE LA API
// =============================================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/users', userRoutes);

// =============================================
// 🏥 HEALTH CHECK
// =============================================
app.get('/api/health', (_req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor funcionando correctamente',
    timestamp: new Date().toISOString(),
  });
});

// =============================================
// 🚀 INICIAR SERVIDOR
// =============================================
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Rate Limiting: 3000 peticiones/15min (general) | 10 intentos/15min (login)`);
    console.log(`👑 Admin routes activadas`);
    console.log(`👥 User admin routes activadas`);
    console.log(`🛡️ Trust proxy habilitado para Render`);
  });
}

export default app;