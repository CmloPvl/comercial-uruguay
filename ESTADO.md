# 📊 ESTADO — Comercial Uruguay

> **Fuente única de verdad del estado actual.**
> Pega este archivo junto con `PROMPT.md` al inicio de cada chat nuevo.
> **Última actualización:** 2026-11-13
> **Versión del proyecto:** v1.2.0-beta.8

---

## 📑 Índice

1. [Cómo usar este archivo](#cómo-usar-este-archivo)
2. [Estado de módulos](#estado-de-módulos)
3. [Últimos cambios](#últimos-cambios)
4. [Documentos relacionados](#documentos-relacionados)

---

## 🧭 Cómo usar este archivo

- **Al inicio de cada chat nuevo**: pega `PROMPT.md` + `ESTADO.md`. Con eso el agente sabe las reglas y dónde está el proyecto.
- **Al final de cada sesión**: actualiza la tabla de [Estado de módulos](#estado-de-módulos) y la sección [Últimos cambios](#últimos-cambios).
- **No pegues el `CHANGELOG.md` completo**: este archivo ya resume lo importante.

---

## 📦 Estado de módulos

Leyenda: ✅ Completado · 🔄 En progreso · ⏳ Pendiente

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
| **Envíos y Retiros**   | `EnviosYRetiros.tsx`      | -                         | ✅     |
| **ImageCropper**       | `ImageCropper.tsx`        | `useImageCropper.ts`      | ✅     |
| **SearchBar**          | `SearchBar.tsx`           | `useProducts.ts`          | ✅     |

---

## 🕒 Últimos cambios

> Resumen ultra-corto de lo último que se hizo. El detalle completo está en [`CHANGELOG.md`](./CHANGELOG.md).

### v1.2.0-beta.8 — 2026-11-13

- Buscador conectado al backend (search + category + minPrice + maxPrice).
- Debounce de 300ms en search y precios.
- Categoría sincronizada con la URL (`?categoria=...`).
- Cards con altura uniforme (min-h fijo + auto-rows-fr).
- Fix: recarga de página al escribir precios.
- Fix: filtro de categoría no funcionaba.
- `apple-touch-icon.png` agregado.
- Limpieza de assets residuales en `public/`.

### v1.2.0-beta.7 — 2026-10-30

- Refactor: `ImageCropper` usa `useImageCropper` (SoC).
- Nuevo: hook `useImageCropper` (estados, callbacks, cierre con Escape).
- Nuevo: vista previa real con Canvas (`getCroppedImg`).
- Nuevo: zoom permite alejar (min 0.5x).
- Nuevo: altura dinámica del cropper según aspect.
- Nuevo: mobile-first mejorado (padding, tipografía, `max-h-[90vh]`).
- Nuevo: `type="button"` en botones (accesibilidad).
- Fix: `CropData` unificado (se importa de `productService`).

### v1.2.0-beta.6 — 2026-10-30

- Páginas de Envíos y Retiros (reutilizables: `EnviosSection`, `RetiroSection`).
- Links de Envíos/Retiro en menús (Footer, NavbarMenu, GuestMenu, UserMenu).
- Botones admin en `ProductoDetalle` (Editar, Desactivar con soft delete, badge "Modo admin").
- Galería de imágenes en `ProductoDetalle` (reutiliza `ImageCarousel`).
- Cantidad con stock 0 permite subir hasta 99.
- Fix banner de `/retiro` (gradiente purple/cyan).
- Fix `category_name` en `ProductoDetalle`, `ProductCard`, `Ofertas`.

### v1.2.0-beta.5 — 2026-10-29

- Loader en botón "Agregar al carrito".
- Mensaje "📲 Stock por WhatsApp" cuando stock = 0.
- Helper `calculateSubtotal` en backend.
- Toasts en `useCarrito`.
- Refactor: `ProductCard` unificado con `variant`.
- Refactor: admin sin doble layout.
- Refactor: header unificado en `ProductForm`.
- Stock opcional en formulario.
- Fix: categoría invisible (`category_name`).
- Fix: productos con stock 0 no se agregaban al carrito.
- Fix: toast de error incorrecto al agregar al carrito.
- Fix: doble emoji en `ImageUploader`.
- Fix: doble título y badge en crear/editar producto.

---

## 📚 Documentos relacionados

- [`PROMPT.md`](./PROMPT.md) — Contexto, reglas, stack, convenciones.
- [`CHANGELOG.md`](./CHANGELOG.md) — Historial completo de cambios por versión.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Flujo de trabajo, commits, cómo contribuir.
- [`README.md`](./README.md) — Descripción general, instalación, funcionalidades.
