# 📋 CHANGELOG — Comercial Uruguay

> Registro de cambios por versión.
> Sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y [Semantic Versioning](https://semver.org/lang/es/).
> **Última actualización:** 2026-10-30

---

## 📑 Índice de versiones

- [[Unreleased]](#unreleased)
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

--- FIN PARTE 1/2 ---
