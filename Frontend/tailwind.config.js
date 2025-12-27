/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Tailwind CSS v4 uses CSS-first configuration with @theme
  // All theme customization is now in src/index.css
  // This file is kept for IDE support and content paths
  theme: {
    extend: {},
  },
}