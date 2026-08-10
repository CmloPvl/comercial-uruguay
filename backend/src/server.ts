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
import userRoutes from './routes/user.routes'; // ✅ NUEVA RUTA DE USUARIOS

// =============================================
// ⚙️ CONFIGURACIÓN
// =============================================
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// 🛡️ CONFIGURACIÓN DE PROXY (para Render)
// =============================================
// Render usa proxies, confiamos en ellos para obtener la IP real
app.set('trust proxy', true);

// =============================================
// 🔒 RATE LIMITING (Anti-DDoS / Anti-Fuerza Bruta)
// =============================================

// Límite general para toda la API
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 peticiones por ventana
  message: {
    success: false,
    message: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Límite específico para login (más restrictivo)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos por ventana
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
app.use(express.json()); // Parsear JSON
app.use(cors()); // CORS para permitir peticiones desde el frontend
app.use(helmet()); // Helmet para seguridad (headers HTTP)

// =============================================
// 🔒 RATE LIMITING APLICADO A LAS RUTAS
// =============================================
app.use('/api', apiLimiter); // Límite general para todas las rutas /api
app.use('/api/auth/login', loginLimiter); // Límite específico para login

// =============================================
// 🗺️ RUTAS DE LA API
// =============================================

// 🔐 Autenticación - Registro, login, recuperación de contraseña
app.use('/api/auth', authRoutes);

// 📦 Productos - Listar, buscar, detalle (público)
app.use('/api/products', productRoutes);

// 📂 Categorías - Listar categorías (público)
app.use('/api/categories', categoryRoutes);

// 🛒 Carrito - Gestión del carrito (usuario autenticado)
app.use('/api/cart', cartRoutes);

// 📋 Pedidos - Crear y listar pedidos (usuario autenticado)
app.use('/api/orders', orderRoutes);

// ⭐ Favoritos - Gestión de favoritos (usuario autenticado)
app.use('/api/favorites', favoriteRoutes);

// 👑 Administración - Panel admin (productos, categorías, pedidos)
app.use('/api/admin', adminRoutes);

// 👥 Usuarios - Gestión de usuarios (solo ADMIN) ✅ NUEVA RUTA
// Rutas: GET /, GET /:id, PUT /:id/role, PUT /:id/toggle-active, DELETE /:id
app.use('/api/admin/users', userRoutes);

// =============================================
// 🏥 HEALTH CHECK - Ruta de prueba
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
    console.log(`🔒 Rate Limiting: 100 peticiones/15min (general) | 5 intentos/15min (login)`);
    console.log(`👑 Admin routes activadas`);
    console.log(`👥 User admin routes activadas`);
    console.log(`🛡️ Trust proxy habilitado para Render`);
  });
}

export default app;