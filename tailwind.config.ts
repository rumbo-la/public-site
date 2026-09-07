/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import { colors, colorsConfig } from './tailwind/colors'
import { container, screens } from './tailwind/sizing'
import { fontFamily } from './tailwind/font'
// import { ButtonComponent } from './tailwind/buttons'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
  content: [
    './app/**/*.{vue,ts}',
    './tailwind/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors,
    },
    screens,
    container,
    fontFamily,
    boxShadow: {
      ...defaultTheme.boxShadow,
      custom: "0px 4px 15px rgba(0, 30, 95, 0.14)",
    },
  },
  plugins: [colorsConfig],
}

