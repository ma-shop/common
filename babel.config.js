// @note this has to be `babel.config.js` because `.babelrc` and `package.json` babel is ignored
// https://github.com/facebook/react-native/issues/21075#issuecomment-423527424
module.exports = {
  presets: [ 'module:metro-react-native-babel-preset' ],
}
