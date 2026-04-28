/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pastel: {
          purple: '#e8d5f5',
          purpleDark: '#c9a7e4',
          purpleDeep: '#b088d4',
          blue: '#d0e7ff',
          blueDark: '#a8cfff',
          blueDeep: '#7ab8ff',
          green: '#d4f5d4',
          greenDark: '#a8e6a8',
          greenDeep: '#7dd87d',
          pink: '#fde0ef',
          pinkDark: '#f5b8d6',
          peach: '#ffe4d0',
          peachDark: '#ffc9a3',
          yellow: '#fff5cc',
          yellowDark: '#ffe999',
          lavender: '#ede4f7',
          mint: '#e0f7ee',
          sky: '#e4f2ff',
        },
        surface: {
          50: '#fefeff',
          100: '#f8f5fd',
          200: '#f3eefb',
          300: '#ede6f8',
          400: '#e6dcf4',
        },
        txt: {
          primary: '#3d2b5a',
          secondary: '#6b5a8a',
          muted: '#9b8ab8',
          light: '#b8a8d0',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 20px rgba(200, 180, 230, 0.15)',
        card: '0 4px 24px rgba(200, 180, 230, 0.12)',
        glow: '0 0 30px rgba(200, 180, 230, 0.2)',
      },
    },
  },
  plugins: [],
}
