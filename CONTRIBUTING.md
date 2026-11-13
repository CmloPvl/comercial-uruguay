# 🤝 CONTRIBUTING — Comercial Uruguay

> Guía de flujo de trabajo, convenciones y cómo contribuir al proyecto.
> **Última actualización:** 2026-10-30

---

## 📑 Índice

1. [Cómo usar este archivo](#cómo-usar-este-archivo)
2. [Requisitos previos](#requisitos-previos)
3. [Cómo levantar el proyecto](#cómo-levantar-el-proyecto)
4. [Flujo de ramas](#flujo-de-ramas)
5. [Convención de commits](#convención-de-commits)
6. [Checklist antes de commit](#checklist-antes-de-commit)
7. [Checklist antes de push](#checklist-antes-de-push)
8. [Plantilla de prompt para agentes IA](#plantilla-de-prompt-para-agentes-ia)
9. [Cómo actualizar los MD](#cómo-actualizar-los-md)
10. [Documentos relacionados](#documentos-relacionados)

---

## 🧭 Cómo usar este archivo

- **Antes de empezar a trabajar**: lee la sección [Cómo levantar el proyecto](#cómo-levantar-el-proyecto).
- **Antes de cada commit**: revisa el [Checklist antes de commit](#checklist-antes-de-commit).
- **Antes de cada push**: revisa el [Checklist antes de push](#checklist-antes-de-push).
- **Al final de cada sesión con IA**: revisa [Cómo actualizar los MD](#cómo-actualizar-los-md).


---

## 🧰 Requisitos previos

- **Node.js 22** o superior.
- **PostgreSQL** (o cuenta en Supabase).
- **Git**.
- Cuenta en **Supabase** (Storage + Base de Datos).
- Cuenta en **Resend** (envío de emails).
- Editor recomendado: **VS Code** con extensiones de TypeScript, Tailwind y ESLint.

---

## 🚀 Cómo levantar el proyecto

### Backend

1. `cd backend`
2. `cp .env.example .env`
3. Completar las variables en `.env` (ver [`README.md`](./README.md#variables-de-entorno)).
4. `npm install`
5. `npm run dev`

### Frontend (en otra terminal)

1. `cd frontend`
2. `cp .env.example .env`
3. Completar las variables en `.env`.
4. `npm install`
5. `npm run dev`

Abrir en el navegador: `http://localhost:5173`

---

## 🌿 Flujo de ramas

Actualmente el proyecto trabaja **directamente sobre `master`** (proyecto personal/familiar).

**Convención:**

- `master` → rama principal, siempre estable.
- Para cambios grandes, crear rama: `feat/nombre-corto` o `fix/nombre-corto`.
- Hacer merge a `master` cuando el cambio esté probado.

**Buenas prácticas:**

- Commits atómicos (un cambio por commit).
- Probar antes de hacer push.
- No subir `.env` reales.

---

## 📝 Convención de commits

Se sigue una adaptación de [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):

| Prefijo     | Uso                                     |
| ----------- | --------------------------------------- |
| `feat:`     | Nueva funcionalidad.                    |
| `fix:`      | Corrección de bug.                      |
| `docs:`     | Cambios en documentación (MD).          |
| `refactor:` | Refactorización sin cambio funcional.   |
| `chore:`    | Tareas de mantenimiento (deps, config). |
| `style:`    | Cambios de formato (no lógica).         |
| `test:`     | Tests.                                  |

**Ejemplos:**

- `feat: agregar productos relacionados en detalle`
- `fix: corregir category_name en ProductCard`
- `docs: actualizar CHANGELOG y README (v1.2.0-beta.6)`
- `refactor: extraer lógica de carrito a useCarrito`

**Formato del mensaje:**

- Primera línea: `tipo: descripción corta` (máx. 72 caracteres).
- Línea en blanco.
- Cuerpo opcional con detalles.
- Referencias a issues si aplica.


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

## ✅ Checklist antes de push

- [ ] El commit anterior está hecho y probado.
- [ ] `git log --oneline -5` muestra commits coherentes.
- [ ] No subí archivos sensibles (`.env`, claves, tokens).
- [ ] Si el push es a `master`, el build pasa en local.
- [ ] Si el push es a `master`, actualicé la versión en `CHANGELOG.md` y `PROMPT.md` (si aplica).

---

## 🤖 Plantilla de prompt para agentes IA

### Al inicio de cada chat nuevo

1. Pega `PROMPT.md`.
2. Pega `ESTADO.md`.
3. Si es un bug, pega el fragmento de código relevante.
4. Indica en una línea: **"Quiero hacer X"**.

### Durante la sesión

- Pide **una cosa a la vez**.
- Confirma antes de que el agente genere código.
- Prueba cada cambio antes de pedir el siguiente.
- Si el agente se va por las ramas, recuérdale: **"Trabaja UNO POR UNO, micro-pasos"**.

### Al final de cada sesión

Pide al agente:

> "Resume en 5 bullets qué hicimos y qué queda pendiente, en formato para pegar en `ESTADO.md`."

Luego:

1. Actualiza `ESTADO.md` con el resumen.
2. Actualiza `CHANGELOG.md` con los cambios.
3. Commit con mensaje descriptivo.

---

## 📝 Cómo actualizar los MD

| Archivo           | Cuándo actualizar                                         |
| ----------------- | --------------------------------------------------------- |
| `PROMPT.md`       | Solo si cambia una decisión técnica, regla o convención.  |
| `ESTADO.md`       | Al final de cada sesión (módulos + últimos cambios).      |
| `CHANGELOG.md`    | Cada vez que haya un cambio funcional.                    |
| `README.md`       | Si cambia la instalación, funcionalidades o roadmap.      |
| `CONTRIBUTING.md` | Si cambia el flujo de trabajo o la convención de commits. |

**Regla:** un cambio funcional = un ítem en `CHANGELOG.md` + actualización de `ESTADO.md`.

---

## 📚 Documentos relacionados

- [`PROMPT.md`](./PROMPT.md) — Contexto, reglas, stack, convenciones.
- [`ESTADO.md`](./ESTADO.md) — Estado actual del proyecto (módulos, últimos cambios).
- [`CHANGELOG.md`](./CHANGELOG.md) — Historial completo de cambios por versión.
- [`README.md`](./README.md) — Descripción general, instalación, funcionalidades.

