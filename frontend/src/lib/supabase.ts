
// 📁 frontend/src/lib/supabase.ts

/**
 * 📌 CLIENTE DE SUPABASE
 * 
 * Configuración del cliente de Supabase para:
 * - Storage (subida de imágenes)
 * 
 * ✅ Buenas prácticas:
 * - Variables de entorno para credenciales
 * - Singleton del cliente
 * - Tipado con TypeScript
 * - Buckets definidos como constantes
 */

import { createClient } from '@supabase/supabase-js'

// =============================================
// 📌 CREDENCIALES (desde variables de entorno)
// =============================================
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// =============================================
// 🛡️ VALIDACIÓN DE VARIABLES
// =============================================
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Faltan variables de entorno de Supabase')
}

// =============================================
// 📦 CLIENTE
// =============================================
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// =============================================
// 🗂️ NOMBRES DE BUCKETS
// =============================================
export const PRODUCTS_BUCKET = 'productos'    // Imágenes de productos
export const HERO_BUCKET = 'hero'            // Imágenes del hero (opcional)
