/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 🎨 PALETA GLOBAL UNIFICADA (Originales + Imágenes)
        'design': {
          // Grises y Neutros (Cielos, piedras y fondos)
          'light-gray': '#D6DCE0',
          'light-blue-gray': '#C7CFD6',
          'silver': '#C0C0C0',
          'grey-taupe': '#C9C4C4',
          'slate-gray': '#6A757C',
          'dark-gray': '#6F6F6D',
          'dark-gray-blue': '#575966',
          'slate-gray-dark': '#5F6067',
          'dark-charcoal': '#6D6D6E',
          'charcoal': '#303030',
          'dark-slate': '#313346',

          // Amarillos, Cremas y Beiges (Atardeceres y arenas)
          'pale-lemon': '#F0F0C0',
          'cream': '#FAF9E2',
          'pale-yellow': '#FBE6B1',
          'apricot': '#FCD9B1',
          'light-apricot': '#F0C090',
          'beige-grey': '#EAE3CF',
          'beige': '#B8A78F',
          'light-peach-tan': '#F7DBC1',
          'tan-beige': '#C5A981',
          'tan': '#B49B60',
          'golden-yellow': '#F0C030',
          'yellow-bright': '#FFD93D', // Coincide con la imagen 11

          // Naranjas y Terracotas (Cálidos intensos)
          'peach': '#F09060',
          'warm-peach': '#F9AE81',
          'orange-intense': '#FF9F43', // Coincide casi exacto con #FF9F33
          'burnt-orange': '#F09030',
          'rusty-orange': '#C06030', // Coincide casi exacto con #C96B50
          'tangerine': '#D87A3B',
          'terracotta': '#90633C',

          // Rosas, Morados y Marrones (Sombras y flores)
          'light-pink': '#F9C9E8',
          'pink-vibrant': '#FF6B81',
          'light-lavender': '#F0C0F0',
          'dusty-rose': '#C06060', // Coincide casi exacto con #E6C1C1
          'coral-pink': '#D98C82',
          'brown': '#765049',
          'dark-purple-grey': '#6E536F',
          'deep-purple': '#603060', // Coincide casi exacto con #6F4A6F
          'purple-electric': '#7D5FFF',
          'dark-mocha': '#564232',
          'dark-chocolate': '#4C3C3B',
          'dark-olive': '#303000',
          'dark-brown': '#2C281B',

          // Verdes y Olivas (Vegetación y musgo)
          'mint-green': '#90C090',
          'sage-green': '#8A9C80',
          'gray-green': '#839793',
          'olive-green': '#606030', // Coincide casi exacto con #596135
          'moss-green': '#6C7A53',
          'dark-green': '#2B3426',

          // Azules y Cianos (Aguas y cielos profundos)
          'light-sky-blue': '#A9D5F7',
          'light-blue': '#89C1E5',
          'blue-gray': '#7A9ECA',
          'cyan': '#00D2D3',
          'blue': '#4D76A8',
          'muted-teal': '#94B8AF',
          'teal': '#337A84',
          'deep-teal': '#3B7983',
          'dark-blue': '#3E4D69',

          // Puros
          'white-pure': '#FFFFFF'
        },

        // 🎯 MAPEO SEMÁNTICO (Para que uses nombres clave en tu UI)
        'primary': '#603060',      // Morado oscuro base
        'secondary': '#C06060',    // Rosado base
        'accent': '#FF9F43',       // Naranja intenso para llamar la atención
        'background': '#FAF9E2',   // Crema suave extraído (más natural que el Pale Lemon anterior)
        'text-dark': '#303030',    // Charcoal para textos
        'text-light': '#FFFFFF',   // Blanco para textos inversos
      }
    },
  },
  plugins: [],
}