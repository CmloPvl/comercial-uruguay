# 🏪 Comercial Uruguay - Marketplace

Integrantes: Camilo Riquelme - Mairon Monarde

## 📋 Descripción del Proyecto

Marketplace digital para **Comercial Uruguay**, un comercio local en Valparaíso especializado en productos económicos con distintas categorías.

La plataforma permite a los clientes navegar por el catálogo, consultar disponibilidad de productos y generar pedidos a través de WhatsApp, manteniendo la calidez del trato personalizado que caracteriza al local.

---

## ✨ Características Principales

- 🛍️ **Catálogo interactivo** con búsqueda y filtros avanzados
- 🛒 **Carrito de compras** con generación de pedidos por WhatsApp
- 👤 **Área de cliente** con perfil, historial y favoritos
- 📊 **Panel de administración** para publicar productos, gestión de inventario y pedidos
- 🔐 **Autenticación segura** con JWT y control de roles
- 📱 **Diseño responsive** optimizado para móviles y escritorio

---

## 🛠️ Stack Tecnológico

| Capa          | Tecnología                     |
| ------------- | ------------------------------ |
| Frontend      | React + TypeScript + Vite      |
| Backend       | Node.js + Express + TypeScript |
| Base de Datos | PostgreSQL + Supabase          |
| ORM           | Prisma                         |
| Autenticación | JWT + bcrypt                   |
| Estilos       | Tailwind CSS                   |
| Validación    | Zod                            |
| Testing       | Vitest + Supertest             |

### Dependencias Principales

**Frontend:**

react, react-dom, react-router-dom, @tanstack/react-query,
axios, zod, react-hook-form, react-hot-toast,
tailwindcss, react-icons

**Backend:**

express, cors, helmet, jsonwebtoken, bcrypt,
express-rate-limit, prisma, @prisma/client,
zod, envalid, dotenv, winston, uuid, date-fns

---

## 📁 Estructura del Proyecto

comercial-uruguay/
│
├── 📁 docs/
│ └── 📁 hito-1/
│ ├── 📁 images/
│ ├── 📁 vistas/
│ ├── 01-boceto-vistas.md
│ ├── 02-navegacion.md
│ ├── 03-dependencias.md
│ ├── 04-db-diagram.md
│ └── 05-api-contract.md
│
├── 📁 frontend/
├── 📁 backend/
├── .gitignore
└── README.md

---

📊 Entregables del Hito 1
Punto Descripción Estado
1 Boceto de vistas ✅
2 Navegación ✅
3 Dependencias ✅
4 Tablas BD ✅
5 Contrato API ✅
