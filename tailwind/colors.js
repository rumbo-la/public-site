const plugin = require('tailwindcss/plugin');

const percentageToHex = (percentage) => {
  const decimal = `0${Math.round(255 * (percentage / 100)).toString(16)}`.slice(-2).toUpperCase();
  return decimal;
}

const listNumbersByFive = () => {
  return Array.from({ length: 19 }, (_, index) => 5 * (index + 1));
}

export const colors = {
  primary: '#382EDC',
  secondary: '#8452FD',
  paragraph: '#666666',
  black: '#000'
};


export const colorsConfig = ({ addBase, theme }) => {
  // const colors = theme('colors');
  const newVars = Object.keys(colors).reduce((acc, key) => {
    if (typeof colors[key] === 'string') {
      acc[`--tw-color-${key}`] = colors[key];
    } else if (typeof colors[key] === 'object') {
      Object.keys(colors[key]).forEach((shade) => {
        acc[`--tw-color-${key}-${shade}`] = colors[key][shade];
      });
    }
    return acc;
  }, {});

  addBase({
    ':root': newVars,
  });
}
