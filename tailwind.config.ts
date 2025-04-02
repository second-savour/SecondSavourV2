import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-white": "#f9f9f9",
        "my-beige": "#e7d9bf",
        "my-green": "#015A2E",
        "my-orange": "#FF780D",
        "my-brown": "#3B1D1D",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
