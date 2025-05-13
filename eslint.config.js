const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    plugins: {
      react: require('eslint-plugin-react'),
      'react-native': require('eslint-plugin-react-native'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
      'simple-import-sort': require('eslint-plugin-simple-import-sort'),
      prettier: require('eslint-plugin-prettier'),
    },
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      react: { version: 'detect' },
      'import/resolver': {
        typescript: { project: './tsconfig.json' },
      },
    },

    rules: {
      'jsx-quotes': ['error', 'prefer-single'],
      'react/react-in-jsx-scope': 'off',
      'no-param-reassign': 'off',
      'import/prefer-default-export': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react/function-component-definition': [
        'warn',
        { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
      ],
      'react/require-default-props': 'off',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/naming-convention': 'off',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', '^@?\\w'],
            ['^@/'],
            ['^components', '^hooks', '^utils', '^constants', '^assets'],
            ['^\\.'],
          ],
        },
      ],
      'react-native/no-unused-styles': 'warn',
      'react-native/split-platform-components': 'error',
      'react-native/no-raw-text': 'off',
      'prettier/prettier': 'error',
    },
  },
]);
