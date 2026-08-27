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
| `services/`   | API — Comunicación con el backend                      | `api.ts`          |

---

## 📂 Frontend — Estructura completa (REAL)

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # Panel administración
│ │ ├── DashboardStats.tsx
│ │ ├── ImageUploader.tsx # Subida a Supabase
│ │ ├── ProductTable.tsx
│ │ └── products/ # Componentes de productos
│ │ ├── ProductForm.tsx
│ │ ├── ProductFormActions.tsx
│ │ ├── ProductFormAdvancedOptions.tsx
│ │ ├── ProductFormHeader.tsx
│ │ ├── ProductFormLeftColumn.tsx
│ │ ├── ProductFormRightColumn.tsx
│ │ └── ProductFormSkeleton.tsx
│ ├── auth/ # Componentes de autenticación
│ │ └── SocialLogin.tsx
│ ├── cart/ # Componentes del carrito
│ │ ├── CartItem.tsx
│ │ └── CartSummary.tsx
│ ├── common/ # Componentes reutilizables
│ │ ├── AppBreadcrumb.tsx # Breadcrumb universal
│ │ ├── ErrorMessage.tsx
│ │ ├── LoadingSpinner.tsx
│ │ ├── Logo.tsx
│ │ └── ProtectedRoute.tsx
│ ├── home/ # Secciones del Home
│ │ ├── BenefitsSection.tsx
│ │ ├── CategoriesSection.tsx
│ │ ├── FeaturedProductsSection.tsx
│ │ ├── Hero.tsx
│ │ └── LocationSection.tsx
│ ├── layout/ # Layout principal
│ │ ├── Footer.tsx
│ │ ├── FooterColumn.tsx
│ │ ├── FooterServices.tsx
│ │ ├── FooterSocial.tsx
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ ├── NavbarAdminMenu.tsx
│ │ ├── NavbarGuestMenu.tsx
│ │ ├── NavbarMobile.tsx
│ │ └── NavbarUserMenu.tsx
│ ├── products/ # Componentes de tienda
│ │ ├── ProductCard.tsx
│ │ ├── ProductFilters.tsx
│ │ ├── ProductGrid.tsx
│ │ ├── ProductList.tsx
│ │ └── ProductsBanner.tsx
│ └── ui/ # shadcn/ui + custom
│ ├── alert-dialog.tsx
│ ├── avatar.tsx
│ ├── badge.tsx
│ ├── breadcrumb.tsx
│ ├── button.tsx
│ ├── card.tsx
│ ├── checkbox.tsx
│ ├── dialog.tsx
│ ├── dropdown-menu.tsx
│ ├── dropzone.tsx
│ ├── form-field.tsx # Campo reutilizable
│ ├── input.tsx
│ ├── label.tsx
│ ├── select.tsx
│ ├── separator.tsx
│ ├── sheet.tsx
│ ├── skeleton.tsx
│ ├── table.tsx
│ ├── tabs.tsx
│ ├── textarea.tsx
│ └── tooltip.tsx
│
├── hooks/ # 🧠 Lógica reutilizable
│ ├── useAdminCategorias.ts
│ ├── useAdminDashboard.ts
│ ├── useAdminPedidos.ts
│ ├── useAdminProductos.ts
│ ├── useAdminUsuarios.ts
│ ├── useCarrito.ts
│ ├── useCrearPublicacion.ts
│ ├── useEditarPublicacion.ts
│ ├── useFavoritos.ts
│ ├── useHome.ts
│ ├── useLogin.ts
│ ├── useNavbar.ts
│ ├── usePerfil.ts
│ ├── useProductoDetalle.ts
│ ├── useProducts.ts
│ ├── useRecoverPassword.ts
│ ├── useRegister.ts
│ └── use-supabase-upload.ts
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── adminService.ts
│ ├── api.ts
│ ├── cartService.ts
│ ├── categoryService.ts
│ ├── favoriteService.ts
│ ├── orderService.ts
│ ├── productService.ts
│ └── userService.ts
│
├── pages/ # 📄 Páginas
│ ├── admin/
│ │ ├── AdminCategorias.tsx
│ │ ├── AdminProductos.tsx
│ │ ├── CrearPublicacion.tsx
│ │ ├── Dashboard.tsx
│ │ ├── EditarPublicacion.tsx
│ │ ├── Pedidos.tsx
│ │ └── Usuarios.tsx
│ ├── auth/
│ │ ├── Login.tsx
│ │ ├── RecuperarContrasena.tsx
│ │ ├── Registro.tsx
│ │ └── ResetPassword.tsx
│ ├── Carrito.tsx
│ ├── Contacto.tsx
│ ├── DetallePedido.tsx
│ ├── Envios.tsx
│ ├── EnviosYRetiros.tsx
│ ├── Favoritos.tsx
│ ├── Home.tsx
│ ├── MisPedidos.tsx
│ ├── Nosotros.tsx
│ ├── NotFound.tsx
│ ├── Ofertas.tsx
│ ├── Perfil.tsx
│ ├── Privacidad.tsx
│ ├── ProductoDetalle.tsx
│ ├── Productos.tsx
│ ├── RetiroTienda.tsx
│ └── Terminos.tsx
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts
│
├── types/ # 📌 Tipos TypeScript
│ └── index.ts
│
├── utils/ # 🛠️ Utilidades
│ ├── categoryUtils.ts
│ ├── errorMessages.ts # ✅ Helper de toasts
│ ├── formatPrice.ts
│ ├── perfilUtils.ts
│ └── validators.ts
│
├── lib/ # 📦 Clientes externos
│ ├── supabase.ts
│ └── utils.ts
│
├── config/ # ⚙️ Configuraciones
│ └── empresa.ts
│
├── App.tsx
├── main.tsx
├── index.css
└── App.css
text

