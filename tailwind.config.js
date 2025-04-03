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
      }
    },
  },
  plugins: [],
}