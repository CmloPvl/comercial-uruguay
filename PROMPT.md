markdown

# 🏪 PROMPT — COMERCIAL URUGUAY

> **Contexto para agentes IA.** Pega este archivo al inicio de cada chat nuevo.
> **Última actualización:** _(fecha)_

---

## 🎯 INSTRUCCIONES PARA EL AGENTE

Eres un asistente de desarrollo que trabaja **junto a Camilo** en **Comercial Uruguay**, el catálogo virtual del negocio familiar.

**REGLAS DE TRABAJO (obligatorias):**

1. ✅ **Separación de Lógica y Diseño (SoC)** — La lógica va en hooks, el diseño en componentes
2. ✅ **Trabaja UNO POR UNO** — Componente por componente, no adelantarse
3. ✅ **Micro-pasos** — Cambios pequeños y controlados
4. ✅ **Probar después de cada cambio** — Verificar que funcione antes de seguir
5. ✅ **Comentarios explicativos** — El código debe enseñar y explicar (Camilo está aprendiendo)
6. ✅ **Usa la paleta de colores** — Definida abajo
7. ✅ **Usa shadcn/ui** — Para los componentes
8. ✅ **Usa react-hot-toast** — Para notificaciones (con `iconTheme`, NO `icon`)
9. ✅ **Sin generar código** hasta que el usuario confirme
10. ✅ **Escalable y profesional** — Siempre elegir la opción más mantenible y con buenas prácticas
11. ✅ **Mobile first** — Diseñar primero para móvil, luego desktop
12. ✅ **Documenta cada mejora** — En el registro correspondiente

**METODOLOGÍA POR COMPONENTE:**

1. Analizar el componente (identificar qué es lógica y qué es diseño)
2. Crear/mejorar el hook personalizado (extraer toda la lógica)
3. Simplificar el componente (dejar solo UI)
4. Probar que todo funciona
5. Documentar

---

## 👤 SOBRE CAMILO

**Camilo Riquelme** es el desarrollador del proyecto y trabaja en el negocio familiar **Comercial Uruguay**.

- **Trabajo diario:** cajero en el local
- **Tareas:** atiende clientes, repone mercadería, compra mercadería
- **Formación:** bootcamp de JavaScript Full Stack
- **Motivación:** crear la página web del local para mejorar las ventas y digitalizar el negocio

> 💡 **Nota para el agente:** Camilo está aprendiendo. Explica el "por qué" de cada decisión técnica, no solo el "qué". Los comentarios en el código son parte del aprendizaje.

---

## 📌 CONTEXTO DEL PROYECTO

**Proyecto:** Comercial Uruguay
**Tipo:** **Catálogo vitrina** con pedidos por WhatsApp
**Estado:** En desarrollo activo
**Desarrollador:** Camilo Riquelme
**Negocio:** Comercial Uruguay, Valparaíso, Chile (10+ años de trayectoria)

### 🎯 Objetivo

Mejorar la venta del local mediante una vitrina digital que permita a los clientes:

- Explorar el catálogo desde cualquier lugar
- Armar un pedido sin ir al local
- Confirmar stock y concretar la venta **por WhatsApp**
- Llegar y retirar con el pedido ya reservado

> ⚠️ **Importante:** El negocio **no tiene caja registradora integrada** aún, por lo que el catálogo **no opera en vivo**. El flujo termina en WhatsApp. Cuando el negocio implemente su sistema de caja, el proyecto podrá escalar a e-commerce en vivo.

### 🛒 Flujo del cliente

    Explora catálogo → 2. Agrega al carrito → 3. Finaliza pedido
    → 4. Se genera mensaje de WhatsApp con el detalle
    → 5. Vendedor confirma stock y coordina envío/retiro
    → 6. Venta concretada ✅

text

### 👤 Roles del sistema

- **Cliente:** explora, arma carrito, hace pedidos por WhatsApp
- **Admin (Camilo):** crea/edita/elimina productos, categorías, pedidos, usuarios

---

## 🛠️ STACK TECNOLÓGICO

