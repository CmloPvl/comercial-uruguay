// 📁 backend/src/routes/user.routes.ts

/**
 * 📌 RUTAS DE USUARIOS (Admin)
 * 
 * Todas las rutas para la administración de usuarios.
 * Requieren autenticación y rol ADMIN.
 * 
 * ✅ Buenas prácticas:
 * - Protección con middleware de autenticación
 * - Protección con middleware de admin
 * - Validación de datos
 * - Respuestas consistentes
 */

import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUserRole,
  toggleUserActive,
  deleteUser,
} from '../controllers/user.controller';
import { verifyToken, requireAdmin } from '../middlewares/auth.middleware';

const router = Router();

// =============================================
// 🔒 TODAS LAS RUTAS REQUIEREN AUTENTICACIÓN Y ADMIN
// =============================================
router.use(verifyToken);
router.use(requireAdmin);

// =============================================
// 📊 OBTENER TODOS LOS USUARIOS (con paginación y búsqueda)
// =============================================
// GET /api/admin/users?page=1&limit=10&search=nombre
router.get('/', getAllUsers);

// =============================================
// 👤 OBTENER USUARIO POR ID
// =============================================
// GET /api/admin/users/:id
router.get('/:id', getUserById);

// =============================================
// 🔄 CAMBIAR ROL DE USUARIO
// =============================================
// PUT /api/admin/users/:id/role
router.put('/:id/role', updateUserRole);

// =============================================
// 🔄 ACTIVAR/DESACTIVAR USUARIO
// =============================================
// PUT /api/admin/users/:id/toggle-active
router.put('/:id/toggle-active', toggleUserActive);

// =============================================
// 🗑️ ELIMINAR USUARIO
// =============================================
// DELETE /api/admin/users/:id
router.delete('/:id', deleteUser);

export default router;