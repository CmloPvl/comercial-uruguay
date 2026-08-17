// 📁 backend/src/controllers/product.controller.ts

/**
 * 📌 CONTROLADOR DE PRODUCTOS
 * 
 * Maneja todas las operaciones relacionadas con productos:
 * - Obtener todos los productos
 * - Obtener producto por ID
 * - Crear producto
 * - Actualizar producto
 * - Eliminar producto
 * 
 * ✅ Buenas prácticas:
 * - Separación de responsabilidades
 * - Manejo de errores con try/catch
 * - Logs para depuración
 * - Respuestas consistentes
 */

import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ProductModel } from '../models/Product';

// =============================================
// 📋 OBTENER TODOS LOS PRODUCTOS
// =============================================
export const getProducts = async (_req: AuthRequest, res: Response) => {
  try {
    const products = await ProductModel.findAll();
    return res.json({
      success: true,
      data: products
    });
  } catch (error: any) {
    console.error('❌ Error en getProducts:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener productos'
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
    // 🎯 1. LOG: Inicio del proceso
    console.log('📦 ===== INICIO DE CREACIÓN DE PRODUCTO =====');
    
    // 🎯 2. LOG: Mostrar todo el body recibido (para depuración)
    console.log('📦 Body recibido completo:', JSON.stringify(req.body, null, 2));
    
    // 🎯 3. Extraer los campos del body
    // IMPORTANTE: 'images' viene del frontend como un array de URLs
    const { 
      name, 
      description, 
      price, 
      sku, 
      stock, 
      images,        // ← Aquí llega el array de URLs de Supabase
      categoryId, 
      isOnSale, 
      discount, 
      tags, 
      variants 
    } = req.body;

    // 🎯 4. LOG: Verificar cada campo extraído (para depuración)
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
    
    // ✅ 5. LOG ESPECÍFICO DE IMÁGENES (NUEVO)
    // Esto nos dice si 'images' llega correctamente desde el frontend
    console.log('  - images:', images);                              // ✅ Muestra el array completo
    console.log('  - type of images:', typeof images);               // ✅ Debería ser "object"
    console.log('  - images es array:', Array.isArray(images));      // ✅ Debería ser "true"
    console.log('  - cantidad de imágenes:', images?.length || 0);   // ✅ Cuántas imágenes llegaron

    // 🛡️ 6. Validación de campos obligatorios
    if (!name || !description || !price || !sku) {
      console.log('❌ Faltan campos obligatorios');
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, description, price, sku'
      });
    }

    console.log('✅ Validación pasada, creando producto...');

    // 🎯 7. Preparar los datos para el modelo
    // IMPORTANTE: 'images' se pasa como array, el modelo lo convertirá a JSON string
    const productData = {
      name,
      description,
      price: Number(price),
      sku,
      stock: stock ? Number(stock) : 0,
      images: images || [],  // ← Si no hay imágenes, usar array vacío
      categoryId: categoryId ? Number(categoryId) : undefined,
      isOnSale: isOnSale || false,
      discount: discount ? Number(discount) : 0,
      tags: tags || [],
      variants: variants || []
    };

    // 🎯 8. LOG: Ver qué se está enviando al modelo
    console.log('📦 Datos a enviar al modelo:', JSON.stringify(productData, null, 2));
    console.log('📦 images antes de enviar al modelo:', JSON.stringify(images)); // ✅ NUEVO

    // 💾 9. Guardar en la base de datos
    const product = await ProductModel.create(productData);

    // 🎯 10. LOG: Éxito
    console.log('✅ Producto creado exitosamente:', JSON.stringify(product, null, 2));
    console.log('📦 ===== FIN DE CREACIÓN DE PRODUCTO =====');

    // 📤 11. Respuesta exitosa
    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
    
  } catch (error: any) {
    // 🐛 12. Manejo de errores
    console.error('❌ ===== ERROR EN createProduct =====');
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Código de error:', error.code);
    console.error('❌ Detalle completo:', error);
    console.error('❌ Stack:', error.stack);
    console.error('❌ ===== FIN DEL ERROR =====');
    
    // 🔍 13. Errores específicos
    if (error.code === '23505') {
      // Código 23505 = violación de unicidad (SKU duplicado)
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado'
      });
    }
    
    // 📤 14. Error genérico
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
      images,      // ← Array de URLs de Supabase
      categoryId, 
      isOnSale, 
      discount 
    } = req.body;

    console.log('📦 Actualizando producto ID:', id);
    console.log('📦 Datos de actualización:', { name, description, price, sku, stock, categoryId });
    console.log('📦 images en actualización:', images); // ✅ NUEVO

    const updatedProduct = await ProductModel.update(id, {
      name,
      description,
      price,
      sku,
      stock,
      images,
      categoryId,
      isOnSale,
      discount
    });

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    console.log('✅ Producto actualizado:', updatedProduct);

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

    console.log('🗑️ Producto eliminado ID:', id);

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