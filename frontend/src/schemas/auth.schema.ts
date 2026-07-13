import { z } from 'zod';

// =============================================
// REGISTRO (Alineado con frontend - SIN carácter especial obligatorio)
// =============================================
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras y espacios'),

  email: z
    .string()
    .email('Correo electrónico inválido')
    .max(100, 'El correo no puede tener más de 100 caracteres'),

  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(30, 'La contraseña no puede tener más de 30 caracteres')
    .regex(/[A-Z]/, 'Sugerencia: incluye al menos 1 mayúscula para mayor seguridad')
    .regex(/[0-9]/, 'Sugerencia: incluye al menos 1 número para mayor seguridad'),

  phone: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[0-9]{7,15}$/.test(val), {
      message: 'Teléfono inválido (ej: +56912345678)',
    }),

  address: z
    .string()
    .optional()
    .refine((val) => !val || val.length <= 200, {
      message: 'La dirección no puede tener más de 200 caracteres',
    }),

  termsAccepted: z
    .boolean()
    .refine(val => val === true, {
      message: 'Debes aceptar los Términos y Condiciones',
    }),
});

// =============================================
// LOGIN
// =============================================
export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(1, 'La contraseña es obligatoria'),
});

// =============================================
// TIPOS (Nombres para frontend)
// =============================================
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;