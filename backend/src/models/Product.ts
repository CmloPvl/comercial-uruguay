// 📁 backend/src/models/Product.ts

/**
 * 📌 MODELO DE PRODUCTOS
 * 
 * Gestiona todas las operaciones de productos en la base de datos:
 * - Obtener todos los productos
 * - Obtener productos destacados
 * - Obtener producto por ID
 * - Crear producto
 * - Actualizar producto
 * - Eliminar producto (soft delete)
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Tipado fuerte con TypeScript
 * - Manejo de arrays como JSON en PostgreSQL
 * - Soft delete (no eliminar realmente)
 * - SQL parametrizado para prevenir inyecciones
 * 
 * 🆕 Soporte para packs promocionales (ej: "3 por $1000")
 * 🆕 packPrice y packQuantity aceptan null (para borrar pack)
 */

import pool from '../config/database';

// =============================================
// 📋 INTERFACES
// =============================================

/**
 * Interfaz que representa un producto completo
 * Coincide con la estructura de la tabla 'products'
 */
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
  tags: string[];
  variants: string[];
  destacado: boolean;
  packPrice: number | null;
  packQuantity: number | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interfaz para crear/actualizar un producto
 * Todos los campos son opcionales excepto los obligatorios
 * 
 * 🆕 packPrice y packQuantity aceptan null para permitir "borrar" el pack
 */
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
  tags?: string[];
  variants?: string[];
  destacado?: boolean;
  packPrice?: number | null;       // 🆕 Acepta null (borrar pack)
  packQuantity?: number | null;    // 🆕 Acepta null (borrar pack)
}

// =============================================
// 📦 MODELO
// =============================================

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

  async findFeatured(): Promise<Product[]> {
    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p."categoryId" = c.id
       WHERE p."isActive" = true AND p.destacado = true
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
    const { 
      name, 
      description, 
      price, 
      sku, 
      stock, 
      images, 
      categoryId, 
      isOnSale, 
      discount,
      tags,
      variants,
      destacado,
      packPrice,
      packQuantity,
    } = product;
    
    const imagesJson = images && images.length > 0 ? JSON.stringify(images) : '[]';
    const tagsJson = tags && tags.length > 0 ? JSON.stringify(tags) : '[]';
    const variantsJson = variants && variants.length > 0 ? JSON.stringify(variants) : '[]';
    
    const result = await pool.query(
      `INSERT INTO products (
        name, 
        description, 
        price, 
        sku, 
        stock, 
        images, 
        "categoryId", 
        "isOnSale", 
        discount,
        tags,
        variants,
        destacado,
        "packPrice",
        "packQuantity"
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        name, 
        description, 
        price, 
        sku, 
        stock, 
        imagesJson,
        categoryId || null, 
        isOnSale || false, 
        discount || 0,
        tagsJson,
        variantsJson,
        destacado || false,
        packPrice ?? null,        // 🆕 null si undefined
        packQuantity ?? null,     // 🆕 null si undefined
      ]
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
      values.push(JSON.stringify(product.images));
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
    if (product.tags !== undefined) {
      fields.push(`tags = $${index++}`);
      values.push(JSON.stringify(product.tags));
    }
    if (product.variants !== undefined) {
      fields.push(`variants = $${index++}`);
      values.push(JSON.stringify(product.variants));
    }
    if (product.destacado !== undefined) {
      fields.push(`destacado = $${index++}`);
      values.push(product.destacado);
    }
    // 🆕 packPrice: acepta number o null
    if (product.packPrice !== undefined) {
      fields.push(`"packPrice" = $${index++}`);
      values.push(product.packPrice);
    }
    // 🆕 packQuantity: acepta number o null
    if (product.packQuantity !== undefined) {
      fields.push(`"packQuantity" = $${index++}`);
      values.push(product.packQuantity);
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