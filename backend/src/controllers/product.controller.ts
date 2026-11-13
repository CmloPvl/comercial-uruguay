// 📁 backend/src/controllers/product.controller.ts

/**
 * 📌 CONTROLADOR DE PRODUCTOS
 * 
 * Maneja todas las operaciones relacionadas con productos.
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Logs solo en desarrollo (no en producción)
 * - Respuestas consistentes
 * - Validación y sanitización de query params
 * 
 * 🆕 Soporte para packs promocionales (packPrice, packQuantity)
 * 🆕 Soporte para recortes de imagen (crops)
 * 🆕 Búsqueda con filtros: search + category + minPrice + maxPrice
 */

import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ProductModel } from '../models/Product';

// =============================================
// 📋 OBTENER TODOS LOS PRODUCTOS (con filtros)
// =============================================
export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    // 🆕 Leer query params
    const rawSearch = req.query.search as string | undefined;
    const rawCategory = req.query.category as string | undefined;
    const rawMinPrice = req.query.minPrice as string | undefined;
    const rawMaxPrice = req.query.maxPrice as string | undefined;

    // 🔍 Search: limitar a 100 caracteres (seguridad)
    const search = rawSearch?.trim().slice(0, 100) || undefined;

    // 📂 Category: limitar a 100 caracteres
    const category = rawCategory?.trim().slice(0, 100) || undefined;

    // 💰 Precios: validar que sean números >= 0
    const minPrice = rawMinPrice !== undefined && rawMinPrice !== ''
      ? Number(rawMinPrice)
      : undefined;
    const maxPrice = rawMaxPrice !== undefined && rawMaxPrice !== ''
      ? Number(rawMaxPrice)
      : undefined;

    const validMinPrice = minPrice !== undefined && !isNaN(minPrice) && minPrice >= 0
      ? minPrice
      : undefined;
    const validMaxPrice = maxPrice !== undefined && !isNaN(maxPrice) && maxPrice >= 0
      ? maxPrice
      : undefined;

    // 🐛 Log solo en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      console.log('🔍 [getProducts] Filtros:', {
        search,
        category,
        minPrice: validMinPrice,
        maxPrice: validMaxPrice,
      });
    }

    // 🆕 Llamar al modelo con filtros
    const products = await ProductModel.findAllWithFilters({
      search,
      category,
      minPrice: validMinPrice,
      maxPrice: validMaxPrice,
    });

    return res.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    console.error('❌ Error en getProducts:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener productos',
    });
  }
};

// =============================================
// ⭐ OBTENER PRODUCTOS DESTACADOS
// =============================================
export const getFeaturedProducts = async (_req: AuthRequest, res: Response) => {
  try {
    const products = await ProductModel.findFeatured();
    return res.json({
      success: true,
      data: products
    });
  } catch (error: any) {
    console.error('❌ Error en getFeaturedProducts:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener productos destacados'
    });
  }
};

// =============================================
// 👤 OBTENER PRODUCTO POR ID
// =============================================
export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const product = await ProductModel.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    return res.json({
      success: true,
      data: product
    });
  } catch (error: any) {
    console.error('❌ Error en getProductById:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener producto'
    });
  }
};

// =============================================
// ✨ CREAR PRODUCTO
// =============================================
export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    // 🐛 Logs solo en desarrollo
    if (process.env.NODE_ENV !== 'production') {
      console.log('📦 ===== INICIO DE CREACIÓN DE PRODUCTO =====');
      console.log('📦 Body recibido completo:', JSON.stringify(req.body, null, 2));
    }
    
    const { 
      name, 
      description, 
      price, 
      sku, 
      stock, 
      images, 
      crops,                  // 🆕
      categoryId, 
      isOnSale, 
      discount, 
      tags, 
      variants,
      destacado,
      packPrice,
      packQuantity,
    } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log('📦 Campos extraídos:');
      console.log('  - name:', name);
      console.log('  - description:', description);
      console.log('  - price:', price);
      console.log('  - sku:', sku);
      console.log('  - stock:', stock);
      console.log('  - categoryId:', categoryId);
      console.log('  - isOnSale:', isOnSale);
      console.log('  - discount:', discount);
      console.log('  - tags:', tags);
      console.log('  - variants:', variants);
      console.log('  - destacado:', destacado);
      console.log('  - packPrice:', packPrice);
      console.log('  - packQuantity:', packQuantity);
      console.log('  - images:', images);
      console.log('  - crops:', crops);
    }

    if (!name || !description || !price || !sku) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, description, price, sku'
      });
    }

    const productData = {
      name,
      description,
      price: Number(price),
      sku,
      stock: stock ? Number(stock) : 0,
      images: images || [],
      crops: crops || [],               // 🆕
      categoryId: categoryId ? Number(categoryId) : undefined,
      isOnSale: isOnSale || false,
      discount: discount ? Number(discount) : 0,
      tags: tags || [],
      variants: variants || [],
      destacado: destacado || false,
      packPrice: packPrice ? Number(packPrice) : null,
      packQuantity: packQuantity ? Number(packQuantity) : null,
    };

    const product = await ProductModel.create(productData);

    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Producto creado exitosamente:', JSON.stringify(product, null, 2));
      console.log('📦 ===== FIN DE CREACIÓN DE PRODUCTO =====');
    }

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
    
  } catch (error: any) {
    console.error('❌ ===== ERROR EN createProduct =====');
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Código de error:', error.code);
    console.error('❌ Stack:', error.stack);
    console.error('❌ ===== FIN DEL ERROR =====');
    
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado'
      });
    }
    
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al crear producto'
    });
  }
};

// =============================================
// ✏️ ACTUALIZAR PRODUCTO
// =============================================
export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { 
      name, 
      description, 
      price, 
      sku, 
      stock, 
      images, 
      crops,                  // 🆕
      categoryId, 
      isOnSale, 
      discount,
      destacado,
      packPrice,
      packQuantity,
    } = req.body;

    if (process.env.NODE_ENV !== 'production') {
      console.log('📦 Actualizando producto ID:', id);
      console.log('📦 Datos de actualización:', { name, description, price, sku, stock, categoryId, destacado, packPrice, packQuantity });
      console.log('📦 crops en actualización:', crops);
    }

    const updatedProduct = await ProductModel.update(id, {
      name,
      description,
      price,
      sku,
      stock,
      images,
      crops,                  // 🆕
      categoryId,
      isOnSale,
      discount,
      destacado,
      packPrice: packPrice ? Number(packPrice) : null,
      packQuantity: packQuantity ? Number(packQuantity) : null,
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('✅ Producto actualizado:', updatedProduct);
    }

    return res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error: any) {
    console.error('❌ Error en updateProduct:', error);
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado'
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar producto'
    });
  }
};

// =============================================
// 🗑️ ELIMINAR PRODUCTO
// =============================================
export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const deleted = await ProductModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('🗑️ Producto eliminado ID:', id);
    }

    return res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error: any) {
    console.error('❌ Error en deleteProduct:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al eliminar producto'
    });
  }
};