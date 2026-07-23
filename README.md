🏪 Comercial Uruguay - Marketplace

Versión: 1.0.0
Estado: Producción (Deployado)
Integrantes: Camilo Riquelme - Mairon Monarde
Repositorio: github.com/CmloPvl/comercial-uruguay
Deploy Frontend: comercial-uruguay.vercel.app
Deploy Backend: Render (API en producción)
📋 Descripción del Proyecto

Marketplace digital para Comercial Uruguay, un comercio local en Valparaíso especializado en productos económicos con distintas categorías (Hogar, Cumpleaños, Juguetes, Cabello, Melamina, Temporada).

La plataforma permite a los clientes navegar por el catálogo, consultar disponibilidad de productos y generar pedidos a través de WhatsApp, manteniendo la calidez del trato personalizado que caracteriza al local.
🎯 Objetivo del Proyecto

Digitalizar el catálogo de productos de Comercial Uruguay, permitiendo a los clientes:

    Explorar productos por categorías

    Agregar productos a un carrito de compras

    Generar pedidos por WhatsApp

    Gestionar favoritos y perfil de usuario

    Administrar inventario desde un panel de control

✨ Características Principales
Módulo Funcionalidad
🛍️ Catálogo Listado de productos con búsqueda y filtros avanzados
🛒 Carrito Agregar/eliminar productos, actualizar cantidades, generar pedido por WhatsApp
👤 Área de Cliente Perfil, historial de pedidos, lista de favoritos
📊 Panel Admin Publicar productos, gestionar inventario, administrar pedidos
🔐 Autenticación Registro/Login con JWT, roles (CLIENTE/ADMIN), protección de rutas
📱 Responsive Optimizado para dispositivos móviles, tablets y escritorio
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
Testing Vitest + Supertest -
Dependencias Frontend
json

"dependencies": {
"@hookform/resolvers": "^5.4.0",
"@radix-ui/react-\*": "varios",
"@tanstack/react-query": "^5.101.0",
"axios": "^1.18.1",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"lucide-react": "^1.21.0",
"react": "^19.2.6",
"react-dom": "^19.2.6",
"react-hook-form": "^7.81.0",
"react-hot-toast": "^2.6.0",
"react-icons": "^5.6.0",
"react-router-dom": "^7.18.0",
"tailwind-merge": "^3.6.0",
"zod": "^4.4.3"
}

Dependencias Backend
json

"dependencies": {
"@prisma/client": "^7.9.0",
"axios": "^1.18.1",
"bcryptjs": "^3.0.3",
"cors": "^2.8.6",
"dotenv": "^17.4.2",
"express": "^5.2.1",
"express-rate-limit": "^8.5.2",
"helmet": "^8.2.0",
"jsonwebtoken": "^9.0.3",
"pg": "^8.22.0",
"prisma": "^7.9.0",
"resend": "^6.17.2",
"zod": "^4.4.3"
}

📊 Checklist de Funcionalidades (QA)
🟢 1. Autenticación

# Tarea Estado

1.1 Registro de usuario ✅
1.2 Login con credenciales correctas ✅
1.3 Login con credenciales incorrectas ✅
1.4 Recuperar contraseña ⏳
1.5 Cerrar sesión ✅ 2. Productos

# Tarea Estado

2.1 Listar productos en tienda ✅
2.2 Ver detalle de producto ✅
2.3 Filtrar por categoría ✅
2.4 Filtrar por precio ✅
2.5 Buscar productos ❌ 3. Carrito

# Tarea Estado

3.1 Agregar producto ✅
3.2 Actualizar cantidad ✅
3.3 Eliminar producto ✅
3.4 Vaciar carrito ✅
3.5 Enviar pedido por WhatsApp ✅ 4. Favoritos

# Tarea Estado

4.1 Agregar a favoritos ✅
4.2 Ver favoritos ✅
4.3 Eliminar de favoritos ✅ 5. Pedidos

# Tarea Estado

5.1 Crear pedido ⏳
5.2 Ver mis pedidos ✅
5.3 Ver detalle de pedido ✅ 6. Admin

