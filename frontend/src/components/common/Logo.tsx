export default function Logo({ className = "" }) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Usa colores de la paleta */}
      <circle cx="20" cy="20" r="18" fill="#603060" />  {/* Deep Purple */}
      <text x="20" y="26" fontFamily="Arial" fontSize="16" fontWeight="bold" fill="#F0C030" textAnchor="middle">CU</text>
      <circle cx="20" cy="20" r="14" stroke="#F09030" strokeWidth="2" fill="none" />
    </svg>
  )
}