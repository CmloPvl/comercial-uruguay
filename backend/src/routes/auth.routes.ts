import { Router } from 'express';
import { 
  register, 
  login, 
  recoverPassword,
  getProfile,
  updateProfile,
  updatePassword,
  forgotPassword,  // ✅ NUEVO
  resetPassword,   // ✅ NUEVO
} from '../controllers/auth.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// =============================================
// 🚪 RUTAS PÚBLICAS (No requieren autenticación)
// =============================================
router.post('/register', register);
router.post('/login', login);
router.post('/recover', recoverPassword);
router.post('/forgot-password', forgotPassword);   // ✅ NUEVA: Solicitar recuperación
router.post('/reset-password', resetPassword);     // ✅ NUEVA: Restablecer contraseña

// =============================================
// 🔒 RUTAS PROTEGIDAS (Requieren token)
// =============================================
router.get('/profile', verifyToken, getProfile);
router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, updatePassword);

export default router;