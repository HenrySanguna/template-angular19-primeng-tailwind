/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#01092d',
          50: '#e6e7ed',
          100: '#b3b6c8',
          200: '#8086a4',
          300: '#4d557f',
          400: '#27305a',
          500: '#01092d',
          600: '#010828',
          700: '#010620',
          800: '#010418',
          900: '#00020d',
          contrast: '#ffffff',
          shade: '#010828',
          tint: '#1a2242',
        },
        secondary: {
          DEFAULT: '#085faf',
          50: '#e6f1f9',
          100: '#b3d4ed',
          200: '#80b7e1',
          300: '#4d9ad5',
          400: '#2682c9',
          500: '#085faf',
          600: '#07549a',
          700: '#064076',
          800: '#042c52',
          900: '#02182e',
          contrast: '#ffffff',
          shade: '#07549a',
          tint: '#216fb7',
        },
        tertiary: {
          DEFAULT: '#3f4244',
          contrast: '#ffffff',
          shade: '#373a3c',
          tint: '#525557',
        },
        success: {
          DEFAULT: '#28a745',
          50: '#e9f6ec',
          100: '#c0e3c8',
          200: '#97d0a4',
          300: '#6ebd80',
          400: '#4bae69',
          500: '#28a745',
          600: '#23923d',
          700: '#1b7130',
          800: '#135023',
          900: '#0a2f16',
          contrast: '#ffffff',
          shade: '#23923d',
          tint: '#3eb158',
        },
        warning: {
          DEFAULT: '#ffc107',
          50: '#fff9e6',
          100: '#ffecb3',
          200: '#ffe080',
          300: '#ffd44d',
          400: '#ffca26',
          500: '#ffc107',
          600: '#e0a800',
          700: '#b38600',
          800: '#866500',
          900: '#594300',
          contrast: '#000000',
          shade: '#e0a800',
          tint: '#ffca2c',
        },
        danger: {
          DEFAULT: '#db2c00',
          50: '#fbe9e6',
          100: '#f4bfb3',
          200: '#ed9580',
          300: '#e66b4d',
          400: '#e14826',
          500: '#db2c00',
          600: '#c12700',
          700: '#971f00',
          800: '#6d1700',
          900: '#430e00',
          contrast: '#ffffff',
          shade: '#c12700',
          tint: '#df4119',
        },
        light: {
          DEFAULT: '#ffffff',
          contrast: '#000000',
          shade: '#e0e0e0',
        },
        medium: {
          DEFAULT: '#6c757d',
          contrast: '#ffffff',
          shade: '#5f676e',
          tint: '#7b838a',
        },
        dark: {
          DEFAULT: '#343a40',
          contrast: '#ffffff',
          shade: '#2e3338',
          tint: '#474d53',
        },
        surface: {
          0: '#ffffff',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#0d0f11',
        },
      },
      spacing: {
        xxs: '0.25rem',  // 4px
        xs: '0.5rem',    // 8px
        sm: '0.75rem',   // 12px
        md: '1rem',      // 16px
        lg: '1.5rem',    // 24px
        xl: '2rem',      // 32px
        xxl: '3rem',     // 48px
      },
      borderRadius: {
        'custom-sm': '0.375rem',  // 6px
        'custom': '0.625rem',     // 10px
        'custom-lg': '0.75rem',   // 12px
        'custom-xl': '1rem',      // 16px
      },
      boxShadow: {
        'custom-sm': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        'custom-md': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        'custom-lg': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        bold: '700',
        'extra-bold': '800',
      },
    },
  },
  plugins: [],
}
