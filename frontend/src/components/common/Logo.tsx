export default function Logo({ className = "" }) {
  // Dimensiones ajustadas para un logotipo más horizontal sin el icono circular
  const viewBoxWidth = 240;
  const viewBoxHeight = 60;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* ================= DETALLES DE GLOBOS Y CHISPAS ALREDEDOR DEL TEXTO ================= */}
      <g>
        {/* Globos flotantes adicionales y más prominentes */}
        <circle cx="15" cy="15" r="4" fill="#FF2A7A" /> {/* Globo rosa superior izquierda */}
        <circle cx="50" cy="10" r="3" fill="#10B981" /> {/* Globo verde superior */}
        <circle cx="210" cy="18" r="4" fill="#FF9F1C" /> {/* Globo naranja superior derecha */}
        <circle cx="35" cy="50" r="3.5" fill="#3B82F6" /> {/* Globo azul inferior izquierda */}
        <circle cx="190" cy="52" r="3" fill="#A855F7" /> {/* Globo violeta inferior derecha */}
        
        {/* Confeti y chispas adicionales */}
        <circle cx="70" cy="45" r="1.5" fill="#FFD200" /> {/* Punto dorado */}
        <circle cx="170" cy="48" r="1.2" fill="#FF2A7A" /> {/* Punto fucsia */}
        <path d="M 230 40 L 232 44 L 230 48 L 228 44 Z" fill="#FFD200" /> {/* Estrella dorada pequeña derecha */}
        <path d="M 120 5 L 122 9 L 120 13 L 118 9 Z" fill="#10B981" /> {/* Estrella verde pequeña superior */}
        <path d="M 10 35 L 12 39 L 10 43 L 8 39 Z" fill="#3B82F6" /> {/* Estrella azul pequeña izquierda */}
      </g>

      {/* ================= TEXTO: COMERCIAL (Letra por Letra con Multi-borde) ================= */}
      <g fontFamily="Arial Black, Impact, sans-serif" fontSize="18" fontWeight="900" letterSpacing="-1">
        {/* Capa de borde oscuro externo grueso */}
        <g stroke="#0D1117" strokeWidth="6" strokeLinejoin="round" fill="#0D1117">
          <text x="35" y="28">C</text><text x="50" y="28">O</text><text x="66" y="28">M</text>
          <text x="85" y="28">E</text><text x="100" y="28">R</text><text x="115" y="28">C</text>
          <text x="130" y="28">I</text><text x="139" y="28">A</text><text x="155" y="28">L</text>
        </g>
        
        {/* Capa de borde blanco intermedio */}
        <g stroke="#FFFFFF" strokeWidth="3" strokeLinejoin="round" fill="#FFFFFF">
          <text x="35" y="28">C</text><text x="50" y="28">O</text><text x="66" y="28">M</text>
          <text x="85" y="28">E</text><text x="100" y="28">R</text><text x="115" y="28">C</text>
          <text x="130" y="28">I</text><text x="139" y="28">A</text><text x="155" y="28">L</text>
        </g>

        {/* Capa de Color Relleno Individual (Vibrante) */}
        <text x="35" y="28" fill="#FF2A7A">C</text>
        <text x="50" y="28" fill="#FF9F1C">O</text>
        <text x="66" y="28" fill="#FFD200">M</text>
        <text x="85" y="28" fill="#10B981">E</text>
        <text x="100" y="28" fill="#3B82F6">R</text>
        <text x="115" y="28" fill="#10B981">C</text>
        <text x="130" y="28" fill="#FF9F1C">I</text>
        <text x="139" y="28" fill="#FF2A7A">A</text>
        <text x="155" y="28" fill="#A855F7">L</text>
      </g>

      {/* ================= TEXTO: URUGUAY (Letra por Letra con Multi-borde) ================= */}
      <g fontFamily="Arial Black, Impact, sans-serif" fontSize="22" fontWeight="900" letterSpacing="-1">
        {/* Capa de borde oscuro externo grueso */}
        <g stroke="#0D1117" strokeWidth="6" strokeLinejoin="round" fill="#0D1117">
          <text x="35" y="55">U</text><text x="53" y="55">R</text><text x="71" y="55">U</text>
          <text x="89" y="55">G</text><text x="108" y="55">U</text><text x="126" y="55">A</text>
          <text x="144" y="55">Y</text>
        </g>
        
        {/* Capa de borde blanco intermedio */}
        <g stroke="#FFFFFF" strokeWidth="4" strokeLinejoin="round" fill="#FFFFFF">
          <text x="35" y="55">U</text><text x="53" y="55">R</text><text x="71" y="55">U</text>
          <text x="89" y="55">G</text><text x="108" y="55">U</text><text x="126" y="55">A</text>
          <text x="144" y="55">Y</text>
        </g>

        {/* Capa de Color Relleno Individual (Vibrante) */}
        <text x="35" y="55" fill="#FF9F1C">U</text>
        <text x="53" y="55" fill="#10B981">R</text>
        <text x="71" y="55" fill="#00D2FF">U</text>
        <text x="89" y="55" fill="#A855F7">G</text>
        <text x="108" y="55" fill="#FFD200">U</text>
        <text x="126" y="55" fill="#FF9F1C">A</text>
        <text x="144" y="55" fill="#00D2FF">Y</text>
      </g>
    </svg>
  );
}