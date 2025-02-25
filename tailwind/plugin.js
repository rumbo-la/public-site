export const componentsConfig = ({ addComponents, theme }) => {

  addComponents({
    ".card-curve": {
      borderRadius: `20px 0 20px 0`,
    },
    ".card-curve-shadow": {
      borderRadius: `20px 0 20px 0`,
      boxShadow: theme("boxShadow.custom"),
    },
  });
}