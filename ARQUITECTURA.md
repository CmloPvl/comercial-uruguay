📁 ARQUITECTURA DEL PROYECTO — COMERCIAL URUGUAY

🏗️ Principio fundamental: Separación de Lógica y Diseño

Capa Responsabilidad Ejemplo
components/ Diseño (UI) — Solo JSX, estilos, estructura visual Login.tsx
hooks/ Lógica — Estados, API, validaciones, manejo de errores useLogin.ts
pages/ Conexión — Une diseño + lógica LoginPage.tsx
context/ Estado Global — Datos compartidos AuthContext.tsx
services/ API — Comunicación con el backend auth.service.ts

📂 Frontend — Estructura completa

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── layout/ # Navbar, Footer, Layout
│ │ ├── Navbar.tsx ✅ Diseño (UI)
│ │ ├── NavbarAdminMenu.tsx ✅ Diseño (UI)
│ │ ├── NavbarUserMenu.tsx ✅ Diseño (UI)
│ │ ├── NavbarGuestMenu.tsx ✅ Diseño (UI)
│ │ ├── NavbarMobile.tsx ✅ Diseño (UI)
│ │ ├── Footer.tsx ✅ Diseño (UI)
│ │ ├── FooterColumn.tsx ✅ Diseño (UI)
│ │ ├── FooterSocial.tsx ✅ Diseño (UI)
│ │ ├── FooterServices.tsx ✅ Diseño (UI)
│ │ └── Layout.tsx ✅ Diseño (UI)
│ │
│ ├── home/ # Secciones del Home
│ │ ├── Hero.tsx ✅ Diseño (UI)
│ │ ├── CategoriesSection.tsx ✅ Diseño (UI)
│ │ ├── FeaturedProductsSection.tsx ✅ Diseño (UI)
│ │ ├── BenefitsSection.tsx ✅ Diseño (UI)
│ │ └── LocationSection.tsx ✅ Diseño (UI)
│ │
│ ├── auth/ # Componentes de autenticación
│ │ ├── Login.tsx ✅ Diseño (UI)
│ │ ├── Registro.tsx ✅ Diseño (UI)
│ │ └── RecuperarContrasena.tsx ✅ Diseño (UI)
│ │
│ ├── products/ # Componentes de productos
│ │ ├── ProductList.tsx ✅ Diseño (UI)
│ │ ├── ProductCard.tsx ✅ Diseño (UI)
│ │ └── ProductFilters.tsx ✅ Diseño (UI)
│ │
│ ├── common/ # Componentes reutilizables
│ │ ├── Logo.tsx ✅ Diseño (UI)
│ │ ├── LoadingSpinner.tsx ✅ Diseño (UI)
│ │ └── ProtectedRoute.tsx ✅ Diseño (UI)
│ │
│ └── ui/ # shadcn/ui (Button, Card, Input...)
│ ├── button.tsx ✅ Diseño (UI)
│ ├── card.tsx ✅ Diseño (UI)
│ ├── input.tsx ✅ Diseño (UI)
│ └── ... (otros componentes)
│
├── hooks/ # 🧠 Lógica reutilizable
│ ├── useAuth.ts ✅ Lógica (autenticación)
│ ├── useCart.ts ✅ Lógica (carrito)
│ ├── useLogin.ts ✅ Lógica (login)
│ ├── useRegister.ts ✅ Lógica (registro)
│ ├── useRecoverPassword.ts ✅ Lógica (recuperación)
│ ├── useNavbar.ts ✅ Lógica (navbar)
│ └── useHome.ts ✅ Lógica (home)
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx ✅ Lógica (usuario)
│ └── CartContext.tsx ✅ Lógica (carrito)
│
├── services/ # 📡 API
│ ├── api.ts ✅ Lógica (configuración Axios)
│ ├── auth.service.ts ✅ Lógica (autenticación)
│ ├── product.service.ts ✅ Lógica (productos)
│ ├── cart.service.ts ✅ Lógica (carrito)
│ ├── category.service.ts ✅ Lógica (categorías)
│ └── favorite.service.ts ✅ Lógica (favoritos)
│
├── pages/ # 📄 Páginas (conectan lógica + diseño)
│ ├── Home.tsx ✅ Conexión (lógica + UI)
│ ├── Productos.tsx 🔄 Pendiente de separar
│ ├── Carrito.tsx 🔄 Pendiente de separar
│ ├── Perfil.tsx 🔄 Pendiente de separar
│ ├── Favoritos.tsx 🔄 Pendiente de separar
│ ├── MisPedidos.tsx 🔄 Pendiente de separar
│ ├── EnviosYRetiros.tsx ✅ Diseño (UI)
│ ├── auth/ # Páginas de autenticación
│ │ ├── Login.tsx ✅ Conexión (lógica + UI)
│ │ ├── Registro.tsx ✅ Conexión (lógica + UI)
│ │ ├── RecuperarContrasena.tsx ✅ Conexión (lógica + UI)
│ │ └── ResetPassword.tsx 🔄 Pendiente de separar
│ └── admin/ # Páginas de administración
│ ├── Dashboard.tsx 🔄 Pendiente de separar
│ ├── Productos.tsx 🔄 Pendiente de separar
│ ├── Pedidos.tsx 🔄 Pendiente de separar
│ ├── Categorias.tsx 🔄 Pendiente de separar
│ ├── CrearPublicacion.tsx 🔄 Pendiente de separar
│ └── EditarPublicacion.tsx 🔄 Pendiente de separar
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts ✅ Lógica (validaciones)
│
├── types/ # 📌 Tipos TypeScript
│ ├── product.types.ts ✅ Lógica (tipos)
│ └── auth.types.ts ✅ Lógica (tipos)
│
└── utils/ # 🛠️ Utilidades
├── formatPrice.ts ✅ Utilidad
└── validators.ts ✅ Utilidad

    📂 Backend — Estructura completa

    backend/src/

├── config/ # ⚙️ Configuraciones
│ └── database.ts ✅ Conexión a Supabase
│
├── controllers/ # 🧠 Lógica de negocio
│ ├── auth.controller.ts ✅ Autenticación
│ ├── product.controller.ts ✅ Productos
│ ├── category.controller.ts ✅ Categorías
│ ├── cart.controller.ts ✅ Carrito
│ ├── order.controller.ts ✅ Pedidos
│ ├── favorite.controller.ts ✅ Favoritos
│ └── admin.controller.ts ✅ Administración
│
├── routes/ # 🚪 Rutas de la API
│ ├── auth.routes.ts ✅ Autenticación
│ ├── product.routes.ts ✅ Productos
│ ├── category.routes.ts ✅ Categorías
│ ├── cart.routes.ts ✅ Carrito
│ ├── order.routes.ts ✅ Pedidos
│ ├── favorite.routes.ts ✅ Favoritos
│ └── admin.routes.ts ✅ Administración
│
├── models/ # 🗄️ Acceso a la base de datos
│ ├── User.ts ✅ Usuarios
│ ├── Product.ts ✅ Productos
│ ├── Category.ts ✅ Categorías
│ ├── Cart.ts ✅ Carrito
│ ├── Order.ts ✅ Pedidos
│ └── Favorite.ts ✅ Favoritos
│
├── middlewares/ # 🛡️ Middlewares
│ ├── auth.middleware.ts ✅ Autenticación
│ ├── rateLimit.middleware.ts ✅ Límite de peticiones
│ └── sanitize.middleware.ts ✅ Sanitización
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts ✅ Validaciones
│
├── services/ # 📧 Servicios externos
│ └── email.service.ts ✅ Resend (correos)
│
└── server.ts # 🚀 Punto de entrada
