/* eslint-disable global-require, import/no-dynamic-require  */

import pkgs from '../packages.json'


pkgs
  .map((pkg) => `@ma-shop/${pkg}`)
  // filter out packages that aren't installed
  .filter((pkg) => {
    try {
      require.resolve(pkg)
      return true
    } catch (e) {
      return false
    }
  })
  .forEach((_) => {
    try {
      const pkg = require(_)
      if (pkg) {
        Object.assign(module.exports, pkg)
      }
    } catch (e) {
      console.log(`error trying to import ${_}`, e)
    }
  })
