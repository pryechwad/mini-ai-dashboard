import eslintPluginReact from 'eslint-plugin-react';

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  {
    files: ['tailwind.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        module: 'readonly',
        require: 'readonly',
      },
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    plugins: {
      react: eslintPluginReact,
    },
    rules: {
      // your rules
    },
  },
];
