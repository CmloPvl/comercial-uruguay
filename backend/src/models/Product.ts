import pool from '../config/database';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: number | null;
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInput {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images?: string[];
  categoryId?: number;
  isOnSale?: boolean;
  discount?: number;
}

export const ProductModel = {
  async findAll(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p."categoryId" = c.id
       WHERE p."isActive" = true
       ORDER BY p.id DESC`
    );
    return result.rows;
  },

  async findById(id: number): Promise<Product | null> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p."categoryId" = c.id
       WHERE p.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async create(product: ProductInput): Promise<Product> {
    const { name, description, price, sku, stock, images, categoryId, isOnSale, discount } = product;
    const result = await pool.query(
      `INSERT INTO products (name, description, price, sku, stock, images, "categoryId", "isOnSale", discount)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING *`,
      [name, description, price, sku, stock, images || [], categoryId || null, isOnSale || false, discount || 0]
    );
    return result.rows[0];
  },

  async update(id: number, product: Partial<ProductInput>): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (product.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(product.name);
    }
    if (product.description !== undefined) {
      fields.push(`description = $${index++}`);
      values.push(product.description);
    }
    if (product.price !== undefined) {
      fields.push(`price = $${index++}`);
      values.push(product.price);
    }
    if (product.sku !== undefined) {
      fields.push(`sku = $${index++}`);
      values.push(product.sku);
    }
    if (product.stock !== undefined) {
      fields.push(`stock = $${index++}`);
      values.push(product.stock);
    }
    if (product.images !== undefined) {
      fields.push(`images = $${index++}`);
      values.push(product.images);
    }
    if (product.categoryId !== undefined) {
      fields.push(`"categoryId" = $${index++}`);
      values.push(product.categoryId);
    }
    if (product.isOnSale !== undefined) {
      fields.push(`"isOnSale" = $${index++}`);
      values.push(product.isOnSale);
    }
    if (product.discount !== undefined) {
      fields.push(`discount = $${index++}`);
      values.push(product.discount);
    }

    if (fields.length === 0) {
      return null;
    }

    fields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE products SET "isActive" = false WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rows.length > 0;
  }
};
