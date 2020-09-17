#!/usr/bin/env node

const { Files } = require('../utils/files')


const files = new Files()

files.write([ [ 'utils/*/src', '!utils/utils/src' ] ])
