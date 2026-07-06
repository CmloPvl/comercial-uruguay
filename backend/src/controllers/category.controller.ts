import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { CategoryModel } from '../models/Category';

export const getCategories = async (req: AuthRequest, res: Response) => {
  try {
    const categories = await CategoryModel.findAll();
    return res.json({
      success: true,
      data: categories
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener categorías'
    });
  }
};

export const getCategoryById = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const category = await CategoryModel.findById(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    return res.json({
      success: true,
      data: category
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al obtener categoría'
    });
  }
};

export const createCategory = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría es obligatorio'
      });
    }

    const existing = await CategoryModel.findByName(name);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'El nombre de la categoría ya existe'
      });
    }

    const category = await CategoryModel.create({ name, description, icon });

    return res.status(201).json({
      success: true,
      message: 'Categoría creada exitosamente',
      data: category
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al crear categoría'
    });
  }
};

export const updateCategory = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const { name, description, icon } = req.body;

    const category = await CategoryModel.update(id, { name, description, icon });

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    return res.json({
      success: true,
      message: 'Categoría actualizada exitosamente',
      data: category
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al actualizar categoría'
    });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const deleted = await CategoryModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada'
      });
    }

    return res.json({
      success: true,
      message: 'Categoría eliminada exitosamente'
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Error al eliminar categoría'
    });
  }
};