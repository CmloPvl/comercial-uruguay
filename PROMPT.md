📋 PROMPT COMPLETO — COMERCIAL URUGUAY

1. Contexto del Proyecto
   text

Proyecto: Comercial Uruguay
Tipo: Web App (e-commerce)
Estado: Producción (desplegado)
Desarrollador: Camilo Riquelme
Repositorio: github.com/CmloPvl/comercial-uruguay
Web App: comercial-uruguay.vercel.app
API: comercial-uruguay-backend.onrender.com

Descripción:
Comercial Uruguay es la web app oficial de un comercio establecido con más de 10 años de trayectoria en Valparaíso. Especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

Stack Tecnológico:

- Frontend: React + TypeScript + Vite (React 19.x)
- Backend: Node.js + Express + TypeScript (Node 22.x)
- Base de Datos: PostgreSQL + Supabase
- ORM: Prisma 7.9.0
- Autenticación: JWT + bcryptjs
- Estilos: Tailwind CSS + shadcn/ui
- Validación: Zod
- Notificaciones: react-hot-toast
- Animaciones: framer-motion
- Email: Resend
- Despliegue: Vercel (frontend) + Render (backend)

Paleta de Colores:

- Primary: #603060 (Morado oscuro)
- Secondary: #7D5FFF (Morado eléctrico)
- Accent: #00D2D3 (Cian), #FF6B81 (Rosa), #FFD93D (Amarillo), #FF9F43 (Naranja)
- Text: #303030 (Charcoal), #6A757C (Slate Gray)
- Background: #FAF9E2 (Cream)

2. Modelo de Trabajo
   text

Principio fundamental: SEPARACIÓN DE LÓGICA Y DISEÑO (SoC)

Cada página y componente grande se separa en dos partes:

- components/ → Diseño (UI) — Solo JSX, estilos, estructura visual
- hooks/ → Lógica — Estados, API, validaciones, manejo de errores
- pages/ → Conexión — Une diseño + lógica
- context/ → Estado Global — Datos compartidos
- services/ → API — Comunicación con el backend

Metodología:

1. Analizar el componente actual (identificar lógica y diseño)
2. Crear hook personalizado (extraer toda la lógica)
3. Simplificar el componente (dejar solo UI)
4. Probar que todo funciona
5. Documentar en el registro de mejoras

Estrategia de trabajo:

- Ir uno por uno (no adelantarse)
- Micro-pasos (cambios pequeños y controlados)
- Probar después de cada cambio
- Mantener el código funcionando en todo momento
- Comentarios explicativos en el código

3. Estado Actual del Proyecto
   text

✅ COMPLETADO (Separación lógica/diseño):

Navbar (100%):

- useNavbar.ts (lógica)
- NavbarAdminMenu.tsx (UI)
- NavbarUserMenu.tsx (UI)
- NavbarGuestMenu.tsx (UI)
- NavbarMobile.tsx (UI)
- Navbar.tsx (estructura principal)

Home (100%):

- useHome.ts (lógica)
- Hero.tsx (UI)
- CategoriesSection.tsx (UI)
- FeaturedProductsSection.tsx (UI)
- BenefitsSection.tsx (UI)
- LocationSection.tsx (UI)
- Home.tsx (conexión)

Footer (100%):

- Footer.tsx (estructura principal)
- FooterColumn.tsx (UI)
- FooterSocial.tsx (UI)
- FooterServices.tsx (UI)

Login (100%):

- useLogin.ts (lógica)
- Login.tsx (UI)

Registro (100%):

- useRegister.ts (lógica)
- Registro.tsx (UI)

Recuperar Contraseña (100%):

- useRecoverPassword.ts (lógica)
- RecuperarContrasena.tsx (UI)

Página Envíos y Retiros (100%):

- EnviosYRetiros.tsx (UI)

🔄 EN PROGRESO:

ResetPassword:

- ResetPassword.tsx (tiene lógica interna)
- Pendiente: crear useResetPassword.ts

⏳ PENDIENTES (por orden de prioridad):

1. Productos (página de tienda)
2. Carrito
3. Perfil
4. Favoritos
5. Mis Pedidos
6. Admin Dashboard
7. Admin Productos
8. Admin Pedidos
9. Admin Categorías
10. Crear Publicación
11. Editar Publicación

12. Estructura de Carpetas
    text

