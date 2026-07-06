import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { ProductModel } from '../models/Product';

export const getProducts = async (req: AuthRequest, res: Response) => {
  try {
    const products = await ProductModel.findAll();
    res.json({
      success: true,
      data: products
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener productos'
    });
  }
};

export const getProductById = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const product = await ProductModel.findById(id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener producto'
    });
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, price, sku, stock, images, categoryId, isOnSale, discount } = req.body;

    // Validación básica
    if (!name || !description || !price || !sku) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos obligatorios: name, description, price, sku'
      });
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      sku,
      stock: stock || 0,
      images: images || [],
      categoryId,
      isOnSale: isOnSale || false,
      discount: discount || 0
    });

    res.status(201).json({
      success: true,
      message: 'Producto creado exitosamente',
      data: product
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Error al crear producto'
    });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { name, description, price, sku, stock, images, categoryId, isOnSale, discount } = req.body;

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

    res.json({
      success: true,
      message: 'Producto actualizado exitosamente',
      data: updatedProduct
    });
  } catch (error: any) {
    if (error.code === '23505') {
      return res.status(400).json({
        success: false,
        message: 'El SKU ya está registrado'
      });
    }
    res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar producto'
    });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await ProductModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error al eliminar producto'
    });
  }
};
