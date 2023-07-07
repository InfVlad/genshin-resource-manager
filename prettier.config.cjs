/** @type {import("prettier").Config} */
const config = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 95,
  tabWidth: 2,
  bracketSpacing: true,
  jsxSingleQuote: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

module.exports = config;
