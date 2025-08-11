/** @type {import('tailwindcss').Config} */

const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette');

module.exports = {
  content: ['src/components/**/*.{ts,tsx}', 'app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        md: { max: '600px' },
      },
      colors: {
        primary: '#CCC2DC',
        'bg-1': '#141218',
        'bg-2': '#211F26',

        'text-1': '#E6E0E9',

        'gray-1': '#303030',

        stroke: '#4A4458',
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(204, 194, 220, 0.3)',
        'glow-lg': '0 0 40px rgba(204, 194, 220, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      },

      animation: {
        aurora: 'aurora 60s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        aurora: {
          from: {
            backgroundPosition: '50% 50%, 50% 50%',
          },
          to: {
            backgroundPosition: '350% 50%, 350% 50%',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(204, 194, 220, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(204, 194, 220, 0.6)' },
        },
      },
    },
  },
  plugins: [addVariablesForColors, require('tailwindcss-animate')],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme('colors'));
  let newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]));

  addBase({
    ':root': newVars,
  });
}
