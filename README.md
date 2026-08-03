🏪 Comercial Uruguay — Web App

Versión: 1.0.0
Estado: Producción (desplegado)
Desarrollador: Camilo Riquelme
Repositorio: github.com/CmloPvl/comercial-uruguay
Web App: comercial-uruguay.vercel.app
API: comercial-uruguay-backend.onrender.com

---

📋 Descripción del Proyecto

Comercial Uruguay es la web app oficial de un comercio establecido con más de 10 años de trayectoria en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

La plataforma digitaliza el catálogo físico del local, permitiendo a los clientes:

    Explorar productos por categorías

    Consultar stock en tiempo real

    Armar un carrito de compras

    Generar pedidos por WhatsApp

    Reservar productos antes de ir a la tienda

El objetivo es potenciar las ventas del negocio físico con una vitrina digital profesional, sin perder la cercanía y el trato personalizado que caracteriza al local.

---

🛠️ Stack Tecnológico

Capa Tecnología Versión
Frontend React + TypeScript + Vite React 19.x
Backend Node.js + Express + TypeScript Node 22.x
Base de Datos PostgreSQL + Supabase -
ORM Prisma 7.9.0
Autenticación JWT + bcryptjs -
Estilos Tailwind CSS + shadcn/ui Tailwind 3.4.x
Validación Zod -
Manejo de Estado React Context + React Query -
Notificaciones react-hot-toast -
Animaciones framer-motion -
Email Resend -
Despliegue Vercel (frontend) + Render (backend) -

---

Dependencias Frontend
json

{
"react": "^19.2.6",
"react-dom": "^19.2.6",
"react-router-dom": "^7.18.0",
"@tanstack/react-query": "^5.101.0",
"axios": "^1.18.1",
"zod": "^4.4.3",
"react-hook-form": "^7.81.0",
"@hookform/resolvers": "^5.4.0",
"react-hot-toast": "^2.6.0",
"framer-motion": "^12.42.2",
"lucide-react": "^1.21.0",
"date-fns": "^4.4.0",
"tailwindcss": "^3.4.17",
"@radix-ui/react-\*": "varios"
}

---

Dependencias Backend
json

{
"express": "^5.2.1",
"@prisma/client": "^7.9.0",
"prisma": "^7.9.0",
"jsonwebtoken": "^9.0.3",
"bcryptjs": "^3.0.3",
"zod": "^4.4.3",
"resend": "^6.17.2",
"express-rate-limit": "^8.5.2",
"helmet": "^8.2.0",
"cors": "^2.8.6"
}

---

🎨 Paleta de Colores
Nombre Código Uso
Deep Purple #603060 Textos, botones, fondos principales
Purple Electric #7D5FFF Enlaces, acentos, bordes
Cyan #00D2D3 Botones, acentos secundarios
Yellow Bright #FFD93D Badges, destacados, ofertas
Pink Vibrant #FF6B81 Errores, ofertas, botones de acción
Orange Intense #FF9F43 Acentos cálidos, teléfono
Mint Green #90C090 Confirmaciones, éxito
Charcoal #303030 Textos principales
Slate Gray #6A757C Textos secundarios
Cream #FAF9E2 Fondos suaves

---

🧠 Arquitectura: Separación de Lógica y Diseño
Principio fundamental

Cada página y componente grande está separado en dos partes:
Carpeta Responsabilidad Ejemplo
components/ Diseño (UI) — Solo JSX, estilos, estructura visual Login.tsx
hooks/ Lógica — Estados, API, validaciones, manejo de errores useLogin.ts
pages/ Conexión — Une diseño + lógica LoginPage.tsx
context/ Estado Global — Datos compartidos AuthContext.tsx
services/ API — Comunicación con el backend auth.service.ts
Ejemplo: Login
Archivo Contenido Tipo
pages/auth/Login.tsx JSX, estilos, estructura ✅ Diseño
hooks/useLogin.ts Estados, validación, envío ✅ Lógica
context/AuthContext.tsx Estado global del usuario ✅ Lógica

