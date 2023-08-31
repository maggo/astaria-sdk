module.exports = {
  arrowParens: 'always',
  importOrder: ['<THIRD_PARTY_MODULES>', 'wagmi|astaria', '^[./]'],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  printWidth: 80,
  requirePragma: false,
  semi: true,
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
};
