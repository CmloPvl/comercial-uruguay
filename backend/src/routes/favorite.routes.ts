import { Router } from 'express';
import { 
  getFavorites, 
  addFavorite, 
  removeFavorite 
} from '../controllers/favorite.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Todas las rutas de favoritos requieren autenticación
router.use(verifyToken);

router.get('/', getFavorites);
router.post('/:productId', addFavorite);
router.delete('/:productId', removeFavorite);

export default router;