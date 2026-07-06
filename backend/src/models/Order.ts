import pool from '../config/database';

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  total: number;
  status: string;
  deliveryOption: string;
  whatsappMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface OrderWithItems extends Order {
  items: Omit<OrderItem, 'orderId'>[];
}

export const OrderModel = {
  generateOrderNumber(): string {
    const now = new Date();
    const year = now.getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `ORD-${year}-${random}`;
  },

  async createOrderFromCart(
    userId: number, 
    cartId: number, 
    deliveryOption: string, 
    whatsappMessage?: string
  ): Promise<OrderWithItems> {
    const cartItems = await pool.query(
      `SELECT 
        ci."productId",
        ci.quantity,
        p.price as "unitPrice",
        (ci.quantity * p.price) as "subtotal"
       FROM cart_items ci
       JOIN products p ON ci."productId" = p.id
       WHERE ci."cartId" = $1`,
      [cartId]
    );

    if (cartItems.rows.length === 0) {
      throw new Error('El carrito está vacío');
    }

    const total = cartItems.rows.reduce((sum: number, item: any) => sum + parseFloat(item.subtotal), 0);
    const orderNumber = this.generateOrderNumber();

    const orderResult = await pool.query(
      `INSERT INTO orders ("orderNumber", "userId", total, "deliveryOption", "whatsappMessage")
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [orderNumber, userId, total, deliveryOption, whatsappMessage || null]
    );

    const order = orderResult.rows[0];
    const items: OrderItem[] = [];

    for (const item of cartItems.rows) {
      const itemResult = await pool.query(
        `INSERT INTO order_items ("orderId", "productId", quantity, "unitPrice", "subtotal")
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [order.id, item.productId, item.quantity, item.unitPrice, item.subtotal]
      );
      items.push(itemResult.rows[0]);

      await pool.query(
        `UPDATE products SET stock = stock - $1 WHERE id = $2`,
        [item.quantity, item.productId]
      );
    }

    await pool.query(
      `DELETE FROM cart_items WHERE "cartId" = $1`,
      [cartId]
    );

    return {
      ...order,
      items: items.map(({ orderId, ...item }) => item)
    };
  },

  async findByUserId(userId: number): Promise<Order[]> {
    const result = await pool.query(
      `SELECT * FROM orders WHERE "userId" = $1 ORDER BY "createdAt" DESC`,
      [userId]
    );
    return result.rows;
  },

  async findByIdWithItems(orderId: number, userId?: number): Promise<OrderWithItems | null> {
    let query = `
      SELECT o.*, 
        json_agg(
          json_build_object(
            'productId', oi."productId",
            'name', p.name,
            'quantity', oi.quantity,
            'unitPrice', oi."unitPrice",
            'subtotal', oi.subtotal
          )
        ) as items
      FROM orders o
      JOIN order_items oi ON o.id = oi."orderId"
      JOIN products p ON oi."productId" = p.id
      WHERE o.id = $1
    `;
    const params: any[] = [orderId];

    if (userId) {
      query += ` AND o."userId" = $2`;
      params.push(userId);
    }

    query += ` GROUP BY o.id`;

    const result = await pool.query(query, params);
    return result.rows[0] || null;
  },

  async findAll(): Promise<any[]> {
    const result = await pool.query(
      `SELECT o.*, u."fullName" as user_name, u.email as user_email
       FROM orders o
       JOIN users u ON o."userId" = u.id
       ORDER BY o."createdAt" DESC`
    );
    return result.rows;
  },

  async updateStatus(orderId: number, status: string): Promise<boolean> {
    const validStatuses = ['RECIBIDO', 'REVISION', 'CONFIRMADO', 'ENVIADO', 'ENTREGADO', 'CANCELADO'];
    if (!validStatuses.includes(status)) {
      throw new Error('Estado no válido');
    }

    const result = await pool.query(
      `UPDATE orders SET status = $1, "updatedAt" = CURRENT_TIMESTAMP WHERE id = $2 RETURNING id`,
      [status, orderId]
    );
    return result.rows.length > 0;
  },

  async belongsToUser(orderId: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      `SELECT id FROM orders WHERE id = $1 AND "userId" = $2`,
      [orderId, userId]
    );
    return result.rows.length > 0;
  }
};