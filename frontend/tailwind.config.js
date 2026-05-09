/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Clash Display'", "sans-serif"],
        body: ["'Satoshi'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        ink: {
          950: "#0a0a0f",
          900: "#111118",
          800: "#1a1a26",
          700: "#252535",
          600: "#32324a",
        },
        ember: {
          400: "#ff6b35",
          500: "#f04e1a",
          600: "#d43a08",
        },
        arctic: {
          400: "#38bdf8",
          500: "#0ea5e9",
        },
        sage: {
          400: "#4ade80",
          500: "#22c55e",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        shimmer: "shimmer 2s infinite linear",
        pulse2: "pulse2 2s ease-in-out infinite",
        "slide-in": "slideIn 0.3s ease forwards",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulse2: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