# Tarea Estado

6.1 Crear producto ✅
6.2 Editar producto ❌
6.3 Eliminar producto ❌
6.4 Ver productos (admin) ✅
6.5 Ver pedidos (admin) ✅
6.6 Cambiar estado de pedido ❌ 7. Perfil

# Tarea Estado

7.1 Ver datos ✅
7.2 Editar datos ✅
7.3 Cambiar contraseña ✅
🔒 Auditoría de Seguridad

# Tarea Estado

1.1 JWT seguro ✅
1.2 bcrypt para contraseñas ✅
1.3 Rate Limiting (5 intentos) ✅
1.4 Mensajes genéricos de error ✅
2.1 Zod en frontend ✅
2.2 Zod en backend ✅
2.3 Sanitización anti-XSS ✅
3.1 Helmet ✅
3.2 CORS ✅
3.3 Trust Proxy ✅
4.1 Rutas protegidas ✅
4.2 Solo admin puede crear productos ✅
4.3 Solo admin puede ver admin ✅
5.1 No se exponen contraseñas ✅
5.2 No se exponen datos sensibles ✅
🎨 Pruebas de Usabilidad

# Tarea Estado

1.1 Paleta de colores consistente ✅
1.2 Fuentes legibles ✅
1.3 Espaciado adecuado ✅
2.1 Mobile (teléfonos) ⏳
2.2 Tablet ⏳
2.3 Desktop ✅
3.1 Spinners de carga ✅
3.2 Mensajes de error claros ✅
4.1 Contraste de colores ✅
4.2 Labels en formularios ✅
4.3 Títulos de página ✅
🗂️ Estructura del Proyecto
Frontend (Vite + React)
text

frontend/src/
├── components/
│ ├── admin/ # Panel de administración
│ ├── auth/ # Componentes de autenticación
│ ├── cart/ # Carrito de compras
│ ├── common/ # Componentes reutilizables
│ ├── home/ # Página de inicio y Hero
│ ├── layout/ # Navbar, Footer, Layout
│ ├── products/ # Lista, filtros, tarjetas
│ └── ui/ # shadcn/ui (button, card, input...)
├── context/ # AuthContext, CartContext
├── hooks/ # useLogin, useRegister, useCart
├── pages/
│ ├── admin/ # Dashboard, Productos, Pedidos
│ ├── auth/ # Login, Registro, Recuperar
│ └── ... # Home, Productos, Carrito, Perfil
├── services/ # API services (product, cart, auth...)
├── types/ # TypeScript interfaces
└── utils/ # Helpers y validadores

Backend (Express + Prisma)
text

backend/src/
├── config/ # Configuración (database, auth)
├── controllers/ # Lógica de negocio
├── middlewares/ # auth, rateLimit, sanitize
├── models/ # Modelos de datos
├── routes/ # Rutas de la API
├── schemas/ # Validación con Zod
├── services/ # Servicios externos (email, etc.)
└── utils/ # Utilidades

🚀 Instalación y Configuración
Requisitos Previos

    Node.js 18+

    npm o yarn

    PostgreSQL (Supabase)

Clonar el repositorio
bash

git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

Backend
bash

cd backend
cp .env.example .env # Configurar variables de entorno
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

Variables de Entorno

Backend (.env)
env

PORT=5000
DATABASE_URL="postgresql://..."
JWT_SECRET="mi_jwt_secret"
RESEND_API_KEY="..."

Frontend (.env)
env

VITE_API_URL="http://localhost:5000/api"

📦 Deploy
Frontend (Vercel)
bash

cd frontend
npm run build

# Conectar repositorio con Vercel

# Variables de entorno: VITE_API_URL

Backend (Render)
bash

# Conectar repositorio con Render

# Variables de entorno: DATABASE_URL, JWT_SECRET, etc.

🎯 Próximas Mejoras (Roadmap)
Fase 1: UI/UX (Prioridad Alta)

# Tarea Descripción

