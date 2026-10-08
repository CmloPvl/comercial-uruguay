markdown

# 🏪 Comercial Uruguay — Web App

**Versión:** `v1.2.0-beta.3`  
**Estado:** Producción (desplegado)  
**Desarrollador:** Camilo Riquelme

**Enlaces:**

- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com
- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay

---

## 📋 Descripción

Web app oficial de un comercio con más de 10 años en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

**Clientes pueden:**

- Explorar productos por categorías
- Consultar stock en tiempo real
- Armar carrito de compras
- Generar pedidos por WhatsApp
- Reservar productos

---

## 🛠️ Stack Tecnológico

| Capa               | Tecnología                        |
| ------------------ | --------------------------------- |
| **Frontend**       | React 19 + TypeScript + Vite      |
| **Backend**        | Node.js 22 + Express + TypeScript |
| **Base de Datos**  | PostgreSQL + Supabase             |
| **Estilos**        | Tailwind 3.4 + shadcn/ui          |
| **Storage**        | Supabase Storage                  |
| **Autenticación**  | JWT + bcryptjs                    |
| **Validación**     | Zod                               |
| **Notificaciones** | react-hot-toast                   |
| **Email**          | Resend                            |
| **Despliegue**     | Vercel + Render                   |

---

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

# Backend
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev

🔐 Variables de Entorno

Frontend (.env):
env

VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key

Backend (.env):
env

PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:5173

📞 Contacto

    Dirección: Uruguay 660, Valparaíso, Chile

    Horario: Lun-Vie 9:00-18:30, Sáb 10:00-15:00

    WhatsApp: +56975303324

    Email: comercialuruguayvalpo@gmail.com

    Redes: Facebook, Instagram, TikTok

📄 Licencia

Proyecto de uso académico y comercial para Comercial Uruguay.
```
