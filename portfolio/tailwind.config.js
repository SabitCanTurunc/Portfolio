/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0B0B0F',        // Çok koyu lacivert (neredeyse siyah) arka plan
        'secondary': '#3B82F6',      // Mor yerine border-blue-500 rengi
        'accent-blue': '#2D9CDB',    // Mavi vurgu
        'accent-purple': '#3B82F6',  // Mor yerine border-blue-500 rengi
        'text-primary': '#FFFFFF',   // Beyaz metin
        'text-secondary': '#8892B0', // Gri-mavi metin
        'card-bg': '#151E2C',        // Kart arka planı (koyu lacivert)
        'hover': '#1E293B',          // Hover efekti için koyu mavi
        'border': '#2A3544',         // Kenarlıklar için koyu gri-mavi
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #3B82F6 0%, #2D9CDB 100%)',
        'gradient-purple': 'linear-gradient(90deg, #3B82F6 0%, #3B82F6 100%)',
      },
      textShadow: {
        'DEFAULT': '2px 2px 4px rgba(0, 0, 0, 0.3)',
        'lg': '3px 3px 6px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    },
  ],
}

