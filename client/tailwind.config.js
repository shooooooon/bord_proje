/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#611f69',
        secondary: '#1264a3',
        success: '#2eb67d',
        warning: '#e01e5a',
      },
    },
  },
  plugins: [],
}
