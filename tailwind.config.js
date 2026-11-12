/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 茶乃間の色。これで bg-matcha/10・text-ink/70・bg-paper などがサイト全体で使える
      colors: {
        ink: '#1a1a1a',
        paper: '#f8f7f4',
        matcha: '#7fa67f',
        'matcha-dark': '#5d7d5d',
        gold: '#d4af37',
      },
    },
  },
  plugins: [],
}