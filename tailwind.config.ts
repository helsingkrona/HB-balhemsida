import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-eb-garamond)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        // Heraldisk palett (en sanning för hela sidan)
        navy: "#001440", // bas
        nationRed: "#9A031E", // accent
        gold: "#C8A24B", // detaljer/hårlinjer
        goldSoft: "#E3CB8E", // ljusare guld för hover/ramar
        parchment: "#F4ECDD", // ytor/kort
        ink: "#1C1B19", // brödtext på ljusa ytor

        // Bakåtkompatibla tokens (används fortf. på sina håll)
        primaryBlue: "#001440",
        secondaryRed: "#9a031e",
        textGreen: "#505c3c",
        formOrange: "#C76B3E",
        formCream: "#F3E9DB",
        amberGold: "#E1A948",
        darkerGreen: "#b5c99a",
        backgroundGreen: "#2E4E3F",
        deepForestGreen: "#2E4E3F",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
