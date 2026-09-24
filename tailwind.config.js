/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#050505',
          800: '#080808',
          700: '#0B0B0D',
          600: '#101014',
          500: '#16161B',
        },
        violet: {
          deep: '#8B5CF6',
          glow: '#A855F7',
          soft: '#C084FC',
          light: '#E9D5FF',
        },
        chalk: '#F5F5F5',
        muted: '#777777',
      },
      fontFamily: {
        display: ['"Archivo"', '"Anton"', 'Impact', 'sans-serif'],
        anton: ['"Anton"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        tighter2: '-0.03em',
        wide3: '0.3em',
        wide4: '0.45em',
      },
      maxWidth: {
        frame: '1600px',
      },
      transitionTimingFunction: {
        cine: 'cubic-bezier(0.16, 1, 0.3, 1)',
        expo: 'cubic-bezier(0.19, 1, 0.22, 1)',
      },
      boxShadow: {
        glow: '0 0 50px -12px rgba(168, 85, 247, 0.5)',
        'glow-lg': '0 0 140px -24px rgba(168, 85, 247, 0.6)',
      },
      keyframes: {
        grain: {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-6%,4%)' },
          '40%': { transform: 'translate(4%,-8%)' },
          '60%': { transform: 'translate(-4%,6%)' },
          '80%': { transform: 'translate(8%,2%)' },
        },
        blink: {
          '0%,45%': { opacity: '1' },
          '50%,95%': { opacity: '0.15' },
          '100%': { opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        grain: 'grain 7s steps(5) infinite',
        blink: 'blink 1.6s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration,38s) linear infinite',
        floaty: 'floaty 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
