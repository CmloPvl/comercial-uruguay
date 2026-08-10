// 📁 backend/src/controllers/user.controller.ts

/**
 * 📌 CONTROLADOR DE USUARIOS (Admin)
 * 
 * Maneja todas las operaciones de administración de usuarios:
 * - Listar todos los usuarios (con paginación y búsqueda)
 * - Cambiar rol de usuario (CLIENTE ↔ ADMIN)
 * - Activar/desactivar usuario
 * - Eliminar usuario
 * - Obtener usuario por ID
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Respuestas consistentes
 * - Validación de datos
 */

import { Response } from 'express'; // ✅ Solo importar Response
import pool from '../config/database';
import { AuthRequest } from '../middlewares/auth.middleware';

// =============================================
// 📊 OBTENER TODOS LOS USUARIOS (Paginado)
// =============================================
export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string || '';
    
    const offset = (page - 1) * limit;

    // Construir filtro de búsqueda
    let whereClause = '';
    let params: any[] = [];
    let paramCount = 1;

    if (search) {
      whereClause = `WHERE 
        "fullName" ILIKE $${paramCount} OR 
        email ILIKE $${paramCount} OR 
        phone ILIKE $${paramCount} OR 
        role::text ILIKE $${paramCount}`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Obtener usuarios con paginación
    const usersQuery = `
      SELECT 
        id, 
        "fullName", 
        email, 
        phone, 
        address, 
        role, 
        "isActive", 
        "createdAt", 
        "updatedAt"
      FROM users
      ${whereClause}
      ORDER BY "createdAt" DESC
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM users
      ${whereClause}
    `;

    params.push(limit, offset);

    const [usersResult, countResult] = await Promise.all([
      pool.query(usersQuery, params),
      pool.query(countQuery, params.slice(0, -2)),
    ]);

    const users = usersResult.rows;
    const total = parseInt(countResult.rows[0]?.total || '0');

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error en getAllUsers:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuarios',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// =============================================
// 👤 OBTENER USUARIO POR ID
// =============================================
export const getUserById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    // Validar que id sea string y convertirlo a número
    const userId = typeof id === 'string' ? parseInt(id) : parseInt(id[0]);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario inválido',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    const result = await pool.query(
      `SELECT 
        id, 
        "fullName", 
        email, 
        phone, 
        address, 
        role, 
        "isActive", 
        "createdAt", 
        "updatedAt"
      FROM users 
      WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error('Error en getUserById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// =============================================
// 🔄 CAMBIAR ROL DE USUARIO
// =============================================
export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    // Validar que id sea string y convertirlo a número
    const userId = typeof id === 'string' ? parseInt(id) : parseInt(id[0]);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario inválido',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Validar que el rol sea válido
    if (!role || !['CLIENTE', 'ADMIN'].includes(role)) {
      res.status(400).json({
        success: false,
        message: 'Rol inválido. Debe ser "CLIENTE" o "ADMIN"',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Verificar que el usuario existe
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (existingUser.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Actualizar rol
    const updatedUser = await pool.query(
      `UPDATE users 
       SET role = $1, "updatedAt" = NOW() 
       WHERE id = $2 
       RETURNING 
        id, 
        "fullName", 
        email, 
        phone, 
        address, 
        role, 
        "isActive", 
        "createdAt", 
        "updatedAt"`,
      [role, userId]
    );

    res.json({
      success: true,
      message: `Rol actualizado a ${role}`,
      data: updatedUser.rows[0],
    });
  } catch (error) {
    console.error('Error en updateUserRole:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar rol',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// =============================================
// 🔄 ACTIVAR/DESACTIVAR USUARIO
// =============================================
export const toggleUserActive = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que id sea string y convertirlo a número
    const userId = typeof id === 'string' ? parseInt(id) : parseInt(id[0]);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario inválido',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Verificar que el usuario existe
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (existingUser.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    const user = existingUser.rows[0];

    // No permitir desactivar al propio admin
    if (user.id === req.user?.id) {
      res.status(400).json({
        success: false,
        message: 'No puedes desactivar tu propia cuenta',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Cambiar estado
    const updatedUser = await pool.query(
      `UPDATE users 
       SET "isActive" = $1, "updatedAt" = NOW() 
       WHERE id = $2 
       RETURNING 
        id, 
        "fullName", 
        email, 
        phone, 
        address, 
        role, 
        "isActive", 
        "createdAt", 
        "updatedAt"`,
      [!user.isActive, userId]
    );

    const action = updatedUser.rows[0].isActive ? 'activado' : 'desactivado';

    res.json({
      success: true,
      message: `Usuario ${action} correctamente`,
      data: updatedUser.rows[0],
    });
  } catch (error) {
    console.error('Error en toggleUserActive:', error);
    res.status(500).json({
      success: false,
      message: 'Error al cambiar estado del usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};

// =============================================
// 🗑️ ELIMINAR USUARIO
// =============================================
export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Validar que id sea string y convertirlo a número
    const userId = typeof id === 'string' ? parseInt(id) : parseInt(id[0]);
    
    if (isNaN(userId)) {
      res.status(400).json({
        success: false,
        message: 'ID de usuario inválido',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Verificar que el usuario existe
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    if (existingUser.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    const user = existingUser.rows[0];

    // No permitir eliminar al propio admin
    if (user.id === req.user?.id) {
      res.status(400).json({
        success: false,
        message: 'No puedes eliminar tu propia cuenta',
      });
      return; // ✅ Retornar después de enviar respuesta
    }

    // Eliminar usuario
    await pool.query(
      'DELETE FROM users WHERE id = $1',
      [userId]
    );

    res.json({
      success: true,
      message: `Usuario "${user.fullName}" eliminado correctamente`,
    });
  } catch (error) {
    console.error('Error en deleteUser:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar usuario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
};