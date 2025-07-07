/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Tokyo Night Palette
        tn_bg: '#1a1b26',
        tn_bg_dark: '#16161e',
        tn_panel: '#24283b',
        tn_fg: '#c0caf5',
        tn_fg_secondary: '#a9b1d6',
        tn_fg_muted: '#565f89',
        tn_blue: '#7aa2f7',
        tn_purple: '#bb9af7',
        tn_green: '#9ece6a',
        tn_red: '#f7768e',
        tn_yellow: '#e0af68',
        tn_cyan: '#7dcfff',
      },
    },
  },
  plugins: [],
};
