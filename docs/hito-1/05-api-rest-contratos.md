# PUNTO 5 - CONTRATO DE DATOS DE LA API REST

## COMERCIAL URUGUAY - MARKETPLACE

---

## 1. AUTENTICACIÓN

### 1.1 REGISTRO DE USUARIO

<!--
  ¿Qué hace?
  -----------
  Permite a un nuevo usuario crear una cuenta en la plataforma.
  Los datos se guardan en la tabla USERS.
-->

**POST** `/api/auth/register`
**Request (Lo que el cliente debe enviar):**

```json
{
  "fullName": "María Pérez", // Obligatorio → USERS.fullName
  "email": "maria@correo.com", // Obligatorio → USERS.email
  "password": "SecurePass123", // Obligatorio → Se hashea y guarda en USERS.password
  "phone": "+56 9 1234 5678", // Opcional → USERS.phone
  "address": "Uruguay 660, Valparaíso" // Opcional → USERS.address
}
Response (201 - Created):
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000", // Generado por BD (USERS.id)
    "fullName": "María Pérez",                    // USERS.fullName
    "email": "maria@correo.com",                  // USERS.email
    "role": "CLIENTE"                             // Asignado por defecto (USERS.role)
  }
}
Response (400 - Bad Request) - Error de validación:
{
  "success": false,
  "message": "El correo ya está registrado"
}
Response (400 - Bad Request) - Error de validación:
{
  "success": false,
  "message": "La contraseña debe tener al menos 8 caracteres"
}
1.2 INICIO DE SESIÓN
<!-- ¿Qué hace? ----------- Permite a un usuario autenticarse en la plataforma. Busca en la tabla USERS por email y verifica la contraseña. -->
POST /api/auth/login
Request (Lo que el cliente debe enviar):
{
  "email": "maria@correo.com",        // USERS.email
  "password": "SecurePass123"         // Se verifica contra USERS.password
}
Response (200 - OK):
{
  "success": true,
  "message": "Inicio de sesión exitoso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...", // JWT generado
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000", // USERS.id
      "fullName": "María Pérez",                    // USERS.fullName
      "email": "maria@correo.com",                  // USERS.email
      "role": "CLIENTE"                             // USERS.role
    }
  }
}
Response (401 - Unauthorized):
{
  "success": false,
  "message": "Credenciales incorrectas"
}
1.3 OBTENER PERFIL DEL USUARIO
<!-- ¿Qué hace? ----------- Obtiene los datos completos del usuario autenticado. Devuelve todos los campos de la tabla USERS excepto password. -->
GET /api/auth/profile
Headers (Lo que el cliente debe enviar):
Authorization: Bearer <token>  // JWT obtenido en el login
Response (200 - OK):
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000", // USERS.id
    "fullName": "María Pérez",                    // USERS.fullName
    "email": "maria@correo.com",                  // USERS.email
    "phone": "+56 9 1234 5678",                   // USERS.phone
    "address": "Uruguay 660, Valparaíso",         // USERS.address
    "role": "CLIENTE",                            // USERS.role
    "isActive": true,                             // USERS.isActive
    "createdAt": "2026-06-22T10:00:00Z",         // USERS.createdAt
    "updatedAt": "2026-06-22T10:00:00Z"          // USERS.updatedAt
  }
}
Response (401 - Unauthorized):
{
  "success": false,
  "message": "Token inválido o expirado"
}
1.4 ACTUALIZAR PERFIL DEL USUARIO
<!-- ¿Qué hace? ----------- Permite al usuario actualizar sus datos personales en la tabla USERS. Solo se actualizan los campos que se envían en la petición. -->
PUT /api/auth/profile
Headers (Lo que el cliente debe enviar):
Authorization: Bearer <token>  // JWT obtenido en el login
Request (Lo que el cliente debe enviar - todos opcionales):
{
  "fullName": "María Pérez Gómez",     // Opcional → USERS.fullName
  "phone": "+56 9 8765 4321",          // Opcional → USERS.phone
  "address": "Nueva Dirección 123, Valparaíso", // Opcional → USERS.address
  "password": "NuevaClave123"          // Opcional → Se hashea y guarda en USERS.password
}
Response (200 - OK):
{
  "success": true,
  "message": "Perfil actualizado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000", // USERS.id
    "fullName": "María Pérez Gómez",              // USERS.fullName (actualizado)
    "email": "maria@correo.com",                  // USERS.email
    "phone": "+56 9 8765 4321",                   // USERS.phone (actualizado)
    "address": "Nueva Dirección 123, Valparaíso"  // USERS.address (actualizado)
  }
}
Response (401 - Unauthorized):
{
  "success": false,
  "message": "Token inválido o expirado"
}
2.1 LISTAR CATEGORÍAS
GET /api/categories
¿Qué hace? Obtiene todas las categorías disponibles en la tienda. No requiere autenticación (público).
Response (200 - OK):
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "Juguetes y Cumpleaños",
      "description": "Productos para fiestas y entretenimiento infantil",
      "icon": "🎂",
      "createdAt": "2026-06-22T10:00:00Z"
    },
    {
      "id": "550e8400-e29b-41d4-a716-446655440011",
      "name": "Electrodomésticos",
      "description": "Productos para el hogar",
      "icon": "🔌",
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ]
}
2.2 OBTENER CATEGORÍA POR ID
GET /api/categories/:id
¿Qué hace? Obtiene los datos de una categoría específica. No requiere autenticación (público).
Response (200 - OK):
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440010",
    "name": "Juguetes y Cumpleaños",
    "description": "Productos para fiestas y entretenimiento infantil",
    "icon": "🎂",
    "createdAt": "2026-06-22T10:00:00Z"
  }
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Categoría no encontrada"
}
2.3 CREAR CATEGORÍA (ADMIN)
POST /api/categories
Headers:
Authorization: Bearer <admin_token>
¿Qué hace? Crea una nueva categoría. Solo administradores.
Request:
{
  "name": "Electrodomésticos",       // Obligatorio → CATEGORIES.name
  "description": "Productos para el hogar", // Opcional → CATEGORIES.description
  "icon": "🔌"                       // Opcional → CATEGORIES.icon
}
Response (201 - Created):
{
  "success": true,
  "message": "Categoría creada exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440011", // Generado por BD
    "name": "Electrodomésticos",
    "description": "Productos para el hogar",
    "icon": "🔌",
    "createdAt": "2026-06-22T10:00:00Z"
  }
}
Response (400 - Bad Request):
{
  "success": false,
  "message": "El nombre de la categoría ya existe"
}
2.4 EDITAR CATEGORÍA (ADMIN)
PUT /api/categories/:id
Headers:
Authorization: Bearer <admin_token>
¿Qué hace? Actualiza una categoría existente. Solo administradores.
Request:
{
  "name": "Electrodomésticos y Línea Blanca", // Opcional → CATEGORIES.name
  "description": "Productos para el hogar y cocina", // Opcional → CATEGORIES.description
  "icon": "🔌"                       // Opcional → CATEGORIES.icon
}
Response (200 - OK):
{
  "success": true,
  "message": "Categoría actualizada exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440011",
    "name": "Electrodomésticos y Línea Blanca",
    "description": "Productos para el hogar y cocina",
    "icon": "🔌"
  }
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Categoría no encontrada"
}
2.5 ELIMINAR CATEGORÍA (ADMIN)
DELETE /api/categories/:id
Headers:
Authorization: Bearer <admin_token>
¿Qué hace? Elimina una categoría. Solo administradores.
Response (200 - OK):
{
  "success": true,
  "message": "Categoría eliminada exitosamente"
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Categoría no encontrada"
}
🚀 ENDPOINTS DE PRODUCTOS
3.1 LISTAR PRODUCTOS
GET /api/products?category=juguetes&minPrice=1000&maxPrice=5000&search=bur&page=1&limit=10
¿Qué hace? Obtiene todos los productos con filtros opcionales (categoría, precio, búsqueda). Público.
Response (200 - OK):
{
  "success": true,
  "data": {
    "products": [
      {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Burbujero de Juguete con Luces",
        "description": "Divertido burbujero manual con luces LED integradas.",
        "price": 1500,
        "sku": "JUG-2026-042",
        "stock": 25,
        "images": ["url1.jpg", "url2.jpg"],
        "category": {
          "id": "550e8400-e29b-41d4-a716-446655440010",
          "name": "Juguetes y Cumpleaños"
        },
        "isActive": true,
        "isOnSale": false,
        "discount": null
      }
    ],
    "pagination": {
      "total": 124,
      "page": 1,
      "limit": 10,
      "totalPages": 13
    }
  }
}
3.2 OBTENER PRODUCTO POR ID
GET /api/products/:id
¿Qué hace? Obtiene el detalle completo de un producto. Público.
Response (200 - OK):
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Burbujero de Juguete con Luces",
    "description": "Divertido burbujero manual con luces LED integradas.",
    "price": 1500,
    "sku": "JUG-2026-042",
    "stock": 25,
    "images": ["url1.jpg", "url2.jpg"],
    "category": {
      "id": "550e8400-e29b-41d4-a716-446655440010",
      "name": "Juguetes y Cumpleaños"
    },
    "isActive": true,
    "isOnSale": false,
    "discount": null,
    "createdAt": "2026-06-22T10:00:00Z",
    "updatedAt": "2026-06-22T10:00:00Z"
  }
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Producto no encontrado"
}
3.3 CREAR PRODUCTO (ADMIN)
POST /api/products
Headers:
Authorization: Bearer <admin_token>
Request:
{
  "name": "Burbujero de Juguete con Luces",
  "description": "Divertido burbujero manual con luces LED integradas.",
  "price": 1500,
  "sku": "JUG-2026-042",
  "stock": 25,
  "images": ["url1.jpg", "url2.jpg"],
  "categoryId": "550e8400-e29b-41d4-a716-446655440010",
  "isOnSale": false,
  "discount": null
}
Response (201 - Created):
{
  "success": true,
  "message": "Producto creado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Burbujero de Juguete con Luces",
    "price": 1500,
    "stock": 25
  }
}
3.4 EDITAR PRODUCTO (ADMIN)
PUT /api/products/:id
Headers:
Authorization: Bearer <admin_token>
Request (todos opcionales):
{
  "name": "Burbujero de Juguete con Luces - Plus",
  "price": 1800,
  "stock": 30,
  "isOnSale": true,
  "discount": 15
}
Response (200 - OK):
{
  "success": true,
  "message": "Producto actualizado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "name": "Burbujero de Juguete con Luces - Plus",
    "price": 1800,
    "stock": 30,
    "isOnSale": true,
    "discount": 15
  }
}
3.5 ELIMINAR PRODUCTO (ADMIN)
DELETE /api/products/:id
Headers:
Authorization: Bearer <admin_token>
Response (200 - OK):
{
  "success": true,
  "message": "Producto eliminado exitosamente"
}
3.6 ACTUALIZAR STOCK (ADMIN)
PATCH /api/products/:id/stock
Headers:
Authorization: Bearer <admin_token>
Request:
{
  "stock": 50
}
Response (200 - OK):
{
  "success": true,
  "message": "Stock actualizado exitosamente",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "stock": 50
  }
}
```

