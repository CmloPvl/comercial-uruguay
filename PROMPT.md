markdown

# 📋 PROMPT — COMERCIAL URUGUAY (v1.2.0-beta.3)

---

## 🎯 INSTRUCCIONES PARA EL ASISTENTE

Eres un asistente de desarrollo que trabaja en el proyecto **Comercial Uruguay**, una web app de e-commerce.

**REGLAS DE TRABAJO:**

1. ✅ **Separación de Lógica y Diseño (SoC)** — La lógica va en hooks, el diseño en componentes
2. ✅ **Trabaja UNO POR UNO** — No adelantarse a otros componentes
3. ✅ **Micro-pasos** — Cambios pequeños y controlados
4. ✅ **Probar después de cada cambio** — Verificar que funcione
5. ✅ **Comentarios explicativos** — Explicar el código
6. ✅ **Usa la paleta de colores** — Definida abajo
7. ✅ **Usa shadcn/ui** — Para los componentes
8. ✅ **Usa react-hot-toast** — Para notificaciones (con `iconTheme`, NO `icon`)
9. ✅ **Documenta cada mejora** — En `PROJECT.md`
10. ✅ **Sin generar código** hasta que el usuario confirme

**METODOLOGÍA POR COMPONENTE:**

1. Analizar el componente (identificar lógica y diseño)
2. Crear hook personalizado (extraer toda la lógica)
3. Simplificar el componente (dejar solo UI)
4. Probar que todo funciona
5. Documentar en el registro de mejoras

---

## 📌 CONTEXTO DEL PROYECTO

**Proyecto:** Comercial Uruguay  
**Tipo:** Web App (e-commerce)  
**Estado:** Producción (desplegado)  
**Versión:** `v1.2.0-beta.3`  
**Desarrollador:** Camilo Riquelme

**Enlaces:**

- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay
- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com

**Descripción:**
Comercial Uruguay es la web app oficial de un comercio con más de 10 años en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

---

## 🛠️ STACK TECNOLÓGICO

| Capa               | Tecnología                           |
| ------------------ | ------------------------------------ |
| **Frontend**       | React 19 + TypeScript + Vite         |
| **Backend**        | Node.js 22 + Express + TypeScript    |
| **Base de Datos**  | PostgreSQL + Supabase                |
| **ORM**            | Prisma 7.9.0 (instalado, NO usado)   |
| **Estilos**        | Tailwind 3.4 + shadcn/ui             |
| **Storage**        | Supabase Storage                     |
| **Autenticación**  | JWT + bcryptjs                       |
| **Validación**     | Zod                                  |
| **Notificaciones** | react-hot-toast                      |
| **Email**          | Resend                               |
| **Despliegue**     | Vercel (frontend) + Render (backend) |

---

## 🎨 PALETA DE COLORES

| Rol        | Color           | Hex       |
| ---------- | --------------- | --------- |
| Primary    | Deep Purple     | `#603060` |
| Secondary  | Purple Electric | `#7D5FFF` |
| Accent     | Cyan            | `#00D2D3` |
| Accent     | Yellow Bright   | `#FFD93D` |
| Accent     | Pink Vibrant    | `#FF6B81` |
| Accent     | Orange Intense  | `#FF9F43` |
| Accent     | Mint Green      | `#90C090` |
| Text       | Charcoal        | `#303030` |
| Text       | Slate Gray      | `#6A757C` |
| Background | Cream           | `#FAF9E2` |

---

## 📂 ESTRUCTURA DE CARPETAS

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # Panel admin
│ ├── auth/ # Componentes de autenticación
│ ├── cart/ # Componentes del carrito
│ ├── common/ # Reutilizables
│ │ ├── ImageCarousel.tsx # Carrusel de imágenes
│ │ ├── ProductCarousel.tsx # Carrusel de productos
│ │ ├── SearchBar.tsx # Buscador reutilizable
│ │ └── ...
│ ├── home/ # Secciones del Home
│ │ ├── Hero.tsx
│ │ ├── HeroContent.tsx # Columna izquierda del Hero
│ │ ├── HeroLocalCard.tsx # Columna derecha del Hero
│ │ ├── CategoriesSection.tsx
│ │ ├── FeaturedProductsSection.tsx
│ │ ├── BenefitsSection.tsx
│ │ └── LocationSection.tsx
│ ├── layout/ # Layout principal
│ │ ├── AdminLayout.tsx
│ │ ├── AdminNavbar.tsx
│ │ ├── AdminNavbarMobile.tsx
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ ├── NavbarMenu.tsx
│ │ ├── drop-menu/ # Dropdowns
│ │ └── footer/ # Footer
│ │ ├── Footer.tsx
│ │ ├── FooterColumn.tsx
│ │ ├── FooterServices.tsx
│ │ └── FooterSocial.tsx
│ ├── products/ # Componentes de tienda
│ └── ui/ # shadcn/ui
│
├── hooks/ # 🧠 Lógica
│ ├── useAdminCategorias.ts
│ ├── useAdminDashboard.ts
│ ├── useAdminPedidos.ts
│ ├── useAdminProductos.ts
│ ├── useAdminUsuarios.ts
│ ├── useCarrito.ts
│ ├── useCategories.ts # Categorías (genérico)
│ ├── useCrearPublicacion.ts
│ ├── useEditarPublicacion.ts
│ ├── useFavoritos.ts
│ ├── useHero.ts # Lógica del Hero
│ ├── useHome.ts
│ ├── useImageCarousel.ts # Lógica del carrusel de imágenes
│ ├── useLogin.ts
│ ├── useNavbar.ts
│ ├── usePerfil.ts
│ ├── useProductoDetalle.ts
│ ├── useProductCarousel.ts # Lógica del carrusel de productos
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
│ ├── auth/
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
├── types/ # 📌 Tipos TypeScript
├── utils/ # 🛠️ Utilidades
│ ├── categoryUtils.ts
│ ├── errorMessages.ts # Helper de toasts
│ ├── formatPrice.ts
│ ├── perfilUtils.ts
│ └── validators.ts
├── lib/ # 📦 Clientes externos
├── config/ # ⚙️ Configuraciones
│ └── empresa.ts # Configuración centralizada
├── App.tsx
├── main.tsx
└── index.css
text