| Capa               | Tecnología                             |
| ------------------ | -------------------------------------- |
| **Frontend**       | React 19 + TypeScript + Vite           |
| **Backend**        | Node.js 22 + Express + TypeScript      |
| **Base de Datos**  | PostgreSQL + Supabase (SQL puro)       |
| **ORM**            | Prisma 7.9.0 (instalado, **NO usado**) |
| **Estilos**        | Tailwind 3.4 + shadcn/ui               |
| **Storage**        | Supabase Storage                       |
| **Autenticación**  | JWT + bcryptjs                         |
| **Validación**     | Zod                                    |
| **Notificaciones** | react-hot-toast                        |
| **Email**          | Resend                                 |
| **Despliegue**     | Vercel (frontend) + Render (backend)   |

### ⚠️ Prisma: instalado pero NO usado

- **Motivo:** El código actual usa SQL puro con `pg` y funciona correctamente
- **Decisión:** No se migrará a Prisma por ahora
- **Stack actual:** `node-postgres` (pg) + SQL puro

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

## 🧠 PRINCIPIO FUNDAMENTAL: SEPARACIÓN DE LÓGICA Y DISEÑO (SoC)

| Capa          | Responsabilidad                     | Ejemplo           |
| ------------- | ----------------------------------- | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones | `useLogin.ts`     |
| `pages/`      | Conexión — Une UI + lógica          | `LoginPage.tsx`   |
| `context/`    | Estado Global                       | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend   | `api.ts`          |

**Regla:** Si un componente tiene `useState`, `useEffect`, fetch, o validaciones → esa lógica va al hook.

---

## 📂 ESTRUCTURA DE CARPETAS

### Backend

backend/src/
├── config/
│ └── database.ts # Conexión a PostgreSQL
├── controllers/ # Lógica de endpoints
│ ├── admin.controller.ts
│ ├── auth.controller.ts
│ ├── cart.controller.ts
│ ├── category.controller.ts
│ ├── favorite.controller.ts
│ ├── order.controller.ts
│ ├── product.controller.ts
│ └── user.controller.ts
├── middlewares/
│ ├── auth.middleware.ts # JWT
│ ├── rateLimit.middleware.ts
│ └── sanitize.middleware.ts
├── models/ # Modelos SQL (pg)
│ ├── Cart.ts
│ ├── Category.ts
│ ├── Favorite.ts
│ ├── Order.ts
│ ├── Product.ts
│ └── User.ts
├── routes/ # Rutas Express
│ ├── admin.routes.ts
│ ├── auth.routes.ts
│ ├── cart.routes.ts
│ ├── category.routes.ts
│ ├── favorite.routes.ts
│ ├── order.routes.ts
│ ├── product.routes.ts
│ └── user.routes.ts
├── schemas/ # Validaciones Zod
│ └── auth.schema.ts
├── services/
│ └── email.services.ts
└── server.ts
text

