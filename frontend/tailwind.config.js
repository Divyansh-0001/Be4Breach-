/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "be4-bg": "#090b10",
        "be4-panel": "#11131a",
        "be4-panel-strong": "#151924",
        "be4-muted": "#98a2b3",
        "be4-accent": "#f43f5e",
        "be4-accent-strong": "#ef4444",
        "be4-border": "#1f2937"
      },
      boxShadow: {
        glow: "0 0 40px rgba(244,63,94,0.28)",
        "glow-strong": "0 0 60px rgba(244,63,94,0.4)",
        card: "0 20px 45px rgba(2,6,23,0.55)"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top, rgba(244,63,94,0.18), transparent 60%)",
        "grid-fade":
          "linear-gradient(to right, rgba(148,163,184,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.08) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};
