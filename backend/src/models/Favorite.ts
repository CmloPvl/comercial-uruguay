import pool from '../config/database';

export interface Favorite {
  id: number;
  userId: number;
  productId: number;
  createdAt: Date;
}

export interface FavoriteWithProduct {
  id: number;
  userId: number;
  productId: number;
  createdAt: Date;
  product: {
    id: number;
    name: string;
    price: number;
    images?: string[];
  };
}

export const FavoriteModel = {
  // Obtener favoritos de un usuario
  async findByUserId(userId: number): Promise<FavoriteWithProduct[]> {
    const result = await pool.query(
      `SELECT 
        f.id,
        f."userId",
        f."productId",
        f."createdAt",
        p.id as "product_id",
        p.name as "product_name",
        p.price as "product_price",
        p.images as "product_images"
       FROM favorites f
       JOIN products p ON f."productId" = p.id
       WHERE f."userId" = $1
       ORDER BY f."createdAt" DESC`,
      [userId]
    );

    return result.rows.map(row => ({
      id: row.id,
      userId: row.userId,
      productId: row.productId,
      createdAt: row.createdAt,
      product: {
        id: row.product_id,
        name: row.product_name,
        price: parseFloat(row.product_price),
        images: row.product_images || []
      }
    }));
  },

  // Verificar si un producto está en favoritos
  async exists(userId: number, productId: number): Promise<boolean> {
    const result = await pool.query(
      `SELECT id FROM favorites WHERE "userId" = $1 AND "productId" = $2`,
      [userId, productId]
    );
    return result.rows.length > 0;
  },

  // Agregar a favoritos
  async add(userId: number, productId: number): Promise<Favorite> {
    const result = await pool.query(
      `INSERT INTO favorites ("userId", "productId")
       VALUES ($1, $2)
       RETURNING *`,
      [userId, productId]
    );
    return result.rows[0];
  },

  // Eliminar de favoritos
  async remove(userId: number, productId: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM favorites WHERE "userId" = $1 AND "productId" = $2 RETURNING id`,
      [userId, productId]
    );
    return result.rows.length > 0;
  }
};