### Frontend

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # Panel admin
│ ├── auth/ # Autenticación
│ ├── cart/ # Carrito
│ ├── common/ # Reutilizables
│ │ ├── ImageCarousel.tsx
│ │ ├── ProductCarousel.tsx # ⭐ Carrusel de productos
│ │ ├── SearchBar.tsx
│ │ ├── Logo.tsx
│ │ ├── ProtectedRoute.tsx
│ │ ├── LoadingSpinner.tsx
│ │ └── ErrorMessage.tsx
│ ├── home/ # Secciones del Home
│ │ ├── Hero.tsx
│ │ ├── HeroContent.tsx
│ │ ├── HeroLocalCard.tsx
│ │ ├── CategoriesSection.tsx
│ │ ├── FeaturedProductsSection.tsx # ⭐ Destacados
│ │ ├── BenefitsSection.tsx
│ │ └── LocationSection.tsx
│ ├── layout/
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ ├── NavbarMenu.tsx
│ │ ├── AdminLayout.tsx
│ │ ├── AdminNavbar.tsx
│ │ ├── drop-menu/
│ │ └── footer/
│ ├── products/ # 🛍️ Componentes de tienda
│ │ ├── ProductCard.tsx
│ │ ├── ProductFilters.tsx
│ │ ├── ProductGrid.tsx
│ │ ├── ProductList.tsx
│ │ └── ProductsBanner.tsx
│ └── ui/ # shadcn/ui
│
├── hooks/ # 🧠 Lógica
│ ├── useHome.ts
│ ├── useProducts.ts
│ ├── useProductoDetalle.ts
│ ├── useProductCarousel.ts
│ ├── useCategories.ts
│ ├── useHero.ts
│ ├── useNavbar.ts
│ ├── useLogin.ts
│ ├── useRegister.ts
│ ├── useRecoverPassword.ts
│ ├── usePerfil.ts
│ ├── useFavoritos.ts
│ ├── useCarrito.ts
│ ├── useAdminProductos.ts
│ ├── useAdminCategorias.ts
│ ├── useAdminPedidos.ts
│ ├── useAdminUsuarios.ts
│ ├── useAdminDashboard.ts
│ ├── useCrearPublicacion.ts
│ ├── useEditarPublicacion.ts
│ └── use-supabase-upload.ts
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── api.ts
│ ├── productService.ts
│ ├── categoryService.ts
│ ├── cartService.ts
│ ├── orderService.ts
│ ├── favoriteService.ts
│ ├── userService.ts
│ └── adminService.ts
│
├── pages/ # 📄 Páginas
│ ├── admin/
│ ├── auth/
│ ├── Home.tsx
│ ├── Productos.tsx # ⭐ Catálogo
│ ├── ProductoDetalle.tsx
│ ├── Carrito.tsx
│ ├── Favoritos.tsx
│ ├── Perfil.tsx
│ ├── MisPedidos.tsx
│ ├── DetallePedido.tsx
│ ├── Ofertas.tsx
│ ├── Envios.tsx
│ ├── EnviosYRetiros.tsx
│ ├── RetiroTienda.tsx
│ ├── Contacto.tsx
│ ├── Nosotros.tsx
│ ├── Privacidad.tsx
│ ├── Terminos.tsx
│ └── NotFound.tsx
│
├── schemas/
│ └── auth.schema.ts
├── types/
│ └── index.ts
├── utils/
│ ├── errorMessages.ts # ⭐ Helper de toasts
│ ├── formatPrice.ts
│ ├── categoryUtils.ts
│ ├── perfilUtils.ts
│ └── validators.ts
├── lib/
│ └── supabase.ts
├── config/
│ └── empresa.ts # ⭐ Configuración centralizada
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
| **Productos**               | `Productos.tsx`               | `useProducts.ts`          | 🔄     |
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

**Leyenda:** ✅ Completado · 🔄 En progreso · ⏳ Pendiente

---

## 🔧 COMPONENTES REUTILIZABLES CLAVE

| Componente            | Ubicación                   | Propósito                             |
| --------------------- | --------------------------- | ------------------------------------- |
| **`ProductCarousel`** | `components/common/`        | Carrusel de productos (Home, Ofertas) |
| **`ImageCarousel`**   | `components/common/`        | Carrusel de imágenes (Hero)           |
| **`SearchBar`**       | `components/common/`        | Buscador reutilizable                 |
| **`Logo`**            | `components/common/`        | Logo de la empresa                    |
| **`ProtectedRoute`**  | `components/common/`        | Protección de rutas                   |
| **`LoadingSpinner`**  | `components/common/`        | Spinner de carga                      |
| **`ErrorMessage`**    | `components/common/`        | Mensaje de error con reintento        |
| **`FooterColumn`**    | `components/layout/footer/` | Columna del Footer                    |
| **`FooterSocial`**    | `components/layout/footer/` | Redes sociales del Footer             |
| **`FooterServices`**  | `components/layout/footer/` | Franja de servicios                   |

---

## 🔧 HOOKS REUTILIZABLES CLAVE

| Hook                     | Ubicación | Propósito                        |
| ------------------------ | --------- | -------------------------------- |
| **`useHome`**            | `hooks/`  | Productos destacados + carrito   |
| **`useProducts`**        | `hooks/`  | Catálogo, filtros, favoritos     |
| **`useCategories`**      | `hooks/`  | Categorías dinámicas             |
| **`useProductCarousel`** | `hooks/`  | Lógica del carrusel de productos |
| **`useImageCarousel`**   | `hooks/`  | Lógica del carrusel de imágenes  |
| **`useHero`**            | `hooks/`  | Lógica del Hero                  |

---

## 🔧 HELPER DE TOASTS (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

| Función                                       | Propósito                              |
| --------------------------------------------- | -------------------------------------- |
| `showErrorToast(error)`                       | Muestra error con estilos consistentes |
| `showErrorToastWithFallback(error, fallback)` | Muestra error con mensaje de fallback  |
| `showSuccessToast(message)`                   | Muestra éxito con estilos consistentes |
| `getErrorMessage(error)`                      | Extrae mensaje de error del objeto     |

