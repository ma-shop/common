#!/usr/bin/env node
const fs = require('fs-extra')

// eslint-disable-next-line global-require
const packages = [ 'utils', ...require('../utils/utils/packages.json') ]


packages.forEach((pkg) => {
  fs.copy(
    `${__dirname}/../LICENSE.md`,
    `${__dirname}/../utils/${pkg}/LICENSE.md`,
  )
})
