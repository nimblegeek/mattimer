/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Smoothcomp-inspired palette
        sc_bg: '#23242a', // main background
        sc_panel: '#2c2d33', // panel background
        sc_card: '#18181b', // card/score background
        sc_yellow: '#e2b500', // highlight yellow
        sc_green: '#4ade80', // positive/next
        sc_red: '#f87171', // negative/end
        sc_gray: '#a1a1aa', // muted gray
        sc_white: '#f4f4f5', // off-white
      },
      fontFamily: {
        sans: ['Circular', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
