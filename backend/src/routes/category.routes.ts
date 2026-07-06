import { Router } from 'express';
import { 
  getCategories, 
  getCategoryById, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../controllers/category.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getCategories);
router.get('/:id', getCategoryById);

// Rutas protegidas (requieren autenticación)
router.post('/', verifyToken, createCategory);
router.put('/:id', verifyToken, updateCategory);
router.delete('/:id', verifyToken, deleteCategory);

export default router;
