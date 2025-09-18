module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'out', 'build', '.nuxt', 'fa-IR.js', 'fa-IR.json'],
  overrides: [
    {
      extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:prettier/recommended',
        'plugin:promise/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:@typescript-eslint/recommended',
        '@nuxtjs/eslint-config-typescript',
        'plugin:storybook/recommended',
      ],
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        extraFileExtensions: ['.vue'],
        parser: require.resolve('@typescript-eslint/parser'),
      },
      rules: {
        //typescript
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            caughtErrors: 'none',
            varsIgnorePattern: 'header',
          },
        ],
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['off'],
        'comma-dangle': ['off', 'never'],
        'import/named': ['off'],
        'import/no-unresolved': [2, { ignore: ['.woff2$'] }],
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': [
          2,
          {
            components: ['Anchor'],
          },
        ],
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            aspects: ['invalidHref', 'preferButton'],
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
          },
        ],
        // a11y
        'jsx-a11y/autocomplete-valid': [
          2,
          {
            inputComponents: ['Input', 'FormField'],
          },
        ],
        'jsx-a11y/control-has-associated-label': [
          2,
          {
            controlComponents: ['CustomComponent'],
            depth: 3,
            ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
            ignoreRoles: [
              'grid',
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'row',
              'tablist',
              'toolbar',
              'tree',
              'treegrid',
            ],
            labelAttributes: ['label'],
          },
        ],
        // eslint
        'newline-before-return': ['error'],
        'no-console': 'warn',
        'no-extra-boolean-cast': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'no-param-reassign': 'off',
        'padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            next: ['return'],
            prev: '*',
          },
          {
            blankLine: 'always',
            next: ['export'],
            prev: ['import'],
          },
          {
            blankLine: 'never',
            next: ['const', 'let', 'var'],
            prev: ['const', 'let', 'var', 'function'],
          },
        ],
        // prettier
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
            semi: true,
            trailingComma: 'es5',
          },
        ],
        semi: ['error', 'always'],
        'space-before-function-paren': 'off',
        // unused-import
        'unused-imports/no-unused-imports': 'warn',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        // vue
        'vue/multi-word-component-names': 0,
        'vue/multiline-html-element-content-newline': 'off',
        //vue
        'vue/no-v-html': ['off'],
        'vue/singleline-html-element-content-newline': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
    {
      extends: [
        'eslint:recommended',
        'prettier',
        'plugin:promise/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:perfectionist/recommended-alphabetical',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:storybook/recommended',
      ],
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions'] }],
        '@typescript-eslint/no-explicit-any': 'warn',
        'arrow-body-style': ['error', 'as-needed'],
        'arrow-parens': ['off'],
        'comma-dangle': ['off', 'never'],
        'import/no-unresolved': [2, { ignore: ['.woff2$'] }],
        'jsx-a11y/alt-text': 'error',
        'jsx-a11y/anchor-has-content': [
          2,
          {
            components: ['Anchor'],
          },
        ],
        'jsx-a11y/anchor-is-valid': [
          'error',
          {
            aspects: ['invalidHref', 'preferButton'],
            components: ['Link'],
            specialLink: ['hrefLeft', 'hrefRight'],
          },
        ],
        // a11y
        'jsx-a11y/autocomplete-valid': [
          2,
          {
            inputComponents: ['Input', 'FormField'],
          },
        ],
        'jsx-a11y/control-has-associated-label': [
          2,
          {
            controlComponents: ['CustomComponent'],
            depth: 3,
            ignoreElements: ['audio', 'canvas', 'embed', 'input', 'textarea', 'tr', 'video'],
            ignoreRoles: [
              'grid',
              'listbox',
              'menu',
              'menubar',
              'radiogroup',
              'row',
              'tablist',
              'toolbar',
              'tree',
              'treegrid',
            ],
            labelAttributes: ['label'],
          },
        ],
        // eslint
        'newline-before-return': ['error'],
        'no-console': 'warn',
        'no-extra-boolean-cast': 'off',
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'no-param-reassign': 'off',
        'padding-line-between-statements': [
          'warn',
          {
            blankLine: 'always',
            next: ['return'],
            prev: '*',
          },
          {
            blankLine: 'always',
            next: ['export', 'function'],
            prev: ['import', 'function'],
          },
          {
            blankLine: 'never',
            next: ['const', 'let', 'var'],
            prev: ['const', 'let', 'var'],
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            order: 'asc',
            type: 'natural',
          },
        ],
        // prettier
        'prettier/prettier': [
          'error',
          {
            endOfLine: 'auto',
          },
        ],
        'space-before-function-paren': 'off',
        // unused-import
        'unused-imports/no-unused-imports': 'warn',
        'vue/html-self-closing': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/multiline-html-element-content-newline': 'off',
        // vue
        'vue/singleline-html-element-content-newline': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {},
        },
      },
    },
    {
      env: {
        jest: true,
      },
      files: ['**/__tests__/**/*.js', '**/__tests__/**/*.ts'],
    },
    {
      files: ['**/*.config.js', '**/*.config.ts', 'e2e.ts'],
      rules: {
        'import/no-unresolved': ['off'],
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
    'jsx-a11y',
    'promise',
    'unused-imports',
    'perfectionist',
    'import',
  ],
};
