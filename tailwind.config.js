import { heroui } from '@heroui/theme';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/routes/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/components/(button|card|chip|divider|dropdown|input|link|select|ripple|spinner|menu|popover|form|listbox|scroll-shadow).js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto Flex Variable', ...defaultTheme.fontFamily.sans],
        mono: ['Roboto Mono Variable', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    heroui({
      prefix: 'css',
    }),
  ],
};
