/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Playful Studio Palette
        'canvas': {
          DEFAULT: '#FFF7ED', // Warm Peach (Orange 50)
          dark: '#1C1917', // Warm Charcoal (Stone 900)
        },
        'ink': {
          DEFAULT: '#0F172A', // Slate 900 (High Contrast)
          dark: '#F8FAFC', // Slate 50
          muted: '#475569', // Slate 600
        },
        'coral': {
          DEFAULT: '#FF7F50',
          light: '#FFA07A',
          vibrant: '#FF4500',
        },
        'indigo': {
          DEFAULT: '#6366F1', // Indigo 500
          dark: '#4338CA', // Indigo 700
        },
        'sunflower': '#F59E0B', // Amber 500
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'Playfair Display', 'serif'], // Characterful Serif
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Soft diffuse shadow
        'medium': '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
