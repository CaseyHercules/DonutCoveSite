/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'tech': {
          // Primary brand colors with more personality
          'blue': '#3b82f6',
          'indigo': '#6366f1',
          'purple': '#8b5cf6',
          'teal': '#14b8a6',
          'emerald': '#10b981',
          'orange': '#f59e0b',
          'pink': '#ec4899',
          
          // Light versions for backgrounds
          'blue-light': '#eff6ff',
          'indigo-light': '#eef2ff',
          'purple-light': '#f5f3ff',
          'teal-light': '#f0fdfa',
          'emerald-light': '#ecfdf5',
          'orange-light': '#fffbeb',
          'pink-light': '#fdf2f8',
          
          // Dark versions for strong contrast
          'blue-dark': '#1d4ed8',
          'indigo-dark': '#4338ca',
          'purple-dark': '#7c3aed',
          'teal-dark': '#0f766e',
          'emerald-dark': '#047857',
          'orange-dark': '#d97706',
          'pink-dark': '#be185d',
          
          // Professional grays with warmth
          'slate': '#334155',
          'gray': '#475569',
          'light': '#f8fafc',
          'muted': '#64748b',
          'border': '#e2e8f0',
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-purple': '0 0 20px rgba(139, 92, 246, 0.15)',
        'glow-teal': '0 0 20px rgba(20, 184, 166, 0.15)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 