/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' }
        }
      },
      animation: {
        'fade-in-out': 'fade-in-out 2s ease-in-out',
        'slide-up': 'slide-up 0.3s ease-out'
      }
    },
  },
  plugins: [import("daisyui"), import("tailwind-scrollbar-hide")],
};