1 Skeletons Estados de carga con shadcn/ui
2 Toasts Notificaciones en todas las acciones
3 Paleta de colores Consistencia en toda la app
4 Breadcrumb Navegación clara en todas las páginas
5 Animaciones Transiciones suaves con framer-motion
Fase 2: Funcionalidades

# Tarea Descripción

1 Buscar productos Endpoint y barra de búsqueda
2 Recuperar contraseña Resend + flujo completo
3 Subir imágenes Supabase Storage
4 Eliminar producto Admin
5 Cambiar estado de pedido Admin
Fase 3: Performance y SEO

# Tarea Descripción

1 Lazy loading Carga perezosa de componentes
2 React Query Caché y sincronización
3 Meta tags SEO dinámico
4 Optimización de imágenes Lazy load y formatos modernos
🧪 Testing
bash

# Backend

cd backend
npm test

# Frontend

cd frontend
npm test

📝 Paleta de Colores
Nombre Código Uso
Deep Purple #603060 Textos, botones, fondos
Purple Electric #7D5FFF Enlaces, acentos, bordes
Cyan #00D2D3 Botones, acentos
Yellow Bright #FFD93D Badges, destacados
Pink Vibrant #FF6B81 Errores, ofertas
Orange Intense #FF9F43 Teléfono, acentos
Mint Green #90C090 Confirmaciones, éxito
Charcoal #303030 Textos principales
Slate Gray #6A757C Textos secundarios
Cream #FAF9E2 Fondos suaves
👥 Contribuidores

    Camilo Riquelme - Frontend, Backend, Base de Datos

    Mairon Monarde - Colaboración en el proyecto

📄 Licencia

Este proyecto es de uso académico y comercial para Comercial Uruguay.
📌 Checklist de Componentes a Revisar en el Rediseño
Layout
Componente Archivo Estado
Navbar components/layout/Navbar.tsx ⏳ Pendiente
Footer components/layout/Footer.tsx ⏳ Pendiente
Layout components/layout/Layout.tsx ⏳ Pendiente
Hero components/home/Hero.tsx ⏳ Pendiente
Autenticación
Componente Archivo Estado
Login pages/auth/Login.tsx ⏳ Pendiente
Registro pages/auth/Registro.tsx ⏳ Pendiente
Recuperar pages/auth/RecuperarContrasena.tsx ⏳ Pendiente
Páginas Principales
Componente Archivo Estado
Home pages/Home.tsx ⏳ Pendiente
Productos pages/Productos.tsx ⏳ Pendiente
Detalle Producto pages/ProductoDetalle.tsx ⏳ Pendiente
Carrito pages/Carrito.tsx ⏳ Pendiente
Perfil pages/Perfil.tsx ⏳ Pendiente
Favoritos pages/Favoritos.tsx ⏳ Pendiente
Mis Pedidos pages/MisPedidos.tsx ⏳ Pendiente
Componentes UI (shadcn)
Componente Archivo Estado
Button components/ui/button.tsx ✅ Listo
Input components/ui/input.tsx ✅ Listo
Card components/ui/card.tsx ✅ Listo
Badge components/ui/badge.tsx ✅ Listo
Skeleton components/ui/skeleton.tsx ✅ Listo
Breadcrumb components/ui/breadcrumb.tsx ✅ Listo
Avatar components/ui/avatar.tsx ✅ Listo
Dropdown components/ui/dropdown-menu.tsx ✅ Listo
🐛 Errores Conocidos y Soluciones
Error Causa Solución
500 Internal Server Error en /api/products Backend no responde Verificar npm run dev en backend
SELF_SIGNED_CERT_IN_CHAIN Certificado SSL en local Usar http://localhost:5000 en .env
width: "auto" en SVG Logo con width="auto" Cambiar a width="40"
Hot updates constantes Vite recargando Normal en desarrollo
📞 Contacto y Soporte

    Email: comercialuruguaychile@gmail.com

    WhatsApp: +569 1234 5678

    Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile

¡Gracias por visitar Comercial Uruguay! 🏪✨
