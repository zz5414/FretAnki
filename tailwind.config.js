/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Simplified color configuration for testing
      colors: {
        primary: "#f0f9ff",   // A light blue color
        secondary: "#1e293b",  // A dark blue color
        accent: "#06b6d4",     // A cyan color
      },
    },
  },
};
