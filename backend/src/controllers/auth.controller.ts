import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';
import { registerSchema, loginSchema } from '../schemas/auth.schema';

export const register = async (req: Request, res: Response) => {
  try {
    // Validar datos
    const validatedData = registerSchema.parse(req.body);
    const { email, password, fullName, phone, address } = validatedData;

    // Verificar si el usuario ya existe
    const existingUser = await UserModel.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'El correo ya está registrado'
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      fullName,
      phone,
      address
    });

    // Generar JWT
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      success: true,
      message: 'Usuario registrado exitosamente',
      data: {
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: newUser.role
        }
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.errors?.[0]?.message || error.message || 'Error al registrar usuario'
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    // Validar datos
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Buscar usuario
    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
       message: 'Credenciales incorrectas'
      });
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales incorrectas'
      });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      message: 'Inicio de sesión exitoso',
      data: {
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.errors?.[0]?.message || error.message || 'Error al iniciar sesión'
    });
  }
};
