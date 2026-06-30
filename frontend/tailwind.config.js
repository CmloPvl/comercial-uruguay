/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta "Vibrant Contrast" Original
        'vibrant': {
          'deep-purple': '#603060',
          'dusty-rose': '#C06060',
          'pale-lemon': '#F0F0C0',
          'peach': '#F09060',
          'light-apricot': '#F0C090',
          'mint-green': '#90C090',
          'silver': '#C0C0C0',
          'light-lavender': '#F0C0F0',
          'olive-green': '#606030',
          'golden-yellow': '#F0C030',
          'dark-olive': '#303000',
          'charcoal': '#303030',
          'burnt-orange': '#F09030',
          'rusty-orange': '#C06030',
        },
        
        // ⭐ NUEVOS COLORES AGREGADOS
        'custom': {
          'cyan': '#00D2D3',      // Cian vibrante
          'yellow': '#FFD93D',    // Amarillo brillante
          'pink': '#FF6B81',      // Rosa vibrante
          'purple': '#7D5FFF',    // Morado eléctrico
          'orange': '#FF9F43',    // Naranja intenso
          'white': '#FFFFFF',     // Blanco puro
        },

        // Mapeo semántico actualizado
        'primary': '#603060',      // Deep Purple (morado oscuro)
        'secondary': '#C06060',    // Dusty Rose (rosado)
        'accent': '#F09030',       // Burnt Orange (naranja)
        'background': '#F0F0C0',   // Pale Lemon (amarillo suave)
        'text-dark': '#303030',    // Charcoal (gris oscuro)
        'text-light': '#FFFFFF',   // Blanco
        
        // ⭐ NUEVOS ALIAS SEMÁNTICOS
        'cyan': '#00D2D3',
        'yellow-bright': '#FFD93D',
        'pink-vibrant': '#FF6B81',
        'purple-electric': '#7D5FFF',
        'orange-intense': '#FF9F43',
        'white-pure': '#FFFFFF',
      }
    },
  },
  plugins: [],
}