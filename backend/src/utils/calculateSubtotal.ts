// 📁 backend/src/utils/calculateSubtotal.ts

/**
 * 📌 UTILIDAD: CALCULAR SUBTOTAL CON PACKS
 * 
 * Calcula el subtotal de un item aplicando packs promocionales.
 * 
 * 🧠 Lógica:
 * - Si el producto NO tiene pack → precio × cantidad
 * - Si el producto TIENE pack y la cantidad alcanza → aplica packs
 * - Los packs se aplican por múltiplos:
 *     3 unidades = 1 pack
 *     6 unidades = 2 packs
 *     5 unidades = 1 pack + 2 unidades sueltas
 * 
 * 📝 Ejemplos (precio: $500, pack: "3 por $1000"):
 *   - quantity 2 → 2 × 500 = $1000 (no alcanza el pack)
 *   - quantity 3 → 1 pack = $1000
 *   - quantity 5 → 1 pack + 2 sueltos = $2000
 *   - quantity 6 → 2 packs = $2000
 * 
 * ⚠️ IMPORTANTE: Esta función es la ÚNICA fuente de verdad.
 * Se usa en:
 * - Cart.ts (al listar items)
 * - cart.controller.ts (al agregar/actualizar items)
 * 
 * @param price - Precio unitario del producto
 * @param quantity - Cantidad en el carrito
 * @param packPrice - Precio del pack (null si no hay)
 * @param packQuantity - Cantidad del pack (null si no hay)
 * @returns Subtotal calculado
 */
export function calculateSubtotal(
  price: number,
  quantity: number,
  packPrice: number | null,
  packQuantity: number | null
): number {
  // ✅ Si tiene pack y la cantidad alcanza
  if (packPrice && packQuantity && packQuantity > 0 && quantity >= packQuantity) {
    // Cuántos packs completos hay
    const packs = Math.floor(quantity / packQuantity);
    // Cuántas unidades sueltas sobran
    const remainder = quantity % packQuantity;
    // Packs × precio pack + sobrantes × precio unitario
    return (packs * packPrice) + (remainder * price);
  }
  // ✅ Sin pack: precio unitario × cantidad
  return quantity * price;
}