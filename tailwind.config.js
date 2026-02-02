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
        // Tech Palette
        'tech-blue': {
          DEFAULT: '#3B82F6', // Blue 500
          light: '#DBEAFE', // Blue 100
          dark: '#1E40AF', // Blue 800
        },
        'tech-purple': {
          DEFAULT: '#8B5CF6', // Purple 500
          light: '#EDE9FE', // Purple 100
          dark: '#5B21B6', // Purple 800
        },
        'tech-teal': {
          DEFAULT: '#14B8A6', // Teal 500
          light: '#CCFBF1', // Teal 100
          dark: '#0F766E', // Teal 800
        },
        'tech-pink': {
          DEFAULT: '#EC4899', // Pink 500
          light: '#FCE7F3', // Pink 100
          dark: '#9F1239', // Pink 800
        },
        'tech-emerald': {
          DEFAULT: '#10B981', // Emerald 500
          light: '#D1FAE5', // Emerald 100
          dark: '#065F46', // Emerald 800
        },
        'tech-orange': {
          DEFAULT: '#F97316', // Orange 500
          light: '#FFEDD5', // Orange 100
          dark: '#9A3412', // Orange 800
        },
        'tech-slate': '#64748B', // Slate 500
        'tech-charcoal': '#1E293B', // Slate 800
        'tech-border': '#E2E8F0', // Slate 200
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Fraunces', 'Playfair Display', 'serif'], // Characterful Serif
        'mono': ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)', // Soft diffuse shadow
        'medium': '0 10px 30px -4px rgba(0, 0, 0, 0.08)',
        'large': '0 20px 40px -8px rgba(0, 0, 0, 0.12)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.3)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.3)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
