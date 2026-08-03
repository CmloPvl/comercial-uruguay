// 📁 frontend/src/hooks/useNavbar.ts

/**
 * 📌 HOOK PERSONALIZADO: useNavbar
 * 
 * Encapsula toda la lógica del Navbar:
 * - Autenticación (usuario, logout)
 * - Carrito (total de items)
 * - Menú móvil (abrir/cerrar)
 * - Búsqueda (estado y manejo)
 * - Avatar (colores e iniciales)
 * 
 * ✅ Buenas prácticas:
 * - Separa la lógica del diseño
 * - Reutilizable en otros componentes si es necesario
 * - Fácil de testear
 * - Mantiene el Navbar limpio y enfocado en UI
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export function useNavbar() {
  // =============================================
  // 🔐 CONTEXTOS
  // =============================================

  // 🔹 useAuth(): Extrae el usuario y la función logout del contexto global.
  const { user, logout } = useAuth();

  // 🔹 useCart(): Extrae el total de items del carrito.
  const { totalItems } = useCart();

  // 🔹 useNavigate(): Hook de React Router para redirigir al usuario.
  const navigate = useNavigate();

  // =============================================
  // 🎯 ESTADO LOCAL
  // =============================================

  // 🔹 isMenuOpen: Controla si el menú móvil (Sheet) está abierto o cerrado.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔹 searchQuery: Almacena el texto que el usuario escribe en el buscador.
  const [searchQuery, setSearchQuery] = useState("");

  // =============================================
  // 🎨 AVATAR Y COLORES
  // =============================================

  // 🔹 avatarColors: Lista de colores posibles para el avatar.
  // Usamos colores de la paleta para que sea consistente con la marca.
  const avatarColors = [
    "bg-[#7D5FFF]",
    "bg-[#FF6B81]",
    "bg-[#00D2D3]",
    "bg-[#FFD93D]",
    "bg-[#FF9F43]",
  ];

  // 🔹 randomColor: Selecciona un color aleatorio para el avatar del usuario.
  // Esto le da un toque visual único sin necesidad de configurar nada.
  const randomColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

  // 🔹 getInitials: Extrae las iniciales del nombre del usuario.
  // Ejemplo: "Camilo Riquelme" → "CR"
  // Se usa cuando el avatar no tiene imagen.
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // =============================================
  // 🔍 BUSCADOR
  // =============================================

  /**
   * handleSearch: Maneja el envío del formulario de búsqueda.
   * 
   * 1. Evita que el formulario recargue la página (preventDefault).
   * 2. Si el usuario escribió algo, redirige a la página de productos
   *    con el parámetro "search" en la URL.
   * 3. Cierra el menú móvil si está abierto.
   */
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault(); // No recargar la página
    if (searchQuery.trim()) { // Si hay texto
      navigate(`/productos?search=${encodeURIComponent(searchQuery.trim())}`); // Redirigir
      setIsMenuOpen(false); // Cerrar menú móvil
    }
  };

  // =============================================
  // 📦 EXPORTACIÓN
  // =============================================

  return {
    // 🔐 Autenticación
    user,
    logout,
    
    // 🛒 Carrito
    totalItems,
    
    // 🎯 Menú móvil
    isMenuOpen,
    setIsMenuOpen,
    
    // 🔍 Búsqueda
    searchQuery,
    setSearchQuery,
    handleSearch,
    
    // 🎨 Avatar
    randomColor,
    getInitials,
  };
}