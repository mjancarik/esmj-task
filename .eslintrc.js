module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        bracketSameLine: false,
      },
    ],

    '@typescript-eslint/no-empty-function': ['error', { allow: ['methods'] }],

    'no-console': [
      'error',
      {
        allow: ['warn', 'error', 'log'],
      },
    ],
  },
  plugins: ['prettier', 'jest', 'jasmine'],
  settings: {
    ecmascript: 2022,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 13,
  },
  env: {
    node: true,
    browser: true,
    es6: true,
    jest: true,
    jasmine: true,
  },
  globals: {
    globalThis: false,
  },
};
