module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xs': '480px',
      'sm': '600px',
      'md': '782px',
      'lg': '960px',
      'xl': '1280px',
      '2xl': '1440px'
    },
    fontSize: {
      'xs': ['12px', {
        lineHeight: '16px',
      }],
      'sm': ['14px', {
        lineHeight: '20px',
      }],
      'md': ['16px', {
        lineHeight: '24px',
      }],
      'base': ['18px', {
        lineHeight: '28px',
      }],
      'lg': ['24px', {
        lineHeight: '32px',
      }]
    },
    colors: {
      'indigo': '#4F46E5',
      'green': {
        200: '#A7F3D0',
        500: '#10B981',
      },
      'black': '#000',
      'white': '#fff',
      'gray': {
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        900: '#111827',
      },
      'red': {
        100: '#FEE2E2',
        600: '#DC2626'
      }
    },
    boxShadow: {
      'button': '0px 1px 2px rgba(0, 0, 0, 0.05)',
      'modal': '0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    plugins: [],
  }
}