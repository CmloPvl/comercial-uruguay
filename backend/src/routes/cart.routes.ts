
import { Router } from 'express';
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart,
  clearCart
} from '../controllers/cart.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de carrito requieren autenticación
router.use(verifyToken);

router.get('/', getCart);
router.post('/items', addToCart);
router.put('/items/:productId', updateCartItem);
router.delete('/items/:productId', removeFromCart);
router.delete('/', clearCart);

export default router;