---

## 📂 Backend — Estructura completa (REAL)

backend/src/
├── config/ # ⚙️ Configuraciones
│ └── database.ts # Conexión a PostgreSQL
│
├── controllers/ # 🧠 Lógica de negocio
│ ├── admin.controller.ts
│ ├── auth.controller.ts
│ ├── cart.controller.ts
│ ├── category.controller.ts
│ ├── favorite.controller.ts
│ ├── order.controller.ts
│ ├── product.controller.ts
│ └── user.controller.ts
│
├── routes/ # 🚪 Rutas de la API
│ ├── admin.routes.ts
│ ├── auth.routes.ts
│ ├── cart.routes.ts
│ ├── category.routes.ts
│ ├── favorite.routes.ts
│ ├── order.routes.ts
│ ├── product.routes.ts
│ └── user.routes.ts
│
├── models/ # 🗄️ Acceso a base de datos
│ ├── Cart.ts
│ ├── Category.ts
│ ├── Favorite.ts
│ ├── Order.ts
│ ├── Product.ts
│ └── User.ts
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
├── tests/ # 🧪 Pruebas
│ ├── auth.test.ts
│ └── product.test.ts
│
├── server.ts # 🚀 Punto de entrada
└── test-db.ts # 🔧 Prueba de conexión
text

---

## 📊 Resumen de Estado (SoC)

| Módulo                 | UI  | Hook                      | Backend | Estado |
| ---------------------- | --- | ------------------------- | ------- | ------ |
| **Navbar**             | ✅  | `useNavbar.ts`            | -       | ✅     |
| **Home**               | ✅  | `useHome.ts`              | -       | ✅     |
| **Footer**             | ✅  | -                         | -       | ✅     |
| **Login**              | ✅  | `useLogin.ts`             | ✅      | ✅     |
| **Registro**           | ✅  | `useRegister.ts`          | ✅      | ✅     |
| **Recuperar**          | ✅  | `useRecoverPassword.ts`   | ✅      | ✅     |
| **ResetPassword**      | ✅  | -                         | ✅      | ✅     |
| **Productos (tienda)** | ✅  | `useProducts.ts`          | ✅      | ✅     |
| **Carrito**            | ✅  | `useCarrito.ts`           | ✅      | ✅     |
| **Favoritos**          | ✅  | `useFavoritos.ts`         | ✅      | ✅     |
| **Perfil**             | ✅  | `usePerfil.ts`            | ✅      | ✅     |
| **Producto Detalle**   | ✅  | `useProductoDetalle.ts`   | ✅      | ✅     |
| **Dashboard Admin**    | ✅  | `useAdminDashboard.ts`    | ✅      | ✅     |
| **Admin Productos**    | ✅  | `useAdminProductos.ts`    | ✅      | ✅     |
| **Admin Categorías**   | ✅  | `useAdminCategorias.ts`   | ✅      | ✅     |
| **Admin Pedidos**      | ✅  | `useAdminPedidos.ts`      | ✅      | ✅     |
| **Admin Usuarios**     | ✅  | `useAdminUsuarios.ts`     | ✅      | ✅     |
| **Crear Publicación**  | ✅  | `useCrearPublicacion.ts`  | ✅      | ✅     |
| **Editar Publicación** | ✅  | `useEditarPublicacion.ts` | ✅      | ✅     |
| **Envios y Retiros**   | ✅  | -                         | -       | ✅     |

---
