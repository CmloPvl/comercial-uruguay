## [v1.2.0-beta.6] — 30/10/2026

### Agregado ✨

- **Páginas de Envíos y Retiros** (reutilizables)
  - `components/info/EnviosSection.tsx` (envíos a todo Chile)
  - `components/info/RetiroSection.tsx` (retiro en tienda)
  - `/envios-y-retiros` con tabs (Envios | Retiro) + URL directa (`?tab=retiro`)
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

### Pendiente ⚠️

- **Scroll horizontal en mobile** (parcialmente fixeado, revisar después)
- `Ofertas.tsx` → usar `ProductCard` (sigue con card hardcodeado)
- SKU opcional (backend autogenera)
- Descripción sin mínimo de 20 caracteres
- Etiquetas/tags sin uso
- Productos relacionados en detalle
- Compartir por WhatsApp desde el producto

---

# 📋 CHANGELOG — Comercial Uruguay

Registro de cambios por versión. Sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/) y [Semantic Versioning](https://semver.org/lang/es/).

---

## [v1.2.0-beta.5] — 29/10/2026

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

```sql
-- Destacados
ALTER TABLE products ADD COLUMN IF NOT EXISTS destacado BOOLEAN DEFAULT false;

-- Packs promocionales
ALTER TABLE products
ADD COLUMN IF NOT EXISTS "packPrice" DECIMAL(10,2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS "packQuantity" INTEGER DEFAULT NULL;

Pendiente ⚠️

    Ofertas.tsx sigue con card hardcodeado (usar ProductCard)

    SKU opcional (backend autogenera)

    Descripción sin mínimo de 20 caracteres

    Etiquetas/tags sin uso (dejar o aprovechar en búsqueda)

    Galería de imágenes en ProductoDetalle

    Productos relacionados

    Compartir por WhatsApp

[v1.2.0-beta.4] — 26/10/2026
Agregado ✨

    Sistema de artículos destacados

        Campo destacado en productos (manual por admin)

        Endpoint GET /api/products/destacados

        Hook useFeaturedProducts (responsabilidad única)

        Componente ProductsSection (100% reutilizable)

    Sistema de packs promocionales

        Campos packPrice y packQuantity en productos

        Card "Pack Promocional" en admin

        Badge de pack en el catálogo (ProductCard)

        Bloque de pack en el detalle (ProductoDetalle) con "Ahorras $X"

Cambiado 🔄

    Refactor: FeaturedProductsSection → ProductsSection

        Movido de home/ a common/

        8 props nuevas con defaults

    Refactor: useHome limpio (destacados en useFeaturedProducts)

    UI/UX: Productos.tsx

        Eliminado ProductsBanner

        Breadcrumb compacto

        ProductsSection arriba del grid

Corregido 🐛

    Error de tipos: packPrice: number | null → ProductInput acepta null

[v1.2.0-beta.3] — (versión anterior)

    (registro previo)
```
