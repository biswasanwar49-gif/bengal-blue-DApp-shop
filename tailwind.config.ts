import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bengal: {
          blue: '#0b3d91',
          'blue-soft': '#1f4bbf',
          cyan: '#2dd4bf',
          'soft-slate': '#e2e8f0',
          'blue-muted': '#243b97'
        }
      },
      boxShadow: {
        soft: '0 25px 60px rgba(11, 61, 145, 0.12)',
      },
    },
  },
  plugins: [],
};

export default config;
