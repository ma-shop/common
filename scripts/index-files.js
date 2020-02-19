#!/usr/bin/env node

const { Files } = require('../packages/files')


const json = new Files(Files.configs.json)
const files = new Files()

json.write('packages', {
  dest: ({ cwd }) => `${cwd}/utils/packages.json`,
  content: (folders) => JSON.stringify(folders.filter((folder) => folder !== 'utils'), null, 2),
})

files.write([ 'packages/*/src' ])
