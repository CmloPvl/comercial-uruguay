import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { FavoriteModel } from '../models/Favorite';
import { ProductModel } from '../models/Product';

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const favorites = await FavoriteModel.findByUserId(userId);
    
    return res.json({
      success: true,
      data: favorites
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener favoritos'
    });
  }
};

export const addFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const productId = parseInt(req.params.productId as string);
    
    // Verificar que el producto existe
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Verificar si ya está en favoritos
    const exists = await FavoriteModel.exists(userId, productId);
    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'El producto ya está en favoritos'
      });
    }

    const favorite = await FavoriteModel.add(userId, productId);
    
    return res.status(201).json({
      success: true,
      message: 'Producto agregado a favoritos',
      data: favorite
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al agregar a favoritos'
    });
  }
};

export const removeFavorite = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const productId = parseInt(req.params.productId as string);
    
    const removed = await FavoriteModel.remove(userId, productId);
    
    if (!removed) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado en favoritos'
      });
    }

    return res.json({
      success: true,
      message: 'Producto eliminado de favoritos'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al eliminar de favoritos'
    });
  }
};