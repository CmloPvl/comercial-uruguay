# 📋 CHANGELOG — Comercial Uruguay

> Registro de cambios por versión.
> Sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y [Semantic Versioning](https://semver.org/lang/es/).
> **Última actualización:** 2026-10-30

---

## 📑 Índice de versiones

- [[Unreleased]](#unreleased)
- [v1.2.0-beta.8 — 2026-11-13](#v120-beta8--2026-11-13)
- [v1.2.0-beta.7 — 2026-10-30](#v120-beta7--2026-10-30)
- [v1.2.0-beta.6 — 2026-10-30](#v120-beta6--2026-10-30)
- [v1.2.0-beta.5 — 2026-10-29](#v120-beta5--2026-10-29)
- [v1.2.0-beta.4 — 2026-10-26](#v120-beta4--2026-10-26)
- [v1.2.0-beta.3 — versión anterior](#v120-beta3--versión-anterior)
- [Pendientes globales](#-pendientes-globales)
- [Documentos relacionados](#-documentos-relacionados)

---

## 🧭 Cómo leer este changelog

- **`[Unreleased]`**: cambios en curso, aún no versionados.
- **`Agregado ✨`**: funcionalidad nueva.
- **`Cambiado 🔄`**: cambio en funcionalidad existente.
- **`Corregido 🐛`**: bug fix.
- **`Eliminado 🗑️`**: funcionalidad removida.
- **`Seguridad 🔒`**: cambios de seguridad.
- **`SQL aplicado`**: migraciones ejecutadas en Supabase para esa versión.
- **`Pendientes globales`**: todo lo que falta, consolidado en un solo lugar (no repetido por versión).

---

## [Unreleased]

> Cambios en curso. Se moverán a una versión cuando estén estables.

### Agregado ✨

- _(vacío por ahora)_

### Cambiado 🔄

- _(vacío por ahora)_

### Corregido 🐛

- _(vacío por ahora)_

---

## [v1.2.0-beta.8] — 2026-11-13

### Agregado ✨

- **Buscador conectado al backend** (search + category + minPrice + maxPrice)
  - `ProductModel.findAllWithFilters(filters)` en backend
  - `getProducts` lee query params y sanitiza (search máx 100 chars, precios válidos)
  - `productService.getProducts` envía `minPrice` y `maxPrice`
  - `useProducts` con debounce de 300ms (search + precios)
  - Categoría sincronizada con la URL (`?categoria=...`)

- **`apple-touch-icon.png`** (180x180 para iOS)

### Cambiado 🔄

- `ProductModel.findAll()` ahora reutiliza `findAllWithFilters({})` (DRY)
- `useProducts` ya no filtra en cliente (`filteredProducts = products`)
- `handleClearFilters` limpia también `debouncedSearch` y `debouncedPriceRange`

### Corregido 🐛

- **Cards con altura desigual** en el grid
  - `ProductCard`: `min-h` del nombre subido a 48px/56px (2 líneas fijas)
  - `ProductGrid`: `auto-rows-fr` para que todas las filas tengan la misma altura
  - `ProductCard`: typo `text-xssm:text-sm` → `text-xs sm:text-sm`

- **Recarga de página al escribir precios**
  - Debounce de 300ms en `priceRange`
  - `setLoading` solo en carga inicial (evita parpadeo)

- **Filtro de categoría no funcionaba**
  - `setSelectedCategory` ahora actualiza la URL (`?categoria=...`)

### SQL aplicado en Supabase

Ninguno nuevo (cambios solo de backend/frontend).

## [v1.2.0-beta.7] — 2026-10-30

### Cambiado 🔄

- **Refactor:** `ImageCropper` usa `useImageCropper` (SoC)
  - Lógica extraída a hook (`crop`, `zoom`, `aspect`, `croppedArea`)
  - Componente queda solo UI (presentacional)
  - `CropData` unificado: se importa de `productService` (única fuente de verdad)

### Agregado ✨

- **Hook `useImageCropper`** (nuevo)
  - Estados: `crop`, `zoom`, `aspect`, `croppedArea`
  - Callbacks: `handleCropComplete`, `handleSave`
  - Cierre con `Escape` (`useEffect` + `keydown`)
  - Exporta `ASPECT_RATIOS` (constante reutilizable)

- **Vista previa real con Canvas** (`getCroppedImg`)
  - Antes: `img` con `objectPosition` y `transform: scale()` (falsa)
  - Ahora: imagen recortada real (base64) generada con `<canvas>`

- **Zoom permite alejar** (min 0.5x)
  - Antes: `min="1"`
  - Ahora: `min="0.5"` → permite alejar

- **Altura dinámica del cropper**
  - `3/4` → `h-[350px] sm:h-[450px]`
  - `16/9` → `h-[220px] sm:h-[300px]`
  - Otros → `h-[300px] sm:h-[400px]`

- **Mobile-first mejorado**
  - Padding: `p-3 sm:p-4`, `p-3 sm:p-6`
  - Tipografía: `text-lg sm:text-xl`, `text-xs sm:text-sm`
  - Botones: `py-2 sm:py-2.5`, `text-sm sm:text-base`
  - Fondo blanco sólido en el modal (`bg-white`)
  - `max-h-[90vh] flex flex-col` + `overflow-y-auto`

- **Accesibilidad**
  - `type="button"` en todos los botones (evita submit accidental)
  - `aria-label` en el botón de cerrar

### SQL aplicado en Supabase

Ninguno nuevo (cambios solo de frontend).

---

## [v1.2.0-beta.6] — 2026-10-30

### Agregado ✨

- **Páginas de Envíos y Retiros** (reutilizables)
  - `components/info/EnviosSection.tsx` (envíos a todo Chile)
  - `components/info/RetiroSection.tsx` (retiro en tienda)
  - `/envios-y-retiros` con tabs (Envíos | Retiro) + URL directa (`?tab=retiro`)
  - `/envios` y `/retiro` usan las secciones (sin duplicar contenido)

- **Links de Envíos/Retiro en menús**
  - `Footer.tsx` → "Retiro en tienda" en columna "Te ayudamos"
  - `NavbarMenu.tsx` (sidebar móvil) → "Envíos y Retiros" + "Retiro en Tienda"
  - `NavbarGuestMenu.tsx` (desktop invitado) → 2 links
  - `NavbarUserMenu.tsx` (desktop logueado) → 2 links

- **Botones admin en `ProductoDetalle`**
  - "✏️ Editar" → `/admin/productos/:id/editar`
  - "⏸️ Desactivar" → soft delete (desaparece del catálogo, recuperable)
  - Badge "👑 Modo admin" (para saber que estás en modo admin)

- **Galería de imágenes en `ProductoDetalle`**
  - Reutiliza `ImageCarousel` (flechas, auto-scroll, indicadores, contador)
  - Mismo tamaño que el carrusel del Hero

- **Cantidad con stock 0**
  - Permite subir cantidad hasta 99 (antes solo 1)
  - Mensaje explicativo de stock

### Cambiado 🔄

- **Banner de `/retiro`** rediseñado
  - Antes: gradiente rosa/amarillo/naranja (muy fuerte)
  - Ahora: gradiente purple/cyan (paleta oficial) + blobs decorativos + texto blanco

- **Mensaje de stock en `ProductoDetalle`** más explicativo
  - Antes: "📞 Consultar disponibilidad en tienda"
  - Ahora: "📲 Stock a confirmar" + explicación del flujo WhatsApp

- **Tabs de `/envios-y-retiros`** rediseñados
  - Textos cortos ("Envíos" / "Retiro")
  - Iconos grandes (mobile: arriba, desktop: al lado)
  - `whitespace-nowrap` (evita cortes)

- **`Footer.tsx`** → link a `/retiro` agregado

### Corregido 🐛

- **Imports sin usar** en `EnviosSection.tsx` y `RetiroSection.tsx`
- **`ProductFormAdvancedOptions.tsx`** → `getCategoryIcon` con 1 argumento (fix de tipos)
- **`ProductoDetalle.tsx`** → `product.category_name` (antes `product.category`)
- **`ProductCard.tsx`** → `product.category_name` (antes `product.category`)
- **`Ofertas.tsx`** → `product.category_name` (antes `product.category`)
- **`productService.ts`** → eliminado `category` del tipo `Product` (nunca existió)

### SQL aplicado en Supabase

Ninguno nuevo (todo el SQL ya estaba aplicado en `v1.2.0-beta.5`).

---

## [v1.2.0-beta.5] — 2026-10-29

### Agregado ✨

- **Loader en botón "Agregar al carrito"** (`ProductCard`)
  - Estado `adding` local
  - Botón deshabilitado mientras procesa
  - Previene doble click

- **Mensaje "📲 Stock por WhatsApp"** cuando stock = 0
  - En `ProductCard` (catálogo, destacados, ofertas)
  - En `ProductoDetalle` (bloque grande)
  - Reemplaza "Sin Stock" (más honesto con el flujo WhatsApp)

- **Mensajes nuevos en `errorMessages.ts`**
  - `cartErrors.addFailed`: "Error al agregar al carrito."

- **Helper `calculateSubtotal` en `backend/src/utils/`**
  - Función única para calcular subtotal con packs
  - Importada desde `Cart.ts` y `cart.controller.ts`
  - Elimina duplicación de código

- **Toasts en el carrito** (`useCarrito`)
  - Éxito al actualizar/eliminar/vaciar
  - Error con mensajes del helper

### Cambiado 🔄

- **Refactor:** `ProductCard` unificado con `variant="default" | "carousel"`
  - Un solo componente para grid y carrusel
  - `ProductCarousel` ahora usa `ProductCard` (elimina card hardcodeado)
  - Consistencia total (pack, stock, favoritos se ven igual)

- **Refactor:** Admin sin doble layout
  - Eliminado `<Layout>` de las 6 páginas admin
  - `App.tsx` ya envuelve con `<AdminLayout>`

- **Refactor:** Header unificado en `ProductForm`
  - Eliminado header manual de `CrearPublicacion` y `EditarPublicacion`
  - Nuevo prop `description` en `ProductForm`
  - `ProductFormHeader` maneja todo el header

- **Stock opcional** en el formulario de productos
  - Ya no es obligatorio (`required` eliminado)
  - Si está vacío → `stock = 0` → "📲 Stock por WhatsApp"
  - Backend permite agregar productos con `stock = 0`

- **UI/UX:** Imágenes en `ImageUploader`
  - Toasts de éxito/error
  - Limpiar dropzone después de subir
  - Contador incluye pendientes
  - Aviso de máximo alcanzado

### Corregido 🐛

- **Categoría invisible** en `ProductCard`, `ProductoDetalle` y `Ofertas`
  - Backend devuelve `category_name`, no `category`
  - Fix: usar `product.category_name` en todos lados
  - Eliminado `category` del tipo `Product` (nunca existió)

- **Productos con stock 0 no se agregaban al carrito**
  - Backend validaba `stock < quantity` (0 < 1 = true → rechazaba)
  - Fix: `stock > 0 && stock < quantity` (solo bloquea si hay stock real)

- **Toast de error incorrecto al agregar al carrito**
  - Mostraba "El carrito está vacío" (incorrecto)
  - Fix: usa `cartErrors.addFailed`

- **Doble emoji 📸 en `ImageUploader`**
  - Estaba `label.split(' ')[0]` + `label` completo
  - Fix: solo `label`

- **Doble título y badge en crear/editar producto**
  - Header manual en la página + header en `ProductForm`
  - Fix: solo `ProductFormHeader`

### SQL aplicado en Supabase

Ninguno nuevo (el SQL de destacados y packs ya estaba aplicado en `v1.2.0-beta.4`).

---

## [v1.2.0-beta.4] — 2026-10-26

### Agregado ✨

- **Sistema de artículos destacados**
  - Campo `destacado` en productos (manual por admin)
  - Endpoint `GET /api/products/destacados`
  - Hook `useFeaturedProducts` (responsabilidad única)
  - Componente `ProductsSection` (100% reutilizable)

- **Sistema de packs promocionales**
  - Campos `packPrice` y `packQuantity` en productos
  - Card "Pack Promocional" en admin
  - Badge de pack en el catálogo (`ProductCard`)
  - Bloque de pack en el detalle (`ProductoDetalle`) con "Ahorras $X"

### Cambiado 🔄

- **Refactor:** `FeaturedProductsSection` → `ProductsSection`
  - Movido de `home/` a `common/`
  - 8 props nuevas con defaults

- **Refactor:** `useHome` limpio (destacados en `useFeaturedProducts`)

- **UI/UX:** `Productos.tsx`
  - Eliminado `ProductsBanner`
  - Breadcrumb compacto
  - `ProductsSection` arriba del grid

### Corregido 🐛

- **Error de tipos:** `packPrice: number | null` → `ProductInput` acepta `null`

### SQL aplicado en Supabase

Ninguno nuevo (el SQL de destacados y packs ya estaba aplicado en esta versión).

---

## [v1.2.0-beta.3] — versión anterior

> Versión anterior sin detalle registrado. Si recuerdas qué cambió, agrégalo aquí.

### Agregado ✨

- _(sin registro)_

### Cambiado 🔄

- _(sin registro)_

### Corregido 🐛

- _(sin registro)_

### SQL aplicado en Supabase

- _(sin registro)_

---

## 📌 Pendientes globales

> Todo lo que falta, consolidado en un solo lugar.
> **No repetir por versión**: cuando se complete un pendiente, se mueve a la versión correspondiente en la sección de cambios.

### Funcionalidad

- [ ] **SKU opcional** (backend autogenera)
- [ ] **Descripción sin mínimo** de 20 caracteres
- [ ] **Etiquetas/tags** (sin uso actualmente; decidir si se aprovechan en búsqueda o se eliminan)
- [ ] **Productos relacionados** en `ProductoDetalle`
- [ ] **Compartir por WhatsApp** desde el producto

### UI/UX

- [ ] **Scroll horizontal en mobile** (parcialmente fixeado, revisar después)
- [ ] **`Ofertas.tsx`** → usar `ProductCard` (sigue con card hardcodeado)

### Deuda técnica

- [ ] **Prisma**: está instalado pero no se usa. Decidir si se desinstala o se documenta formalmente su descarte.

---

## 📚 Documentos relacionados

- [`PROMPT.md`](./PROMPT.md) — Contexto, reglas, stack, convenciones.
- [`ESTADO.md`](./ESTADO.md) — Estado actual del proyecto (módulos, últimos cambios).
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Flujo de trabajo, commits, cómo contribuir.
- [`README.md`](./README.md) — Descripción general, instalación, funcionalidades.

---
