import { Router } from 'express';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware';
import {
  getDashboardStats,
  getRecentOrders,
  getAllProducts,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/admin.controller';

const router = Router();

// Todas las rutas requieren autenticación y rol ADMIN
router.use(verifyToken);
router.use(requireAdmin);

// =============================================
// DASHBOARD
// =============================================
router.get('/stats', getDashboardStats);
router.get('/orders/recent', getRecentOrders);

// =============================================
// PRODUCTOS (admin)
// =============================================
router.get('/products', getAllProducts);

// =============================================
// PEDIDOS (admin)
// =============================================
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);

export default router;