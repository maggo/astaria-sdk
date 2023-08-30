const MINIMUM_VARIABLE_LENGTH = 2;

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'no-relative-import-paths',
    'security',
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
