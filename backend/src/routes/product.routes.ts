// 📁 backend/src/routes/product.routes.ts

/**
 * 📌 RUTAS DE PRODUCTOS
 * 
 * Define todas las rutas para la gestión de productos:
 * - Rutas públicas (GET) - cualquier usuario
 * - Rutas protegidas (POST, PUT, DELETE) - solo usuarios autenticados
 * 
 * ✅ Buenas prácticas:
 * - Separación de rutas por método
 * - Protección de rutas con middleware
 * - Uso de controllers
 * - Comentarios explicativos
 */

import { Router } from 'express';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../controllers/product.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

// =============================================
// 📋 RUTAS PÚBLICAS (No requieren autenticación)
// =============================================

/**
 * GET /api/products
 * 
 * Obtener todos los productos activos
 * Público - visible para todos los usuarios
 */
router.get('/', getProducts);

/**
 * GET /api/products/:id
 * 
 * Obtener un producto específico por ID
 * Público - visible para todos los usuarios
 */
router.get('/:id', getProductById);

// =============================================
// 🔒 RUTAS PROTEGIDAS (Requieren autenticación)
// =============================================

/**
 * POST /api/products
 * 
 * Crear un nuevo producto
 * 🔒 Requiere autenticación (verifyToken)
 * 🔒 Requiere rol ADMIN (opcional - por implementar)
 */
router.post('/', verifyToken, createProduct);

/**
 * PUT /api/products/:id
 * 
 * Actualizar un producto existente
 * 🔒 Requiere autenticación (verifyToken)
 * 🔒 Requiere rol ADMIN (opcional - por implementar)
 */
router.put('/:id', verifyToken, updateProduct);

/**
 * DELETE /api/products/:id
 * 
 * Eliminar (soft delete) un producto
 * 🔒 Requiere autenticación (verifyToken)
 * 🔒 Requiere rol ADMIN (opcional - por implementar)
 */
router.delete('/:id', verifyToken, deleteProduct);

export default router;