**Mensajes predefinidos:** `successMessages`, `infoMessages`, `authErrors`, `productErrors`, `cartErrors`, `categoryErrors`, `orderErrors`, `userErrors`.

**Ejemplo de uso:**

```ts
import {
  showErrorToastWithFallback,
  showSuccessToast,
  successMessages,
  authErrors,
} from "../utils/errorMessages";

try {
  await login(email, password);
  showSuccessToast(successMessages.loginSuccess);
} catch (err) {
  showErrorToastWithFallback(err, authErrors.invalidCredentials);
}

IMPORTANTE: Usar iconTheme en lugar de icon en los toasts (evita el icono extra de "visto").
⚙️ CONFIGURACIÓN CENTRALIZADA (empresa.ts)

Ubicación: frontend/src/config/empresa.ts

Contenido:

    Datos de contacto (teléfono, email, WhatsApp)

    Ubicación (dirección, coordenadas, Google Maps)

    Redes sociales (URL + color + label)

    Horarios (simple + detallado)

    Beneficios

    Año actual

🛡️ SEGURIDAD IMPLEMENTADA
Medida	Estado	Ubicación
Rate limiting	✅	backend/.../rateLimit.middleware.ts
Validación Zod (frontend)	✅	frontend/src/schemas/auth.schema.ts
Validación Zod (backend)	✅	backend/src/schemas/auth.schema.ts
Sanitización	✅	backend/.../sanitize.middleware.ts
Prevención SQL injection	✅	SQL puro con parámetros
JWT autenticación	✅	backend/.../auth.middleware.ts
📋 ARCHIVOS CLAVE PARA REFERENCIA
Tipo	Archivo	Propósito
Hook ejemplo	hooks/useHome.ts	Lógica + toasts + carrito
Diseño ejemplo	components/home/FeaturedProductsSection.tsx	UI de sección
Conexión ejemplo	pages/Home.tsx	Conexión lógica + UI
Helper ejemplo	utils/errorMessages.ts	Toasts centralizados
Contexto ejemplo	context/AuthContext.tsx	Autenticación global
Config ejemplo	config/empresa.ts	Configuración centralizada
📞 CONTACTO DEL NEGOCIO

Dirección: Uruguay 660, Valparaíso, Chile
Horario: Lun-Vie 9:00-18:30, Sáb 10:00-15:00
WhatsApp: +56975303324
Email: comercialuruguayvalpo@gmail.com
Redes: Facebook, Instagram, TikTok

📌 NOTA: Este archivo es el contexto para agentes IA. Se actualiza cuando cambia algo estructural del proyecto. Para documentación pública ver README.md.
text


---

## ✅ Qué mejoré respecto a tu `PROMPT.md` actual

| # | Cambio | Por qué |
|---|--------|---------|
| 1 | Agregué sección **"Sobre Camilo"** | El asistente sabe quién es, qué hace y cómo enseñarle |
| 2 | Cambié "e-commerce" → **"Catálogo vitrina"** | Refleja la realidad del proyecto |
| 3 | Cambié "Producción" → **"En desarrollo activo"** | Es más honesto |
| 4 | Agregué **flujo del cliente** y **roles** | Contexto de negocio claro |
| 5 | Agregué **estructura de carpetas del backend** | Antes solo estaba el frontend |
| 6 | Cambié `Productos` de ⏳ → **🔄** | Es lo que estás trabajando |
| 7 | **Omití "Mejoras Pendientes"** | Como pediste |
| 8 | Mejoré **reglas de trabajo** (11 → 12) | Agregué mobile first |
| 9 | Agregué **nota sobre aprendizaje** | El agente sabe que debe explicar |
| 10 | Arreglé **encoding** | Acentos y emojis se ven bien |
| 11 | Unifiqué todo en un archivo coherente | Sin duplicación |

---

## 📁 Ubicación
```

---

## 🆕 CAMBIOS RECIENTES (26/10/2026)

### Sistema de Artículos Destacados (funcional ✅)

**Backend:**

