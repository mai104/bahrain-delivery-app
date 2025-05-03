/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E88E5",
          dark: "#1565C0",
          light: "#64B5F6"  // Añadida variante light
        },
        secondary: {
          DEFAULT: "#26A69A",
          dark: "#00897B",
          light: "#80CBC4"  // Añadida variante light
        },
        dark: {
          DEFAULT: "#1A237E",
          light: "#283593"
        },
        light: {
          DEFAULT: "#E3F2FD",
          dark: "#BBDEFB"
        },
        accent: {
          DEFAULT: "#FF5722",
          dark: "#E64A19",
          light: "#FF8A65"  // Añadida variante light
        },
        success: {
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
          light: "#81C784"  // Añadida variante light
        },
        warning: {
          DEFAULT: "#FFC107",
          dark: "#FFA000",
          light: "#FFD54F"  // Añadida variante light
        },
        danger: {
          DEFAULT: "#F44336",
          dark: "#D32F2F",
          light: "#E57373"  // Añadida variante light
        }
      },
      fontFamily: {
        sans: ['Cairo', 'sans-serif']
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'nav': '0 2px 4px -1px rgba(0, 0, 0, 0.1)'
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      }
    }
  },
  plugins: []
}
