import pool from '../config/database';

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface CartWithItems {
  id: number;
  userId: number;
  items: {
    productId: number;
    name: string;
    price: number;
    quantity: number;
    subtotal: number;
    image?: string;
  }[];
  totalItems: number;
  total: number;
}

export const CartModel = {
  // Obtener o crear carrito del usuario
  async getOrCreateCart(userId: number): Promise<number> {
    let result = await pool.query(
      `SELECT id FROM carts WHERE "userId" = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO carts ("userId") VALUES ($1) RETURNING id`,
        [userId]
      );
    }

    return result.rows[0].id;
  },

  // Obtener carrito con items
  async getCartWithItems(userId: number): Promise<CartWithItems | null> {
    const cartId = await this.getOrCreateCart(userId);

    const itemsResult = await pool.query(
      `SELECT 
        ci."productId",
        p.name,
        p.price,
        ci.quantity,
        (ci.quantity * p.price) as subtotal,
        p.images as image
       FROM cart_items ci
       JOIN products p ON ci."productId" = p.id
       WHERE ci."cartId" = $1`,
      [cartId]
    );

    const items = itemsResult.rows.map(row => ({
      productId: row.productId,
      name: row.name,
      price: parseFloat(row.price),
      quantity: row.quantity,
      subtotal: parseFloat(row.subtotal),
      image: row.image?.[0] || null
    }));

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return {
      id: cartId,
      userId,
      items,
      totalItems,
      total
    };
  },

  // Agregar producto al carrito
  async addItem(cartId: number, productId: number, quantity: number): Promise<void> {
    // Verificar si el producto ya está en el carrito
    const existing = await pool.query(
      `SELECT id, quantity FROM cart_items WHERE "cartId" = $1 AND "productId" = $2`,
      [cartId, productId]
    );

    if (existing.rows.length > 0) {
      const newQuantity = existing.rows[0].quantity + quantity;
      await pool.query(
        `UPDATE cart_items SET quantity = $1 WHERE id = $2`,
        [newQuantity, existing.rows[0].id]
      );
    } else {
      await pool.query(
        `INSERT INTO cart_items ("cartId", "productId", quantity) VALUES ($1, $2, $3)`,
        [cartId, productId, quantity]
      );
    }
  },

  // Actualizar cantidad de un item
  async updateItemQuantity(cartId: number, productId: number, quantity: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE cart_items SET quantity = $1 
       WHERE "cartId" = $2 AND "productId" = $3 
       RETURNING id`,
      [quantity, cartId, productId]
    );
    return result.rows.length > 0;
  },

  // Eliminar item del carrito
  async removeItem(cartId: number, productId: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM cart_items WHERE "cartId" = $1 AND "productId" = $2 RETURNING id`,
      [cartId, productId]
    );
    return result.rows.length > 0;
  },

  // Vaciar carrito
  async clearCart(cartId: number): Promise<void> {
    await pool.query(
      `DELETE FROM cart_items WHERE "cartId" = $1`,
      [cartId]
    );
  }
};
