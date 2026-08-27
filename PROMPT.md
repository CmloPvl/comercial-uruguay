📋 PROMPT MEJORADO — COMERCIAL URUGUAY (v2.0)
markdown

📋 PROMPT COMPLETO — COMERCIAL URUGUAY (v2.0)

---

## 1. CONTEXTO DEL PROYECTO

**Proyecto:** Comercial Uruguay
**Tipo:** Web App (e-commerce)
**Estado:** Producción (desplegado)
**Versión:** 1.2.0-beta.1
**Desarrollador:** Camilo Riquelme

**Enlaces:**

- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay
- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com

**Descripción:**
Web app oficial de un comercio con más de 10 años en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

**Clientes pueden:**

- Explorar productos por categorías
- Consultar stock en tiempo real
- Armar carrito de compras
- Generar pedidos por WhatsApp
- Reservar productos

---

### Stack Tecnológico

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

### Paleta de Colores

| Rol            | Color           | Hex       |
| -------------- | --------------- | --------- |
| **Primary**    | Deep Purple     | `#603060` |
| **Secondary**  | Purple Electric | `#7D5FFF` |
| **Accent**     | Cyan            | `#00D2D3` |
| **Accent**     | Yellow Bright   | `#FFD93D` |
| **Accent**     | Pink Vibrant    | `#FF6B81` |
| **Accent**     | Orange Intense  | `#FF9F43` |
| **Accent**     | Mint Green      | `#90C090` |
| **Text**       | Charcoal        | `#303030` |
| **Text**       | Slate Gray      | `#6A757C` |
| **Background** | Cream           | `#FAF9E2` |

---

## 2. ARQUITECTURA DEL PROYECTO

### Principio Fundamental: SEPARACIÓN DE LÓGICA Y DISEÑO (SoC)

| Capa          | Responsabilidad                                        | Ejemplo           |
| ------------- | ------------------------------------------------------ | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos, estructura visual     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones, manejo de errores | `useLogin.ts`     |
| `pages/`      | Conexión — Une diseño + lógica                         | `LoginPage.tsx`   |
| `context/`    | Estado Global — Datos compartidos                      | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend                      | `auth.service.ts` |

---

### Estructura de Carpetas (REAL)

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # DashboardStats, ImageUploader, ProductTable
│ │ └── products/ # ProductForm y subcomponentes
│ ├── auth/ # SocialLogin
│ ├── cart/ # CartItem, CartSummary
│ ├── common/ # AppBreadcrumb, ErrorMessage, LoadingSpinner, Logo, ProtectedRoute
│ ├── home/ # Hero, Categories, Featured, Benefits, Location
│ ├── layout/ # Navbar, Footer, AdminLayout, AdminNavbar
│ ├── products/ # ProductCard, ProductFilters, ProductGrid, ProductList, ProductsBanner
│ └── ui/ # shadcn/ui (todos los componentes)
│
├── hooks/ # 🧠 Lógica
│ ├── useAuth.ts # Autenticación global
│ ├── useLogin.ts # Login
│ ├── useRegister.ts # Registro
│ ├── useRecoverPassword.ts # Recuperar contraseña
│ ├── useNavbar.ts # Navbar
│ ├── useHome.ts # Home
│ ├── useProducts.ts # Productos (tienda)
│ ├── useProductoDetalle.ts # Detalle de producto
│ ├── useCarrito.ts # Carrito
│ ├── useFavoritos.ts # Favoritos
│ ├── usePerfil.ts # Perfil de usuario
│ ├── useAdminDashboard.ts # Dashboard admin
│ ├── useAdminProductos.ts # Admin productos
│ ├── useAdminCategorias.ts # Admin categorías
│ ├── useAdminPedidos.ts # Admin pedidos
│ ├── useAdminUsuarios.ts # Admin usuarios
│ ├── useCrearPublicacion.ts # Crear producto
│ ├── useEditarPublicacion.ts # Editar producto
│ └── use-supabase-upload.ts # Subida a Supabase
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── api.ts
│ ├── auth.service.ts
│ ├── productService.ts
│ ├── cartService.ts
│ ├── categoryService.ts
│ ├── favoriteService.ts
│ ├── orderService.ts
│ ├── userService.ts
│ └── adminService.ts
│
├── pages/ # 📄 Páginas
│ ├── Home.tsx ✅
│ ├── Productos.tsx ✅
│ ├── Carrito.tsx ✅
│ ├── Perfil.tsx ✅
│ ├── Favoritos.tsx ✅
│ ├── MisPedidos.tsx ✅
│ ├── DetallePedido.tsx ✅
│ ├── ProductoDetalle.tsx ✅
│ ├── EnviosYRetiros.tsx ✅
│ ├── Envios.tsx ✅
│ ├── RetiroTienda.tsx ✅
│ ├── Contacto.tsx ✅
│ ├── Nosotros.tsx ✅
│ ├── Ofertas.tsx ✅
│ ├── Terminos.tsx ✅
│ ├── Privacidad.tsx ✅
│ ├── NotFound.tsx ✅
│ ├── auth/ # Login, Registro, Recuperar, ResetPassword
│ └── admin/ # Dashboard, Productos, Pedidos, Categorías, Usuarios
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts
│
├── types/ # 📌 Tipos TypeScript
│ └── index.ts
│
├── utils/ # 🛠️ Utilidades
│ ├── categoryUtils.ts
│ ├── formatPrice.ts
│ ├── perfilUtils.ts
│ ├── validators.ts
│ ├── errorMessages.ts # ✅ Helper de toasts centralizado
│ └── index.ts
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
└── index.css
text

