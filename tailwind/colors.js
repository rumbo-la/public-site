export const colors = {
  primary: '#382EDC',
  secondary: '#8452FD',
  paragraph: '#666666',
  black: '#000'
};


export const colorsConfig = ({ addBase }) => {
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
