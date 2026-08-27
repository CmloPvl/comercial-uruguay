# 🏪 Comercial Uruguay — Documentación del Proyecto

**Versión:** `v1.2.0-beta.2`  
**Estado:** Producción (desplegado)  
**Desarrollador:** Camilo Riquelme

**Enlaces:**

- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay
- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com

---

## 📌 Contexto

**Comercial Uruguay** es la web app oficial de un comercio con más de 10 años en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

**Clientes pueden:**

- Explorar productos por categorías
- Consultar stock en tiempo real
- Armar carrito de compras
- Generar pedidos por WhatsApp
- Reservar productos

---

## 🛠️ Stack Tecnológico

| Capa               | Tecnología                           |
| ------------------ | ------------------------------------ |
| **Frontend**       | React 19 + TypeScript + Vite         |
| **Backend**        | Node.js 22 + Express + TypeScript    |
| **Base de Datos**  | PostgreSQL + Supabase                |
| **ORM**            | Prisma 7.9.0                         |
| **Estilos**        | Tailwind 3.4 + shadcn/ui             |
| **Storage**        | Supabase Storage                     |
| **Autenticación**  | JWT + bcryptjs                       |
| **Validación**     | Zod                                  |
| **Notificaciones** | react-hot-toast                      |
| **Email**          | Resend                               |
| **Despliegue**     | Vercel (frontend) + Render (backend) |

---

## 🎨 Paleta de Colores

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

## 🧠 Principio Fundamental: Separación de Lógica y Diseño (SoC)

| Capa          | Responsabilidad                     | Ejemplo           |
| ------------- | ----------------------------------- | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones | `useLogin.ts`     |
| `pages/`      | Conexión — Une UI + lógica          | `LoginPage.tsx`   |
| `context/`    | Estado Global                       | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend   | `api.ts`          |

---

## 📂 Estructura de Carpetas (Resumida)

frontend/src/
├── components/ # UI
│ ├── admin/ # Panel admin
│ ├── common/ # Reutilizables (Logo, SearchBar, ProtectedRoute)
│ ├── home/ # Secciones del Home
│ ├── layout/ # Navbar, Footer, AdminLayout, AdminNavbar
│ ├── ui/ # shadcn/ui
│ └── ...
├── hooks/ # Lógica (useLogin, useRegister, useProducts, etc.)
├── context/ # AuthContext, CartContext
├── services/ # API (productService, adminService, etc.)
├── pages/ # Páginas (Home, Productos, Carrito, Admin, etc.)
├── utils/ # Utilidades (errorMessages.ts, formatPrice, etc.)
├── lib/ # Clientes externos (supabase.ts)
└── config/ # Configuraciones (empresa.ts)
text

---

## ✅ Estado Actual del Proyecto

| Módulo                 | Componente                | Hook                      | Estado |
| ---------------------- | ------------------------- | ------------------------- | ------ |
| **Navbar**             | `Navbar.tsx`              | `useNavbar.ts`            | ✅     |
| **AdminNavbar**        | `AdminNavbar.tsx`         | -                         | ✅     |
| **Home**               | `Home.tsx`                | `useHome.ts`              | ✅     |
| **Footer**             | `Footer.tsx`              | -                         | ✅     |
| **Login**              | `Login.tsx`               | `useLogin.ts`             | ✅     |
| **Registro**           | `Registro.tsx`            | `useRegister.ts`          | ✅     |
| **Recuperar**          | `RecuperarContrasena.tsx` | `useRecoverPassword.ts`   | ✅     |
| **ResetPassword**      | `ResetPassword.tsx`       | -                         | ✅     |
| **Productos**          | `Productos.tsx`           | `useProducts.ts`          | ✅     |
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

---

## 🔧 Helper de Toasts (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

**Funciones disponibles:**

| Función                                       | Propósito                              |
| --------------------------------------------- | -------------------------------------- |
| `showErrorToast(error)`                       | Muestra error con estilos consistentes |
| `showErrorToastWithFallback(error, fallback)` | Muestra error con mensaje de fallback  |
| `showSuccessToast(message)`                   | Muestra éxito con estilos consistentes |
| `getErrorMessage(error)`                      | Extrae mensaje de error del objeto     |

**Mensajes predefinidos:**

