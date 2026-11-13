// 📁 backend/src/models/Product.ts

/**
 * 📌 MODELO DE PRODUCTOS
 * 
 * Gestiona todas las operaciones de productos en la base de datos:
 * - Obtener todos los productos
 * - Buscar productos con filtros (search + category + price)
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
 * - DRY: findAll() reutiliza findAllWithFilters({})
 * 
 * 🆕 Soporte para packs promocionales
 * 🆕 Soporte para recortes de imagen (crops)
 * 🆕 Búsqueda con filtros dinámicos (search + category + price)
 * 
 * 📝 Deuda técnica futura:
 * - Índice GIN + pg_trgm en `name` para búsquedas ILIKE rápidas (>5000 productos)
 * - ORDER BY configurable (precio, nombre, fecha)
 */

import pool from '../config/database';

// =============================================
// 📋 INTERFACES
// =============================================

/**
 * 🆕 Interfaz para el recorte de una imagen
 */
export interface CropData {
  x: number;
  y: number;
  zoom: number;
  aspect: number;
}

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
  crops: CropData[];          // 🆕 Array de recortes
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
 * 🆕 crops: opcional, array de recortes
 */
export interface ProductInput {
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  images?: string[];
  crops?: CropData[];              // 🆕
  categoryId?: number;
  isOnSale?: boolean;
  discount?: number;
  tags?: string[];
  variants?: string[];
  destacado?: boolean;
  packPrice?: number | null;
  packQuantity?: number | null;
}

/**
 * 🆕 Filtros para búsqueda de productos
 */
export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

// =============================================
// 📦 MODELO
// =============================================

export const ProductModel = {
  /**
   * 📋 Obtener todos los productos activos
   * 
   * Reutiliza findAllWithFilters({}) para mantener una sola fuente de verdad (DRY).
   */
  async findAll(): Promise<Product[]> {
    return this.findAllWithFilters({});
  },

  /**
   * 🆕 Buscar productos con filtros (search + category + price)
   * 
   * Construye el SQL dinámicamente según los filtros recibidos.
   * Solo busca en `name` (por ahora). Escalable a `description` + `tags`.
   * 
   * @param filters - { search?, category?, minPrice?, maxPrice? }
   * @returns Product[]
   */
  async findAllWithFilters(filters: ProductFilters): Promise<Product[]> {
    const conditions: string[] = ['p."isActive" = true'];
    const values: any[] = [];
    let index = 1;

    // 🔍 Búsqueda por nombre (ILIKE = case-insensitive)
    if (filters.search && filters.search.trim() !== '') {
      conditions.push(`p.name ILIKE $${index++}`);
      values.push(`%${filters.search.trim()}%`);
    }

    // 📂 Filtro por categoría (por nombre)
    if (filters.category && filters.category.trim() !== '') {
      conditions.push(`c.name ILIKE $${index++}`);
      values.push(filters.category.trim());
    }

    // 💰 Filtro por precio mínimo
    if (filters.minPrice !== undefined && filters.minPrice !== null) {
      conditions.push(`p.price >= $${index++}`);
      values.push(filters.minPrice);
    }

    // 💰 Filtro por precio máximo
    if (filters.maxPrice !== undefined && filters.maxPrice !== null) {
      conditions.push(`p.price <= $${index++}`);
      values.push(filters.maxPrice);
    }

    const whereClause = conditions.join(' AND ');

    const result = await pool.query(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p."categoryId" = c.id
       WHERE ${whereClause}
       ORDER BY p.id DESC`,
      values
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
      crops,                     // 🆕
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
    const cropsJson = crops && crops.length > 0 ? JSON.stringify(crops) : '[]';  // 🆕
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
        crops,                   -- 🆕
        "categoryId", 
        "isOnSale", 
        discount,
        tags,
        variants,
        destacado,
        "packPrice",
        "packQuantity"
      )
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING *`,
      [
        name, 
        description, 
        price, 
        sku, 
        stock, 
        imagesJson,
        cropsJson,               // 🆕
        categoryId || null, 
        isOnSale || false, 
        discount || 0,
        tagsJson,
        variantsJson,
        destacado || false,
        packPrice ?? null,
        packQuantity ?? null,
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
    // 🆕 crops
    if (product.crops !== undefined) {
      fields.push(`crops = $${index++}`);
      values.push(JSON.stringify(product.crops));
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
    if (product.packPrice !== undefined) {
      fields.push(`"packPrice" = $${index++}`);
      values.push(product.packPrice);
    }
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