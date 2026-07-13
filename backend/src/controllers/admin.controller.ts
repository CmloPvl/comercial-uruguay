import { Request, Response } from 'express';
import pool from '../config/database';

// =============================================
// ESTADÍSTICAS DEL DASHBOARD
// =============================================
export const getDashboardStats = async (_req: Request, res: Response) => {
  try {
    // Obtener total de productos activos
    const productsResult = await pool.query(
      'SELECT COUNT(*) as total FROM products WHERE "isActive" = true'
    );

    // Obtener total de pedidos
    const ordersResult = await pool.query(
      'SELECT COUNT(*) as total FROM orders'
    );

    // Obtener total de usuarios activos
    const usersResult = await pool.query(
      'SELECT COUNT(*) as total FROM users WHERE "isActive" = true'
    );

    // Obtener pedidos pendientes (RECIBIDO, REVISION)
    const pendingOrdersResult = await pool.query(
      'SELECT COUNT(*) as total FROM orders WHERE status IN ($1, $2)',
      ['RECIBIDO', 'REVISION']
    );

    // Obtener ventas totales del mes
    const salesResult = await pool.query(
      `SELECT COALESCE(SUM(total), 0) as total 
       FROM orders 
       WHERE EXTRACT(MONTH FROM "createdAt") = EXTRACT(MONTH FROM CURRENT_DATE)
       AND EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM CURRENT_DATE)
       AND status != 'CANCELADO'`
    );

    return res.json({
      success: true,
      data: {
        totalProducts: parseInt(productsResult.rows[0]?.total || '0'),
        totalOrders: parseInt(ordersResult.rows[0]?.total || '0'),
        totalUsers: parseInt(usersResult.rows[0]?.total || '0'),
        pendingOrders: parseInt(pendingOrdersResult.rows[0]?.total || '0'),
        monthlySales: parseInt(salesResult.rows[0]?.total || '0'),
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener estadísticas',
      error: error.message
    });
  }
};

// =============================================
// OBTENER ÚLTIMOS PEDIDOS
// =============================================
export const getRecentOrders = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;

    const result = await pool.query(
      `SELECT 
        o.id,
        o."orderNumber",
        o.total,
        o.status,
        o."createdAt",
        u."fullName" as user_name,
        u.email as user_email
       FROM orders o
       JOIN users u ON o."userId" = u.id
       ORDER BY o."createdAt" DESC
       LIMIT $1`,
      [limit]
    );

    return res.json({
      success: true,
      data: result.rows
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener pedidos recientes',
      error: error.message
    });
  }
};

// =============================================
// LISTAR TODOS LOS PRODUCTOS (ADMIN)
// =============================================
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const search = req.query.search as string || '';

    let query = `
      SELECT 
        p.*,
        c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p."categoryId" = c.id
      WHERE p."isActive" = true
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (search) {
      query += ` AND (p.name ILIKE $${paramIndex} OR p.sku ILIKE $${paramIndex})`;
      params.push(`%${search}%`);
      paramIndex++;
    }

    query += ` ORDER BY p."createdAt" DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Obtener total para paginación
    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM products WHERE "isActive" = true`
    );

    return res.json({
      success: true,
      data: {
        products: result.rows,
        pagination: {
          total: parseInt(countResult.rows[0]?.total || '0'),
          page,
          limit,
          totalPages: Math.ceil(parseInt(countResult.rows[0]?.total || '0') / limit)
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

// =============================================
// OBTENER TODOS LOS PEDIDOS (ADMIN)
// =============================================
export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = (page - 1) * limit;
    const status = req.query.status as string || '';

    let query = `
      SELECT 
        o.*,
        u."fullName" as user_name,
        u.email as user_email
      FROM orders o
      JOIN users u ON o."userId" = u.id
      WHERE 1=1
    `;
    const params: any[] = [];
    let paramIndex = 1;

    if (status) {
      query += ` AND o.status = $${paramIndex}`;
      params.push(status);
      paramIndex++;
    }

    query += ` ORDER BY o."createdAt" DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
    params.push(limit, offset);

    const result = await pool.query(query, params);

    // Obtener total para paginación
    const countResult = await pool.query(
      `SELECT COUNT(*) as total FROM orders`
    );

    return res.json({
      success: true,
      data: {
        orders: result.rows,
        pagination: {
          total: parseInt(countResult.rows[0]?.total || '0'),
          page,
          limit,
          totalPages: Math.ceil(parseInt(countResult.rows[0]?.total || '0') / limit)
        }
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al obtener pedidos',
      error: error.message
    });
  }
};

// =============================================
// CAMBIAR ESTADO DE PEDIDO (ADMIN)
// =============================================
export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['RECIBIDO', 'REVISION', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado no válido. Estados permitidos: ' + validStatuses.join(', ')
      });
    }

    const result = await pool.query(
      `UPDATE orders 
       SET status = $1, "updatedAt" = NOW()
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    return res.json({
      success: true,
      message: 'Estado del pedido actualizado',
      data: result.rows[0]
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar estado del pedido',
      error: error.message
    });
  }
};