---

## 3. ESTADO ACTUAL DEL PROYECTO (REAL)

### ✅ COMPLETADO (100%)

| Módulo                 | Componente                | Hook                      | Estado |
| ---------------------- | ------------------------- | ------------------------- | ------ |
| **Navbar**             | `Navbar.tsx`              | `useNavbar.ts`            | ✅     |
| **AdminNavbar**        | `AdminNavbar.tsx`         | -                         | ✅     |
| **Home**               | `Home.tsx`                | `useHome.ts`              | ✅     |
| **Footer**             | `Footer.tsx`              | -                         | ✅     |
| **Login**              | `Login.tsx`               | `useLogin.ts`             | ✅     |
| **Registro**           | `Registro.tsx`            | `useRegister.ts`          | ✅     |
| **Recuperar**          | `RecuperarContrasena.tsx` | `useRecoverPassword.ts`   | ✅     |
| **Productos**          | `Productos.tsx`           | `useProducts.ts`          | ✅     |
| **ProductoDetalle**    | `ProductoDetalle.tsx`     | `useProductoDetalle.ts`   | ✅     |
| **Carrito**            | `Carrito.tsx`             | `useCarrito.ts`           | ✅     |
| **Perfil**             | `Perfil.tsx`              | `usePerfil.ts`            | ✅     |
| **Favoritos**          | `Favoritos.tsx`           | `useFavoritos.ts`         | ✅     |
| **MisPedidos**         | `MisPedidos.tsx`          | -                         | ✅     |
| **Admin Dashboard**    | `Dashboard.tsx`           | `useAdminDashboard.ts`    | ✅     |
| **Admin Productos**    | `AdminProductos.tsx`      | `useAdminProductos.ts`    | ✅     |
| **Admin Categorías**   | `AdminCategorias.tsx`     | `useAdminCategorias.ts`   | ✅     |
| **Admin Pedidos**      | `Pedidos.tsx`             | `useAdminPedidos.ts`      | ✅     |
| **Admin Usuarios**     | `Usuarios.tsx`            | `useAdminUsuarios.ts`     | ✅     |
| **Crear Publicación**  | `CrearPublicacion.tsx`    | `useCrearPublicacion.ts`  | ✅     |
| **Editar Publicación** | `EditarPublicacion.tsx`   | `useEditarPublicacion.ts` | ✅     |
| **Envios y Retiros**   | `EnviosYRetiros.tsx`      | -                         | ✅     |
| **Subida de Imágenes** | `ImageUploader.tsx`       | `use-supabase-upload.ts`  | ✅     |

### 🔄 EN PROGRESO

| Módulo            | Estado | Pendiente                                    |
| ----------------- | ------ | -------------------------------------------- |
| **ResetPassword** | 🔄     | Crear `useResetPassword.ts` y simplificar UI |

### ⏳ PENDIENTES

| Tarea               | Prioridad | Descripción                                                |
| ------------------- | --------- | ---------------------------------------------------------- |
| 1. Helper Toasts    | 🔴 ALTA   | Integrar `errorMessages.ts` en todos los hooks y servicios |
| 2. AdminNavbar      | 🔴 ALTA   | Agregar botones Favoritos y Carrito (accesos rápidos)      |
| 3. ResetPassword    | 🟡 MEDIA  | Crear `useResetPassword.ts`                                |
| 4. Mejoras visuales | 🟢 BAJA   | Revisar y pulir detalles de UI/UX                          |

---

## 4. HELPER DE TOASTS

### Archivo: `frontend/src/utils/errorMessages.ts`

**Funciones disponibles:**

