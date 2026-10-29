markdown

# 🏪 PROMPT — COMERCIAL URUGUAY

> **Contexto para agentes IA.** Pega este archivo al inicio de cada chat nuevo.
> **Última actualización:** 29/10/2026

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
10. ✅ **Escalable y profesional** — Siempre elegir la opción más mantenible
11. ✅ **Mobile first** — Diseñar primero para móvil, luego desktop
12. ✅ **Documenta cada mejora** — En el CHANGELOG

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
- **Motivación:** crear la página web del local para mejorar las ventas

> 💡 **Nota para el agente:** Camilo está aprendiendo. Explica el "por qué" de cada decisión técnica.

---

## 📌 CONTEXTO DEL PROYECTO

**Proyecto:** Comercial Uruguay
**Tipo:** **Catálogo vitrina** con pedidos por WhatsApp
**Estado:** En desarrollo activo
**Desarrollador:** Camilo Riquelme
**Negocio:** Comercial Uruguay, Valparaíso, Chile (10+ años)

### 🎯 Objetivo

Mejorar la venta del local mediante una vitrina digital que permita:

- Explorar el catálogo desde cualquier lugar
- Armar un pedido sin ir al local
- Confirmar stock y concretar la venta **por WhatsApp**
- Llegar y retirar con el pedido ya reservado

> ⚠️ **Importante:** El negocio **no tiene caja registradora integrada**, por lo que el catálogo **no opera en vivo**. El flujo termina en WhatsApp.

### 🛒 Flujo del cliente

1. Explora catálogo → 2. Agrega al carrito → 3. Finaliza pedido
2. Se genera mensaje de WhatsApp con el detalle
3. Vendedor confirma stock y coordina envío/retiro
4. Venta concretada ✅

### 👤 Roles

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

- **Motivo:** El código actual usa SQL puro con `pg`
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

## 🧠 PRINCIPIO FUNDAMENTAL: SoC

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

```
backend/src/
├── config/
│   └── database.ts
├── controllers/
│   ├── admin.controller.ts
│   ├── auth.controller.ts
│   ├── cart.controller.ts
│   ├── category.controller.ts
│   ├── favorite.controller.ts
│   ├── order.controller.ts
│   ├── product.controller.ts
│   └── user.controller.ts
├── middlewares/
│   ├── auth.middleware.ts
│   ├── rateLimit.middleware.ts
│   └── sanitize.middleware.ts
├── models/
│   ├── Cart.ts
│   ├── Category.ts
│   ├── Favorite.ts
│   ├── Order.ts
│   ├── Product.ts
│   └── User.ts
├── routes/
├── schemas/
├── services/
│   └── email.services.ts
├── utils/                    # 🆕 Helpers compartidos
│   └── calculateSubtotal.ts  # 🆕
└── server.ts
```

### Frontend

