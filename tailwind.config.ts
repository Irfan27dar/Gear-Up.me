import type { Config } from 'tailwindcss';

/**
 * Gear-Up.me brand system.
 * Colors, type, radius and motion tokens live here so no component hardcodes a hex.
 * Balance target per screen: ~60% neutral, ~23% teal, ~12% green, ~5% orange.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand — three colors do the work
        green: {
          DEFAULT: '#7BC100', // Gear-Up Green — the click color (primary actions)
          600: '#6BA800',
          700: '#5C9000',
          tint: '#EEF7DC',
        },
        teal: {
          DEFAULT: '#175266', // Deep Teal — wordmark, headings, structure
          600: '#124454',
          700: '#0E3644',
          tint: '#E3EDF0',
        },
        orange: {
          DEFAULT: '#F4932F', // Signal Orange — prices, deals, alerts (rare)
          600: '#E07E1A',
          tint: '#FDEBD8',
          text: '#5A3410', // deep-brown text for on-orange legibility
        },
        // Neutrals
        ink: '#1F2937', // headings, dark UI
        slate: '#343434', // body copy
        steel: '#9CA3AF', // muted / disabled
        cloud: '#E9ECF1', // fills, dividers
        'dark-ground': '#082832', // reversed dark ground (hero / feature bands)
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Role-based scale from the brand guide
        display: ['clamp(2rem, 4vw, 2.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em', fontWeight: '800' }],
        heading: ['1.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '800' }],
        subhead: ['1.125rem', { lineHeight: '1.3', fontWeight: '700' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        caption: ['0.75rem', { lineHeight: '1.4' }],
        data: ['0.8125rem', { lineHeight: '1.3' }],
      },
      borderRadius: {
        DEFAULT: '9px', // brand button/card radius
        btn: '9px',
        pill: '999px',
      },
      letterSpacing: {
        label: '0.16em',
      },
      maxWidth: {
        prose: '68ch', // 60–70 chars running text
        shell: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15,54,68,0.06), 0 8px 24px -12px rgba(15,54,68,0.18)',
        'card-hover': '0 4px 8px rgba(15,54,68,0.08), 0 20px 40px -16px rgba(15,54,68,0.28)',
        glow: '0 0 80px -10px rgba(123,193,0,0.45)',
        'glow-teal': '0 0 120px -20px rgba(23,82,102,0.9)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fade-in 0.5s ease both',
        marquee: 'marquee 32s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
