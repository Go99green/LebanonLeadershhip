import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tactical: {
          950: "#07110e",
          900: "#0b1713",
          800: "#11221c",
          700: "#173028",
          600: "#1f4537",
          500: "#2f6a58",
          400: "#4f8c7b",
          300: "#7eb7a7",
          200: "#b6d9cf"
        },
        amberish: {
          500: "#b3541e",
          400: "#d47a42",
          300: "#efab7a"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,255,255,0.06), 0 20px 80px rgba(0,0,0,0.35)",
      },
      backgroundImage: {
        mesh: "radial-gradient(circle at 20% 20%, rgba(47,124,106,0.28), transparent 28%), radial-gradient(circle at 80% 0%, rgba(179,84,30,0.22), transparent 24%), radial-gradient(circle at 50% 100%, rgba(59,130,246,0.16), transparent 25%)"
      }
    },
  },
  plugins: [],
};

export default config;
