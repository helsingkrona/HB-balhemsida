import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBlue: "#001440",
        secondaryRed: "#9a031e",
        textGreen: "#505c3c",
        formOrange: "#C76B3E",
        formCream: "#F3E9DB",
        amberGold: "#E1A948",
        darkerGreen: "#b5c99a",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
