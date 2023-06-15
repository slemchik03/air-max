/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        monument: ["var(--font-regular)"],
        monumentBold: ["var(--font-ultrabold)"],
        roboto: ["var(--font-roboto)"],
      },
      animation: {
        "spin-slow": "spin 7s linear infinite",
      },
    },
  },
};
