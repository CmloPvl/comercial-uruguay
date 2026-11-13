# 🏪 Comercial Uruguay — Catálogo Virtual

**Estado:** En desarrollo activo
**Versión:** v1.2.0-beta.6
**Tipo:** Catálogo vitrina con pedidos por WhatsApp
**Desarrollador:** Camilo Riquelme
**Ubicación del negocio:** Valparaíso, Chile

**Enlaces:**

- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com
- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay

---

## 📑 Índice

1. [Descripción](#descripción)
2. [Objetivo del proyecto](#objetivo-del-proyecto)
3. [Flujo del cliente](#flujo-del-cliente)
4. [Funcionalidades](#funcionalidades)
5. [Paleta de colores](#paleta-de-colores)
6. [Instalación rápida](#instalación-rápida)
7. [Variables de entorno](#variables-de-entorno)
8. [Estructura del proyecto](#estructura-del-proyecto)
9. [Metodología de trabajo](#metodología-de-trabajo)
10. [Sobre el desarrollador](#sobre-el-desarrollador)
11. [Contacto](#contacto)
12. [Roadmap](#roadmap)
13. [Capturas](#capturas)
14. [Contribuir](#contribuir)
15. [Licencia](#licencia)
16. [Documentos relacionados](#documentos-relacionados)

---

## 📌 Descripción

**Comercial Uruguay** es un comercio familiar con más de 10 años de trayectoria en Valparaíso, especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

Este proyecto es la **web app oficial del negocio**: un catálogo virtual que permite a los clientes explorar productos, armar un carrito y **generar un pedido por WhatsApp** para confirmar stock y coordinar la venta.

### 🎯 Objetivo del proyecto

Mejorar la experiencia de venta del local mediante una vitrina digital que:

- Permita **explorar el catálogo** desde cualquier lugar.
- Facilite **armar un pedido** sin necesidad de ir al local.
- Cierre la venta por **WhatsApp** (confirmación de stock + envío o retiro).
- Permita al cliente **llegar y retirar** con el pedido ya reservado.

> ⚠️ **Nota:** Actualmente el negocio **no cuenta con caja registradora integrada**, por lo que el catálogo **no opera en vivo**. El flujo termina en WhatsApp, donde se confirma stock y se concreta la venta. Cuando el negocio implemente su sistema de caja, el proyecto podrá escalar a e-commerce en vivo.

---

## 🛒 Flujo del cliente

1. Cliente entra al catálogo.
2. Explora productos por categoría / búsqueda.
3. Agrega productos al carrito.
4. Finaliza el pedido.
5. Se genera un mensaje de WhatsApp con el detalle.
6. El vendedor confirma stock y coordina envío/retiro.
7. Venta concretada ✅.

---

## ✨ Funcionalidades

### Catálogo

- Explorar productos por categoría.
- Búsqueda por nombre.
- Filtros por categoría y precio.
- Destacados (elegidos manualmente por el admin).
- Packs promocionales (ej: "3 por $1000").
- Stock por WhatsApp (si no hay stock real).

### Pedidos

- Carrito de compras.
- Generación de pedido por WhatsApp.
- Confirmación de stock en el local.

### Admin

- CRUD de productos.
- CRUD de categorías.
- Gestión de pedidos.
- Gestión de usuarios.
- Marcar productos como destacados.
- Configurar packs promocionales.
- Subir múltiples imágenes (Supabase Storage).

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

## 🚀 Instalación rápida

### Requisitos previos

- **Node.js 22** o superior.
- **PostgreSQL** (o cuenta en Supabase).
- **Git**.
- Cuenta en **Supabase** (Storage + Base de Datos).
- Cuenta en **Resend** (envío de emails).

### Pasos

1. Clonar el repositorio:
   - `git clone https://github.com/CmloPvl/comercial-uruguay.git`
   - `cd comercial-uruguay`

2. Configurar el backend:
   - `cd backend`
   - `cp .env.example .env`
   - `npm install`
   - `npm run dev`

3. Configurar el frontend (en otra terminal):
   - `cd frontend`
   - `cp .env.example .env`
   - `npm install`
   - `npm run dev`

4. Abrir en el navegador: `http://localhost:5173`

---

## 🔐 Variables de entorno

### Frontend (`.env`)

- `VITE_API_URL`: URL del backend (ej: `http://localhost:5000/api`).
- `VITE_SUPABASE_URL`: URL del proyecto Supabase.
- `VITE_SUPABASE_ANON_KEY`: Clave anónima de Supabase.

### Backend (`.env`)

- `PORT`: Puerto del servidor (ej: `5000`).
- `DATABASE_URL`: Cadena de conexión PostgreSQL.
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT.
- `RESEND_API_KEY`: API key de Resend (emails).
- `FRONTEND_URL`: URL del frontend (para CORS, ej: `http://localhost:5173`).

> 💡 **Nota:** los archivos `.env.example` (backend y frontend) contienen todas las variables con valores placeholder. **Nunca** subas `.env` real al repositorio.

---

## 📂 Estructura del proyecto

- **`backend/`** → API REST (Node + Express + TypeScript).
  - `src/controllers/` → lógica de endpoints.
  - `src/models/` → acceso a datos (SQL puro con `pg`).
  - `src/routes/` → definición de rutas.
  - `src/middlewares/` → auth, rate limit, sanitización.
  - `src/schemas/` → validación con Zod.
  - `src/services/` → servicios externos (email).
  - `src/utils/` → helpers compartidos.

- **`frontend/`** → React + TypeScript + Vite.
  - `src/components/` → UI (solo JSX y estilos).
  - `src/hooks/` → lógica (estados, API, validaciones).
  - `src/pages/` → conexión UI + lógica.
  - `src/context/` → estado global (auth).
  - `src/services/` → comunicación con el backend.
  - `src/utils/` → helpers (toasts, mensajes).
  - `src/config/` → configuración centralizada (empresa).

> 📖 **Detalle completo:** ver [`PROMPT.md`](./PROMPT.md).

---

## 🧠 Metodología de trabajo

El proyecto sigue el principio de **Separación de Lógica y Diseño (SoC)**:

| Capa          | Responsabilidad                     | Ejemplo           |
| ------------- | ----------------------------------- | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones | `useLogin.ts`     |
| `pages/`      | Conexión — Une UI + lógica          | `LoginPage.tsx`   |
| `context/`    | Estado Global                       | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend   | `api.ts`          |

**Estrategia:**

- Trabajo componente por componente.
- Micro-pasos (cambios pequeños y controlados).
- Probar después de cada cambio.
- Comentarios explicativos en el código.
- Documentar cada mejora en `CHANGELOG.md`.

---

## 🧑‍💻 Sobre el desarrollador

Proyecto desarrollado por **Camilo Riquelme**, tras completar un bootcamp de JavaScript Full Stack, como parte del crecimiento digital del negocio familiar **Comercial Uruguay**.

El objetivo es doble:

- Aplicar lo aprendido en un proyecto real.
- Mejorar la venta del local mediante una vitrina digital.

---

## 📞 Contacto

- **Dirección:** Uruguay 660, Valparaíso, Chile.
- **Horario:** Lun-Vie 9:00-18:30, Sáb 10:00-15:00.
- **WhatsApp:** +56975303324.
- **Email:** comercialuruguayvalpo@gmail.com.
- **Redes:** Facebook, Instagram, TikTok.

---

## 🗺️ Roadmap

- [ ] **SEO básico**: sitemap, metadatos por producto, Open Graph para compartir por WhatsApp.
- [ ] **Analítica**: Vercel Analytics o Plausible (sin caja registradora, la analítica web es la única fuente de datos).
- [ ] **Tests**: al menos tests de los hooks críticos (`useCarrito`, `useProducts`) y de `calculateSubtotal`.
- [ ] **PWA**: catálogo instalable/offline (opcional).
- [ ] **E-commerce en vivo**: cuando el negocio implemente caja registradora.

---

## 📸 Capturas

> _(Placeholder — agregar capturas del catálogo, carrito y panel admin cuando estén disponibles)._

---

## 🤝 Contribuir

... 3. Haz un fork, crea una rama y envía un pull request.

---

## 📄 Licencia

Todos los derechos reservados. Ver [`LICENSE`](./LICENSE) para más detalles.

---

## 📚 Documentos relacionados

- [`PROMPT.md`](./PROMPT.md) — Contexto, reglas, stack, convenciones.
- [`ESTADO.md`](./ESTADO.md) — Estado actual del proyecto (módulos, últimos cambios).
- [`CHANGELOG.md`](./CHANGELOG.md) — Historial completo de cambios por versión.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Flujo de trabajo, commits, cómo contribuir.
