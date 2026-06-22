/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#040711",
          900: "#070b1a",
          800: "#0b1224",
          700: "#111a33",
          600: "#1a2647",
        },
        electric: {
          400: "#3b82f6",
          500: "#2563eb",
          600: "#1d4ed8",
        },
        sky2: {
          300: "#7cc4ff",
          400: "#56b3ff",
        },
        cyanx: {
          400: "#22d3ee",
          500: "#06b6d4",
        },
        gold: {
          300: "#fde047",
          400: "#facc15",
          500: "#eab308",
        },
      },
      fontFamily: {
        display: ['"Sora"', "system-ui", "sans-serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(34,211,238,0.45)",
        "glow-blue": "0 0 50px -10px rgba(37,99,235,0.55)",
        "glow-gold": "0 0 40px -8px rgba(250,204,21,0.45)",
      },
      backdropBlur: {
        xs: "2px",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-22px) rotate(8deg)" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-30px) translateX(14px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.95)", opacity: "0.7" },
          "70%": { transform: "scale(1.3)", opacity: "0" },
          "100%": { opacity: "0" },
        },
        gridmove: {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "60px 60px" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        floatSlow: "floatSlow 11s ease-in-out infinite",
        shimmer: "shimmer 6s linear infinite",
        pulseRing: "pulseRing 2.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        gridmove: "gridmove 18s linear infinite",
      },
    },
  },
  plugins: [],
};
