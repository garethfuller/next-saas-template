module.exports = {
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['@typescript-eslint', 'prettier'],

  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },

  rules: {
    'prettier/prettier': 'warn',
    curly: ['error', 'multi-line'],
    'no-console': ['off'],
    'max-len': ['warn', { ignoreComments: true }],
    '@typescript-eslint/no-explicit-any': ['off'],
  },
}
