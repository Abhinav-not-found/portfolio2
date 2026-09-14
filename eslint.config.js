import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import checkFile from 'eslint-plugin-check-file';

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.next/**',
      '**/eslint.config.*',
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    plugins: {
      'check-file': checkFile,
    },

    rules: {
      'check-file/folder-naming-convention': [
        'error',
        {
          // React
          'apps/*/src/**/*.{js,ts}': 'CAMEL_CASE',
          'apps/*/src/**/*.{jsx,tsx}': 'KEBAB_CASE',

          // Regular JS/TS files
          '**/services/**/*.{js,ts}': 'CAMEL_CASE',
          '**/controllers/**/*.{js,ts}': 'CAMEL_CASE',
          '**/repositories/**/*.{js,ts}': 'CAMEL_CASE',
          '**/utils/**/*.{js,ts}': 'CAMEL_CASE',

          // Reusable React components
          '**/components/**/*.tsx': 'KEBAB_CASE',

          // Pages
          '**/pages/**/*Page.tsx': 'PASCAL_CASE',
        },
      ],

      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{js,ts}': 'CAMEL_CASE',
        },
      ],
    },
    files: ['scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        console: 'readonly',
      },
    },
  },

  {
    files: ['apps/admin/**/*.{ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  {
    files: ['apps/client/**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
);
