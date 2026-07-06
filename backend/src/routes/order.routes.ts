import { Router } from 'express';
import { 
  createOrder, 
  getUserOrders, 
  getOrderById, 
  getAllOrders, 
  updateOrderStatus 
} from '../controllers/order.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas requieren autenticación
router.use(verifyToken);

// Usuario
router.post('/', createOrder);
router.get('/', getUserOrders);
router.get('/:id', getOrderById);

// Admin
router.get('/all', getAllOrders);
router.put('/:id/status', updateOrderStatus);

export default router;