import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { CartModel } from '../models/Cart';
import { ProductModel } from '../models/Product';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const cart = await CartModel.getCartWithItems(userId);
    return res.json({
      success: true,
      data: cart
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener carrito'
    });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Producto y cantidad son requeridos'
      });
    }

    const product = await ProductModel.findById(parseInt(productId as string));
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente. Disponible: ${product.stock}`
      });
    }

    const cartId = await CartModel.getOrCreateCart(userId);
    await CartModel.addItem(cartId, parseInt(productId as string), quantity);

    return res.json({
      success: true,
      message: 'Producto agregado al carrito',
      data: {
        productId: parseInt(productId as string),
        quantity,
        subtotal: product.price * quantity
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al agregar al carrito'
    });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const productId = parseInt(req.params.productId as string);
    const { quantity } = req.body;

    if (!quantity || quantity < 0) {
      return res.status(400).json({
        success: false,
        message: 'Cantidad inválida'
      });
    }

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Stock insuficiente. Disponible: ${product.stock}`
      });
    }

    const cartId = await CartModel.getOrCreateCart(userId);
    const updated = await CartModel.updateItemQuantity(cartId, productId, quantity);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado en el carrito'
      });
    }

    return res.json({
      success: true,
      message: 'Cantidad actualizada',
      data: {
        productId,
        quantity,
        subtotal: product.price * quantity
      }
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar carrito'
    });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const productId = parseInt(req.params.productId as string);
    const cartId = await CartModel.getOrCreateCart(userId);
    const removed = await CartModel.removeItem(cartId, productId);

    if (!removed) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado en el carrito'
      });
    }

    return res.json({
      success: true,
      message: 'Producto eliminado del carrito'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al eliminar del carrito'
    });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const cartId = await CartModel.getOrCreateCart(userId);
    await CartModel.clearCart(cartId);

    return res.json({
      success: true,
      message: 'Carrito vaciado exitosamente'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al vaciar carrito'
    });
  }
};