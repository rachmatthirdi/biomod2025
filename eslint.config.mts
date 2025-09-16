// eslint.config.mts

import path from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import prettierConfig from "eslint-config-prettier";

// Persiapan untuk utilitas kompatibilitas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Konfigurasi ESLint Anda dimulai di sini
export default tseslint.config(
  // Konfigurasi umum untuk semua file
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Konfigurasi yang direkomendasikan dari plugin
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Menggunakan compat untuk menerjemahkan konfigurasi Next.js
  ...compat.extends("next/core-web-vitals"),

  // Aturan kustom Anda
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },

  // Penting: Konfigurasi Prettier harus selalu menjadi yang terakhir
  prettierConfig
);
