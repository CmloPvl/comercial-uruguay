import { Router } from 'express';
import { 
  register, 
  login, 
  recoverPassword,
  getProfile,
  updateProfile,
  updatePassword
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// Rutas públicas
router.post('/register', register);
router.post('/login', login);
router.post('/recover', recoverPassword);

// Rutas protegidas (requieren token)
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, updatePassword);

export default router;