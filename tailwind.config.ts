/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
// import { ButtonComponent } from './tailwind/buttons'
const defaultTheme = require("tailwindcss/defaultTheme");
import { colors, colorsConfig } from './tailwind/colors'
import { container, screens } from './tailwind/sizing'
import { fontFamily } from './tailwind/font'

export default <Partial<Config>>{
  content: ["./src/**/*.{html,js}"],
  // prefix: TW_CONFIG_PREFIX,
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

