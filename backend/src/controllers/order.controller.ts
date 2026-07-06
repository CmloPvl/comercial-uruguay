import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { OrderModel } from '../models/Order';
import { CartModel } from '../models/Cart';

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const { deliveryOption, whatsappMessage } = req.body;

    if (!deliveryOption) {
      return res.status(400).json({
        success: false,
        message: 'La opción de entrega es requerida'
      });
    }

    const cartId = await CartModel.getOrCreateCart(userId);
    
    try {
      const order = await OrderModel.createOrderFromCart(userId, cartId, deliveryOption, whatsappMessage);
      
      return res.status(201).json({
        success: true,
        message: 'Pedido creado exitosamente',
        data: {
          orderId: order.id,
          orderNumber: order.orderNumber,
          total: order.total,
          status: order.status
        }
      });
    } catch (error: any) {
      if (error.message === 'El carrito está vacío') {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      }
      throw error;
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al crear pedido'
    });
  }
};

export const getUserOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const orders = await OrderModel.findByUserId(userId);
    
    return res.json({
      success: true,
      data: orders
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener pedidos'
    });
  }
};

export const getOrderById = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const orderId = parseInt(req.params.id as string);
    
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const belongs = await OrderModel.belongsToUser(orderId, userId);
    if (!belongs) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    const order = await OrderModel.findByIdWithItems(orderId, userId);
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    return res.json({
      success: true,
      data: order
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener pedido'
    });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await OrderModel.findAll();
    
    return res.json({
      success: true,
      data: orders
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener pedidos'
    });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const orderId = parseInt(req.params.id as string);
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'El estado es requerido'
      });
    }

    const updated = await OrderModel.updateStatus(orderId, status);
    
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Pedido no encontrado'
      });
    }

    return res.json({
      success: true,
      message: 'Estado del pedido actualizado',
      data: {
        id: orderId,
        status
      }
    });
  } catch (error: any) {
    if (error.message === 'Estado no válido') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar estado'
    });
  }
};