const defaultTheme = require("tailwindcss/defaultTheme");

export const fontSize = () => {
  return {
    ...defaultTheme.fontSize,
    /**
     * Title
     */
    // h1 => 40px, 48.76px
    h1: ["2.5rem", "3.048rem"],
    // h2 => 32px, 39.01px
    h2: ["2rem", "2.438rem"],
    // h3 => 28px, 34.13px
    h3: ["1.75rem", "2.133rem"],
    // h4 => 24px, 29.26px
    h4: ["1.5rem", "1.829rem"],
    // h5 => 20px, 24.38px
    h5: ["1.25rem", "1.524rem"],
    /**
     * Body
     */
    // body0 => 22px, 26.82px
    body0: ["1.375rem", "1.676rem"],
    // body1 => 18px, 21.94px
    body1: ["1.125rem", "1.375rem"],
    // body2 => 16px, 19.5px
    body2: ["1rem", "1.25rem"],
    // body3 => 14px, 17.07px
    body3: ["0.875rem", "1.063rem"],
    // body4 => 12px, 14.63px
    body4: ["0.75rem", "0.938rem"],
    // overline => 10px, 12.19px
    overline: ["0.625rem", "0.762rem"],
    xxs: ["0.625rem", "0.75rem"],
    "4.5xl": ["2.75rem", "1.25rem"],
  }
};

export const fontFamily = {
  dxgrafik: ["DxGrafik", "sans-serif"],
  // icon: ["icon-saber"],
};
