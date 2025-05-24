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
        'secondary': '#6E07F3',      // Parlak mor (butonlar için)
        'accent-blue': '#2D9CDB',    // Mavi vurgu
        'accent-purple': '#8B5CF6',  // Açık mor vurgu
        'text-primary': '#FFFFFF',   // Beyaz metin
        'text-secondary': '#8892B0', // Gri-mavi metin
        'card-bg': '#151E2C',        // Kart arka planı (koyu lacivert)
        'hover': '#1E293B',          // Hover efekti için koyu mavi
        'border': '#2A3544',         // Kenarlıklar için koyu gri-mavi
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #6E07F3 0%, #2D9CDB 100%)',
        'gradient-purple': 'linear-gradient(90deg, #6E07F3 0%, #8B5CF6 100%)',
      },
    },
  },
  plugins: [],
}

