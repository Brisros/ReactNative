module.exports = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'plugin:react-native/all',
      'plugin:testing-library/react',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: [
      'react',
      'react-native',
      '@typescript-eslint',
      'prettier',
    ],
    rules: {
      'prettier/prettier': ['error', {
        endOfLine: 'auto',
      }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };
  