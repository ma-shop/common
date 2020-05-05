#!/usr/bin/env node

const fs = require('fs').promises
const path = require('path')


async function run () {
  const basePath = path.join(__dirname, '..')
  const packagesPath = `${basePath}/utils/packages.js`
  const packages = await fs.readdir(basePath).catch(() => [])

  const file = packages
    .filter((folder) => {
      return ![
        'utils',
        'files',
        'test',
        'react-test',
      ].includes(folder)
    })
    .map((folder) => {
      // yes this sucks but we can't use the `normalize` function since this runs on post install
      return [
        'try {',
        `  const pkg = require('@ma-shop/${folder}')`,
        '  if (pkg) {',
        '    Object.assign(module.exports, pkg)',
        '  }',
        '} catch (e) { }',
      ].join('\n')
    })
    .join('\n\n')

  if (file) {
    await fs.writeFile(packagesPath, file)
  }
}

run()
