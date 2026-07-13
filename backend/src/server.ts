import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import categoryRoutes from './routes/category.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import favoriteRoutes from './routes/favorite.routes';
import adminRoutes from './routes/admin.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// =============================================
// Configuración de Proxy (para Render)
// =============================================
// Habilita trust proxy para que express-rate-limit funcione correctamente detrás de un proxy
app.set('trust proxy', true);

// =============================================
// Rate Limiting (Anti-DDoS / Anti-Fuerza Bruta)
// =============================================

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Demasiadas peticiones. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: 'Demasiados intentos de inicio de sesión. Por favor, intenta de nuevo en 15 minutos.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// =============================================
// Middlewares globales
// =============================================
app.use(express.json());
app.use(cors());
app.use(helmet());

// =============================================
// Rate Limiting aplicado a las rutas
// =============================================
app.use('/api', apiLimiter);
app.use('/api/auth/login', loginLimiter);

// =============================================
// Rutas
// =============================================
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

// =============================================
// Ruta de prueba
// =============================================
app.get('/api/health', (_req, res) => {
  res.json({ status: 'OK', message: 'Servidor funcionando correctamente' });
});

// =============================================
// Iniciar servidor
// =============================================
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🔒 Rate Limiting activado: 100 peticiones/15min (general) | 5 intentos/15min (login)`);
    console.log(`👑 Admin routes activadas`);
    console.log(`🛡️ Trust proxy habilitado para Render`);
  });
}

export default app;