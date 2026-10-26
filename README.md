# 🏪 Comercial Uruguay — Catálogo Virtual

**Estado:** En desarrollo activo
**Tipo:** Catálogo vitrina con pedidos por WhatsApp
**Desarrollador:** Camilo Riquelme
**Ubicación del negocio:** Valparaíso, Chile

**Enlaces:**

- **Web App:** https://comercial-uruguay.vercel.app
- **API:** https://comercial-uruguay-backend.onrender.com
- **Repositorio:** https://github.com/CmloPvl/comercial-uruguay

---

## 📌 Descripción

**Comercial Uruguay** es un comercio familiar con más de 10 años de trayectoria en Valparaíso, especializado en productos para el hogar, cumpleaños, juguetes, cabello, melamina y temporada.

Este proyecto es la **web app oficial del negocio**: un catálogo virtual que permite a los clientes explorar productos, armar un carrito y **generar un pedido por WhatsApp** para confirmar stock y coordinar la venta.

### 🎯 Objetivo del proyecto

Mejorar la experiencia de venta del local mediante una vitrina digital que:

- Permita **explorar el catálogo** desde cualquier lugar
- Facilite **armar un pedido** sin necesidad de ir al local
- Cierre la venta por **WhatsApp** (confirmación de stock + envío o retiro)
- Permita al cliente **llegar y retirar** con el pedido ya reservado

> ⚠️ **Nota:** Actualmente el negocio **no cuenta con caja registradora integrada**, por lo que el catálogo **no opera en vivo**. El flujo termina en WhatsApp, donde se confirma stock y se concreta la venta. Cuando el negocio implemente su sistema de caja, el proyecto podrá escalar a e-commerce en vivo.

---

## 🛒 Flujo del cliente

1. Cliente entra al catálogo
2. Explora productos por categoría / búsqueda
3. Agrega productos al carrito
4. Finaliza el pedido
5. Se genera un mensaje de WhatsApp con el detalle
6. El vendedor confirma stock y coordina envío/retiro
7. Venta concretada ✅

---

## 🛠️ Stack Tecnológico

| Capa               | Tecnología                           |
| ------------------ | ------------------------------------ |
| **Frontend**       | React 19 + TypeScript + Vite         |
| **Backend**        | Node.js 22 + Express + TypeScript    |
| **Base de Datos**  | PostgreSQL + Supabase                |
| **Estilos**        | Tailwind 3.4 + shadcn/ui             |
| **Storage**        | Supabase Storage                     |
| **Autenticación**  | JWT + bcryptjs                       |
| **Validación**     | Zod                                  |
| **Notificaciones** | react-hot-toast                      |
| **Email**          | Resend                               |
| **Despliegue**     | Vercel (frontend) + Render (backend) |

---

## 🎨 Paleta de Colores

| Rol        | Color           | Hex       |
| ---------- | --------------- | --------- |
| Primary    | Deep Purple     | `#603060` |
| Secondary  | Purple Electric | `#7D5FFF` |
| Accent     | Cyan            | `#00D2D3` |
| Accent     | Yellow Bright   | `#FFD93D` |
| Accent     | Pink Vibrant    | `#FF6B81` |
| Accent     | Orange Intense  | `#FF9F43` |
| Accent     | Mint Green      | `#90C090` |
| Text       | Charcoal        | `#303030` |
| Text       | Slate Gray      | `#6A757C` |
| Background | Cream           | `#FAF9E2` |

---

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/CmloPvl/comercial-uruguay.git
cd comercial-uruguay

# Backend
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend (en otra terminal)
cd frontend
cp .env.example .env
npm install
npm run dev

🔐 Variables de Entorno

Frontend (.env):
env

VITE_API_URL=http://localhost:5000/api
VITE_SUPABASE_URL=tu-url
VITE_SUPABASE_ANON_KEY=tu-key

Backend (.env):
env

PORT=5000
DATABASE_URL=postgresql://...
JWT_SECRET=...
RESEND_API_KEY=re_...
FRONTEND_URL=http://localhost:5173

🧠 Metodología de Trabajo

El proyecto sigue el principio de Separación de Lógica y Diseño (SoC):
Capa	Responsabilidad	Ejemplo
components/	Diseño (UI) — Solo JSX, estilos	Login.tsx
hooks/	Lógica — Estados, API, validaciones	useLogin.ts
pages/	Conexión — Une UI + lógica	LoginPage.tsx
context/	Estado Global	AuthContext.tsx
services/	API — Comunicación con el backend	api.ts

Estrategia:

    Trabajo componente por componente

    Micro-pasos (cambios pequeños y controlados)

    Probar después de cada cambio

    Comentarios explicativos en el código (para aprender y entender)

    Documentar cada mejora

🧑‍💻 Sobre el Desarrollador

Proyecto desarrollado por Camilo Riquelme, tras completar un bootcamp de JavaScript Full Stack, como parte del crecimiento digital del negocio familiar Comercial Uruguay.

El objetivo es doble:

    Aplicar lo aprendido en un proyecto real

    Mejorar la venta del local mediante una vitrina digital

📞 Contacto

    Dirección: Uruguay 660, Valparaíso, Chile

    Horario: Lun-Vie 9:00-18:30, Sáb 10:00-15:00

    WhatsApp: +56975303324

    Email: comercialuruguayvalpo@gmail.com

    Redes: Facebook, Instagram, TikTok

📄 Licencia

Proyecto de uso académico y comercial para Comercial Uruguay.
text


---

## ✅ Qué mejoré respecto a tu versión actual

| # | Cambio | Por qué |
|---|--------|---------|
| 1 | Título: "Web App" → **"Catálogo Virtual"** | Refleja la realidad actual del proyecto |
| 2 | Estado: "Producción (desplegado)" → **"En desarrollo activo"** | Es más honesto; sigues iterando |
| 3 | Agregué **enlaces** al inicio | Visibilidad rápida |
| 4 | Reescribí **Descripción** con el flujo real (catálogo + WhatsApp) | Tu versión decía "consultar stock en tiempo real", que **no es cierto** |
| 5 | Agregué **Nota** sobre la caja registradora | Explica por qué no hay e-commerce en vivo |
| 6 | Agregué **Flujo del cliente** (7 pasos) | Claridad para cualquiera que lea el repo |
| 7 | Agregué **Paleta de colores** | Consistencia visual |
| 8 | Agregué **Metodología SoC** | Refleja cómo trabajas |
| 9 | Agregué **Sobre el Desarrollador** | Contexto del bootcamp y el negocio familiar |
| 10 | Arreglé el **encoding** (acentos, tildes) | Se ve bien en GitHub |

---

## 🗑️ Qué hacer con el `README.md` actual

Reemplázalo completo por el de arriba. No hay nada que conservar del viejo, porque:
- Decía "stock en tiempo real" (no es cierto)
- No mencionaba el flujo de WhatsApp
- No tenía contexto del negocio

---
```
