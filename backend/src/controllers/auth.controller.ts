import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { email, password, fullName, phone, address } = validatedData;

    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya está registrado'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      fullName,
      phone,
      address
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role,
          termsAccepted: newUser.termsAccepted
        }
      }
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors?.[0]?.message || error.message || 'Error al registrar usuario'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    return res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          termsAccepted: user.termsAccepted
        }
      }
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.errors?.[0]?.message || error.message || 'Error al iniciar sesión'
    });
  }
};

// =============================================
// RECUPERAR CONTRASEÑA
// =============================================
export const recoverPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico es obligatorio'
      });
    }

    await UserModel.findByEmail(email);
    
    return res.json({
      success: true,
      message: 'Si el correo existe, recibirás un enlace para restablecer tu contraseña.'
    });
  } catch (error: any) {
    console.error('Error en recoverPassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al procesar la solicitud'
    });
  }
};

// =============================================
// OBTENER PERFIL DEL USUARIO
// =============================================
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const { password, ...userWithoutPassword } = user;
    
    return res.json({
      success: true,
      data: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Error en getProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al obtener el perfil'
    });
  }
};

// =============================================
// ACTUALIZAR PERFIL DEL USUARIO
// =============================================
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const { fullName, phone, address } = req.body;

    const updateData: any = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (phone !== undefined) updateData.phone = phone;
    if (address !== undefined) updateData.address = address;

    const updatedUser = await UserModel.update(userId, updateData);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    
    return res.json({
      success: true,
      message: 'Perfil actualizado exitosamente',
      data: userWithoutPassword
    });
  } catch (error: any) {
    console.error('Error en updateProfile:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar el perfil'
    });
  }
};

// =============================================
// CAMBIAR CONTRASEÑA
// =============================================
export const updatePassword = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'La contraseña actual y la nueva son obligatorias'
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'La nueva contraseña debe tener al menos 8 caracteres'
      });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'La contraseña actual es incorrecta'
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await UserModel.update(userId, { password: hashedPassword });

    return res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });
  } catch (error: any) {
    console.error('Error en updatePassword:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la contraseña'
    });
  }
};