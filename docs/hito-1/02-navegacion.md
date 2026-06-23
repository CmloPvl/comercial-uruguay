# PUNTO 2 - DEFINICIÓN DE NAVEGACIÓN ENTRE VISTAS

## COMERCIAL URUGUAY - MARKETPLACE

---

## 1. DIAGRAMA DE FLUJO DE NAVEGACIÓN

                    ┌─────────────────────────┐
                    │      VISITANTE          │
                    │   (Sin Autenticación)   │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │    VISTAS PÚBLICAS      │
                    │                         │
                    │  • Home                 │
                    │  • Vitrina / Catálogo   │
                    │  • Detalle de Producto  │
                    │  • Páginas Institucionales│
                    │  • Login / Registro     │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
              ▼                  ▼                  ▼
    ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
    │   Navegar como  │  │  Iniciar Sesión │  │  Registrarse    │
    │    Invitado     │  │    (Login)      │  │  (Registro)     │
    └─────────────────┘  └────────┬────────┘  └────────┬────────┘
                                  │                    │
                                  └────────┬───────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │   VALIDAR CREDENCIALES  │
                              │  (JWT + Rol en Sesión) │
                              └────────────┬────────────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
              ▼                            ▼                            ▼
    ┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
    │  ROL: CLIENTE     │      │  ROL: ADMIN       │      │  CREDENCIALES     │
    │                   │      │                   │      │   INVÁLIDAS       │
    └─────────┬─────────┘      └─────────┬─────────┘      └─────────┬─────────┘
              │                            │                        │
              ▼                            ▼                        ▼
    ┌───────────────────┐      ┌───────────────────┐      ┌───────────────────┐
    │  VISTAS PRIVADAS  │      │  VISTAS PRIVADAS  │      │   REDIRIGIR A     │
    │    CLIENTE        │      │   ADMINISTRADOR   │      │     /login        │
    │                   │      │                   │      │  (con mensaje de  │
    │  • Mi Perfil      │      │  • Dashboard      │      │    error)         │
    │  • Mis Pedidos    │      │  • Inventario     │      └───────────────────┘
    │  • Carrito        │      │  • Pedidos        │
    │  • Favoritos      │      │  • Clientes       │
    └───────────────────┘      │  • Contabilidad   │
                               └───────────────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │    CERRAR SESIÓN        │
                              │  (Eliminar token/local) │
                              └────────────┬────────────┘
                                           │
                                           ▼
                              ┌─────────────────────────┐
                              │   REDIRIGIR A HOME      │
                              └─────────────────────────┘

---

---

## 2. CLASIFICACIÓN DE VISTAS

### 🟢 VISTAS PÚBLICAS (Acceso Libre - Sin Autenticación)

| #   | Vista                | Ruta            |
| --- | -------------------- | --------------- |
| 1   | Home                 | `/`             |
| 2   | Vitrina / Catálogo   | `/productos`    |
| 3   | Detalle de Producto  | `/producto/:id` |
| 4   | Iniciar Sesión       | `/login`        |
| 5   | Registro             | `/registro`     |
| 6   | Recuperar Contraseña | `/recuperar`    |
| 7   | Quiénes Somos        | `/nosotros`     |
| 8   | Dirección y Horarios | `/direccion`    |
| 9   | Políticas de Envío   | `/politicas`    |
| 10  | Contacto             | `/contacto`     |

---

### 🔵 VISTAS PRIVADAS - CLIENTE (Requiere Autenticación)

| #   | Vista              | Ruta                     |
| --- | ------------------ | ------------------------ |
| 1   | Mi Perfil          | `/mi-cuenta/perfil`      |
| 2   | Mis Pedidos        | `/mi-cuenta/pedidos`     |
| 3   | Detalle de Pedido  | `/mi-cuenta/pedidos/:id` |
| 4   | Carrito de Compras | `/mi-cuenta/carrito`     |
| 5   | Mis Favoritos      | `/mi-cuenta/favoritos`   |

---

### 🔴 VISTAS PRIVADAS - ADMINISTRADOR (Requiere Autenticación + Rol ADMIN)

| #   | Vista                     | Ruta                           |
| --- | ------------------------- | ------------------------------ |
| 1   | Dashboard                 | `/admin/dashboard`             |
| 2   | Gestión de Inventario     | `/admin/inventario`            |
| 3   | Crear Producto            | `/admin/inventario/nuevo`      |
| 4   | Editar Producto           | `/admin/inventario/:id/editar` |
| 5   | Gestión de Pedidos        | `/admin/pedidos`               |
| 6   | Detalle de Pedido (Admin) | `/admin/pedidos/:id`           |
| 7   | Gestión de Clientes       | `/admin/usuarios`              |
| 8   | Contabilidad y Reportes   | `/admin/reportes`              |

---

## 3. TABLA DE ACCESO POR ROL

| Vista                     | Público | Cliente | Admin |
| ------------------------- | ------- | ------- | ----- |
| **VISTAS PÚBLICAS**       |         |         |       |
| Home                      | ✅      | ✅      | ✅    |
| Vitrina / Catálogo        | ✅      | ✅      | ✅    |
| Detalle de Producto       | ✅      | ✅      | ✅    |
| Iniciar Sesión            | ✅      | ✅      | ✅    |
| Registro                  | ✅      | ✅      | ✅    |
| Recuperar Contraseña      | ✅      | ✅      | ✅    |
| Quiénes Somos             | ✅      | ✅      | ✅    |
| Dirección y Horarios      | ✅      | ✅      | ✅    |
| Políticas de Envío        | ✅      | ✅      | ✅    |
| Contacto                  | ✅      | ✅      | ✅    |
| **VISTAS CLIENTE**        |         |         |       |
| Mi Perfil                 | ❌      | ✅      | ✅    |
| Mis Pedidos               | ❌      | ✅      | ✅    |
| Detalle de Pedido         | ❌      | ✅      | ✅    |
| Carrito de Compras        | ❌      | ✅      | ✅    |
| Mis Favoritos             | ❌      | ✅      | ✅    |
| **VISTAS ADMIN**          |         |         |       |
| Dashboard                 | ❌      | ❌      | ✅    |
| Gestión de Inventario     | ❌      | ❌      | ✅    |
| Crear Producto            | ❌      | ❌      | ✅    |
| Editar Producto           | ❌      | ❌      | ✅    |
| Gestión de Pedidos        | ❌      | ❌      | ✅    |
| Detalle de Pedido (Admin) | ❌      | ❌      | ✅    |
| Gestión de Clientes       | ❌      | ❌      | ✅    |
| Contabilidad y Reportes   | ❌      | ❌      | ✅    |

---

## 4. VARIABLE DE SESIÓN EN FRONTEND

Para gestionar la autenticación, el frontend almacena los datos del usuario logueado en `localStorage`:

```javascript
{
  "user": {
    "id": "uuid",
    "fullName": "María Pérez",
    "email": "maria.perez@correo.com",
    "role": "CLIENTE" | "ADMIN"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

localStorage.removeItem('token');
localStorage.removeItem('user');
window.location.href = '/';

5. FLUJO DE CIERRE DE SESIÓN

Usuario logueado → Clic en "Cerrar Sesión" → Eliminar token → Redirigir a Home (/)

6. REDIRECCIONES POST-AUTENTICACIÓN
   Escenario                Redirección
   Login exitoso (CLIENTE)  /mi-cuenta
   Login exitoso (ADMIN)    /admin/dashboard
   Registro exitoso         /login
   Cierre de sesión         /
   Acceso denegado          /
   Token expirado           /login

© 2026 Comercial Uruguay - Todos los derechos reservados
```
