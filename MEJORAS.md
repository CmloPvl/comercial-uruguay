# 📋 MEJORAS PENDIENTES — COMERCIAL URUGUAY

**Versión:** `v1.2.0-beta.2`  
**Última actualización:** 26 de agosto de 2026  
**Desarrollador:** Camilo Riquelme

---

## 📌 MODO DE TRABAJO

### Principio Fundamental: SEPARACIÓN DE LÓGICA Y DISEÑO (SoC)

| Capa          | Responsabilidad                                        | Ejemplo           |
| ------------- | ------------------------------------------------------ | ----------------- |
| `components/` | Diseño (UI) — Solo JSX, estilos, estructura visual     | `Login.tsx`       |
| `hooks/`      | Lógica — Estados, API, validaciones, manejo de errores | `useLogin.ts`     |
| `pages/`      | Conexión — Une diseño + lógica                         | `LoginPage.tsx`   |
| `context/`    | Estado Global — Datos compartidos                      | `AuthContext.tsx` |
| `services/`   | API — Comunicación con el backend                      | `api.ts`          |

### Metodología por Componente

1. **Analizar** el componente (identificar lógica y diseño)
2. **Crear** hook personalizado (extraer toda la lógica)
3. **Simplificar** el componente (dejar solo UI)
4. **Probar** que todo funciona
5. **Documentar** en el registro de mejoras

### Estrategia de Trabajo

- Ir **uno por uno** (no adelantarse)
- **Micro-pasos** (cambios pequeños y controlados)
- **Probar** después de cada cambio
- Mantener el código **funcionando** en todo momento
- **Comentarios explicativos** en el código
- **Sin generar código** hasta que el usuario confirme

---

## 📂 ARQUITECTURA DEL PROYECTO

### Frontend — Estructura completa

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── admin/ # Panel administración
│ │ ├── DashboardStats.tsx
│ │ ├── ImageUploader.tsx # Subida a Supabase
│ │ ├── ProductTable.tsx
│ │ └── products/ # ProductForm y subcomponentes
│ ├── auth/ # Componentes de autenticación
│ │ └── SocialLogin.tsx
│ ├── cart/ # Componentes del carrito
│ │ ├── CartItem.tsx
│ │ └── CartSummary.tsx
│ ├── common/ # Componentes reutilizables
│ │ ├── AppBreadcrumb.tsx
│ │ ├── ErrorMessage.tsx
│ │ ├── ImageCarousel.tsx # ✅ Carrusel reutilizable
│ │ ├── LoadingSpinner.tsx
│ │ ├── Logo.tsx
│ │ ├── ProtectedRoute.tsx
│ │ └── SearchBar.tsx # ✅ Buscador reutilizable
│ ├── home/ # Secciones del Home
│ │ ├── BenefitsSection.tsx
│ │ ├── CategoriesSection.tsx
│ │ ├── FeaturedProductsSection.tsx
│ │ ├── Hero.tsx # ✅ Con ImageCarousel integrado
│ │ └── LocationSection.tsx
│ ├── layout/ # Layout principal
│ │ ├── AdminLayout.tsx # ✅ Layout para admin
│ │ ├── AdminNavbar.tsx # ✅ Navbar para admin
│ │ ├── AdminNavbarMobile.tsx # ✅ Navbar admin móvil
│ │ ├── Footer.tsx
│ │ ├── Layout.tsx
│ │ ├── Navbar.tsx
│ │ ├── NavbarMenu.tsx # ✅ Menú lateral (antes NavbarMobile)
│ │ ├── drop-menu/ # Dropdowns
│ │ │ ├── NavbarAdminMenu.tsx
│ │ │ ├── NavbarGuestMenu.tsx
│ │ │ └── NavbarUserMenu.tsx
│ │ └── footer/ # Componentes del Footer
│ ├── products/ # Componentes de tienda
│ │ ├── ProductCard.tsx
│ │ ├── ProductFilters.tsx
│ │ ├── ProductGrid.tsx
│ │ ├── ProductList.tsx
│ │ └── ProductsBanner.tsx
│ └── ui/ # shadcn/ui + custom
│ ├── alert-dialog.tsx
│ ├── avatar.tsx
│ ├── badge.tsx
│ ├── breadcrumb.tsx
│ ├── button.tsx
│ ├── card.tsx
│ ├── checkbox.tsx
│ ├── dialog.tsx
│ ├── dropdown-menu.tsx
│ ├── dropzone.tsx
│ ├── form-field.tsx
│ ├── input.tsx
│ ├── label.tsx
│ ├── select.tsx
│ ├── separator.tsx
│ ├── sheet.tsx
│ ├── skeleton.tsx
│ ├── table.tsx
│ ├── tabs.tsx
│ ├── textarea.tsx
│ └── tooltip.tsx
│
├── hooks/ # 🧠 Lógica
│ ├── useAdminCategorias.ts
│ ├── useAdminDashboard.ts
│ ├── useAdminPedidos.ts
│ ├── useAdminProductos.ts
│ ├── useAdminUsuarios.ts
│ ├── useCarrito.ts
│ ├── useCrearPublicacion.ts
│ ├── useEditarPublicacion.ts
│ ├── useFavoritos.ts
│ ├── useHero.ts # ✅ Lógica del Hero (con Supabase)
│ ├── useHome.ts
│ ├── useImageCarousel.ts # ✅ Lógica del carrusel
│ ├── useLogin.ts
│ ├── useNavbar.ts
│ ├── usePerfil.ts
│ ├── useProductoDetalle.ts
│ ├── useProducts.ts
│ ├── useRecoverPassword.ts
│ ├── useRegister.ts
│ └── use-supabase-upload.ts
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── adminService.ts
│ ├── api.ts
│ ├── cartService.ts
│ ├── categoryService.ts
│ ├── favoriteService.ts
│ ├── orderService.ts
│ ├── productService.ts
│ └── userService.ts
│
├── pages/ # 📄 Páginas
│ ├── admin/
│ │ ├── AdminCategorias.tsx
│ │ ├── AdminProductos.tsx
│ │ ├── CrearPublicacion.tsx
│ │ ├── Dashboard.tsx
│ │ ├── EditarPublicacion.tsx
│ │ ├── Pedidos.tsx
│ │ └── Usuarios.tsx
│ ├── auth/
│ │ ├── Login.tsx
│ │ ├── RecuperarContrasena.tsx
│ │ ├── Registro.tsx
│ │ └── ResetPassword.tsx
│ ├── Carrito.tsx
│ ├── Contacto.tsx
│ ├── DetallePedido.tsx
│ ├── Envios.tsx
│ ├── EnviosYRetiros.tsx
│ ├── Favoritos.tsx
│ ├── Home.tsx
│ ├── MisPedidos.tsx
│ ├── Nosotros.tsx
│ ├── NotFound.tsx
│ ├── Ofertas.tsx
│ ├── Perfil.tsx
│ ├── Privacidad.tsx
│ ├── ProductoDetalle.tsx
│ ├── Productos.tsx
│ ├── RetiroTienda.tsx
│ └── Terminos.tsx
│
├── schemas/ # 📌 Validaciones (Zod)
│ └── auth.schema.ts
│
├── types/ # 📌 Tipos TypeScript
│ └── index.ts
│
├── utils/ # 🛠️ Utilidades
│ ├── categoryUtils.ts
│ ├── errorMessages.ts # ✅ Helper de toasts centralizado
│ ├── formatPrice.ts
│ ├── perfilUtils.ts
│ └── validators.ts
│
├── lib/ # 📦 Clientes externos
│ ├── supabase.ts
│ └── utils.ts
│
├── config/ # ⚙️ Configuraciones
│ └── empresa.ts
│
├── App.tsx
├── main.tsx
└── index.css
text