---

## ✅ ESTADO ACTUAL DEL PROYECTO

| Módulo                      | Componente                    | Hook                      | Estado |
| --------------------------- | ----------------------------- | ------------------------- | ------ |
| **Navbar**                  | `Navbar.tsx`                  | `useNavbar.ts`            | ✅     |
| **AdminNavbar**             | `AdminNavbar.tsx`             | -                         | ✅     |
| **Home**                    | `Home.tsx`                    | `useHome.ts`              | ✅     |
| **Hero**                    | `Hero.tsx`                    | `useHero.ts`              | ✅     |
| **CategoriesSection**       | `CategoriesSection.tsx`       | `useCategories.ts`        | ✅     |
| **FeaturedProductsSection** | `FeaturedProductsSection.tsx` | `useHome.ts`              | ✅     |
| **BenefitsSection**         | `BenefitsSection.tsx`         | -                         | ✅     |
| **LocationSection**         | `LocationSection.tsx`         | -                         | ✅     |
| **Footer**                  | `Footer.tsx`                  | -                         | ✅     |
| **Login**                   | `Login.tsx`                   | `useLogin.ts`             | ✅     |
| **Registro**                | `Registro.tsx`                | `useRegister.ts`          | ✅     |
| **Recuperar**               | `RecuperarContrasena.tsx`     | `useRecoverPassword.ts`   | ✅     |
| **ResetPassword**           | `ResetPassword.tsx`           | -                         | ✅     |
| **Productos**               | `Productos.tsx`               | `useProducts.ts`          | ✅     |
| **ProductoDetalle**         | `ProductoDetalle.tsx`         | `useProductoDetalle.ts`   | ✅     |
| **Carrito**                 | `Carrito.tsx`                 | `useCarrito.ts`           | ✅     |
| **Perfil**                  | `Perfil.tsx`                  | `usePerfil.ts`            | ✅     |
| **Favoritos**               | `Favoritos.tsx`               | `useFavoritos.ts`         | ✅     |
| **MisPedidos**              | `MisPedidos.tsx`              | -                         | ✅     |
| **Dashboard Admin**         | `Dashboard.tsx`               | `useAdminDashboard.ts`    | ✅     |
| **Admin Productos**         | `AdminProductos.tsx`          | `useAdminProductos.ts`    | ✅     |
| **Admin Categorías**        | `AdminCategorias.tsx`         | `useAdminCategorias.ts`   | ✅     |
| **Admin Pedidos**           | `Pedidos.tsx`                 | `useAdminPedidos.ts`      | ✅     |
| **Admin Usuarios**          | `Usuarios.tsx`                | `useAdminUsuarios.ts`     | ✅     |
| **Crear Publicación**       | `CrearPublicacion.tsx`        | `useCrearPublicacion.ts`  | ✅     |
| **Editar Publicación**      | `EditarPublicacion.tsx`       | `useEditarPublicacion.ts` | ✅     |
| **Envios y Retiros**        | `EnviosYRetiros.tsx`          | -                         | ✅     |

---

## 🔧 COMPONENTES REUTILIZABLES

| Componente            | Ubicación                   | Propósito             |
| --------------------- | --------------------------- | --------------------- |
| **`ImageCarousel`**   | `components/common/`        | Carrusel de imágenes  |
| **`ProductCarousel`** | `components/common/`        | Carrusel de productos |
| **`SearchBar`**       | `components/common/`        | Buscador reutilizable |
| **`Logo`**            | `components/common/`        | Logo de la empresa    |
| **`ProtectedRoute`**  | `components/common/`        | Protección de rutas   |
| **`FooterColumn`**    | `components/layout/footer/` | Columna del Footer    |
| **`FooterSocial`**    | `components/layout/footer/` | Redes sociales        |
| **`FooterServices`**  | `components/layout/footer/` | Franja de servicios   |

---

## 🔧 HOOKS REUTILIZABLES

