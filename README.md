# 🏪 Comercial Uruguay - Marketplace

Integrantes: Camilo Riquelme - Mairon Monarde

## 📋 Descripción del Proyecto

Marketplace digital para **Comercial Uruguay**, un comercio local en Valparaíso especializado en productos económicos con distintas categorías.

La plataforma permite a los clientes navegar por el catálogo, consultar disponibilidad de productos y generar pedidos a través de WhatsApp, manteniendo la calidez del trato personalizado que caracteriza al local.

---

## ✨ Características Principales

- 🛍️ **Catálogo interactivo** con búsqueda y filtros avanzados
- 🛒 **Carrito de compras** con generación de pedidos por WhatsApp
- 👤 **Área de cliente** con perfil, historial y favoritos
- 📊 **Panel de administración** para publicar productos, gestión de inventario y pedidos
- 🔐 **Autenticación segura** con JWT y control de roles
- 📱 **Diseño responsive** optimizado para móviles y escritorio

---

## 🛠️ Stack Tecnológico

| Capa          | Tecnología                     |
| ------------- | ------------------------------ |
| Frontend      | React + TypeScript + Vite      |
| Backend       | Node.js + Express + TypeScript |
| Base de Datos | PostgreSQL + Supabase          |
| ORM           | Prisma                         |
| Autenticación | JWT + bcrypt                   |
| Estilos       | Tailwind CSS                   |
| Validación    | Zod                            |
| Testing       | Vitest + Supertest             |

### Dependencias Principales

**Frontend:**

react, react-dom, react-router-dom, @tanstack/react-query,
axios, zod, react-hook-form, react-hot-toast,
tailwindcss, react-icons

**Backend:**

express, cors, helmet, jsonwebtoken, bcrypt,
express-rate-limit, prisma, @prisma/client,
zod, envalid, dotenv, winston, uuid, date-fns

---

📌 LISTA DE VERIFICACIÓN (CHECKLIST) PROFESIONAL

Te voy a crear una checklist profesional para tu proyecto:
🟢 1. PRUEBAS FUNCIONALES (QA)

# Tarea Estado

1 Autenticación
1.1 Registro de usuario ✅
1.2 Login con credenciales correctas ✅
1.3 Login con credenciales incorrectas ✅
1.4 Recuperar contraseña ⏳
1.5 Cerrar sesión ✅
2 Productos
2.1 Listar productos en tienda ✅
2.2 Ver detalle de producto ✅
2.3 Filtrar por categoría ✅
2.4 Filtrar por precio ✅
2.5 Buscar productos ❌
3 Carrito
3.1 Agregar producto ✅
3.2 Actualizar cantidad ✅
3.3 Eliminar producto ✅
3.4 Vaciar carrito ✅
3.5 Enviar pedido por WhatsApp ✅
4 Favoritos
4.1 Agregar a favoritos ✅
4.2 Ver favoritos ✅
4.3 Eliminar de favoritos ✅
5 Pedidos
5.1 Crear pedido ⏳
5.2 Ver mis pedidos ✅
5.3 Ver detalle de pedido ✅
6 Admin
6.1 Crear producto ✅
6.2 Editar producto ❌
6.3 Eliminar producto ❌
6.4 Ver productos (admin) ✅
6.5 Ver pedidos (admin) ✅
6.6 Cambiar estado de pedido ❌
7 Perfil
7.1 Ver datos ✅
7.2 Editar datos ✅
7.3 Cambiar contraseña ✅
🔒 2. AUDITORÍA DE SEGURIDAD

# Tarea Estado

1 Autenticación
1.1 JWT seguro ✅
1.2 bcrypt para contraseñas ✅
1.3 Rate Limiting (5 intentos) ✅
1.4 Mensajes genéricos de error ✅
2 Validaciones
2.1 Zod en frontend ✅
2.2 Zod en backend ✅
2.3 Sanitización anti-XSS ✅
3 Headers
3.1 Helmet ✅
3.2 CORS ✅
3.3 Trust Proxy ✅
4 Roles y permisos
4.1 Rutas protegidas ✅
4.2 Solo admin puede crear productos ✅
4.3 Solo admin puede ver admin ✅
5 Datos
5.1 No se exponen contraseñas ✅
5.2 No se exponen datos sensibles ✅
🎨 3. PRUEBAS DE USABILIDAD

# Tarea Estado

1 Diseño
1.1 Paleta de colores consistente ✅
1.2 Fuentes legibles ✅
1.3 Espaciado adecuado ✅
2 Responsive
2.1 Mobile (teléfonos) ⏳
2.2 Tablet ⏳
2.3 Desktop ✅
3 Carga
3.1 Spinners de carga ✅
3.2 Mensajes de error claros ✅
4 Accesibilidad
4.1 Contraste de colores ✅
4.2 Labels en formularios ✅
4.3 Títulos de página ✅