```ts
successMessages   // Éxito (productos, categorías, pedidos, etc.)
infoMessages      // Informativos (sin productos, carrito vacío, etc.)
authErrors        // Errores de autenticación
productErrors     // Errores de productos
cartErrors        // Errores de carrito

Uso en hooks:
ts

import { showErrorToastWithFallback, showSuccessToast, successMessages, authErrors } from "../utils/errorMessages";

try {
  await login(email, password);
  showSuccessToast(successMessages.loginSuccess);
} catch (err) {
  showErrorToastWithFallback(err, authErrors.invalidCredentials);
}

📋 Metodología de Trabajo
Por Componente:

    Analizar el componente (identificar lógica y diseño)

    Crear hook personalizado (extraer toda la lógica)

    Simplificar el componente (dejar solo UI)

    Probar que todo funciona

    Documentar en el registro de mejoras

Estrategia:

    Ir uno por uno

    Micro-pasos (cambios pequeños y controlados)

    Probar después de cada cambio

    Mantener el código funcionando en todo momento

    Comentarios explicativos en el código

📋 Instrucciones para el Asistente

    ✅ Mantén el principio de Separación de Lógica y Diseño (SoC)

    ✅ Trabaja UNO POR UNO (no adelantarse)

    ✅ Micro-pasos: cambios pequeños y controlados

    ✅ Probar después de cada cambio

    ✅ Comentarios explicativos en el código

    ✅ Usa la paleta de colores definida

    ✅ Usa shadcn/ui para los componentes

    ✅ Usa react-hot-toast para notificaciones

    ✅ Documenta cada mejora

    ✅ Sin generar código hasta que el usuario confirme

📋 Archivos Clave para Referencia
Tipo	Archivo	Propósito
Hook ejemplo	hooks/useNavbar.ts	Lógica del navbar
Diseño ejemplo	components/layout/Navbar.tsx	UI del navbar
Conexión ejemplo	pages/Home.tsx	Conexión lógica + UI
Helper ejemplo	utils/errorMessages.ts	Toasts centralizados
Contexto ejemplo	context/AuthContext.tsx	Autenticación global

📋 Contacto

Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile
Horario: Lun-Vie 10:00-18:30, Sáb 10:00-15:00
WhatsApp: +569 1234 5678
Email: comercialuruguaychile@gmail.com
Redes: Facebook, Instagram, TikTok
```

---

## 🔴 MEJORAS PENDIENTES (POR PRIORIDAD)

| # | Mejora | Archivo | Prioridad | Estado |
|---|--------|---------|-----------|--------|
| 1 | **Redirigir usuarios logueados en `/registro`** | `pages/auth/Registro.tsx` | 🟡 MEDIA | ⏳ Pendiente |
| 2 | **Rate limiting en backend** | `backend/src/middlewares/rateLimit.middleware.ts` | ✅ YA EXISTE | ✅ Completado |
| 3 | **Verificación de email** | `backend/src/controllers/auth.controller.ts` | 🟡 MEDIA | ⏳ Pendiente |
| 4 | **Forzar mayúscula en nombre** | `pages/auth/Registro.tsx` | 🟢 BAJA | ⏳ Pendiente |
| 5 | **Mostrar fortaleza de contraseña** | `pages/auth/Registro.tsx` | 🟢 BAJA | ⏳ Pendiente |

---

## 🛡️ SEGURIDAD IMPLEMENTADA

| Medida | Estado | Ubicación |
|--------|--------|-----------|
| **Rate limiting** | ✅ Implementado | `backend/src/middlewares/rateLimit.middleware.ts` |
| **Validación Zod (frontend)** | ✅ Implementado | `frontend/src/schemas/auth.schema.ts` |
| **Validación Zod (backend)** | ✅ Implementado | `backend/src/schemas/auth.schema.ts` |
| **Sanitización de datos** | ✅ Implementado | `backend/src/middlewares/sanitize.middleware.ts` |
| **Prevención SQL injection** | ✅ Implementado | Prisma ORM |
| **JWT autenticación** | ✅ Implementado | `backend/src/middlewares/auth.middleware.ts` |
| **Redirección usuarios logueados en registro** | ⏳ Pendiente | `frontend/src/pages/auth/Registro.tsx` |


---

## ⚠️ PRISMA: ACLARACIÓN

**Prisma está instalado pero NO se usa en el proyecto.**

- **Estado:** Instalado pero sin migración
- **Motivo:** El código actual usa SQL puro con `pg` y funciona correctamente
- **Decisión:** No se migrará a Prisma por ahora (riesgo y complejidad innecesarios)
- **Futuro:** Podría considerarse en una refactorización mayor, pero no es prioritario

**Stack actual:** `node-postgres` (pg) + SQL puro
**Stack alternativo:** Prisma (instalado pero no usado)

