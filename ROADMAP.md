# 🗺️ ROADMAP — Comercial Uruguay

> **Plan de trabajo por fases.**
> Marca con ✅ las tareas completadas. Cuando termines una fase, bórrala.
> **Última actualización:** 2026-11-17
> **Versión del proyecto:** v1.2.0-beta.9

---

## 📑 Índice

1. [Cómo usar este archivo](#cómo-usar-este-archivo)
2. [Fase 1: Crítico](#fase-1-crítico)
3. [Fase 2: Importante](#fase-2-importante)
4. [Fase 3: Mejoras](#fase-3-mejoras)
5. [Cómo trabajar con agentes IA](#cómo-trabajar-con-agentes-ia)
6. [Documentos relacionados](#documentos-relacionados)

---

## 🧭 Cómo usar este archivo

- **Al inicio de cada sesión**: abre este archivo y elige la siguiente tarea pendiente (`[ ]`).
- **Al terminar una tarea**: cámbiala a `[x]` o bórrala.
- **Cuando termines una fase**: borra toda la fase (ya no es necesaria).
- **Al final de cada sesión**: actualiza `ESTADO.md` y `CHANGELOG.md`.

---

## 🔴 Fase 1: Crítico (esta semana)

| #   | Tarea                                               | ¿Hecho? | Tiempo estimado |
| --- | --------------------------------------------------- | ------- | --------------- |
| 1   | **Resend de recuperar contraseña**                  | [ ]     | 1-2 horas       |
| 2   | **Aplicar helper de toasts en el resto de páginas** | [ ]     | 2-3 horas       |
| 3   | **Backup de Supabase**                              | [ ]     | 30 min          |

### Detalle de cada tarea

#### 1. Resend de recuperar contraseña

- **Archivos:** `backend/src/services/email.services.ts`, `backend/src/controllers/auth.controller.ts`, `frontend/src/hooks/useRecoverPassword.ts`, `frontend/src/pages/auth/RecuperarContrasena.tsx`, `frontend/src/pages/auth/ResetPassword.tsx`.
- **Qué hacer:**
  - Verificar que el dominio esté verificado en Resend.
  - Probar el flujo completo con un email real.
  - Fallback: si Resend falla, mostrar mensaje claro ("contacta por WhatsApp").
- **Por qué:** si falla, un cliente queda bloqueado sin poder recuperar su cuenta.

#### 2. Aplicar helper de toasts en el resto de páginas

- **Archivos pendientes:**
  - `frontend/src/hooks/useAdminDashboard.ts`
  - `frontend/src/hooks/useAdminPedidos.ts`
  - `frontend/src/hooks/useAdminUsuarios.ts`
  - `frontend/src/hooks/useCrearPublicacion.ts`
  - `frontend/src/hooks/useEditarPublicacion.ts`
  - `frontend/src/hooks/useFavoritos.ts`
  - `frontend/src/hooks/usePerfil.ts`
  - `frontend/src/pages/auth/ResetPassword.tsx`
- **Qué hacer:** cambiar `toast.error` / `toast.success` directo por `showErrorToastWithFallback` / `showSuccessToast` (usando los mensajes del helper `errorMessages.ts`).
- **Por qué:** consistencia y mantenibilidad. Ya empezaste con `ProductForm.tsx`.

#### 3. Backup de Supabase

- **Qué hacer:**
  - Activar backups diarios en Supabase (plan gratuito ya los tiene).
  - Exportar un dump semanal a un lugar seguro (Google Drive, S3).
- **Por qué:** protege los datos del negocio.

---

## 🟠 Fase 2: Importante (próxima semana)

| #   | Tarea                                                            | ¿Hecho? | Tiempo estimado |
| --- | ---------------------------------------------------------------- | ------- | --------------- |
| 4   | **Mejorar Perfil** (nombre, email, teléfono, cambiar contraseña) | [ ]     | 2-3 horas       |
| 5   | **Búsqueda en descripción + tags**                               | [ ]     | 1-2 horas       |
| 6   | **Botón flotante de WhatsApp** (mobile)                          | [ ]     | 30 min          |

### Detalle de cada tarea

#### 4. Mejorar Perfil

- **Archivos:** `frontend/src/pages/Perfil.tsx`, `frontend/src/hooks/usePerfil.ts`, `backend/src/controllers/user.controller.ts`.
- **Qué hacer:**
  - Ver/editar nombre, email, teléfono.
  - Cambiar contraseña (con validación de contraseña actual).
  - Ver historial de pedidos (ya existe `MisPedidos`, pero enlazarlo desde Perfil).
  - Eliminar cuenta (con confirmación).
- **Por qué:** los clientes necesitan gestionar su cuenta.

#### 5. Búsqueda en descripción + tags

- **Archivos:** `backend/src/models/Product.ts` (ampliar `findAllWithFilters`), `frontend/src/hooks/useProducts.ts` (ya tiene debounce).
- **Qué hacer:**
  - Backend: `WHERE name ILIKE $1 OR description ILIKE $1 OR tags::text ILIKE $1`.
  - Frontend: sin cambios (ya envía `search`).
- **Por qué:** escalar el buscador para cuando el catálogo crezca.

#### 6. Botón flotante de WhatsApp (mobile)

- **Archivos:** `frontend/src/components/layout/Layout.tsx` (agregar botón flotante).
- **Qué hacer:**
  - Botón fijo en la esquina inferior derecha (verde WhatsApp).
  - Solo visible en mobile (`md:hidden`).
  - Abre `https://wa.me/56975303324` con mensaje predefinido.
- **Por qué:** mejora la experiencia en mobile.

---

## 🟢 Fase 3: Mejoras (cuando haya tiempo)

| #   | Tarea                                            | ¿Hecho? | Tiempo estimado |
| --- | ------------------------------------------------ | ------- | --------------- |
| 7   | **Tests** (hooks críticos + `calculateSubtotal`) | [ ]     | 3-4 horas       |
| 8   | **SEO básico** (sitemap, metadatos por producto) | [ ]     | 2 horas         |
| 9   | **Analítica** (Vercel Analytics o Plausible)     | [ ]     | 1 hora          |
| 10  | **PWA** (opcional)                               | [ ]     | 3-4 horas       |

### Detalle de cada tarea

#### 7. Tests

- **Qué hacer:**
  - Tests unitarios de `calculateSubtotal` (backend).
  - Tests de `useCarrito` y `useProducts` (frontend).
  - Test end-to-end del flujo crítico (catálogo → carrito → WhatsApp) con Playwright.
- **Por qué:** para no romper nada al refactorizar.

#### 8. SEO básico

- **Qué hacer:**
  - Sitemap (`sitemap.xml`).
  - Metadatos por producto (title, description, Open Graph).
  - `robots.txt`.
- **Por qué:** para aparecer en Google.

#### 9. Analítica

- **Qué hacer:**
  - Vercel Analytics (free) o Plausible (free tier).
  - Saber qué buscan, qué ven, qué abandonan.
- **Por qué:** sin caja registradora, la analítica web es la única fuente de datos.

#### 10. PWA (opcional)

- **Qué hacer:**
  - Manifest + service worker.
  - Catálogo instalable en el celular.
- **Por qué:** mejora la experiencia mobile (opcional).

---

## 🧠 Cómo trabajar con agentes IA

### Al inicio de cada chat nuevo

1. Pega `PROMPT.md` (contexto del proyecto).
2. Pega `ESTADO.md` (estado actual).
3. Pega `ROADMAP.md` (este archivo, para saber qué sigue).
4. Pega el `cat` del archivo específico que vas a editar.
5. Indica: **"Quiero hacer X"** (la tarea del roadmap).

### Durante la sesión

- Pide **una cosa a la vez**.
- Pregunta **"¿por qué?"** cada vez que el agente proponga un cambio.
- Predice qué va a pasar antes de pegar.
- Usa `grep` en vez de `cat` para cambios pequeños.

### Al final de cada sesión

1. Actualiza `ESTADO.md` (módulos + últimos cambios).
2. Actualiza `CHANGELOG.md` (nueva versión).
3. Marca la tarea como `[x]` en `ROADMAP.md` (o bórrala).
4. Commit + push.

---

## 📚 Documentos relacionados

- [`PROMPT.md`](./PROMPT.md) — Contexto, reglas, stack, convenciones.
- [`ESTADO.md`](./ESTADO.md) — Estado actual del proyecto (módulos, últimos cambios).
- [`CHANGELOG.md`](./CHANGELOG.md) — Historial completo de cambios por versión.
- [`CONTRIBUTING.md`](./CONTRIBUTING.md) — Flujo de trabajo, commits, cómo contribuir.
- [`README.md`](./README.md) — Descripción general, instalación, funcionalidades.
