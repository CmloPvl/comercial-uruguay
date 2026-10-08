markdown

# 🏪 Comercial Uruguay — Documentación del Proyecto

**Versión:** `v1.2.0-beta.3`  
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
| **ORM**            | Prisma 7.9.0 (instalado, no usado)   |
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

## ✅ Estado Actual del Proyecto

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

## 🔧 Componentes Reutilizables

| Componente            | Ubicación                   | Propósito                              |
| --------------------- | --------------------------- | -------------------------------------- |
| **`ImageCarousel`**   | `components/common/`        | Carrusel de imágenes (Hero, Productos) |
| **`ProductCarousel`** | `components/common/`        | Carrusel de productos (Home, Ofertas)  |
| **`SearchBar`**       | `components/common/`        | Buscador reutilizable                  |
| **`Logo`**            | `components/common/`        | Logo de la empresa                     |
| **`ProtectedRoute`**  | `components/common/`        | Protección de rutas                    |
| **`FooterColumn`**    | `components/layout/footer/` | Columna del Footer                     |
| **`FooterSocial`**    | `components/layout/footer/` | Redes sociales del Footer              |
| **`FooterServices`**  | `components/layout/footer/` | Franja de servicios                    |

---

## 🔧 Hooks Reutilizables

| Hook                     | Ubicación | Propósito                                      |
| ------------------------ | --------- | ---------------------------------------------- |
| **`useCategories`**      | `hooks/`  | Categorías dinámicas (Hero, CategoriesSection) |
| **`useProductCarousel`** | `hooks/`  | Lógica del carrusel de productos               |
| **`useImageCarousel`**   | `hooks/`  | Lógica del carrusel de imágenes                |
| **`useHero`**            | `hooks/`  | Lógica del Hero (imágenes del local)           |
| **`useHome`**            | `hooks/`  | Productos destacados + carrito                 |

---

## 🔧 Helper de Toasts (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

| Función                                       | Propósito                              |
| --------------------------------------------- | -------------------------------------- |
| `showErrorToast(error)`                       | Muestra error con estilos consistentes |
| `showErrorToastWithFallback(error, fallback)` | Muestra error con mensaje de fallback  |
| `showSuccessToast(message)`                   | Muestra éxito con estilos consistentes |
| `getErrorMessage(error)`                      | Extrae mensaje de error del objeto     |

**Mensajes predefinidos:** `successMessages`, `infoMessages`, `authErrors`, `productErrors`, `cartErrors`, `categoryErrors`, `orderErrors`, `userErrors`.

**Uso en hooks:**

````ts
import { showErrorToastWithFallback, showSuccessToast, successMessages, authErrors } from "../utils/errorMessages";

try {
  await login(email, password);
  showSuccessToast(successMessages.loginSuccess);
} catch (err) {
  showErrorToastWithFallback(err, authErrors.invalidCredentials);
}

⚙️ Configuración Centralizada (empresa.ts)

Ubicación: frontend/src/config/empresa.ts

Contenido:

    Datos de contacto (teléfono, email, WhatsApp)

    Ubicación (dirección, coordenadas, Google Maps)

    Redes sociales (URL + color + label)

    Horarios (simple + detallado)

    Beneficios

    Año actual

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

    ✅ No usar icon en toasts → usar iconTheme

