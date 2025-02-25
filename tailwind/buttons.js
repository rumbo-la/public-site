// import { Config, PluginFunction } from 'tailwindcss';
const plugin = require('tailwindcss/plugin');

export const ButtonComponent = ({ addComponents, theme }) => {
    // const newUtilities = {
    //   '.btn-custom': {
    //     display: 'inline-block',
    //     padding: '0.5rem 1rem',
    //     borderRadius: '0.375rem', // Este es 'rounded-md'
    //     backgroundColor: '#1d4ed8', // Este es 'bg-blue-700'
    //     color: '#ffffff',
    //     '&:hover': {
    //       backgroundColor: '#2563eb' // Este es 'bg-blue-600'
    //     }
    //   }
    // };
    addComponents({
      '.app-btn': {
      },
      '.app-btn--outlined': {
        color: theme('colors.primary'),
        border: `1px solid ${theme('colors.primary')}`
      },
      '.app-btn--fill': {
        color: theme('colors.white'),
        backgroundColor: `${theme('colors.primary')}`
      }
    })

    // addUtilities(newUtilities, ['responsive', 'hover']);
  }