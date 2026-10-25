/** @type {import('tailwindcss').Config} */

/**
 * Semantic colours resolve through CSS custom properties declared in index.css,
 * so `bg-surface` / `text-muted` automatically follow the active theme without
 * a single `dark:` variant in component markup.
 */
const themed = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        /* Semantic (theme-aware) */
        base: themed('base'),
        surface: themed('surface'),
        raised: themed('raised'),
        line: themed('line'),
        'line-strong': themed('line-strong'),
        ink: themed('ink'),
        muted: themed('muted'),
        faint: themed('faint'),
        signal: themed('signal'),
        inverse: themed('inverse'),

        /* Raw graphite ramp — for deliberate, fixed-tone work */
        graphite: {
          50: '#f7f7f8',
          100: '#eeeef0',
          200: '#dedee2',
          300: '#c2c3c9',
          400: '#9b9da4',
          500: '#75777f',
          600: '#585a61',
          700: '#43444a',
          800: '#2c2d32',
          900: '#1c1d21',
          950: '#0d0e10',
        },
      },

      fontFamily: {
        sans: ['Archivo', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1.2' }],
        meta: ['0.75rem', { lineHeight: '1.35' }],
        display: ['var(--fs-display)', { lineHeight: '0.9', letterSpacing: '-0.035em' }],
        h1: ['var(--fs-h1)', { lineHeight: '0.98', letterSpacing: '-0.03em' }],
        h2: ['var(--fs-h2)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        h3: ['var(--fs-h3)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        lead: ['var(--fs-lead)', { lineHeight: '1.6' }],
      },

      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section-y)',
      },

      maxWidth: {
        shell: 'var(--shell)',
        measure: '62ch',
        'measure-tight': '46ch',
      },

      borderRadius: {
        xs: '2px',
        sm: '3px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
      },

      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },

      zIndex: {
        nav: '60',
        overlay: '80',
        cursor: '100',
      },
    },
  },
  plugins: [],
};
