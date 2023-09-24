import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'purple-light': '#AE60EB',
        'purple-default': '#9D3FE7',
        'purple-dark': '#6A17AB',
        'disabled': '#D4D2D5',
        'light-text': '#FFFFFF',
        'dark-text': '#000000',
      }

    },
  },
  plugins: [],
}
export default config
