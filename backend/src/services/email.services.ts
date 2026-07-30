// 📁 backend/src/services/email.service.ts

/**
 * 📌 SERVICIO DE EMAIL
 * 
 * Maneja el envío de emails usando Resend.
 * Soporta recuperación de contraseña con plantillas HTML profesionales.
 */

import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

// =============================================
// 🔧 CONFIGURACIÓN
// =============================================

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@comercial-uruguay.cl';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// =============================================
// 📧 PLANTILLA DE RECUPERACIÓN
// =============================================

interface ResetPasswordEmailParams {
  to: string;
  name: string;
  token: string;
}

/**
 * Envía un email de recuperación de contraseña
 * 
 * @param params - { to: email del usuario, name: nombre, token: token único }
 * @returns Promise<{ success: boolean; error?: string }>
 */
export async function sendPasswordResetEmail({
  to,
  name,
  token,
}: ResetPasswordEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    // Construir enlace de recuperación
    const resetLink = `${FRONTEND_URL}/reset-password?token=${token}`;

    // 🎨 Plantilla HTML profesional
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; background: #FAF9E2; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #603060; margin: 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #7D5FFF, #603060); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; color: #6A757C; font-size: 12px; margin-top: 30px; border-top: 1px solid #EAE3CF; padding-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏪 Comercial Uruguay</h1>
          </div>
          <h2>Hola ${name},</h2>
          <p>Recibimos una solicitud para restablecer tu contraseña.</p>
          <p>Haz clic en el botón para crear una nueva contraseña:</p>
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">🔐 Restablecer Contraseña</a>
          </div>
          <p>Este enlace expirará en <strong>1 hora</strong>.</p>
          <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
          <div class="footer">
            <p>Comercial Uruguay - Uruguay 660, Valparaíso</p>
            <p>© ${new Date().getFullYear()} - Todos los derechos reservados</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 📧 Enviar email
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [to],
      subject: '🔐 Recuperación de contraseña - Comercial Uruguay',
      html,
    });

    if (error) {
      console.error('❌ Error enviando email:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Email enviado:', data);
    return { success: true };
  } catch (error: any) {
    console.error('❌ Error en sendPasswordResetEmail:', error);
    return { success: false, error: error.message };
  }
}