🚀 ENDPOINTS DE CARRITO
4.1 OBTENER CARRITO
GET /api/cart
Headers:
Authorization: Bearer <token>
¿Qué hace? Obtiene el carrito del usuario autenticado con todos sus productos y el total.

```json
Response (200 - OK):
{
"success": true,
"data": {
"cartId": "550e8400-e29b-41d4-a716-446655440020",
"items": [
{
"productId": "550e8400-e29b-41d4-a716-446655440001",
"name": "Burbujero de Juguete con Luces",
"price": 1500,
"quantity": 2,
"subtotal": 3000,
"image": "url1.jpg"
}
],
"totalItems": 2,
"total": 3000
}
}
Response (404 - Not Found):
{
"success": false,
"message": "Carrito no encontrado"
}
4.2 AGREGAR PRODUCTO AL CARRITO
POST /api/cart/items
Headers:
Authorization: Bearer <token>
Request:
{
"productId": "550e8400-e29b-41d4-a716-446655440001",
"quantity": 2
}
Response (200 - OK):
{
"success": true,
"message": "Producto agregado al carrito",
"data": {
"productId": "550e8400-e29b-41d4-a716-446655440001",
"quantity": 2,
"subtotal": 3000
}
}
Response (404 - Not Found):
{
"success": false,
"message": "Producto no encontrado"
}
Response (400 - Bad Request):
{
"success": false,
"message": "Stock insuficiente. Disponible: 10"
}
4.3 ACTUALIZAR CANTIDAD EN CARRITO
PUT /api/cart/items/:productId
Headers:
Authorization: Bearer <token>
Request:
{
"quantity": 5
}
Response (200 - OK):
{
"success": true,
"message": "Cantidad actualizada",
"data": {
"productId": "550e8400-e29b-41d4-a716-446655440001",
"quantity": 5,
"subtotal": 7500
}
}
Response (400 - Bad Request):
{
"success": false,
"message": "Stock insuficiente. Disponible: 10"
}
4.4 ELIMINAR PRODUCTO DEL CARRITO
DELETE /api/cart/items/:productId
Headers:
Authorization: Bearer <token>
Response (200 - OK):
{
"success": true,
"message": "Producto eliminado del carrito"
}
Response (404 - Not Found):
{
"success": false,
"message": "Producto no encontrado en el carrito"
}
4.5 VACIAR CARRITO
DELETE /api/cart
Headers:
Authorization: Bearer <token>
Response (200 - OK):
{
"success": true,
"message": "Carrito vaciado exitosamente"
}
```

