// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
// eslint-disable-next-line @typescript-eslint/no-var-requires
const replace = require('@rollup/plugin-replace')

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, opts) {
    config.plugins = config.plugins.map((plugin) =>
      plugin.name === 'replace'
        ? replace({
            'process.env.NODE_ENV': JSON.stringify(opts.env),
            preventAssignment: true,
          })
        : plugin
    )
    return config
  },
}
