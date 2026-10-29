// 📁 backend/src/models/Cart.ts

/**
 * 📌 MODELO DE CARRITO
 * 
 * Gestiona todas las operaciones del carrito en la base de datos:
 * - Obtener o crear carrito del usuario
 * - Obtener carrito con items (y sus subtotales)
 * - Agregar producto
 * - Actualizar cantidad
 * - Eliminar producto
 * - Vaciar carrito
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Tipado fuerte con TypeScript
 * - SQL parametrizado (previene inyecciones)
 * - Cálculo de subtotales delegado a utils/calculateSubtotal
 * - Comentarios explicativos
 * 
 * 🆕 Soporte para packs promocionales:
 *   - El cálculo vive en utils/calculateSubtotal (una sola fuente de verdad)
 *   - Si el cliente lleva 3+ unidades con pack, se cobra el pack
 */

import pool from '../config/database';
import { calculateSubtotal } from '../utils/calculateSubtotal';  // 🆕 Importar helper

// =============================================
// 📋 INTERFACES
// =============================================

/**
 * Item individual del carrito (tal como está en la BD)
 */
export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

/**
 * Carrito completo con items y totales
 * Coincide con lo que devuelve la API al frontend
 */
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
    packPrice: number | null;       // Precio del pack (null si no hay)
    packQuantity: number | null;    // Cantidad del pack (null si no hay)
    packApplied: boolean;           // ¿Se aplicó el pack en este item?
  }[];
  totalItems: number;
  total: number;
}

// =============================================
// 📦 MODELO
// =============================================

export const CartModel = {
  /**
   * 🔍 OBTENER O CREAR CARRITO
   * 
   * Busca el carrito del usuario.
   * Si no existe, lo crea automáticamente.
   * 
   * @param userId - ID del usuario
   * @returns ID del carrito
   */
  async getOrCreateCart(userId: number): Promise<number> {
    // 🔍 Buscar carrito existente
    let result = await pool.query(
      `SELECT id FROM carts WHERE "userId" = $1`,
      [userId]
    );

    // ✅ Si no existe, crearlo
    if (result.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO carts ("userId") VALUES ($1) RETURNING id`,
        [userId]
      );
    }

    return result.rows[0].id;
  },

  /**
   * 📦 OBTENER CARRITO CON ITEMS
   * 
   * Devuelve el carrito completo con:
   * - Items (nombre, precio, cantidad, imagen)
   * - Datos del pack (packPrice, packQuantity)
   * - Subtotal calculado (con packs si aplica)
   * - Total general
   * 
   * 🆕 El subtotal se calcula con el helper compartido.
   * 
   * @param userId - ID del usuario
   * @returns Carrito con items y totales
   */
  async getCartWithItems(userId: number): Promise<CartWithItems | null> {
    const cartId = await this.getOrCreateCart(userId);

    // Traer packPrice y packQuantity del producto
    const itemsResult = await pool.query(
      `SELECT 
        ci."productId",
        p.name,
        p.price,
        ci.quantity,
        p.images as image,
        p."packPrice",
        p."packQuantity"
       FROM cart_items ci
       JOIN products p ON ci."productId" = p.id
       WHERE ci."cartId" = $1`,
      [cartId]
    );

    // Calcular subtotal con packs (helper compartido)
    const items = itemsResult.rows.map(row => {
      const price = parseFloat(row.price);
      const packPrice = row.packPrice ? parseFloat(row.packPrice) : null;
      const packQuantity = row.packQuantity || null;
      const quantity = row.quantity;
      
      const subtotal = calculateSubtotal(price, quantity, packPrice, packQuantity);
      const packApplied = !!(packPrice && packQuantity && quantity >= packQuantity);

      // Extraer primera imagen del array (Supabase devuelve JSONB)
      const imagesArray = row.image || [];
      const firstImage = Array.isArray(imagesArray) ? imagesArray[0] : null;

      return {
        productId: row.productId,
        name: row.name,
        price,
        quantity,
        subtotal,
        image: firstImage,
        packPrice,
        packQuantity,
        packApplied,
      };
    });

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

  /**
   * ➕ AGREGAR PRODUCTO AL CARRITO
   * 
   * Si el producto ya está en el carrito → suma la cantidad.
   * Si no está → lo agrega con la cantidad indicada.
   * 
   * @param cartId - ID del carrito
   * @param productId - ID del producto
   * @param quantity - Cantidad a agregar
   */
  async addItem(cartId: number, productId: number, quantity: number): Promise<void> {
    // 🔍 Verificar si el producto ya está en el carrito
    const existing = await pool.query(
      `SELECT id, quantity FROM cart_items WHERE "cartId" = $1 AND "productId" = $2`,
      [cartId, productId]
    );

    if (existing.rows.length > 0) {
      // ✅ Ya existe → sumar cantidad
      const newQuantity = existing.rows[0].quantity + quantity;
      await pool.query(
        `UPDATE cart_items SET quantity = $1 WHERE id = $2`,
        [newQuantity, existing.rows[0].id]
      );
    } else {
      // ✅ No existe → crear item nuevo
      await pool.query(
        `INSERT INTO cart_items ("cartId", "productId", quantity) VALUES ($1, $2, $3)`,
        [cartId, productId, quantity]
      );
    }
  },

  /**
   * ✏️ ACTUALIZAR CANTIDAD DE UN ITEM
   * 
   * Reemplaza la cantidad (no suma).
   * 
   * @param cartId - ID del carrito
   * @param productId - ID del producto
   * @param quantity - Nueva cantidad
   * @returns true si se actualizó, false si no existía
   */
  async updateItemQuantity(cartId: number, productId: number, quantity: number): Promise<boolean> {
    const result = await pool.query(
      `UPDATE cart_items SET quantity = $1 
       WHERE "cartId" = $2 AND "productId" = $3 
       RETURNING id`,
      [quantity, cartId, productId]
    );
    return result.rows.length > 0;
  },

  /**
   * 🗑️ ELIMINAR PRODUCTO DEL CARRITO
   * 
   * @param cartId - ID del carrito
   * @param productId - ID del producto
   * @returns true si se eliminó, false si no existía
   */
  async removeItem(cartId: number, productId: number): Promise<boolean> {
    const result = await pool.query(
      `DELETE FROM cart_items WHERE "cartId" = $1 AND "productId" = $2 RETURNING id`,
      [cartId, productId]
    );
    return result.rows.length > 0;
  },

  /**
   * 🗑️ VACIAR CARRITO
   * 
   * Elimina todos los items del carrito.
   * 
   * @param cartId - ID del carrito
   */
  async clearCart(cartId: number): Promise<void> {
    await pool.query(
      `DELETE FROM cart_items WHERE "cartId" = $1`,
      [cartId]
    );
  }
};