module.exports = {
  arrowParens: 'always',
  importOrder: ['<THIRD_PARTY_MODULES>', 'wagmi|astaria', '^[./]'],
  importOrderGroupNamespaceSpecifiers: true,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
  printWidth: 80,
  requirePragma: false,
  semi: false, // TODO: turn back to true. It's off to avoid too many conflicts currently
  singleQuote: true,
  trailingComma: 'es5',
  useTabs: false,
}
