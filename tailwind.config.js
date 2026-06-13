/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#08080a',
          soft: '#0a0d18',
          surface: '#11151f',
          card: '#171c28',
          elevated: '#1d2330'
        },
        bone: {
          DEFAULT: '#f5f1e8',
          muted: '#c4bfb3',
          dim: '#85807a'
        },
        ember: {
          DEFAULT: '#ff5b22',
          soft: '#ff8a5b',
          dim: '#cc4416',
          glow: '#ffa07a'
        },
        /* tide is reserved for atmospheric / semantic use only —
           aurora gradients, code syntax tokens, the language-orb scene.
           Never used as a button fill, chip background, or text emphasis. */
        tide: {
          DEFAULT: '#3b82f6',
          soft: '#60a5fa',
          deep: '#1d4ed8',
          glow: '#93c5fd'
        },
        line: {
          DEFAULT: 'rgba(245, 241, 232, 0.08)',
          soft: 'rgba(245, 241, 232, 0.04)',
          strong: 'rgba(245, 241, 232, 0.16)'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Geist', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', 'ui-monospace', 'monospace']
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up-slow': 'fadeUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'rise': 'rise 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'orb-drift': 'orbDrift 18s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'shimmer-sweep': 'shimmerSweep 6s linear infinite'
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(28px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        rise: {
          from: { opacity: 0, transform: 'translateY(60px)' },
          to: { opacity: 1, transform: 'translateY(0)' }
        },
        orbDrift: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(30px, -40px) scale(1.08)' }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      backgroundImage: {
        'noise': "url('/grain.jpg')"
      },
      backgroundSize: {
        'grain': '200px 200px'
      },
      boxShadow: {
        /* Refero-style single-shadow rule: cinema for product mockups,
           ring-bone for hairline card outlines, glass-inset for the
           liquid-glass system. No glow shadows on chrome. */
        cinema: '0 24px 80px -20px rgba(0,0,0,0.9), 0 0 0 1px rgba(245, 241, 232, 0.06)',
        'ring-bone': '0 0 0 1px rgba(245, 241, 232, 0.16)',
        'glass-inset':
          'inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.4)'
      },
      letterSpacing: {
        tightest: '-0.06em',
        tightish: '-0.03em'
      }
    }
  },
  plugins: []
}