---

## 🔧 HELPER DE TOASTS (`errorMessages.ts`)

**Ubicación:** `frontend/src/utils/errorMessages.ts`

### Funciones disponibles:

| Función                                       | Propósito                              |
| --------------------------------------------- | -------------------------------------- |
| `showErrorToastWithFallback(error, fallback)` | Muestra error con mensaje de fallback  |
| `showErrorToast(error)`                       | Muestra error con estilos consistentes |
| `showSuccessToast(message)`                   | Muestra éxito con estilos consistentes |

### Mensajes predefinidos:

```ts
successMessages   // Éxito (productos, categorías, pedidos, etc.)
infoMessages      // Informativos (sin productos, carrito vacío, etc.)
authErrors        // Errores de autenticación
productErrors     // Errores de productos
cartErrors        // Errores de carrito
categoryErrors    // Errores de categorías
orderErrors       // Errores de pedidos
userErrors        // Errores de usuarios (admin)

Uso en hooks:
ts

import { showErrorToastWithFallback, showSuccessToast, successMessages, authErrors } from "../utils/errorMessages";

try {
  await login(email, password);
  showSuccessToast(successMessages.loginSuccess);
} catch (err) {
  showErrorToastWithFallback(err, authErrors.invalidCredentials);
}

✅ ESTADO ACTUAL DEL PROYECTO
COMPLETADO (100%)
Módulo	Componente	Hook	Estado
Navbar	Navbar.tsx	useNavbar.ts	✅
AdminNavbar	AdminNavbar.tsx	-	✅
AdminNavbarMobile	AdminNavbarMobile.tsx	-	✅
Home	Home.tsx	useHome.ts	✅
Hero	Hero.tsx	useHero.ts	✅
Footer	Footer.tsx	-	✅
Login	Login.tsx	useLogin.ts	✅
Registro	Registro.tsx	useRegister.ts	✅
Recuperar	RecuperarContrasena.tsx	useRecoverPassword.ts	✅
ResetPassword	ResetPassword.tsx	-	✅
Productos	Productos.tsx	useProducts.ts	✅
ProductoDetalle	ProductoDetalle.tsx	useProductoDetalle.ts	✅
Carrito	Carrito.tsx	useCarrito.ts	✅
Perfil	Perfil.tsx	usePerfil.ts	✅
Favoritos	Favoritos.tsx	useFavoritos.ts	✅
MisPedidos	MisPedidos.tsx	-	✅
Dashboard Admin	Dashboard.tsx	useAdminDashboard.ts	✅
Admin Productos	AdminProductos.tsx	useAdminProductos.ts	✅
Admin Categorías	AdminCategorias.tsx	useAdminCategorias.ts	✅
Admin Pedidos	Pedidos.tsx	useAdminPedidos.ts	✅
Admin Usuarios	Usuarios.tsx	useAdminUsuarios.ts	✅
Crear Publicación	CrearPublicacion.tsx	useCrearPublicacion.ts	✅
Editar Publicación	EditarPublicacion.tsx	useEditarPublicacion.ts	✅
Envios y Retiros	EnviosYRetiros.tsx	-	✅
Subida de Imágenes	ImageUploader.tsx	use-supabase-upload.ts	✅
SearchBar	SearchBar.tsx	-	✅
ImageCarousel	ImageCarousel.tsx	useImageCarousel.ts	✅
📋 MEJORAS PENDIENTES
Prioridad Alta
#	Mejora	Archivo	Descripción
1	Botón WhatsApp más visible	Hero.tsx	Agregar CTA flotante o más visible para WhatsApp
2	Ofertas del día en Hero	Hero.tsx	Mostrar productos con descuento directamente en el Hero
3	Integrar errorMessages.ts en todos los hooks	hooks/*.ts	Usar el helper en todos los hooks que faltan
Prioridad Media
#	Mejora	Archivo	Descripción
4	Últimos productos en Hero	Hero.tsx	Mostrar los 4 productos más recientes
5	Testimonios de clientes	Hero.tsx	Carrusel de testimonios en el Hero
6	Mejorar navegación admin (dropdown Productos)	AdminNavbar.tsx	Agrupar Productos en dropdown
Prioridad Baja
#	Mejora	Archivo	Descripción
7	Estadísticas animadas	Hero.tsx	Animación de conteo en estadísticas
8	Verificación de email	backend/src/controllers/auth.controller.ts	Enviar correo de confirmación al registrarse
🛡️ SEGURIDAD IMPLEMENTADA
Medida	Estado	Ubicación
Rate limiting	✅ Implementado	backend/src/middlewares/rateLimit.middleware.ts
Validación Zod (frontend)	✅ Implementado	frontend/src/schemas/auth.schema.ts
Validación Zod (backend)	✅ Implementado	backend/src/schemas/auth.schema.ts
Sanitización de datos	✅ Implementado	backend/src/middlewares/sanitize.middleware.ts
Prevención SQL injection	✅ Implementado	Prisma ORM
JWT autenticación	✅ Implementado	backend/src/middlewares/auth.middleware.ts
📋 INSTRUCCIONES PARA EL ASISTENTE

    ✅ Mantén el principio de Separación de Lógica y Diseño (SoC)

    ✅ Trabaja UNO POR UNO (no adelantarse)

    ✅ Micro-pasos: cambios pequeños y controlados

    ✅ Probar después de cada cambio

    ✅ Comentarios explicativos en el código

    ✅ Usa la paleta de colores definida

    ✅ Usa shadcn/ui para los componentes

    ✅ Usa react-hot-toast para notificaciones

    ✅ Documenta cada mejora

    ✅ Sin generar código hasta que el usuario confirme

    ✅ No usar icon en toasts → usar iconTheme para evitar el icono extra

🎨 PALETA DE COLORES
Rol	Color	Hex
Primary	Deep Purple	#603060
Secondary	Purple Electric	#7D5FFF
Accent	Cyan	#00D2D3
Accent	Yellow Bright	#FFD93D
Accent	Pink Vibrant	#FF6B81
Accent	Orange Intense	#FF9F43
Accent	Mint Green	#90C090
Text	Charcoal	#303030
Text	Slate Gray	#6A757C
Background	Cream	#FAF9E2
📞 CONTACTO

Dirección: Uruguay 660 esquina Colón, Valparaíso, Chile
Horario: Lun-Vie 10:00-18:30, Sáb 10:00-15:00
WhatsApp: +569 1234 5678
Email: comercialuruguaychile@gmail.com
Redes: Facebook, Instagram, TikTok

📌 Nota: Este archivo sirve como prompt para el próximo chat cuando la memoria actual se agote. Contiene toda la información necesaria para continuar el desarrollo sin perder el contexto.
```
