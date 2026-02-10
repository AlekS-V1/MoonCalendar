import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['src/**/*.js'],
    ignores: ['node_modules/'],

    languageOptions: {
      globals: globals.node,
    },

    plugins: {
      prettier: prettierPlugin,
    },

    extends: [js.configs.recommended, prettierConfig],

    rules: {
      semi: 'error',
      'no-unused-vars': ['error', { args: 'none' }],
      'no-undef': 'error',

      'prettier/prettier': 'error',
    },
  },
]);
