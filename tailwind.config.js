/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#f4f0e6',
        panel: '#ebe5d6',
        ink: { DEFAULT: '#1c1915', 2: '#4a443a', 3: '#6b6458' },
        accent: { DEFAULT: '#b53a08', hover: '#8f2d06' },
        night: '#15120e',
        line: 'rgba(28, 25, 21, 0.16)'
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['"Schibsted Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace']
      },
      borderRadius: { DEFAULT: '6px' }
    }
  },
  plugins: []
}
