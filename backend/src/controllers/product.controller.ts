import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ProductModel } from '../models/Product';

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

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    console.log('📦 ===== INICIO DE CREACIÓN DE PRODUCTO =====');
    console.log('📦 Body recibido completo:', JSON.stringify(req.body, null, 2));
    
    const { name, description, price, sku, stock, images, categoryId, isOnSale, discount, tags, variants } = req.body;

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

    if (!name || !description || !price || !sku) {
      console.log('❌ Faltan campos obligatorios');
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, description, price, sku'
      });
    }

    console.log('✅ Validación pasada, creando producto...');

    // ✅ Incluir tags y variants en los datos
    const productData = {
      name,
      description,
      price: Number(price),
      sku,
      stock: stock ? Number(stock) : 0,
      images: images || [],
      categoryId: categoryId ? Number(categoryId) : undefined,
      isOnSale: isOnSale || false,
      discount: discount ? Number(discount) : 0,
      tags: tags || [],
      variants: variants || []
    };

    console.log('📦 Datos a enviar al modelo:', JSON.stringify(productData, null, 2));

    const product = await ProductModel.create(productData);

    console.log('✅ Producto creado exitosamente:', JSON.stringify(product, null, 2));
    console.log('📦 ===== FIN DE CREACIÓN DE PRODUCTO =====');

    return res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
  } catch (error: any) {
    console.error('❌ ===== ERROR EN createProduct =====');
    console.error('❌ Mensaje de error:', error.message);
    console.error('❌ Código de error:', error.code);
    console.error('❌ Detalle completo:', error);
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

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { name, description, price, sku, stock, images, categoryId, isOnSale, discount } = req.body;

    console.log('📦 Actualizando producto ID:', id);
    console.log('📦 Datos de actualización:', { name, description, price, sku, stock, categoryId });

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