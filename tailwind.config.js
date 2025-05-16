/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(210, 40%, 98%)", // Almost white
          foreground: "hsl(222.2, 47.4%, 11.2%)", // Dark blue/black
        },
        background: "hsl(222.2, 47.4%, 11.2%)", // Dark blue/black for body
        foreground: "hsl(210, 40%, 98%)", // Almost white for text
        card: {
          DEFAULT: "hsl(222.2, 47.4%, 15%)", // Slightly lighter dark blue
          foreground: "hsl(210, 40%, 98%)",
        },
        accent: {
          DEFAULT: "hsl(173, 90%, 40%)", // Teal/Cyan accent
          foreground: "hsl(210, 40%, 98%)",
        },
        destructive: {
          DEFAULT: "hsl(0, 72%, 51%)", // Red
          foreground: "hsl(210, 40%, 98%)",
        },
        muted: {
          DEFAULT: "hsl(217, 32.6%, 17.5%)",
          foreground: "hsl(215, 20.2%, 65.1%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius, 0.75rem)",
        md: "calc(var(--radius, 0.75rem) - 2px)",
        sm: "calc(var(--radius, 0.75rem) - 4px)",
      },
      boxShadow: {
        '2xl-inner': 'inset 0 2px 20px 0 rgb(0 0 0 / 0.2)',
      }
    },
  },
  // plugins: [require("tailwindcss-animate")], // 우선 주석 처리
};
