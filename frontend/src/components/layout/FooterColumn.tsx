// 📁 frontend/src/components/layout/FooterColumn.tsx

/**
 * 📌 FOOTER COLUMN
 * 
 * COMPONENTE DE DISEÑO (UI)
 * 
 * Columna reutilizable para el Footer.
 * Recibe título, icono y lista de elementos (enlaces o textos).
 * 
 * ✅ Buenas prácticas:
 * - Componente presentacional (solo UI)
 * - Reutilizable en todas las columnas del Footer
 * - Fácil de mantener y modificar
 * - Tipado fuerte con TypeScript
 * 
 * @param {Object} props
 * @param {string} props.title - Título de la columna
 * @param {string} props.icon - Emoji o icono del título
 * @param {React.ReactNode} props.children - Contenido de la columna
 */

interface FooterColumnProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export function FooterColumn({ title, icon, children }: FooterColumnProps) {
  return (
    <div>
      <h4 className="font-bold text-[#FFD93D] text-lg mb-4 flex items-center gap-2">
        <span>{icon}</span> {title}
      </h4>
      {children}
    </div>
  );
}