#!/usr/bin/env node

const { Files } = require('../utils/files')


const json = new Files(Files.configs.json)
const files = new Files()

json.write('utils', {
  banner: Files.configs.exports.banner,
  dest: ({ cwd }) => `${cwd}/utils/src/packages.mjs`,
  content: (_) => {
    const pkgs = _
      .filter((folder) => ![ 'utils', 'files' ].includes(folder))
      .map((folder) => {
        return Files.normalize(`
          try {
            const pkg = require('@ma-shop/${folder}')
            if (pkg) {
              Object.assign(module.exports, pkg)
            }
          } catch (e) { }
        `)
      })
      .join('\n\n')

    const header = Files.normalize(`
      // is this stupid to do. Yes. But unfortuantly you have to require packages
      // specifically, you can't use any variables in a require function in react-native
      /* eslint-disable global-require, no-empty, import/no-extraneous-dependencies */
    `)

    return `${header}\n\n${pkgs}`
  },
})

files.write([ 'utils/*/src' ])
