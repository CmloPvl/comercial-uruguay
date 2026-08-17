// 📁 backend/src/models/Product.ts

/**
 * 📌 MODELO DE PRODUCTOS
 * 
 * Gestiona todas las operaciones de productos en la base de datos:
 * - Obtener todos los productos
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
  images: string[];          // ✅ Array de URLs de Supabase (guardado como JSON en DB)
  categoryId: number | null;
  isActive: boolean;
  isOnSale: boolean;
  discount: number;
  tags: string[];            // ✅ Array de tags (guardado como JSON en DB)
  variants: string[];        // ✅ Array de variantes (guardado como JSON en DB)
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interfaz para crear/actualizar un producto
 * Todos los campos son opcionales excepto los obligatorios
 */
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images?: string[];         // ✅ Opcional, se guarda como JSON string
  categoryId?: number;
  isOnSale?: boolean;
  discount?: number;
  tags?: string[];           // ✅ Opcional, se guarda como JSON string
  variants?: string[];       // ✅ Opcional, se guarda como JSON string
}

// =============================================
// 📦 MODELO
// =============================================

export const ProductModel = {
  /**
   * 📋 OBTENER TODOS LOS PRODUCTOS ACTIVOS
   * 
   * Devuelve todos los productos con isActive = true
   * Incluye el nombre de la categoría (LEFT JOIN)
   * Ordenados por ID descendente (más recientes primero)
   */
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

  /**
   * 👤 OBTENER PRODUCTO POR ID
   * 
   * Devuelve un producto específico por su ID
   * Incluye el nombre de la categoría
   * Retorna null si no existe
   */
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

  /**
   * ✨ CREAR PRODUCTO
   * 
   * Inserta un nuevo producto en la base de datos
   * Convierte arrays (images, tags, variants) a JSON string para PostgreSQL
   * 
   * 📝 IMPORTANTE:
   * - images: array de URLs de Supabase
   * - tags: array de strings
   * - variants: array de strings
   * 
   * 🎯 Ejemplo de images:
   *   images = ["https://xyz.supabase.co/.../imagen1.jpg"]
   *   → imagesJson = '["https://xyz.supabase.co/.../imagen1.jpg"]'
   */
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
      variants
    } = product;
    
    // ✅ Convertir arrays a JSON string para PostgreSQL
    // Si el array está vacío o no existe, usar '[]'
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
        variants
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
       RETURNING *`,
      [
        name, 
        description, 
        price, 
        sku, 
        stock, 
        imagesJson,          // ✅ JSON string (ej: '["url1","url2"]')
        categoryId || null, 
        isOnSale || false, 
        discount || 0,
        tagsJson,            // ✅ JSON string (ej: '["tag1","tag2"]')
        variantsJson         // ✅ JSON string (ej: '["variante1","variante2"]')
      ]
    );
    return result.rows[0];
  },

  /**
   * ✏️ ACTUALIZAR PRODUCTO
   * 
   * Actualiza un producto existente
   * Solo actualiza los campos que vienen en el objeto
   * Convierte arrays a JSON string para PostgreSQL
   * 
   * ⚠️ IMPORTANTE:
   * - Si no se envía un campo, no se actualiza
   * - `undefined` significa "no actualizar"
   * - `null` significa "poner null en la base de datos"
   */
  async update(id: number, product: Partial<ProductInput>): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    // 🔍 Construir dinámicamente la consulta SQL
    // Solo se actualizan los campos que vienen en el objeto
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
    // ✅ images: convertir a JSON string
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
    // ✅ tags: convertir a JSON string
    if (product.tags !== undefined) {
      fields.push(`tags = $${index++}`);
      values.push(JSON.stringify(product.tags));
    }
    // ✅ variants: convertir a JSON string
    if (product.variants !== undefined) {
      fields.push(`variants = $${index++}`);
      values.push(JSON.stringify(product.variants));
    }

    // Si no hay campos para actualizar, retornar null
    if (fields.length === 0) {
      return null;
    }

    // ✅ Actualizar timestamp de modificación
    fields.push(`"updatedAt" = CURRENT_TIMESTAMP`);
    values.push(id);

    const result = await pool.query(
      `UPDATE products SET ${fields.join(', ')} WHERE id = $${index} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  },

  /**
   * 🗑️ ELIMINAR PRODUCTO (SOFT DELETE)
   * 
   * No elimina realmente el producto, solo lo desactiva
   * Cambia isActive a false para que no aparezca en la tienda
   * El producto permanece en la base de datos (para historial)
   * 
   * ✅ Soft delete vs Hard delete:
   * - Soft delete: marcar como inactivo (recuperable)
   * - Hard delete: eliminar físicamente (no recuperable)
   */
  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE products SET "isActive" = false WHERE id = $1 RETURNING id`,
      [id]
    );
    return result.rows.length > 0;
  }
};