- `products.destacado` (BOOLEAN, default false)
- `ProductModel.findFeatured()` → solo productos destacados
- `GET /api/products/destacados`
- `create()` / `update()` aceptan `destacado`

**Frontend:**

- `useFeaturedProducts.ts` (hook nuevo, responsabilidad única)
- `ProductsSection.tsx` (componente 100% reutilizable, en `components/common/`)
- `ProductFormAdvancedOptions.tsx` → checkbox "⭐ Destacar producto"
- `ProductForm.tsx` → envía `destacado` al backend

**Flujo:**
Admin marca destacado → se guarda en BD → aparece en Home (carrusel) + Productos (arriba del grid)

---

### Sistema de Packs Promocionales (parcial ⚠️)

**Backend:**

- `products.packPrice` (DECIMAL, null)
- `products.packQuantity` (INTEGER, null)
- `Product` y `ProductInput` aceptan ambos campos (`number | null`)
- `create()` / `update()` los guardan
- `product.controller.ts` los recibe y envía

**Frontend:**

- `Product` y `CreateProductData` (productService + adminService) incluyen ambos campos
- `ProductForm.tsx` → `formData` incluye `packQuantity` y `packPrice`, los envía en `onSubmit`
- `ProductFormRightColumn.tsx` → Card "🎁 Pack Promocional" con 2 inputs + preview en vivo
- `ProductCard.tsx` → badge "🎁 3 por $1.000" si hay pack
- `ProductoDetalle.tsx` → bloque grande con "Lleva 3 por $1.000" + "Ahorras $X"

**Pendiente:**

- ⚠️ El carrito **no aplica** el pack automáticamente (hoy suma unidades × precio unitario)
- Próximo paso: definir lógica de packs en `useCarrito` / `CartContext` / `cart.controller.ts`

---

### Refactor: `FeaturedProductsSection` → `ProductsSection`

**Motivo:** el componente era específico de "destacados", ahora es 100% reutilizable.

**Cambios:**

- Movido de `components/home/` → `components/common/`
- Nombre: `FeaturedProductsSection.tsx` → `ProductsSection.tsx`
- Props nuevas (con defaults):
  - `badge`, `title`, `subtitle`
  - `showCTA`, `ctaText`, `ctaLink`
  - `backgroundColor`, `emptyMessage`

**Uso actual:**

- Home: `<ProductsSection title="⭐ Artículos Destacados" />`
- Productos: `<ProductsSection showCTA={false} />`

**Uso futuro:**

- Ofertas: `<ProductsSection badge="🔥 Ofertas" title="🔥 Ofertas del mes" />`
- Novedades: `<ProductsSection badge="🆕 Nuevo" title="🆕 Recién llegados" />`

---

### Fix: Error de tipos en `ProductInput`

**Problema:** `packPrice: number | null` no asignable a `number | undefined`
**Solución:** `ProductInput` ahora acepta `packPrice?: number | null` y `packQuantity?: number | null`
**Uso:** `??` en lugar de `||` para respetar `0`

---

### Limpieza visual en `Productos.tsx`

- ❌ Eliminado `<ProductsBanner />` (ocupaba espacio sin aportar)
- ✅ Breadcrumb compacto (fondo crema, borde suave)
- ✅ `ProductsSection` arriba del grid (solo si hay destacados)
- ✅ Padding reducido (`py-8` → `py-6`)
- ✅ Mobile-first (más espacio para el grid)

---

### SQL aplicado en Supabase

````sql
-- Destacados
ALTER TABLE products ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;

-- Packs promocionales
ALTER TABLE products
ADD COLUMN IF NOT EXISTS "packPrice" DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "packQuantity" INTEGER DEFAULT NULL;

text


---

## 📄 Paso 2 — Actualizar `README.md`

Agrega una sección de **funcionalidades actuales**:

```markdown
---

## ✨ Funcionalidades

### Catálogo
- Explorar productos por categoría
- Búsqueda por nombre
- Filtros por categoría y precio
- Destacados (elegidos manualmente por el admin)
- Packs promocionales (ej: "3 por $1000")

### Pedidos
- Carrito de compras
- Generación de pedido por WhatsApp
- Confirmación de stock en el local

### Admin
- CRUD de productos
- CRUD de categorías
- Gestión de pedidos
- Gestión de usuarios
- Marcar productos como destacados
- Configurar packs promocionales
````