```typescript
// 📌 Manejo de errores
getErrorMessage(error): string       // Extrae mensaje de error
showErrorToast(error)                // Muestra error con estilos consistentes
showSuccessToast(message, icon?)     // Muestra éxito con estilos consistentes

// 📌 Mensajes predefinidos
successMessages: { ... }             // Éxito (productos, categorías, pedidos, etc.)
infoMessages: { ... }               // Informativos (no products, empty cart, etc.)

Uso en hooks:
typescript

import { showErrorToast, showSuccessToast } from "../../utils/errorMessages";

// En try/catch
try {
  await productService.create(data);
  showSuccessToast(successMessages.productCreated);
} catch (error) {
  showErrorToast(error);
}

5. MODELO DE TRABAJO
Metodología por Componente

    Analizar el componente actual (identificar lógica y diseño)

    Crear hook personalizado (extraer toda la lógica)

    Simplificar el componente (dejar solo UI)

    Probar que todo funciona

    Documentar en el registro de mejoras

Estrategia de Trabajo

    Ir uno por uno (no adelantarse)

    Micro-pasos (cambios pequeños y controlados)

    Probar después de cada cambio

    Mantener el código funcionando en todo momento

    Comentarios explicativos en el código

6. INSTRUCCIONES PARA EL ASISTENTE

    ✅ Mantén el principio de SEPARACIÓN DE LÓGICA Y DISEÑO (SoC)

    ✅ Trabaja UNO POR UNO (no adelantarse)

    ✅ Micro-pasos: cambios pequeños y controlados

    ✅ Probar después de cada cambio

    ✅ Comentarios explicativos en el código

    ✅ Usa la paleta de colores definida

    ✅ Usa shadcn/ui para los componentes

    ✅ Usa react-hot-toast para notificaciones

    ✅ Usa framer-motion para animaciones

    ✅ Documenta cada mejora en el registro

Directrices Adicionales

    Sin generar código hasta que el usuario lo confirme

    Analizar primero, proponer mejoras, luego implementar

    No cambiar diseño ni lógica si no es requerido o pedido explícitamente

    Prisma está instalado pero no hay migración - tenerlo en cuenta

7. ARCHIVOS CLAVE PARA REFERENCIA
Tipo	Archivo	Propósito
Hook ejemplo	hooks/useNavbar.ts	Lógica de navbar
Diseño ejemplo	components/layout/Navbar.tsx	UI de navbar
Conexión ejemplo	pages/Home.tsx	Conexión lógica + UI
Helper ejemplo	utils/errorMessages.ts	Toasts centralizados
Contexto ejemplo	context/AuthContext.tsx	Estado global de autenticación
8. REGISTRO DE MEJORAS
📋 Mejoras Realizadas
Componente	Mejora	Estado
Navbar	Lógica extraída a useNavbar.ts	✅
Navbar	Menús aislados (User, Guest, Mobile)	✅
Home	Lógica extraída a useHome.ts	✅
Footer	Rediseño inspirado en Falabella/Ripley	✅
EnviosYRetiros	Página completa con anclas	✅
ProductForm	Optimizado (900 → 250 líneas)	✅
AppBreadcrumb	Universal (reduce ~200 líneas)	✅
form-field	Reutilizable (reduce ~300 líneas)	✅
categoryUtils	Colores e iconos centralizados	✅
errorMessages	Helper de toasts centralizado	✅
Supabase Storage	Subida de imágenes con Dropzone	✅
9. PRÓXIMAS TAREAS (POR ORDEN DE PRIORIDAD)
#	Tarea	Archivos Involucrados	Prioridad
1	Integrar errorMessages.ts en todos los hooks y services	hooks/*.ts, services/*.ts	🔴 ALTA
2	Agregar Favoritos y Carrito en AdminNavbar	AdminNavbar.tsx	🔴 ALTA
3	Crear useResetPassword.ts	hooks/useResetPassword.ts	🟡 MEDIA
4	Mejorar navegación admin (dropdown Productos)	AdminNavbar.tsx	🟡 MEDIA
10. CONTACTO

Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile
Horario: Lun-Vie 10:00-18:30, Sáb 10:00-15:00
WhatsApp: +569 1234 5678
Email: comercialuruguaychile@gmail.com
Redes: Facebook, Instagram, TikTok
text


---

## 📋 **RESUMEN DE MEJORAS AL PROMPT**

| Mejora | Antes | Después |
|--------|-------|---------|
| **Estado del proyecto** | Desactualizado (decía que muchas cosas estaban pendientes) | ✅ Refleja la realidad: todo está completado |
| **Estructura de hooks** | Incompleta (solo 7 hooks listados) | ✅ Completa (19 hooks listados) |
| **Helper de toasts** | No existía | ✅ Sección completa con funciones y uso |
| **Tareas pendientes** | Duplicadas y desactualizadas | ✅ Priorizadas y claras |
| **Arquitectura** | Desactualizada | ✅ Real y verificada con el repositorio |
| **Información del proyecto** | Básica | ✅ Más detallada (versión, enlaces, contacto) |
```
