// packages/eslint-config/base.js
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import turboPlugin from 'eslint-plugin-turbo';
import tseslint from 'typescript-eslint';
import onlyWarn from 'eslint-plugin-only-warn';

import importPlugin   from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import unusedImports  from 'eslint-plugin-unused-imports';

import { FlatCompat } from '@eslint/eslintrc';
const compat = new FlatCompat({ baseDirectory: import.meta.url });

/** @type {import('eslint').Linter.FlatConfig[]} */
export const config = [
  /* 1️⃣ Built-in & TS rules (already flat) */
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,

  /* 2️⃣ Classic presets auto-converted by FlatCompat */
  ...compat.extends(
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended'
  ),

  /* 3️⃣ Shared plugins & rules */
  {
    plugins: {
      turbo: turboPlugin,
      'only-warn': onlyWarn,
      import: importPlugin,
      'unused-imports': unusedImports,
      prettier: prettierPlugin,
    },
    rules: {
      'turbo/no-undeclared-env-vars': 'warn',

      /* Strip dead code */
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      /* Surface Prettier differences */
      'prettier/prettier': 'error',
    },
  },

  /* 4️⃣ Make import/no-unresolved obey tsconfig paths */
  {
    settings: {
      'import/resolver': {
        typescript: {
          project: ['./tsconfig.json', './packages/*/tsconfig.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          moduleDirectory: ['node_modules', 'packages'],
        },
      },
    },
  },

  /* 5️⃣ Import ordering */
  {
    rules: {
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'type',
            'object',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },

  /* 6️⃣ Ignore dist folders repo-wide */
  { ignores: ['dist/**'] },
];