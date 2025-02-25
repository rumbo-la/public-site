module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['tailwindcss'],
  extends: [
    'eslint:recommended',
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  // rules: {
  //   'prettier/prettier': ['error', {
  //     endOfLine: 'auto',
  //     singleQuote: true,
  //     tabWidth: 2,
  //     trailingComma: 'all',
  //     arrowParens: 'always',
  //     htmlWhitespaceSensitivity: 'ignore',
  //   }],
  // },
};
