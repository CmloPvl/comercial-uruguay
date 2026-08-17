# 🏪 Comercial Uruguay — Web App

**Versión:** 1.2.0-beta.1  
**Estado:** Producción (desplegado)  
**Desarrollador:** Camilo Riquelme  
**Web App:** comercial-uruguay.vercel.app  
**API:** comercial-uruguay-backend.onrender.com

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

| Capa          | Tecnología                        |
| ------------- | --------------------------------- |
| Frontend      | React 19 + TypeScript + Vite      |
| Backend       | Node.js 22 + Express + TypeScript |
| Base de Datos | PostgreSQL + Supabase             |
| ORM           | Prisma 7.9.0                      |
| Estilos       | Tailwind 3.4 + shadcn/ui          |
| Storage       | Supabase Storage                  |
| Autenticación | JWT + bcryptjs                    |
| Validación    | Zod                               |
| Email         | Resend                            |
| Despliegue    | Vercel + Render                   |

---

## 🎨 Paleta de Colores

| Color           | Código    | Uso                |
| --------------- | --------- | ------------------ |
| Deep Purple     | `#603060` | Textos, botones    |
| Purple Electric | `#7D5FFF` | Enlaces, acentos   |
| Cyan            | `#00D2D3` | Botones, acentos   |
| Yellow Bright   | `#FFD93D` | Badges, ofertas    |
| Pink Vibrant    | `#FF6B81` | Errores, ofertas   |
| Orange Intense  | `#FF9F43` | Acentos cálidos    |
| Mint Green      | `#90C090` | Confirmaciones     |
| Charcoal        | `#303030` | Textos principales |
| Slate Gray      | `#6A757C` | Textos secundarios |
| Cream           | `#FAF9E2` | Fondos suaves      |

---

## ✅ Funcionalidades

| Módulo                                     | Estado |
| ------------------------------------------ | ------ |
| Autenticación (registro, login, recuperar) | ✅     |
| Productos (listar, detalle, filtros)       | ✅     |
| Carrito (agregar, quitar, WhatsApp)        | ✅     |
| Favoritos                                  | ✅     |
| Perfil de usuario                          | ✅     |
| Admin Dashboard                            | ✅     |
| Admin Productos (CRUD)                     | ✅     |
| Admin Categorías (CRUD)                    | ✅     |
| Admin Pedidos (cambio de estado)           | ✅     |
| Admin Usuarios (CRUD, roles)               | ✅     |
| Subida de imágenes (Supabase Storage)      | ✅     |
| Separación SoC en todas las páginas        | ✅     |

---

## 🚀 Instalación Rápida

```bash
git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

Backend
bash

cd backend
cp .env.example .env
npm install
npx prisma generate
npx prisma db push
npm run dev

Frontend
bash

cd frontend
cp .env.example .env
npm install
npm run dev

🔐 Variables de Entorno
Frontend (.env)
env

VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key

Backend (.env)
env

PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:5173

📞 Contacto

    Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile

    Horario: Lun-Vie 10:00-18:30, Sáb 10:00-15:00

    WhatsApp: +569 1234 5678

    Email: comercialuruguaychile@gmail.com

    Redes: Facebook, Instagram, TikTok

📄 Licencia

Proyecto de uso académico y comercial para Comercial Uruguay.
```
