import pool from '../config/database';

export interface Category {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  createdAt: Date;
}

export interface CategoryInput {
  name: string;
  description?: string;
  icon?: string;
}

export const CategoryModel = {
  async findAll(): Promise<Category[]> {
    const result = await pool.query(
      `SELECT * FROM categories ORDER BY name ASC`
    );
    return result.rows;
  },

  async findById(id: number): Promise<Category | null> {
    const result = await pool.query(
      `SELECT * FROM categories WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  },

  async findByName(name: string): Promise<Category | null> {
    const result = await pool.query(
      `SELECT * FROM categories WHERE name = $1`,
      [name]
    );
    return result.rows[0] || null;
  },

  async create(category: CategoryInput): Promise<Category> {
    const { name, description, icon } = category;
    const result = await pool.query(
      `INSERT INTO categories (name, description, icon)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, description || null, icon || null]
    );
    return result.rows[0];
  },

  async update(id: number, category: Partial<CategoryInput>): Promise<Category | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (category.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(category.name);
    }
    if (category.description !== undefined) {
      fields.push(`description = $${index++}`);
      values.push(category.description);
    }
    if (category.icon !== undefined) {
      fields.push(`icon = $${index++}`);
      values.push(category.icon);
    }

    if (fields.length === 0) {
      return null;
    }

    values.push(id);

    const result = await pool.query(
      `UPDATE categories SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM categories WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rows.length > 0;
  }
};
