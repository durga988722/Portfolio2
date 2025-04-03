module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'gray-900': '#111827',
        'gray-800': '#1F2937',
        'gray-700': '#374151',
        'blue-400': '#60A5FA',
        'blue-500': '#3B82F6',
        'blue-600': '#2563EB',
        'purple-400': '#A78BFA',
        'purple-500': '#8B5CF6'
      },
      spacing: {
        '128': '32rem',
      },
      // Added mobile-specific animations
      animation: {
        'blob': 'blob 7s infinite',
        'blob-slow': 'blob 10s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' }
        }
      }
    },
  },
  plugins: [],
}