```
frontend/src/
├── components/
│   ├── admin/
│   ├── auth/
│   ├── cart/
│   ├── common/
│   │   ├── ImageCarousel.tsx
│   │   ├── ProductCarousel.tsx
│   │   ├── ProductsSection.tsx    # 🆕 Reutilizable
│   │   ├── SearchBar.tsx
│   │   ├── Logo.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── home/
│   ├── layout/
│   ├── products/
│   │   ├── ProductCard.tsx         # 🆕 variant="default"|"carousel"
│   │   ├── ProductFilters.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductList.tsx
│   │   └── ProductsBanner.tsx
│   └── ui/
├── hooks/
│   ├── useFeaturedProducts.ts      # 🆕
│   ├── useHome.ts
│   ├── useProducts.ts
│   ├── useProductoDetalle.ts
│   └── ...
├── context/
├── services/
├── pages/
│   ├── admin/
│   ├── auth/
│   ├── Home.tsx
│   ├── Productos.tsx
│   ├── ProductoDetalle.tsx
│   ├── Carrito.tsx
│   ├── Ofertas.tsx
│   └── ...
├── utils/
│   └── errorMessages.ts
├── config/
│   └── empresa.ts
├── lib/
│   └── supabase.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## ✅ ESTADO ACTUAL DEL PROYECTO

| Módulo                 | Componente                | Hook                      | Estado |
| ---------------------- | ------------------------- | ------------------------- | ------ |
| **Navbar**             | `Navbar.tsx`              | `useNavbar.ts`            | ✅     |
| **AdminNavbar**        | `AdminNavbar.tsx`         | -                         | ✅     |
| **Home**               | `Home.tsx`                | `useHome.ts`              | ✅     |
| **Hero**               | `Hero.tsx`                | `useHero.ts`              | ✅     |
| **CategoriesSection**  | `CategoriesSection.tsx`   | `useCategories.ts`        | ✅     |
| **ProductsSection**    | `ProductsSection.tsx`     | `useFeaturedProducts.ts`  | ✅     |
| **BenefitsSection**    | `BenefitsSection.tsx`     | -                         | ✅     |
| **LocationSection**    | `LocationSection.tsx`     | -                         | ✅     |
| **Footer**             | `Footer.tsx`              | -                         | ✅     |
| **Login**              | `Login.tsx`               | `useLogin.ts`             | ✅     |
| **Registro**           | `Registro.tsx`            | `useRegister.ts`          | ✅     |
| **Recuperar**          | `RecuperarContrasena.tsx` | `useRecoverPassword.ts`   | ✅     |
| **ResetPassword**      | `ResetPassword.tsx`       | -                         | ✅     |
| **Productos**          | `Productos.tsx`           | `useProducts.ts`          | 🔄     |
| **ProductoDetalle**    | `ProductoDetalle.tsx`     | `useProductoDetalle.ts`   | ✅     |
| **Carrito**            | `Carrito.tsx`             | `useCarrito.ts`           | ✅     |
| **Perfil**             | `Perfil.tsx`              | `usePerfil.ts`            | ✅     |
| **Favoritos**          | `Favoritos.tsx`           | `useFavoritos.ts`         | ✅     |
| **MisPedidos**         | `MisPedidos.tsx`          | -                         | ✅     |
| **Dashboard Admin**    | `Dashboard.tsx`           | `useAdminDashboard.ts`    | ✅     |
| **Admin Productos**    | `AdminProductos.tsx`      | `useAdminProductos.ts`    | ✅     |
| **Admin Categorías**   | `AdminCategorias.tsx`     | `useAdminCategorias.ts`   | ✅     |
| **Admin Pedidos**      | `Pedidos.tsx`             | `useAdminPedidos.ts`      | ✅     |
| **Admin Usuarios**     | `Usuarios.tsx`            | `useAdminUsuarios.ts`     | ✅     |
| **Crear Publicación**  | `CrearPublicacion.tsx`    | `useCrearPublicacion.ts`  | ✅     |
| **Editar Publicación** | `EditarPublicacion.tsx`   | `useEditarPublicacion.ts` | ✅     |
| **Envios y Retiros**   | `EnviosYRetiros.tsx`      | -                         | ✅     |

**Leyenda:** ✅ Completado · 🔄 En progreso · ⏳ Pendiente

---

## 🔧 COMPONENTES REUTILIZABLES CLAVE

| Componente            | Ubicación              | Propósito                                 |
| --------------------- | ---------------------- | ----------------------------------------- |
| **`ProductCard`**     | `components/products/` | Card unificado (variant default/carousel) |
| **`ProductCarousel`** | `components/common/`   | Carrusel de productos (Home, Ofertas)     |
| **`ProductsSection`** | `components/common/`   | Sección de productos reutilizable         |
| **`ImageCarousel`**   | `components/common/`   | Carrusel de imágenes (Hero)               |
| **`SearchBar`**       | `components/common/`   | Buscador reutilizable                     |
| **`ProtectedRoute`**  | `components/common/`   | Protección de rutas                       |

---

## 🔧 HOOKS REUTILIZABLES CLAVE

| Hook                      | Ubicación | Propósito                       |
| ------------------------- | --------- | ------------------------------- |
| **`useFeaturedProducts`** | `hooks/`  | Solo productos destacados       |
| **`useHome`**             | `hooks/`  | Carrito + productos base        |
| **`useProducts`**         | `hooks/`  | Catálogo, filtros, favoritos    |
| **`useCategories`**       | `hooks/`  | Categorías dinámicas            |
| **`useProductCarousel`**  | `hooks/`  | Lógica del carrusel             |
| **`useImageCarousel`**    | `hooks/`  | Lógica del carrusel de imágenes |
| **`useHero`**             | `hooks/`  | Lógica del Hero                 |

---

## 🔧 HELPER DE TOASTS (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

**Funciones:**

- `showErrorToast(error)`
- `showErrorToastWithFallback(error, fallback)`
- `showSuccessToast(message)`
- `getErrorMessage(error)`

**Mensajes predefinidos:** `successMessages`, `infoMessages`, `authErrors`, `productErrors`, `cartErrors`, `categoryErrors`, `orderErrors`, `userErrors`.

**IMPORTANTE:** Usar `iconTheme` en lugar de `icon` en los toasts.

---

## ⚙️ CONFIGURACIÓN CENTRALIZADA (`empresa.ts`)

**Ubicación:** `frontend/src/config/empresa.ts`

Contenido: datos de contacto, ubicación, redes, horarios, beneficios, año actual.

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

## 📋 ARCHIVOS CLAVE PARA REFERENCIA

| Tipo                 | Archivo                               | Propósito                  |
| -------------------- | ------------------------------------- | -------------------------- |
| **Hook ejemplo**     | `hooks/useHome.ts`                    | Lógica + toasts + carrito  |
| **Diseño ejemplo**   | `components/products/ProductCard.tsx` | UI unificada               |
| **Conexión ejemplo** | `pages/Home.tsx`                      | Conexión lógica + UI       |
| **Helper ejemplo**   | `utils/errorMessages.ts`              | Toasts centralizados       |
| **Contexto ejemplo** | `context/AuthContext.tsx`             | Autenticación global       |
| **Config ejemplo**   | `config/empresa.ts`                   | Configuración centralizada |

---

## 📞 CONTACTO DEL NEGOCIO

**Dirección:** Uruguay 660, Valparaíso, Chile
**Horario:** Lun-Vie 9:00-18:30, Sáb 10:00-15:00
**WhatsApp:** +56975303324
**Email:** comercialuruguayvalpo@gmail.com
**Redes:** Facebook, Instagram, TikTok

---
