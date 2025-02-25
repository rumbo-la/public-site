const defaultTheme = require('tailwindcss/defaultTheme');

export const screens = {
  xs: "480px",
  ...defaultTheme.screens,
  '2xl': "1440px",
};

export const container = {
  center: true,
  padding: "0.75rem",
  screens,
}