---

📂 Estructura del Proyecto

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── layout/ # Navbar, Footer, Layout
│ ├── ui/ # shadcn/ui (Button, Card, Input...)
│ ├── auth/ # Login, Registro, Recuperar
│ ├── products/ # ProductList, ProductCard, ProductFilters
│ └── common/ # Logo, LoadingSpinner, ProtectedRoute
│
├── hooks/ # 🧠 Lógica
│ ├── useAuth.ts # Autenticación
│ ├── useCart.ts # Carrito
│ ├── useLogin.ts # Lógica del Login
│ ├── useRegister.ts # Lógica del Registro
│ └── useRecoverPassword.ts # Lógica de recuperación
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── api.ts # Configuración Axios
│ ├── auth.service.ts
│ ├── product.service.ts
│ └── cart.service.ts
│
├── pages/ # 📄 Páginas
│ ├── Home/
│ ├── Productos/
│ └── auth/ # Login, Registro, Recuperar
│
└── types/ # 📌 Tipos TypeScript

---

✅ Checklist de Funcionalidades
🟢 Autenticación

# Tarea Estado

1.1 Registro de usuario ✅
1.2 Login con credenciales correctas ✅
1.3 Login con credenciales incorrectas ✅
1.4 Recuperar contraseña (Resend) ✅
1.5 Cerrar sesión ✅
🟢 Productos

# Tarea Estado

2.1 Listar productos en tienda ✅
2.2 Ver detalle de producto ✅
2.3 Filtrar por categoría ✅
2.4 Filtrar por precio ✅
2.5 Buscar productos ✅
🟢 Carrito

# Tarea Estado

3.1 Agregar producto ✅
3.2 Actualizar cantidad ✅
3.3 Eliminar producto ✅
3.4 Vaciar carrito ✅
3.5 Enviar pedido por WhatsApp ✅
🟢 Favoritos

# Tarea Estado

4.1 Agregar a favoritos ✅
4.2 Ver favoritos ✅
4.3 Eliminar de favoritos ✅
🟢 Admin

# Tarea Estado

6.1 Crear producto ✅
6.2 Editar producto ✅
6.3 Eliminar producto ✅
6.4 Ver productos (admin) ✅
6.5 Ver pedidos (admin) ✅
6.6 Cambiar estado de pedido ⏳

---

🚀 Instalación y Configuración

Requisitos Previos

    Node.js 18+

    npm o yarn

    Cuenta en Supabase (gratis)

Clonar

git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

Backend

cd backend
cp .env.example .env # Configurar variables
npm install
npx prisma generate
npx prisma db push
npm run dev

Frontend
bash

cd frontend
cp .env.example .env # Configurar VITE_API_URL
npm install
npm run dev

---

Variables de Entorno
Variable Local Producción
VITE*API_URL http://localhost:5000/api https://comercial-uruguay-backend.onrender.com/api
FRONTEND_URL http://localhost:5173 https://comercial-uruguay.vercel.app
RESEND_API_KEY re*... re\_...
EMAIL_FROM onboarding@resend.dev onboarding@resend.dev

---

🧪 Pruebas

# Backend

cd backend
npm test

# Frontend

cd frontend
npm test

---

📦 Despliegue
Frontend (Vercel)

cd frontend
npm run build

# Conectar repositorio con Vercel

# Variables: VITE_API_URL

Backend (Render)

# Conectar repositorio con Render

# Variables: DATABASE_URL, JWT_SECRET, RESEND_API_KEY, FRONTEND_URL, EMAIL_FROM

---

📞 Contacto y Ubicación

    Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile

    Horario: Lun-Vie 10:00-18:30, Sáb 10:00-15:00

    WhatsApp: +569 1234 5678

    Email: comercialuruguaychile@gmail.com

    Redes Sociales: Facebook, Instagram, TikTok

📄 Licencia

Proyecto de uso académico y comercial para Comercial Uruguay.
