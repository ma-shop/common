import { round } from './round'


export const ui = (() => {
  class Ui {
    constructor (obj) {
      this.set(obj)
    }

    set (obj) {
      Object.assign(this, obj)
    }
  }

  return new Ui({
    // the default font size
    fontSize: 14,

    // the default line-height to be used for any text components.
    // This is set at the root level and will be inherited to all text elements
    // since the `em` function needs something to start with we fake the value here initially
    get lineHeight () {
      return round(this.fontSize * 1.35)
    },

    // the default font family to use for the app
    fontFamily: 'Roboto',

    // The default font weight to use for the app
    fontWeight: '400',

    // the default border color to use for the app
    borderColor: 'red',

    // the default border radius to use for the app
    borderRadius: 2,

    overlayColor: 'black',

    duration: 250,
  })
})()
