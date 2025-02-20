/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in-out": {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-up": {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        moveStar1: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(-30px, -30px)", opacity: "0" },
        },
        moveStar2: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(20px, -20px)", opacity: "0" },
        },
        moveStar3: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(-10px, 20px)", opacity: "0" },
        },
        moveStar4: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(40px, 10px)", opacity: "0" },
        },
        moveStar5: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(60px, 10px)", opacity: "0" },
        },
        moveStar6: {
          "0%": { transform: "translate(0, 0)", opacity: "1" },
          "100%": { transform: "translate(20px, 30px)", opacity: "0" },
        },
      },
      animation: {
        "fade-in-out": "fade-in-out 2s ease-in-out",
        "slide-up": "slide-up 0.3s ease-out",
        "move-1": "moveStar1 0.7s ease-in-out forwards",
        "move-2": "moveStar2 0.7s ease-in-out forwards",
        "move-3": "moveStar3 0.7s ease-in-out forwards",
        "move-4": "moveStar4 0.7s ease-in-out forwards",
        "move-5": "moveStar5 0.7s ease-in-out forwards",
        "move-6": "moveStar6 0.7s ease-in-out forwards",
      },
    },
  },
  plugins: [daisyui, require("tailwind-scrollbar-hide")],
};
