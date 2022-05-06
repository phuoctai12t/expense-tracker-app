module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier', 'import', 'react-native'],
  rules: {
    'eslint-disable-next-line': 'off',
    'no-empty': 'off',
    'no-console': 'error',
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    'react/jsx-sort-props': [
      'warn',
      {
        callbacksLast: true,
        shorthandFirst: true,
        ignoreCase: true,
        reservedFirst: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-native/sort-styles': [
      'error',
      'asc',
      { ignoreClassNames: false, ignoreStyleProperties: false },
    ],
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-inline-styles': 2,
    'react-native/no-unused-styles': 1,
    'react-hooks/exhaustive-deps': 'off',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'internal', 'external', 'parent', 'sibling', 'index', 'type'],
        alphabetize: {
          order: 'asc',
        },
      },
    ],
    semi: ['error', 'never'],
    '@typescript-eslint/no-unused-vars': ['error'],
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'object-shorthand': ['error', 'always'],
  },
}
