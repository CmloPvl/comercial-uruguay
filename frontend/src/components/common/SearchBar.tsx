// 📁 frontend/src/components/common/SearchBar.tsx

/**
 * 📌 SEARCH BAR - COMPONENTE REUTILIZABLE
 * 
 * Componente de búsqueda que se usa en:
 * - Navbar (desktop)
 * - NavbarMenu (menú lateral)
 * - Futuros componentes admin
 * 
 * ✅ Buenas prácticas:
 * - Un solo componente para todos los buscadores
 * - Estilos controlados por prop `variant`
 * - Fácil de mantener y escalar
 * - Accesible con `aria-label`
 * 
 * @param {Object} props
 * @param {string} props.value - Texto de búsqueda
 * @param {Function} props.onChange - Actualiza el texto
 * @param {Function} props.onSubmit - Maneja el envío
 * @param {string} props.variant - 'navbar' | 'menu' | 'admin'
 * @param {string} props.placeholder - Texto del placeholder
 * @param {string} props.className - Clases adicionales
 */

import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  variant?: 'navbar' | 'menu' | 'admin';
  placeholder?: string;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSubmit,
  variant = 'navbar',
  placeholder = 'Buscar productos...',
  className = '',
}: SearchBarProps) {
  // =============================================
  // 🎨 ESTILOS SEGÚN VARIANTE
  // =============================================

  const styles = {
    navbar: {
      container: 'hidden md:flex flex-1 max-w-md lg:max-w-2xl mx-4',
      input: 'w-full px-5 py-2.5 rounded-full bg-white/15 text-white placeholder-white/70 border-2 border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition-all backdrop-blur-sm text-sm',
      icon: 'absolute right-4 top-2.5 text-white/50 group-hover:text-[#FFD93D] transition w-5 h-5',
    },
    menu: {
      container: 'p-4 border-b border-gray-100',
      input: 'w-full px-4 py-2.5 rounded-full bg-[#F0F0C0] text-[#303030] placeholder-[#6A757C] border-2 border-[#7D5FFF] focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition text-sm',
      icon: 'absolute right-3 top-2.5 text-[#6A757C] w-4 h-4',
    },
    admin: {
      container: 'flex-1 max-w-md',
      input: 'w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#FFD93D] focus:border-[#FFD93D] transition text-sm',
      icon: 'absolute right-3 top-2.5 text-white/50 w-4 h-4',
    },
  };

  const currentStyles = styles[variant] || styles.navbar;

  // =============================================
  // 🖥️ RENDER
  // =============================================

  return (
    <div className={`${currentStyles.container} ${className}`}>
      <form onSubmit={onSubmit} className="relative w-full group">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={currentStyles.input}
          aria-label="Buscar productos"
        />
        <Search className={currentStyles.icon} />
      </form>
    </div>
  );
}