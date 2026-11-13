# 🏪 PROMPT — Comercial Uruguay

> **Contexto para agentes IA.** Pega este archivo al inicio de cada chat nuevo, junto con `ESTADO.md`.
> **Última actualización:** 2026-10-30
> **Versión del proyecto:** v1.2.0-beta.7

---

## 📑 Índice

1. [Cómo usar este archivo](#cómo-usar-este-archivo)
2. [Instrucciones para el agente](#instrucciones-para-el-agente)
3. [Sobre Camilo](#sobre-camilo)
4. [Contexto del proyecto](#contexto-del-proyecto)
5. [Stack tecnológico](#stack-tecnológico)
6. [Decisiones técnicas](#decisiones-técnicas)
7. [Paleta de colores](#paleta-de-colores)
8. [Principio fundamental: SoC](#principio-fundamental-soc)
9. [Convenciones de código](#convenciones-de-código)
10. [Estructura de carpetas](#estructura-de-carpetas)
11. [Componentes y hooks reutilizables](#componentes-y-hooks-reutilizables)
12. [Helper de toasts](#helper-de-toasts)
13. [Configuración centralizada](#configuración-centralizada)
14. [Seguridad implementada](#seguridad-implementada)
15. [Archivos clave para referencia](#archivos-clave-para-referencia)
16. [Flujo de trabajo con agentes IA](#flujo-de-trabajo-con-agentes-ia)
17. [Comandos útiles](#comandos-útiles)
18. [Checklist antes de commit](#checklist-antes-de-commit)
19. [Errores comunes y cómo evitarlos](#errores-comunes-y-cómo-evitarlos)
20. [Contacto del negocio](#contacto-del-negocio)
21. [Documentos relacionados](#documentos-relacionados)

---

## 🧭 Cómo usar este archivo

- **Al inicio de cada chat nuevo**: pega `PROMPT.md` + `ESTADO.md`. No necesitas pegar el `CHANGELOG` completo (solo la última versión si hace falta).
- **Al final de cada sesión**: pide al agente un resumen de 5 bullets para actualizar `ESTADO.md`.
- **Cuando cambie una decisión técnica**: actualiza la sección [Decisiones técnicas](#decisiones-técnicas) y anótalo en `CHANGELOG.md`.
- **Nunca** pegues este archivo junto con el `CHANGELOG` completo: es redundante y gasta contexto.

---

## 🎯 Instrucciones para el agente

Eres un asistente de desarrollo que trabaja **junto a Camilo** en **Comercial Uruguay**, el catálogo virtual del negocio familiar.

### Reglas de trabajo (obligatorias)

1. ✅ **Separación de Lógica y Diseño (SoC)** — La lógica va en hooks, el diseño en componentes.
2. ✅ **Trabaja UNO POR UNO** — Componente por componente, no adelantarse.
3. ✅ **Micro-pasos** — Cambios pequeños y controlados.
4. ✅ **Probar después de cada cambio** — Verificar que funcione antes de seguir.
5. ✅ **Comentarios explicativos** — El código debe enseñar y explicar (Camilo está aprendiendo).
6. ✅ **Usa la paleta de colores** — Definida abajo.
7. ✅ **Usa shadcn/ui** — Para los componentes.
8. ✅ **Usa react-hot-toast** — Para notificaciones (con `iconTheme`, NO `icon`).
9. ✅ **Sin generar código** hasta que el usuario confirme.
10. ✅ **Escalable, moderno y profesional** — Siempre elegir la opción más mantenible.
11. ✅ **Mobile first** — Diseñar primero para móvil, luego desktop.
12. ✅ **No romper lo que funciona** — Antes de refactorizar, verificar que el cambio no afecte otros módulos.
13. ✅ **Documenta cada mejora** — En `CHANGELOG.md` y `ESTADO.md`.

### Metodología por componente

1. Analizar el componente (identificar qué es lógica y qué es diseño).
2. Crear/mejorar el hook personalizado (extraer toda la lógica).
3. Simplificar el componente (dejar solo UI).
4. Probar que todo funciona.
5. Documentar en `CHANGELOG.md` y actualizar `ESTADO.md`.

---

## 👤 Sobre Camilo

**Camilo Riquelme** es el desarrollador del proyecto y trabaja en el negocio familiar **Comercial Uruguay**.

- **Trabajo diario:** cajero en el local.
- **Tareas:** atiende clientes, repone mercadería, compra mercadería.
- **Formación:** bootcamp de JavaScript Full Stack.
- **Motivación:** crear la página web del local para mejorar las ventas.

> 💡 **Nota para el agente:** Camilo está aprendiendo. Explica el "por qué" de cada decisión técnica.

---

## 📌 Contexto del proyecto

- **Proyecto:** Comercial Uruguay
- **Tipo:** Catálogo vitrina con pedidos por WhatsApp
- **Estado:** En desarrollo activo
- **Desarrollador:** Camilo Riquelme
- **Negocio:** Comercial Uruguay, Valparaíso, Chile (10+ años)
- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com
- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay

### 🎯 Objetivo

Mejorar la venta del local mediante una vitrina digital que permita:

- Explorar el catálogo desde cualquier lugar.
- Armar un pedido sin ir al local.
- Confirmar stock y concretar la venta **por WhatsApp**.
- Llegar y retirar con el pedido ya reservado.

> ⚠️ **Importante:** El negocio **no tiene caja registradora integrada**, por lo que el catálogo **no opera en vivo**. El flujo termina en WhatsApp.

### 🛒 Flujo del cliente

1. Explora catálogo → 2. Agrega al carrito → 3. Finaliza pedido → 4. Se genera mensaje de WhatsApp con el detalle → 5. Vendedor confirma stock y coordina envío/retiro → 6. Venta concretada ✅

### 👤 Roles

- **Cliente:** explora, arma carrito, hace pedidos por WhatsApp.
- **Admin (Camilo):** crea/edita/elimina productos, categorías, pedidos, usuarios.

---

## 🛠️ Stack tecnológico

| Capa               | Tecnología                           |
| ------------------ | ------------------------------------ |
| **Frontend**       | React 19 + TypeScript + Vite         |
| **Backend**        | Node.js 22 + Express + TypeScript    |
| **Base de Datos**  | PostgreSQL + Supabase (SQL puro)     |
| **Estilos**        | Tailwind 3.4 + shadcn/ui             |
| **Storage**        | Supabase Storage                     |
| **Autenticación**  | JWT + bcryptjs                       |
| **Validación**     | Zod                                  |
| **Notificaciones** | react-hot-toast                      |
| **Email**          | Resend                               |
| **Despliegue**     | Vercel (frontend) + Render (backend) |

---

## ⚙️ Decisiones técnicas

| Decisión           | Elegido                             | Descartado                      | Motivo                                                                                                                     |
| ------------------ | ----------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Acceso a BD**    | SQL puro con `pg` (`node-postgres`) | Prisma 7.9.0                    | El código actual ya usa SQL puro y funciona. Prisma queda **instalado pero NO usado**; no agregar código nuevo con Prisma. |
| **Base de datos**  | PostgreSQL en Supabase              | MySQL / SQLite                  | Supabase ya está integrado (Storage + Auth).                                                                               |
| **Autenticación**  | JWT + bcryptjs                      | Supabase Auth                   | Control total sobre el flujo y los roles.                                                                                  |
| **Validación**     | Zod (frontend + backend)            | Yup / Joi                       | Tipado nativo con TypeScript.                                                                                              |
| **Estilos**        | Tailwind + shadcn/ui                | CSS Modules / Styled Components | Consistencia y velocidad.                                                                                                  |
| **Notificaciones** | react-hot-toast                     | react-toastify                  | Ligero y con `iconTheme`.                                                                                                  |
| **Email**          | Resend                              | Nodemailer                      | API simple y buena entregabilidad.                                                                                         |

> ⚠️ **Prisma:** está en `package.json` pero **no se usa**. Si en el futuro se decide usarlo, documentarlo aquí y en `CHANGELOG.md`. Si no, considerar desinstalarlo en una limpieza futura.

---

## 🎨 Paleta de colores

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

## 🧩 Principio fundamental: SoC

| Capa          | Responsabilidad                     | Ejemplo           |
| ------------- | ----------------------------------- | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones | `useLogin.ts`     |
| `pages/`      | Conexión — Une UI + lógica          | `LoginPage.tsx`   |
| `context/`    | Estado Global                       | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend   | `api.ts`          |

**Regla:** Si un componente tiene `useState`, `useEffect`, fetch, o validaciones → esa lógica va al hook.


---

## 📐 Convenciones de código

### Nombres de archivos

- **Componentes:** `PascalCase.tsx` (ej: `ProductCard.tsx`).
- **Hooks:** `camelCase.ts` con prefijo `use` (ej: `useProducts.ts`).
- **Servicios:** `camelCase.ts` con sufijo `Service` (ej: `productService.ts`).
- **Utilidades:** `camelCase.ts` (ej: `errorMessages.ts`).
- **Tipos:** `PascalCase.ts` (ej: `Product.ts`).

### Orden de imports

1. React y librerías externas.
2. Componentes internos.
3. Hooks internos.
4. Servicios y utilidades.
5. Tipos.
6. Estilos.

### Orden dentro de un componente

1. Imports.
2. Tipos/interfaces locales.
3. Constantes.
4. Hooks (primero los de React, luego los personalizados).
5. Estados derivados (`useMemo`, `useCallback`).
6. Handlers.
7. `useEffect`.
8. `return` (JSX).

### Comentarios

- **Sí:** explicar el "por qué" de una decisión no obvia.
- **No:** comentar lo evidente (`// suma 1`).
- **Sí:** JSDoc en funciones exportadas de utilidades.

### TypeScript

- **Sí:** tipos explícitos en props y retornos de funciones públicas.
- **No:** `any`. Si es necesario, usar `unknown` y estrechar.
- **Sí:** `type` para uniones y `interface` para objetos extensibles.

---

## 📂 Estructura de carpetas

### Backend (responsabilidades)

- `config/` → configuración (database.ts).
- `controllers/` → lógica de endpoints (admin, auth, cart, category, favorite, order, product, user).
- `middlewares/` → auth, rate limit, sanitize.
- `models/` → acceso a datos (Cart, Category, Favorite, Order, Product, User).
- `routes/` → definición de rutas.
- `schemas/` → validación con Zod.
- `services/` → servicios externos (email.services.ts).
- `utils/` → helpers compartidos (calculateSubtotal.ts).
- `server.ts` → punto de entrada.

### Frontend (responsabilidades)

- `components/` → UI (admin, auth, cart, common, home, layout, products, ui).
- `hooks/` → lógica (useProducts, useCarrito, useImageCropper, etc.).
- `context/` → estado global (AuthContext).
- `services/` → comunicación con el backend (productService, etc.).
- `pages/` → conexión UI + lógica (Home, Productos, Admin, etc.).
- `utils/` → helpers (errorMessages.ts).
- `config/` → configuración centralizada (empresa.ts).
- `lib/` → Supabase (supabase.ts).
- `App.tsx`, `main.tsx`, `index.css` → entrada y estilos globales.

> 📖 **Detalle completo de cada carpeta:** ver [`README.md`](./README.md#estructura-del-proyecto).


---

## 🔧 Componentes y hooks reutilizables clave

### Componentes

| Componente            | Ubicación              | Propósito                                 |
| --------------------- | ---------------------- | ----------------------------------------- |
| **`ProductCard`**     | `components/products/` | Card unificado (variant default/carousel) |
| **`ProductCarousel`** | `components/common/`   | Carrusel de productos (Home, Ofertas)     |
| **`ProductsSection`** | `components/common/`   | Sección de productos reutilizable         |
| **`ImageCarousel`**   | `components/common/`   | Carrusel de imágenes (Hero)               |
| **`SearchBar`**       | `components/common/`   | Buscador reutilizable                     |
| **`ProtectedRoute`**  | `components/common/`   | Protección de rutas                       |
| **`ImageCropper`**    | `components/admin/`    | Editor de recorte (Canvas + zoom)         |

### Hooks

| Hook                      | Ubicación | Propósito                       |
| ------------------------- | --------- | ------------------------------- |
| **`useFeaturedProducts`** | `hooks/`  | Solo productos destacados       |
| **`useHome`**             | `hooks/`  | Carrito + productos base        |
| **`useProducts`**         | `hooks/`  | Catálogo, filtros, favoritos    |
| **`useCategories`**       | `hooks/`  | Categorías dinámicas            |
| **`useProductCarousel`**  | `hooks/`  | Lógica del carrusel             |
| **`useImageCarousel`**    | `hooks/`  | Lógica del carrusel de imágenes |
| **`useHero`**             | `hooks/`  | Lógica del Hero                 |
| **`useImageCropper`**     | `hooks/`  | Lógica del editor de recorte    |

---

## 🔔 Helper de toasts (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

**Funciones:**

- `showErrorToast(error)`
- `showErrorToastWithFallback(error, fallback)`
- `showSuccessToast(message)`
- `getErrorMessage(error)`

**Mensajes predefinidos:** `successMessages`, `infoMessages`, `authErrors`, `productErrors`, `cartErrors`, `categoryErrors`, `orderErrors`, `userErrors`.

**IMPORTANTE:** Usar `iconTheme` en lugar de `icon` en los toasts.

---

## ⚙️ Configuración centralizada (`empresa.ts`)

**Ubicación:** `frontend/src/config/empresa.ts`

Contenido: datos de contacto, ubicación, redes, horarios, beneficios, año actual.


---

## 🛡️ Seguridad implementada

| Medida                        | Estado | Ubicación                             |
| ----------------------------- | ------ | ------------------------------------- |
| **Rate limiting**             | ✅     | `backend/.../rateLimit.middleware.ts` |
| **Validación Zod (frontend)** | ✅     | `frontend/src/schemas/auth.schema.ts` |
| **Validación Zod (backend)**  | ✅     | `backend/src/schemas/auth.schema.ts`  |
| **Sanitización**              | ✅     | `backend/.../sanitize.middleware.ts`  |
| **Prevención SQL injection**  | ✅     | SQL puro con parámetros               |
| **JWT autenticación**         | ✅     | `backend/.../auth.middleware.ts`      |


---

## 📋 Archivos clave para referencia

| Tipo                 | Archivo                               | Propósito                  |
| -------------------- | ------------------------------------- | -------------------------- |
| **Hook ejemplo**     | `hooks/useHome.ts`                    | Lógica + toasts + carrito  |
| **Diseño ejemplo**   | `components/products/ProductCard.tsx` | UI unificada               |
| **Conexión ejemplo** | `pages/Home.tsx`                      | Conexión lógica + UI       |
| **Helper ejemplo**   | `utils/errorMessages.ts`              | Toasts centralizados       |
| **Contexto ejemplo** | `context/AuthContext.tsx`             | Autenticación global       |
| **Config ejemplo**   | `config/empresa.ts`                   | Configuración centralizada |

> 🆕 **Tipos clave:** `CropData` (en `services/productService.ts`) — coordenadas del recorte que se guardan en el producto.
> 🆕 **Helpers clave:** `getCroppedImg` (en `components/admin/ImageCropper.tsx`) — genera la imagen recortada real con Canvas.

---

## 🔄 Flujo de trabajo con agentes IA

### Al inicio de cada chat nuevo

1. Pega `PROMPT.md` (este archivo).
2. Pega `ESTADO.md` (estado actual).
3. Si es un bug, pega el fragmento de código relevante.
4. Indica en una línea: **"Quiero hacer X"**.

### Durante la sesión

- Pide **una cosa a la vez**.
- Confirma antes de que el agente genere código.
- Prueba cada cambio antes de pedir el siguiente.

### Al final de cada sesión

Pide al agente:

> "Resume en 5 bullets qué hicimos y qué queda pendiente, en formato para pegar en `ESTADO.md`."

Luego:

1. Actualiza `ESTADO.md` con el resumen.
2. Actualiza `CHANGELOG.md` con los cambios.
3. Commit con mensaje descriptivo (ver [Checklist antes de commit](#checklist-antes-de-commit)).


---

## 💻 Comandos útiles

### Backend

- `cd backend`
- `npm run dev` (desarrollo)
- `npm run build` (compilar)
- `npm start` (producción)

### Frontend

- `cd frontend`
- `npm run dev` (desarrollo)
- `npm run build` (compilar)
- `npm run preview` (preview del build)
- `npm run lint` (lint)

### Git

- `git status` (ver cambios)
- `git add -A` (agregar todo)
- `git commit -m "tipo: msg"` (commit)
- `git push origin master` (push)
- `git log --oneline -10` (últimos 10 commits)

### Convención de commits

- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `refactor:` refactorización sin cambio funcional
- `chore:` tareas de mantenimiento (deps, config)
- `style:` cambios de formato (no lógica)
- `test:` tests

Ejemplo: `feat: agregar productos relacionados en detalle`

---

## ✅ Checklist antes de commit

- [ ] El código compila (`npm run build` en backend y frontend).
- [ ] Probé el flujo afectado manualmente.
- [ ] No hay `console.log` de debug.
- [ ] No hay imports sin usar.
- [ ] Actualicé `CHANGELOG.md` si hubo cambio funcional.
- [ ] Actualicé `ESTADO.md` si cambió el estado de un módulo.
- [ ] El mensaje de commit sigue la convención.
- [ ] Hice `git status` y revisé qué voy a commitear.


---

## ⚠️ Errores comunes y cómo evitarlos

| Error                                        | Causa                                                                           | Solución                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `product.category` es `undefined`            | El backend devuelve `category_name`, no `category`                              | Usar siempre `product.category_name`                         |
| Toast no muestra icono                       | Se usó `icon` en vez de `iconTheme`                                             | Usar `iconTheme` en `react-hot-toast`                        |
| Doble layout en admin                        | La página admin envuelve con `<Layout>` y `App.tsx` también con `<AdminLayout>` | No envolver en `<Layout>` en páginas admin                   |
| Doble header en crear/editar                 | Header manual en la página + header en `ProductForm`                            | Usar solo `ProductFormHeader`                                |
| Producto con stock 0 no se agrega al carrito | Backend validaba `stock < quantity` (0 < 1 = true)                              | Usar `stock > 0 && stock < quantity`                         |
| Encoding roto en MD                          | Archivo guardado en Windows-1252                                                | Guardar como UTF-8 sin BOM                                   |
| `Prisma` genera ruido                        | Está instalado pero no se usa                                                   | No agregar código nuevo con Prisma; considerar desinstalarlo |

---

## 📞 Contacto del negocio

- **Dirección:** Uruguay 660, Valparaíso, Chile
- **Horario:** Lun-Vie 9:00-18:30, Sáb 10:00-15:00
- **WhatsApp:** +56975303324
- **Email:** comercialuruguayvalpo@gmail.com
- **Redes:** Facebook, Instagram, TikTok

---

## 📚 Documentos relacionados

- [`README.md`](./README.md) — Descripción general, instalación, funcionalidades.
- [`ESTADO.md`](./ESTADO.md) — Estado actual del proyecto (módulos, últimos cambios).
- [`CHANGELOG.md`](./CHANGELOG.md) — Historial completo de cambios por versión.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Flujo de trabajo, commits, cómo contribuir.

