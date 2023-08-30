const MINIMUM_VARIABLE_LENGTH = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  overrides: [
    {
      extends: ['plugin:jest/recommended', 'plugin:jest/style'],
      files: ['**/*.test.tsx'],
    },
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'jest',
    'no-relative-import-paths',
    'security',
    'sort-destructure-keys',
    'sort-keys-fix',
    'typescript-sort-keys',
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'arrow-body-style': ['error', 'as-needed'],
    curly: ['error', 'all'],
    eqeqeq: ['error', 'always'],
    'id-length': [
      MINIMUM_VARIABLE_LENGTH,
      { exceptions: ['a', 'b'], properties: 'never' },
    ],
    'import/first': 'error',
    'import/no-unresolved': 'error',
    'no-console': 'error',
    'no-magic-numbers': ['error', { ignore: [-1, 0, 1, '0n', '1n'] }],
    'no-nested-ternary': 'error',
    'no-restricted-exports': [
      'error',
      {
        restrictDefaultExports: {
          defaultFrom: true,
          direct: true,
          named: true,
          namedFrom: true,
          namespaceFrom: true,
        },
      },
    ],
    'object-shorthand': ['error', 'always'],
    'prefer-template': 'error',
    'security/detect-object-injection': 'off',
    'security/detect-possible-timing-attacks': 'off',
    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: false },
    ],
    'sort-keys-fix/sort-keys-fix': [
      'error',
      'asc',
      {
        caseSensitive: false,
        natural: true,
      },
    ],
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
};
