import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import react from 'eslint-plugin-react';
import reactNative from 'eslint-plugin-react-native';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/app-example',
      '**/babel.config.js',
      '**/eslint.config.mjs',
      '**/scripts',
      '**/components-example',
    ],
  },
  ...fixupConfigRules(
    compat.extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
    ),
  ),
  {
    plugins: {
      react: fixupPluginRules(react),
      simpleImportSort: fixupPluginRules(simpleImportSort),
      'react-native': fixupPluginRules(reactNative),
      '@typescript-eslint': fixupPluginRules(typescriptEslint),
      jest,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...reactNative.environments['react-native']['react-native'],
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {
      'simpleImportSort/imports': [
        'error',
        {
          groups: [['^react', 'react-native'], ['^(@Ruume)'], ['^\\.\\./'], ['^\\./']],
        },
      ],
      indent: ['error', 2],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react-native/no-unused-styles': 'error',
      'react-native/split-platform-components': 'error',
      'react-native/no-color-literals': 'warn',
    },
  },
];