📋 Archivos Clave para Referencia
Tipo	Archivo	Propósito
Hook ejemplo	hooks/useNavbar.ts	Lógica del navbar
Diseño ejemplo	components/layout/Navbar.tsx	UI del navbar
Conexión ejemplo	pages/Home.tsx	Conexión lógica + UI
Helper ejemplo	utils/errorMessages.ts	Toasts centralizados
Contexto ejemplo	context/AuthContext.tsx	Autenticación global
Config ejemplo	config/empresa.ts	Configuración centralizada
🔴 MEJORAS PENDIENTES (POR PRIORIDAD)
#	Mejora	Archivo	Prioridad	Estado
1	Redirigir usuarios logueados en /registro	pages/auth/Registro.tsx	🟡 MEDIA	⏳ Pendiente
2	Verificación de email	backend/src/controllers/auth.controller.ts	🟡 MEDIA	⏳ Pendiente
3	Forzar mayúscula en nombre	pages/auth/Registro.tsx	🟢 BAJA	⏳ Pendiente
4	Mostrar fortaleza de contraseña	pages/auth/Registro.tsx	🟢 BAJA	⏳ Pendiente
5	Agregar "Preguntas frecuentes"	pages/PreguntasFrecuentes.tsx	🟢 BAJA	⏳ Pendiente
6	Agregar "Medios de pago"	footer/FooterServices.tsx	🟢 BAJA	⏳ Pendiente
7	Agregar "Newsletter"	footer/Footer.tsx	🟢 BAJA	⏳ Pendiente
8	Seguir con Productos	pages/Productos.tsx	🔴 ALTA	⏳ Pendiente
🛡️ SEGURIDAD IMPLEMENTADA
Medida	Estado	Ubicación
Rate limiting	✅ Implementado	backend/src/middlewares/rateLimit.middleware.ts
Validación Zod (frontend)	✅ Implementado	frontend/src/schemas/auth.schema.ts
Validación Zod (backend)	✅ Implementado	backend/src/schemas/auth.schema.ts
Sanitización de datos	✅ Implementado	backend/src/middlewares/sanitize.middleware.ts
Prevención SQL injection	✅ Implementado	SQL puro con parámetros
JWT autenticación	✅ Implementado	backend/src/middlewares/auth.middleware.ts
⚠️ PRISMA: ACLARACIÓN

Prisma está instalado pero NO se usa en el proyecto.

    Estado: Instalado pero sin migración

    Motivo: El código actual usa SQL puro con pg y funciona correctamente

    Decisión: No se migrará a Prisma por ahora

    Stack actual: node-postgres (pg) + SQL puro

    Stack alternativo: Prisma (instalado pero no usado)

📋 Contacto

Dirección: Uruguay 660, Valparaíso, Chile
Horario: Lun-Vie 9:00-18:30, Sáb 10:00-15:00
WhatsApp: +56975303324
Email: comercialuruguayvalpo@gmail.com
Redes: Facebook, Instagram, TikTok

📌 Nota: Este archivo sirve como prompt para el próximo chat cuando la memoria actual se agote. Contiene toda la información necesaria para continuar el desarrollo sin perder el contexto.
text


---

## 📋 **PASO 2: `README.md` (LIMPIO)**

**Reemplaza TODO el archivo `README.md` con esto:**

```markdown
# 🏪 Comercial Uruguay — Web App

**Versión:** `v1.2.0-beta.3`
**Estado:** Producción (desplegado)
**Desarrollador:** Camilo Riquelme

**Enlaces:**
- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com
- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay

---

## 📋 Descripción

Web app oficial de un comercio con más de 10 años en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

**Clientes pueden:**
- Explorar productos por categorías
- Consultar stock en tiempo real
- Armar carrito de compras
- Generar pedidos por WhatsApp
- Reservar productos

---

## 🛠️ Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| **Frontend** | React 19 + TypeScript + Vite |
| **Backend** | Node.js 22 + Express + TypeScript |
| **Base de Datos** | PostgreSQL + Supabase |
| **Estilos** | Tailwind 3.4 + shadcn/ui |
| **Storage** | Supabase Storage |
| **Autenticación** | JWT + bcryptjs |
| **Validación** | Zod |
| **Notificaciones** | react-hot-toast |
| **Email** | Resend |
| **Despliegue** | Vercel + Render |

---

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

# Backend
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend
cd frontend
cp .env.example .env
npm install
npm run dev

🔐 Variables de Entorno

Frontend (.env):
env

VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key

Backend (.env):
env

PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:5173

📞 Contacto

    Dirección: Uruguay 660, Valparaíso, Chile

    Horario: Lun-Vie 9:00-18:30, Sáb 10:00-15:00

    WhatsApp: +56975303324

    Email: comercialuruguayvalpo@gmail.com

    Redes: Facebook, Instagram, TikTok

📄 Licencia

Proyecto de uso académico y comercial para Comercial Uruguay.
````