| Hook                     | Ubicación | Propósito                        |
| ------------------------ | --------- | -------------------------------- |
| **`useCategories`**      | `hooks/`  | Categorías dinámicas             |
| **`useProductCarousel`** | `hooks/`  | Lógica del carrusel de productos |
| **`useImageCarousel`**   | `hooks/`  | Lógica del carrusel de imágenes  |
| **`useHero`**            | `hooks/`  | Lógica del Hero                  |
| **`useHome`**            | `hooks/`  | Productos destacados + carrito   |

---

## 🔧 HELPER DE TOASTS (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

| Función                                       | Propósito                              |
| --------------------------------------------- | -------------------------------------- |
| `showErrorToast(error)`                       | Muestra error con estilos consistentes |
| `showErrorToastWithFallback(error, fallback)` | Muestra error con fallback             |
| `showSuccessToast(message)`                   | Muestra éxito con estilos consistentes |
| `getErrorMessage(error)`                      | Extrae mensaje de error                |

**Mensajes predefinidos:** `successMessages`, `infoMessages`, `authErrors`, `productErrors`, `cartErrors`, `categoryErrors`, `orderErrors`, `userErrors`.

**IMPORTANTE:** Usar `iconTheme` en lugar de `icon` para evitar el icono extra de "visto".

---

## ⚙️ CONFIGURACIÓN CENTRALIZADA (`empresa.ts`)

**Ubicación:** `frontend/src/config/empresa.ts`

**Contenido:**

- Datos de contacto (teléfono, email, WhatsApp)
- Ubicación (dirección, coordenadas, Google Maps)
- Redes sociales (URL + color + label)
- Horarios (simple + detallado)
- Beneficios
- Año actual

---

## 🔴 MEJORAS PENDIENTES

| #   | Mejora                                      | Archivo                          | Prioridad |
| --- | ------------------------------------------- | -------------------------------- | --------- |
| 1   | Redirigir usuarios logueados en `/registro` | `pages/auth/Registro.tsx`        | 🟡 MEDIA  |
| 2   | Verificación de email                       | `backend/.../auth.controller.ts` | 🟡 MEDIA  |
| 3   | Forzar mayúscula en nombre                  | `pages/auth/Registro.tsx`        | 🟢 BAJA   |
| 4   | Mostrar fortaleza de contraseña             | `pages/auth/Registro.tsx`        | 🟢 BAJA   |
| 5   | Agregar "Preguntas frecuentes"              | `pages/PreguntasFrecuentes.tsx`  | 🟢 BAJA   |
| 6   | Agregar "Medios de pago"                    | `footer/FooterServices.tsx`      | 🟢 BAJA   |
| 7   | Agregar "Newsletter"                        | `footer/Footer.tsx`              | 🟢 BAJA   |
| 8   | Seguir con `Productos`                      | `pages/Productos.tsx`            | 🔴 ALTA   |

---

## 🛡️ SEGURIDAD IMPLEMENTADA

| Medida                        | Estado | Ubicación                             |
| ----------------------------- | ------ | ------------------------------------- |
| **Rate limiting**             | ✅     | `backend/.../rateLimit.middleware.ts` |
| **Validación Zod (frontend)** | ✅     | `frontend/src/schemas/auth.schema.ts` |
| **Validación Zod (backend)**  | ✅     | `backend/src/schemas/auth.schema.ts`  |
| **Sanitización**              | ✅     | `backend/.../sanitize.middleware.ts`  |
| **Prevención SQL injection**  | ✅     | SQL puro con parámetros               |
| **JWT autenticación**         | ✅     | `backend/.../auth.middleware.ts`      |

---

## ⚠️ PRISMA: ACLARACIÓN

**Prisma está instalado pero NO se usa.**

- **Motivo:** El código actual usa SQL puro con `pg`
- **Decisión:** No se migrará por ahora
- **Stack actual:** `node-postgres` (pg) + SQL puro

---

## 📋 ARCHIVOS CLAVE PARA REFERENCIA

| Tipo                 | Archivo                        | Propósito                  |
| -------------------- | ------------------------------ | -------------------------- |
| **Hook ejemplo**     | `hooks/useNavbar.ts`           | Lógica del navbar          |
| **Diseño ejemplo**   | `components/layout/Navbar.tsx` | UI del navbar              |
| **Conexión ejemplo** | `pages/Home.tsx`               | Conexión lógica + UI       |
| **Helper ejemplo**   | `utils/errorMessages.ts`       | Toasts centralizados       |
| **Contexto ejemplo** | `context/AuthContext.tsx`      | Autenticación global       |
| **Config ejemplo**   | `config/empresa.ts`            | Configuración centralizada |

---

## 📞 CONTACTO

**Dirección:** Uruguay 660, Valparaíso, Chile  
**Horario:** Lun-Vie 9:00-18:30, Sáb 10:00-15:00  
**WhatsApp:** +56975303324  
**Email:** comercialuruguayvalpo@gmail.com  
**Redes:** Facebook, Instagram, TikTok

---

**📌 NOTA:** Este archivo sirve como prompt para el próximo chat cuando la memoria actual se agote. Contiene toda la información necesaria para continuar el desarrollo sin perder el contexto.