5. PEDIDOS
   5.1 CREAR PEDIDO
   <!-- ¿Qué hace? ----------- Crea un nuevo pedido a partir del carrito del usuario. Tablas: ORDERS y ORDER_ITEMS El carrito se vacía después de crear el pedido. -->
   POST /api/orders
   Headers:
   text
   Authorization: Bearer <token>

```json
Request:
{
  "deliveryOption": "RETIRO_TIENDA", // RETIRO_TIENDA o ENVIO_DOMICILIO
  "whatsappMessage": "¡Hola Comercial Uruguay! Quiero consultar disponibilidad de estos productos..."
}
Response (201 - Created):
{
  "success": true,
  "message": "Pedido creado exitosamente",
  "data": {
    "orderId": "550e8400-e29b-41d4-a716-446655440030",
    "orderNumber": "ORD-2026-0001",
    "total": 3000,
    "status": "RECIBIDO"
  }
}
Response (400 - Bad Request):
{
  "success": false,
  "message": "El carrito está vacío"
}
5.2 LISTAR PEDIDOS DEL USUARIO
GET /api/orders
Headers:
Authorization: Bearer <token>
Response (200 - OK):
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440030",
      "orderNumber": "ORD-2026-0001",
      "total": 3000,
      "status": "RECIBIDO",
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ]
}
5.3 OBTENER DETALLE DE PEDIDO
GET /api/orders/:id
Headers:
text
Authorization: Bearer <token>
Response (200 - OK):
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "orderNumber": "ORD-2026-0001",
    "total": 3000,
    "status": "RECIBIDO",
    "deliveryOption": "RETIRO_TIENDA",
    "whatsappMessage": "¡Hola Comercial Uruguay!...",
    "createdAt": "2026-06-22T10:00:00Z",
    "items": [
      {
        "productId": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Burbujero de Juguete con Luces",
        "quantity": 2,
        "unitPrice": 1500,
        "subtotal": 3000
      }
    ]
  }
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Pedido no encontrado"
}
5.4 LISTAR TODOS LOS PEDIDOS (ADMIN)
GET /api/orders/all
Headers:
text
Authorization: Bearer <admin_token>
Response (200 - OK):
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440030",
      "orderNumber": "ORD-2026-0001",
      "user": {
        "id": "550e8400-e29b-41d4-a716-446655440000",
        "fullName": "María Pérez",
        "email": "maria@correo.com"
      },
      "total": 3000,
      "status": "RECIBIDO",
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ]
}
5.5 CAMBIAR ESTADO DE PEDIDO (ADMIN)
<!-- ¿Qué hace? ----------- Actualiza el estado de un pedido. Estados posibles: RECIBIDO, REVISION, CONFIRMADO, ENVIADO, ENTREGADO, CANCELADO -->
PUT /api/orders/:id/status
Headers:
Authorization: Bearer <admin_token>
Request:
{
  "status": "CONFIRMADO"
}
Response (200 - OK):
{
  "success": true,
  "message": "Estado del pedido actualizado",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440030",
    "status": "CONFIRMADO"
  }
}
Response (400 - Bad Request):
{
  "success": false,
  "message": "Estado no válido"
}
6. FAVORITOS
6.1 LISTAR FAVORITOS DEL USUARIO
GET /api/favorites
Headers:
Authorization: Bearer <token>
Response (200 - OK):
{
  "success": true,
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440040",
      "product": {
        "id": "550e8400-e29b-41d4-a716-446655440001",
        "name": "Burbujero de Juguete con Luces",
        "price": 1500,
        "images": ["url1.jpg"]
      },
      "createdAt": "2026-06-22T10:00:00Z"
    }
  ]
}
6.2 AGREGAR PRODUCTO A FAVORITOS
POST /api/favorites/:productId
Headers:
Authorization: Bearer <token>
Response (201 - Created):
{
  "success": true,
  "message": "Producto agregado a favoritos",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440040",
    "productId": "550e8400-e29b-41d4-a716-446655440001"
  }
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Producto no encontrado"
}
6.3 ELIMINAR PRODUCTO DE FAVORITOS
DELETE /api/favorites/:productId
Headers:
Authorization: Bearer <token>
Response (200 - OK):
{
  "success": true,
  "message": "Producto eliminado de favoritos"
}
Response (404 - Not Found):
{
  "success": false,
  "message": "Producto no encontrado en favoritos"
}
```
