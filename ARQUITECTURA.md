📦 ARCHIVO: ARQUITECTURA.md
markdown

# 🏗️ Arquitectura del Proyecto — Comercial Uruguay

---

## 🧠 Principio fundamental: Separación de Lógica y Diseño (SoC)

| Capa          | Responsabilidad                                        | Ejemplo           |
| ------------- | ------------------------------------------------------ | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos, estructura visual     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones, manejo de errores | `useLogin.ts`     |
| `pages/`      | Conexión — Une diseño + lógica                         | `LoginPage.tsx`   |
| `context/`    | Estado Global — Datos compartidos                      | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend                      | `auth.service.ts` |

---

## 📂 Frontend — Estructura completa

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # Panel administración
│ │ ├── products/ # Componentes de productos
│ │ │ ├── ProductForm.tsx
│ │ │ ├── ProductFormHeader.tsx
│ │ │ ├── ProductFormActions.tsx
│ │ │ ├── ProductFormLeftColumn.tsx
│ │ │ ├── ProductFormRightColumn.tsx
│ │ │ ├── ProductFormAdvancedOptions.tsx
│ │ │ ├── ProductFormSkeleton.tsx
│ │ │ └── ProductTable.tsx
│ │ ├── DashboardStats.tsx
│ │ └── ImageUploader.tsx # Subida a Supabase
│ ├── common/
│ │ └── AppBreadcrumb.tsx # Breadcrumb universal
│ ├── home/ # Secciones del Home
│ │ ├── Hero.tsx
│ │ ├── CategoriesSection.tsx
│ │ ├── FeaturedProductsSection.tsx
│ │ ├── BenefitsSection.tsx
│ │ └── LocationSection.tsx
│ ├── layout/ # Layout principal
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ └── Footer.tsx
│ ├── auth/ # Componentes de autenticación
│ │ ├── Login.tsx
│ │ ├── Registro.tsx
│ │ └── RecuperarContrasena.tsx
│ ├── products/ # Componentes de tienda
│ │ ├── ProductList.tsx
│ │ ├── ProductCard.tsx
│ │ └── ProductFilters.tsx
│ └── ui/ # shadcn/ui + custom
│ ├── form-field.tsx # Campo reutilizable
│ ├── button.tsx
│ ├── card.tsx
│ └── ...
│
├── hooks/ # 🧠 Lógica reutilizable
│ ├── useAdminDashboard.ts
│ ├── useAdminProductos.ts
│ ├── useAdminCategorias.ts
│ ├── useAdminPedidos.ts
│ ├── useAdminUsuarios.ts
│ ├── useCrearPublicacion.ts
│ ├── useEditarPublicacion.ts
│ ├── useProductoDetalle.ts
│ ├── useAuth.ts
│ ├── useCart.ts
│ ├── useLogin.ts
│ ├── useRegister.ts
│ ├── useNavbar.ts
│ └── useHome.ts
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── api.ts
│ ├── auth.service.ts
│ ├── product.service.ts
│ ├── cart.service.ts
│ ├── category.service.ts
│ ├── favorite.service.ts
│ └── adminService.ts
│
├── pages/ # 📄 Páginas
│ ├── admin/
│ │ ├── Dashboard.tsx
│ │ ├── AdminProductos.tsx
│ │ ├── AdminCategorias.tsx
│ │ ├── Pedidos.tsx
│ │ ├── Usuarios.tsx
│ │ ├── CrearPublicacion.tsx
│ │ └── EditarPublicacion.tsx
│ ├── auth/
│ │ ├── Login.tsx
│ │ ├── Registro.tsx
│ │ ├── RecuperarContrasena.tsx
│ │ └── ResetPassword.tsx
│ ├── Home.tsx
│ ├── Productos.tsx
│ ├── ProductoDetalle.tsx
│ ├── Carrito.tsx
│ ├── Perfil.tsx
│ ├── Favoritos.tsx
│ ├── MisPedidos.tsx
│ └── EnviosYRetiros.tsx
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts
│
├── types/ # 📌 Tipos TypeScript
│ ├── product.types.ts
│ └── auth.types.ts
│
├── utils/ # 🛠️ Utilidades
│ ├── categoryUtils.ts
│ ├── formatPrice.ts
│ └── validators.ts
│
├── lib/ # 📦 Clientes externos
│ └── supabase.ts
│
└── config/ # ⚙️ Configuraciones
└── empresa.ts
text

---

## 📂 Backend — Estructura completa

backend/src/
├── config/ # ⚙️ Configuraciones
│ └── database.ts # Conexión a PostgreSQL
│
├── controllers/ # 🧠 Lógica de negocio
│ ├── auth.controller.ts
│ ├── product.controller.ts
│ ├── category.controller.ts
│ ├── cart.controller.ts
│ ├── order.controller.ts
│ ├── favorite.controller.ts
│ ├── admin.controller.ts
│ └── user.controller.ts
│
├── routes/ # 🚪 Rutas de la API
│ ├── auth.routes.ts
│ ├── product.routes.ts
│ ├── category.routes.ts
│ ├── cart.routes.ts
│ ├── order.routes.ts
│ ├── favorite.routes.ts
│ ├── admin.routes.ts
│ └── user.routes.ts
│
├── models/ # 🗄️ Acceso a base de datos
│ ├── User.ts
│ ├── Product.ts
│ ├── Category.ts
│ ├── Cart.ts
│ ├── Order.ts
│ └── Favorite.ts
│
├── middlewares/ # 🛡️ Middlewares
│ ├── auth.middleware.ts
│ ├── rateLimit.middleware.ts
│ └── sanitize.middleware.ts
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts
│
├── services/ # 📧 Servicios externos
│ └── email.services.ts
│
└── server.ts # 🚀 Punto de entrada
text

---

## 📊 Resumen de Estado (SoC)

| Módulo             | Frontend (UI) | Hook | Backend (API) | Estado |
| ------------------ | ------------- | ---- | ------------- | ------ |
| Navbar             | ✅            | ✅   | -             | ✅     |
| Home               | ✅            | ✅   | -             | ✅     |
| Footer             | ✅            | -    | -             | ✅     |
| Login              | ✅            | ✅   | ✅            | ✅     |
| Registro           | ✅            | ✅   | ✅            | ✅     |
| Recuperar          | ✅            | ✅   | ✅            | ✅     |
| ResetPassword      | ✅            | ✅   | ✅            | ✅     |
| Productos (tienda) | ✅            | ✅   | ✅            | ✅     |
| Carrito            | ✅            | ✅   | ✅            | ✅     |
| Favoritos          | ✅            | ✅   | ✅            | ✅     |
| Perfil             | ✅            | ✅   | ✅            | ✅     |
| Producto Detalle   | ✅            | ✅   | ✅            | ✅     |
| Dashboard Admin    | ✅            | ✅   | ✅            | ✅     |
| Admin Productos    | ✅            | ✅   | ✅            | ✅     |
| Admin Categorías   | ✅            | ✅   | ✅            | ✅     |
| Admin Pedidos      | ✅            | ✅   | ✅            | ✅     |
| Admin Usuarios     | ✅            | ✅   | ✅            | ✅     |
| Crear Publicación  | ✅            | ✅   | ✅            | ✅     |
| Editar Publicación | ✅            | ✅   | ✅            | ✅     |