frontend/src/
├── components/ # 🎨 Diseño (UI)
│ ├── layout/ # Navbar, Footer, Layout
│ ├── home/ # Hero, Categories, Featured, Benefits, Location
│ ├── auth/ # Login, Registro, Recuperar
│ ├── products/ # ProductList, ProductCard, ProductFilters
│ ├── common/ # Logo, LoadingSpinner, ProtectedRoute
│ └── ui/ # shadcn/ui (Button, Card, Input...)
│
├── hooks/ # 🧠 Lógica
│ ├── useAuth.ts # Autenticación
│ ├── useCart.ts # Carrito
│ ├── useLogin.ts # Login
│ ├── useRegister.ts # Registro
│ ├── useRecoverPassword.ts # Recuperación
│ ├── useNavbar.ts # Navbar
│ └── useHome.ts # Home
│
├── context/ # 🌐 Estado global
│ ├── AuthContext.tsx
│ └── CartContext.tsx
│
├── services/ # 📡 API
│ ├── api.ts
│ ├── auth.service.ts
│ ├── product.service.ts
│ ├── cart.service.ts
│ ├── category.service.ts
│ └── favorite.service.ts
│
├── pages/ # 📄 Páginas
│ ├── Home.tsx ✅ Conecta lógica + UI
│ ├── Productos.tsx 🔄 Pendiente
│ ├── Carrito.tsx 🔄 Pendiente
│ ├── Perfil.tsx 🔄 Pendiente
│ ├── Favoritos.tsx 🔄 Pendiente
│ ├── MisPedidos.tsx 🔄 Pendiente
│ ├── EnviosYRetiros.tsx ✅ UI
│ ├── auth/ # Login, Registro, Recuperar, ResetPassword
│ └── admin/ # Dashboard, Productos, Pedidos, Categorías
│
├── schemas/ # 📌 Validaciones (Zod)
├── types/ # 📌 Tipos TypeScript
└── utils/ # 🛠️ Utilidades

5. Registro de Mejoras
   text

📋 MEJORAS REALIZADAS:

Navbar:

- useNavbar.ts: Lógica extraída del Navbar
- NavbarAdminMenu.tsx: Menú de administración aislado
- NavbarUserMenu.tsx: Menú de usuario aislado
- NavbarGuestMenu.tsx: Menú de invitado aislado
- NavbarMobile.tsx: Menú móvil aislado
- Navbar.tsx: Solo diseño (UI)

Home:

- useHome.ts: Lógica extraída del Home
- CategoriesSection.tsx: Sección de categorías aislada
- FeaturedProductsSection.tsx: Sección de productos destacados aislada
- BenefitsSection.tsx: Sección de beneficios aislada
- LocationSection.tsx: Sección de ubicación aislada
- Home.tsx: Solo conexión (lógica + UI)

Footer:

- Footer.tsx: Estructura rediseñada (inspirada en Falabella y Ripley)
- FooterColumn.tsx: Columna reutilizable
- FooterSocial.tsx: Redes sociales aisladas
- FooterServices.tsx: Franja de servicios aislada
- Eliminadas categorías del Footer (más limpio)

Página Envíos y Retiros:

- EnviosYRetiros.tsx: Página completa con envíos, retiro y FAQ
- id="retiro" para ancla en la sección de retiro
- FooterServices.tsx: Enlaces actualizados a /envios-y-retiros

6. Próximas Tareas (por orden de prioridad)
   text

1. Productos (página de tienda)
   - Crear useProductos.ts
   - Simplificar Productos.tsx
   - Mantener filtros y búsqueda

1. Carrito
   - Crear useCarrito.ts
   - Simplificar Carrito.tsx

1. Perfil
   - Crear usePerfil.ts
   - Simplificar Perfil.tsx

1. ResetPassword
   - Crear useResetPassword.ts
   - Simplificar ResetPassword.tsx

1. Admin
   - Separar cada página de admin
   - Crear hooks específicos

1. Instrucciones para el Nuevo Chat
   text

INSTRUCCIONES PARA EL ASISTENTE:

1. Mantén el principio de SEPARACIÓN DE LÓGICA Y DISEÑO (SoC).
2. Trabaja UNO POR UNO (no adelantarse).
3. Micro-pasos: cambios pequeños y controlados.
4. Probar después de cada cambio.
5. Comentarios explicativos en el código.
6. Usa la paleta de colores definida.
7. Usa shadcn/ui para los componentes.
8. Usa react-hot-toast para notificaciones.
9. Usa framer-motion para animaciones.
10. Documenta cada mejora en el registro.

Metodología para cada componente:

1. Analizar el componente actual (identificar lógica y diseño).
2. Crear hook personalizado (extraer toda la lógica).
3. Simplificar el componente (dejar solo UI).
4. Probar que todo funciona.
5. Documentar en el registro de mejoras.

Archivos clave para referencia:

- hooks/useNavbar.ts (ejemplo de lógica)
- components/layout/Navbar.tsx (ejemplo de diseño)
- pages/Home.tsx (ejemplo de conexión)

8. Paleta de Colores (para diseño)
   text

Deep Purple: #603060
Purple Electric: #7D5FFF
Cyan: #00D2D3
Yellow Bright: #FFD93D
Pink Vibrant: #FF6B81
Orange Intense: #FF9F43
Mint Green: #90C090
Charcoal: #303030
Slate Gray: #6A757C
Cream: #FAF9E2
