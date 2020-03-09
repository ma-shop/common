/* eslint-disable global-require, import/no-dynamic-require  */

import pkgs from '../packages.json'


// @todo uninstall all these packages when react-native metro bundler doesn't suck and allows
// you to import packages dynamically. But for now all these packages have to be installed.
// https://github.com/facebook/metro/pull/511

function stupidWorkAroundForReactNative (pkg) {
  switch (pkg) {
    case '@ma-shop/is': return require('@ma-shop/is')
    case '@ma-shop/locale': return require('@ma-shop/locale')
    case '@ma-shop/react': return require('@ma-shop/react')
    case '@ma-shop/react-native': return require('@ma-shop/react-native')
    case '@ma-shop/apollo': return require('@ma-shop/apollo')
    // @note this can't be required because it uses the built in `fs` library
    // case '@ma-shop/files': return require('@ma-shop/files')
    default:
  }
}

pkgs
  .map((pkg) => `@ma-shop/${pkg}`)
  .forEach((_) => {
    try {
      const pkg = stupidWorkAroundForReactNative(_)
      if (pkg) {
        Object.assign(module.exports, pkg)
      }
    } catch (e) {
      console.log(`error trying to import ${_}`, e)
    }
  })
