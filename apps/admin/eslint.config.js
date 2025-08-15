// apps/admin/eslint.config.js
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { config as base } from "@repo/eslint-config/base";

export default tseslint.config(
  /* 1. shared base rules (already flat-config objects) */
  ...base,

  /* 2. builtin & TypeScript presets */
  js.configs.recommended,
  ...tseslint.configs.recommended,

  /* 3. package-specific ignores, scopes, plugins, rules */
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },
);
